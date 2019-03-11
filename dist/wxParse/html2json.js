'use strict';

/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 *
 *
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 *
 * github地址: https://github.com/icindy/wxParse
 *
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, '').replace(/<.*!doctype.*\>\n/, '').replace(/<.*!DOCTYPE.*\>\n/, '');
}

function trimHtml(html) {
    return html.replace(/\r?\n+/g, '').replace(/<!--.*?-->/ig, '').replace(/\/\*.*?\*\//ig, '').replace(/[ ]+</ig, '<');
}

function html2json(html, bindName) {
    //处理字符串
    html = removeDOCTYPE(html);
    html = trimHtml(html);
    html = wxDiscode.strDiscode(html);
    //生成node节点
    var bufArray = [];
    var results = {
        node: bindName,
        nodes: [],
        images: [],
        imageUrls: []
    };
    var index = 0;
    HTMLParser(html, {
        start: function start(tag, attrs, unary) {
            //debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag
            };

            if (bufArray.length === 0) {
                node.index = index.toString();
                index += 1;
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length;
            }

            if (block[tag]) {
                node.tagType = "block";
            } else if (inline[tag]) {
                node.tagType = "inline";
            } else if (closeSelf[tag]) {
                node.tagType = "closeSelf";
            }

            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;
                    if (name == 'class') {
                        //  value = value.join("")
                        node.classStr = value;
                    }
                    // has multi attibutes
                    // make it array of attribute
                    if (name == 'style') {
                        //  value = value.join("")
                        node.styleStr = value;
                    }
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                if (imgUrl[0] == '') {
                    imgUrl.splice(0, 1);
                }
                imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                node.attr.src = imgUrl;
                node.from = bindName;
                results.images.push(node);
                results.imageUrls.push(imgUrl);
            }

            // 处理font标签样式属性
            if (node.tag === 'font') {
                var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
                var styleAttrs = {
                    'color': 'color',
                    'face': 'font-family',
                    'size': 'font-size'
                };
                if (!node.attr.style) node.attr.style = [];
                if (!node.styleStr) node.styleStr = '';
                for (var key in styleAttrs) {
                    if (node.attr[key]) {
                        var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
                        node.attr.style.push(styleAttrs[key]);
                        node.attr.style.push(value);
                        node.styleStr += styleAttrs[key] + ': ' + value + ';';
                    }
                }
            }

            //临时记录source资源
            if (node.tag === 'source') {
                results.source = node.attr.src;
            }

            if (unary) {
                // if this tag dosen't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function end(tag) {
            //debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');

            //当有缓存source资源时于于video补上src资源
            if (node.tag === 'video' && results.source) {
                node.attr.src = results.source;
                delete results.source;
            }

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        chars: function chars(text) {
            //debug(ttt);
            var node = {
                node: 'text',
                text: text,
                textArray: transEmojiStr(text)
            };

            if (bufArray.length === 0) {
                node.index = index.toString();
                index += 1;
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length;
                parent.nodes.push(node);
            }
        },
        comment: function comment(text) {
            //debug(ttt);
            // var node = {
            //     node: 'comment',
            //     ttt: ttt,
            // };
            // var parent = bufArray[0];
            // if (parent.nodes === undefined) {
            //     parent.nodes = [];
            // }
            // parent.nodes.push(node);
        }
    });
    return results;
};

function transEmojiStr(str) {
    // var eReg = new RegExp("["+__reg+' '+"]");
    //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')

    var emojiObjs = [];
    //如果正则表达式为空
    if (__emojisReg.length == 0 || !__emojis) {
        var emojiObj = {};
        emojiObj.node = "text";
        emojiObj.text = str;
        array = [emojiObj];
        return array;
    }
    //这个地方需要调整
    str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
    var eReg = new RegExp("[:]");
    var array = str.split(eReg);
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var emojiObj = {};
        if (__emojis[ele]) {
            emojiObj.node = "element";
            emojiObj.tag = "emoji";
            emojiObj.text = __emojis[ele];
            emojiObj.baseSrc = __emojisBaseSrc;
        } else {
            emojiObj.node = "text";
            emojiObj.text = ele;
        }
        emojiObjs.push(emojiObj);
    }

    return emojiObjs;
}

function emojisInit() {
    var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
    var emojis = arguments[2];

    __emojisReg = reg;
    __emojisBaseSrc = baseSrc;
    __emojis = emojis;
}

module.exports = {
    html2json: html2json,
    emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWwyanNvbi5qcyJdLCJuYW1lcyI6WyJfX3BsYWNlSW1nZVVybEh0dHBzIiwiX19lbW9qaXNSZWciLCJfX2Vtb2ppc0Jhc2VTcmMiLCJfX2Vtb2ppcyIsInd4RGlzY29kZSIsInJlcXVpcmUiLCJIVE1MUGFyc2VyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwib2JqIiwiaXRlbXMiLCJzdHIiLCJpIiwiaHRtbCIsInJlbW92ZURPQ1RZUEUiLCJ0cmltSHRtbCIsImJ1ZkFycmF5IiwicmVzdWx0cyIsIm5vZGUiLCJub2RlcyIsImltYWdlcyIsImltYWdlVXJscyIsImluZGV4Iiwic3RhcnQiLCJ0YWciLCJwYXJlbnQiLCJhdHRycyIsIm5hbWUiLCJhdHRyIiwidmFsdWUiLCJwcmUiLCJBcnJheSIsImltZ1VybCIsImZvbnRTaXplIiwic3R5bGVBdHRycyIsImtleSIsImVuZCIsImNvbnNvbGUiLCJjaGFycyIsInRleHQiLCJ0ZXh0QXJyYXkiLCJ0cmFuc0Vtb2ppU3RyIiwiY29tbWVudCIsImVtb2ppT2JqcyIsImVtb2ppT2JqIiwiYXJyYXkiLCJlUmVnIiwiZWxlIiwicmVnIiwiYmFzZVNyYyIsImVtb2ppcyIsIm1vZHVsZSIsImh0bWwyanNvbiIsImVtb2ppc0luaXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFBSUEsc0JBQUosT0FBQTtBQUNBLElBQUlDLGNBQUosRUFBQTtBQUNBLElBQUlDLGtCQUFKLEVBQUE7QUFDQSxJQUFJQyxXQUFKLEVBQUE7QUFDQSxJQUFJQyxZQUFZQyxRQUFoQixnQkFBZ0JBLENBQWhCO0FBQ0EsSUFBSUMsYUFBYUQsUUFBakIsaUJBQWlCQSxDQUFqQjtBQUNBO0FBQ0EsSUFBSUUsUUFBUUMsUUFBWixvR0FBWUEsQ0FBWjtBQUNBO0FBQ0EsSUFBSUMsUUFBUUQsUUFBWix1VEFBWUEsQ0FBWjs7QUFFQTtBQUNB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QUEsQ0FBQSxJQUFBLFVBQUEsQ0FBQSxNQUFBLFNBQUEsR0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFyQyxFQUFxQztBQUFBLFFBQWxDQyxVQUFrQyxVQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsVUFBQSxDQUFBLE1BQUEsU0FBQSxHQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQTFCLGtCQUEwQjtBQUFBLFFBQVBDLFNBQU8sVUFBQSxDQUFBLENBQUE7O0FBQ3pEdEQsa0JBQUFBLEdBQUFBO0FBQ0FDLHNCQUFBQSxPQUFBQTtBQUNBQyxlQUFBQSxNQUFBQTtBQUNIOztBQUVEcUQsT0FBQUEsT0FBQUEsR0FBaUI7QUFDYkMsZUFEYSxTQUFBO0FBRWJDLGdCQUFXQTtBQUZFLENBQWpCRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogaHRtbDJKc29uIOaUuemAoOadpeiHqjogaHR0cHM6Ly9naXRodWIuY29tL0p4Y2svaHRtbDJqc29uXG4gKlxuICpcbiAqIGF1dGhvcjogRGkgKOW+ruS/oeWwj+eoi+W6j+W8gOWPkeW3peeoi+W4iClcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxuICogICAgICAgICAgICAgICDlnoLnm7Tlvq7kv6HlsI/nqIvluo/lvIDlj5HkuqTmtYHnpL7ljLpcbiAqXG4gKiBnaXRodWLlnLDlnYA6IGh0dHBzOi8vZ2l0aHViLmNvbS9pY2luZHkvd3hQYXJzZVxuICpcbiAqIGZvcjog5b6u5L+h5bCP56iL5bqP5a+M5paH5pys6Kej5p6QXG4gKiBkZXRhaWwgOiBodHRwOi8vd2VhcHBkZXYuY29tL3Qvd3hwYXJzZS1hbHBoYTAtMS1odG1sLW1hcmtkb3duLzE4NFxuICovXG5cbnZhciBfX3BsYWNlSW1nZVVybEh0dHBzID0gXCJodHRwc1wiO1xudmFyIF9fZW1vamlzUmVnID0gJyc7XG52YXIgX19lbW9qaXNCYXNlU3JjID0gJyc7XG52YXIgX19lbW9qaXMgPSB7fTtcbnZhciB3eERpc2NvZGUgPSByZXF1aXJlKCcuL3d4RGlzY29kZS5qcycpO1xudmFyIEhUTUxQYXJzZXIgPSByZXF1aXJlKCcuL2h0bWxwYXJzZXIuanMnKTtcbi8vIEVtcHR5IEVsZW1lbnRzIC0gSFRNTCA1XG52YXIgZW1wdHkgPSBtYWtlTWFwKFwiYXJlYSxiYXNlLGJhc2Vmb250LGJyLGNvbCxmcmFtZSxocixpbWcsaW5wdXQsbGluayxtZXRhLHBhcmFtLGVtYmVkLGNvbW1hbmQsa2V5Z2VuLHNvdXJjZSx0cmFjayx3YnJcIik7XG4vLyBCbG9jayBFbGVtZW50cyAtIEhUTUwgNVxudmFyIGJsb2NrID0gbWFrZU1hcChcImJyLGEsY29kZSxhZGRyZXNzLGFydGljbGUsYXBwbGV0LGFzaWRlLGF1ZGlvLGJsb2NrcXVvdGUsYnV0dG9uLGNhbnZhcyxjZW50ZXIsZGQsZGVsLGRpcixkaXYsZGwsZHQsZmllbGRzZXQsZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGZvcm0sZnJhbWVzZXQsaDEsaDIsaDMsaDQsaDUsaDYsaGVhZGVyLGhncm91cCxocixpZnJhbWUsaW5zLGlzaW5kZXgsbGksbWFwLG1lbnUsbm9mcmFtZXMsbm9zY3JpcHQsb2JqZWN0LG9sLG91dHB1dCxwLHByZSxzZWN0aW9uLHNjcmlwdCx0YWJsZSx0Ym9keSx0ZCx0Zm9vdCx0aCx0aGVhZCx0cix1bCx2aWRlb1wiKTtcblxuLy8gSW5saW5lIEVsZW1lbnRzIC0gSFRNTCA1XG52YXIgaW5saW5lID0gbWFrZU1hcChcImFiYnIsYWNyb255bSxhcHBsZXQsYixiYXNlZm9udCxiZG8sYmlnLGJ1dHRvbixjaXRlLGRlbCxkZm4sZW0sZm9udCxpLGlmcmFtZSxpbWcsaW5wdXQsaW5zLGtiZCxsYWJlbCxtYXAsb2JqZWN0LHEscyxzYW1wLHNjcmlwdCxzZWxlY3Qsc21hbGwsc3BhbixzdHJpa2Usc3Ryb25nLHN1YixzdXAsdGV4dGFyZWEsdHQsdSx2YXJcIik7XG5cbi8vIEVsZW1lbnRzIHRoYXQgeW91IGNhbiwgaW50ZW50aW9uYWxseSwgbGVhdmUgb3BlblxuLy8gKGFuZCB3aGljaCBjbG9zZSB0aGVtc2VsdmVzKVxudmFyIGNsb3NlU2VsZiA9IG1ha2VNYXAoXCJjb2xncm91cCxkZCxkdCxsaSxvcHRpb25zLHAsdGQsdGZvb3QsdGgsdGhlYWQsdHJcIik7XG5cbi8vIEF0dHJpYnV0ZXMgdGhhdCBoYXZlIHRoZWlyIHZhbHVlcyBmaWxsZWQgaW4gZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG52YXIgZmlsbEF0dHJzID0gbWFrZU1hcChcImNoZWNrZWQsY29tcGFjdCxkZWNsYXJlLGRlZmVyLGRpc2FibGVkLGlzbWFwLG11bHRpcGxlLG5vaHJlZixub3Jlc2l6ZSxub3NoYWRlLG5vd3JhcCxyZWFkb25seSxzZWxlY3RlZFwiKTtcblxuLy8gU3BlY2lhbCBFbGVtZW50cyAoY2FuIGNvbnRhaW4gYW55dGhpbmcpXG52YXIgc3BlY2lhbCA9IG1ha2VNYXAoXCJ3eHh4Y29kZS1zdHlsZSxzY3JpcHQsc3R5bGUsdmlldyxzY3JvbGwtdmlldyxibG9ja1wiKTtcbmZ1bmN0aW9uIG1ha2VNYXAoc3RyKSB7XG4gICAgdmFyIG9iaiA9IHt9LCBpdGVtcyA9IHN0ci5zcGxpdChcIixcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKylcbiAgICAgICAgb2JqW2l0ZW1zW2ldXSA9IHRydWU7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gcSh2KSB7XG4gICAgcmV0dXJuICdcIicgKyB2ICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRE9DVFlQRShodG1sKSB7XG4gICAgcmV0dXJuIGh0bWxcbiAgICAgICAgLnJlcGxhY2UoLzxcXD94bWwuKlxcPz5cXG4vLCAnJylcbiAgICAgICAgLnJlcGxhY2UoLzwuKiFkb2N0eXBlLipcXD5cXG4vLCAnJylcbiAgICAgICAgLnJlcGxhY2UoLzwuKiFET0NUWVBFLipcXD5cXG4vLCAnJyk7XG59XG5cbmZ1bmN0aW9uIHRyaW1IdG1sKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWxcbiAgICAgICAgLnJlcGxhY2UoL1xccj9cXG4rL2csICcnKVxuICAgICAgICAucmVwbGFjZSgvPCEtLS4qPy0tPi9pZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9cXC9cXCouKj9cXCpcXC8vaWcsICcnKVxuICAgICAgICAucmVwbGFjZSgvWyBdKzwvaWcsICc8Jylcbn1cblxuXG5mdW5jdGlvbiBodG1sMmpzb24oaHRtbCwgYmluZE5hbWUpIHtcbiAgICAvL+WkhOeQhuWtl+espuS4slxuICAgIGh0bWwgPSByZW1vdmVET0NUWVBFKGh0bWwpO1xuICAgIGh0bWwgPSB0cmltSHRtbChodG1sKTtcbiAgICBodG1sID0gd3hEaXNjb2RlLnN0ckRpc2NvZGUoaHRtbCk7XG4gICAgLy/nlJ/miJBub2Rl6IqC54K5XG4gICAgdmFyIGJ1ZkFycmF5ID0gW107XG4gICAgdmFyIHJlc3VsdHMgPSB7XG4gICAgICAgIG5vZGU6IGJpbmROYW1lLFxuICAgICAgICBub2RlczogW10sXG4gICAgICAgIGltYWdlczpbXSxcbiAgICAgICAgaW1hZ2VVcmxzOltdXG4gICAgfTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIEhUTUxQYXJzZXIoaHRtbCwge1xuICAgICAgICBzdGFydDogZnVuY3Rpb24gKHRhZywgYXR0cnMsIHVuYXJ5KSB7XG4gICAgICAgICAgICAvL2RlYnVnKHRhZywgYXR0cnMsIHVuYXJ5KTtcbiAgICAgICAgICAgIC8vIG5vZGUgZm9yIHRoaXMgZWxlbWVudFxuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgbm9kZTogJ2VsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHRhZzogdGFnLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGJ1ZkFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBpbmRleC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gYnVmQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLmluZGV4ID0gcGFyZW50LmluZGV4ICsgJy4nICsgcGFyZW50Lm5vZGVzLmxlbmd0aFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYmxvY2tbdGFnXSkge1xuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5saW5lW3RhZ10pIHtcbiAgICAgICAgICAgICAgICBub2RlLnRhZ1R5cGUgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbG9zZVNlbGZbdGFnXSkge1xuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiY2xvc2VTZWxmXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmF0dHIgPSBhdHRycy5yZWR1Y2UoZnVuY3Rpb24gKHByZSwgYXR0cikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHZhbHVlID0gdmFsdWUuam9pbihcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc1N0ciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGhhcyBtdWx0aSBhdHRpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBpdCBhcnJheSBvZiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHZhbHVlID0gdmFsdWUuam9pbihcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zdHlsZVN0ciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5tYXRjaCgvIC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGF0dHIgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVyZ2UgaXRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZVtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJlW25hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFscmVhZHkgYXJyYXksIHB1c2ggdG8gbGFzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVtuYW1lXS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIHZhbHVlLCBtYWtlIGl0IGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlW25hbWVdID0gW3ByZVtuYW1lXSwgdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90IGV4aXN0LCBwdXQgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZTtcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5a+5aW1n5re75Yqg6aKd5aSW5pWw5o2uXG4gICAgICAgICAgICBpZiAobm9kZS50YWcgPT09ICdpbWcnKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pbWdJbmRleCA9IHJlc3VsdHMuaW1hZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgaW1nVXJsID0gbm9kZS5hdHRyLnNyYztcbiAgICAgICAgICAgICAgICBpZiAoaW1nVXJsWzBdID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZ1VybC5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltZ1VybCA9IHd4RGlzY29kZS51cmxUb0h0dHBVcmwoaW1nVXJsLCBfX3BsYWNlSW1nZVVybEh0dHBzKTtcbiAgICAgICAgICAgICAgICBub2RlLmF0dHIuc3JjID0gaW1nVXJsO1xuICAgICAgICAgICAgICAgIG5vZGUuZnJvbSA9IGJpbmROYW1lO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMuaW1hZ2VzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5pbWFnZVVybHMucHVzaChpbWdVcmwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDlpITnkIZmb2505qCH562+5qC35byP5bGe5oCnXG4gICAgICAgICAgICBpZiAobm9kZS50YWcgPT09ICdmb250Jykge1xuICAgICAgICAgICAgICAgIHZhciBmb250U2l6ZSA9IFsneC1zbWFsbCcsICdzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnLCAneC1sYXJnZScsICd4eC1sYXJnZScsICctd2Via2l0LXh4eC1sYXJnZSddO1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZUF0dHJzID0ge1xuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnY29sb3InLFxuICAgICAgICAgICAgICAgICAgICAnZmFjZSc6ICdmb250LWZhbWlseScsXG4gICAgICAgICAgICAgICAgICAgICdzaXplJzogJ2ZvbnQtc2l6ZSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICghbm9kZS5hdHRyLnN0eWxlKSBub2RlLmF0dHIuc3R5bGUgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuc3R5bGVTdHIpIG5vZGUuc3R5bGVTdHIgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc3R5bGVBdHRycykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5hdHRyW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGtleSA9PT0gJ3NpemUnID8gZm9udFNpemVbbm9kZS5hdHRyW2tleV0tMV0gOiBub2RlLmF0dHJba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuYXR0ci5zdHlsZS5wdXNoKHN0eWxlQXR0cnNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmF0dHIuc3R5bGUucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlU3RyICs9IHN0eWxlQXR0cnNba2V5XSArICc6ICcgKyB2YWx1ZSArICc7JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/kuLTml7borrDlvZVzb3VyY2XotYTmupBcbiAgICAgICAgICAgIGlmKG5vZGUudGFnID09PSAnc291cmNlJyl7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5zb3VyY2UgPSBub2RlLmF0dHIuc3JjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodW5hcnkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIHRhZyBkb3Nlbid0IGhhdmUgZW5kIHRhZ1xuICAgICAgICAgICAgICAgIC8vIGxpa2UgPGltZyBzcmM9XCJob2dlLnBuZ1wiLz5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdG8gcGFyZW50c1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXSB8fCByZXN1bHRzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1ZkFycmF5LnVuc2hpZnQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZDogZnVuY3Rpb24gKHRhZykge1xuICAgICAgICAgICAgLy9kZWJ1Zyh0YWcpO1xuICAgICAgICAgICAgLy8gbWVyZ2UgaW50byBwYXJlbnQgdGFnXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGJ1ZkFycmF5LnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAobm9kZS50YWcgIT09IHRhZykgY29uc29sZS5lcnJvcignaW52YWxpZCBzdGF0ZTogbWlzbWF0Y2ggZW5kIHRhZycpO1xuXG4gICAgICAgICAgICAvL+W9k+aciee8k+WtmHNvdXJjZei1hOa6kOaXtuS6juS6jnZpZGVv6KGl5LiKc3Jj6LWE5rqQXG4gICAgICAgICAgICBpZihub2RlLnRhZyA9PT0gJ3ZpZGVvJyAmJiByZXN1bHRzLnNvdXJjZSl7XG4gICAgICAgICAgICAgICAgbm9kZS5hdHRyLnNyYyA9IHJlc3VsdHMuc291cmNlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByZXN1bHRzLnNvdXJjZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJ1ZkFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoYXJzOiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgLy9kZWJ1Zyh0dHQpO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgbm9kZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgdGV4dEFycmF5OnRyYW5zRW1vamlTdHIodGV4dClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChidWZBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmluZGV4ID0gaW5kZXgudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIGluZGV4ICs9IDFcbiAgICAgICAgICAgICAgICByZXN1bHRzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBwYXJlbnQuaW5kZXggKyAnLicgKyBwYXJlbnQubm9kZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1lbnQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAvL2RlYnVnKHR0dCk7XG4gICAgICAgICAgICAvLyB2YXIgbm9kZSA9IHtcbiAgICAgICAgICAgIC8vICAgICBub2RlOiAnY29tbWVudCcsXG4gICAgICAgICAgICAvLyAgICAgdHR0OiB0dHQsXG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgLy8gdmFyIHBhcmVudCA9IGJ1ZkFycmF5WzBdO1xuICAgICAgICAgICAgLy8gaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyAgICAgcGFyZW50Lm5vZGVzID0gW107XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbn07XG5cbmZ1bmN0aW9uIHRyYW5zRW1vamlTdHIoc3RyKXtcbiAgLy8gdmFyIGVSZWcgPSBuZXcgUmVnRXhwKFwiW1wiK19fcmVnKycgJytcIl1cIik7XG4vLyAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFsoW15cXFtcXF1dKylcXF0vZywnOiQxOicpXG5cbiAgdmFyIGVtb2ppT2JqcyA9IFtdO1xuICAvL+WmguaenOato+WImeihqOi+vuW8j+S4uuepulxuICBpZihfX2Vtb2ppc1JlZy5sZW5ndGggPT0gMCB8fCAhX19lbW9qaXMpe1xuICAgICAgdmFyIGVtb2ppT2JqID0ge31cbiAgICAgIGVtb2ppT2JqLm5vZGUgPSBcInRleHRcIjtcbiAgICAgIGVtb2ppT2JqLnRleHQgPSBzdHI7XG4gICAgICBhcnJheSA9IFtlbW9qaU9ial07XG4gICAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgLy/ov5nkuKrlnLDmlrnpnIDopoHosIPmlbRcbiAgc3RyID0gc3RyLnJlcGxhY2UoL1xcWyhbXlxcW1xcXV0rKVxcXS9nLCc6JDE6JylcbiAgdmFyIGVSZWcgPSBuZXcgUmVnRXhwKFwiWzpdXCIpO1xuICB2YXIgYXJyYXkgPSBzdHIuc3BsaXQoZVJlZyk7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgdmFyIGVsZSA9IGFycmF5W2ldO1xuICAgIHZhciBlbW9qaU9iaiA9IHt9O1xuICAgIGlmKF9fZW1vamlzW2VsZV0pe1xuICAgICAgZW1vamlPYmoubm9kZSA9IFwiZWxlbWVudFwiO1xuICAgICAgZW1vamlPYmoudGFnID0gXCJlbW9qaVwiO1xuICAgICAgZW1vamlPYmoudGV4dCA9IF9fZW1vamlzW2VsZV07XG4gICAgICBlbW9qaU9iai5iYXNlU3JjPSBfX2Vtb2ppc0Jhc2VTcmM7XG4gICAgfWVsc2V7XG4gICAgICBlbW9qaU9iai5ub2RlID0gXCJ0ZXh0XCI7XG4gICAgICBlbW9qaU9iai50ZXh0ID0gZWxlO1xuICAgIH1cbiAgICBlbW9qaU9ianMucHVzaChlbW9qaU9iaik7XG4gIH1cblxuICByZXR1cm4gZW1vamlPYmpzO1xufVxuXG5mdW5jdGlvbiBlbW9qaXNJbml0KHJlZz0nJyxiYXNlU3JjPVwiL3d4UGFyc2UvZW1vamlzL1wiLGVtb2ppcyl7XG4gICAgX19lbW9qaXNSZWcgPSByZWc7XG4gICAgX19lbW9qaXNCYXNlU3JjPWJhc2VTcmM7XG4gICAgX19lbW9qaXM9ZW1vamlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBodG1sMmpzb246IGh0bWwyanNvbixcbiAgICBlbW9qaXNJbml0OmVtb2ppc0luaXRcbn07XG5cbiJdLCJmaWxlIjoiaHRtbDJqc29uLmpzIn0=