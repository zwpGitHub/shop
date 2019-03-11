"use strict";

/**
 * 
 * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
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
// Regular Expressions for parsing tags and attributes

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");

function HTMLParser(html, handler) {
	var index,
	    chars,
	    match,
	    stack = [],
	    last = html;
	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {
		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {

			// Comment
			if (html.indexOf("<!--") == 0) {
				index = html.indexOf("-->");

				if (index >= 0) {
					if (handler.comment) handler.comment(html.substring(4, index));
					html = html.substring(index + 3);
					chars = false;
				}

				// end tag
			} else if (html.indexOf("</") == 0) {
				match = html.match(endTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(endTag, parseEndTag);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") == 0) {
				match = html.match(startTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(startTag, parseStartTag);
					chars = false;
				}
			}

			if (chars) {
				index = html.indexOf("<");
				var text = '';
				while (index === 0) {
					text += "<";
					html = html.substring(1);
					index = html.indexOf("<");
				}
				text += index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (handler.chars) handler.chars(text);
			}
		} else {

			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) handler.chars(text);

				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html == last) throw "Parse Error: " + html;
		last = html;
	}

	// Clean up any remaining tags
	parseEndTag();

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = tagName.toLowerCase();

		if (block[tagName]) {
			while (stack.last() && inline[stack.last()]) {
				parseEndTag("", stack.last());
			}
		}

		if (closeSelf[tagName] && stack.last() == tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;

		if (!unary) stack.push(tagName);

		if (handler.start) {
			var attrs = [];

			rest.replace(attr, function (match, name) {
				var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
				});
			});

			if (handler.start) {
				handler.start(tagName, attrs, unary);
			}
		}
	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		if (!tagName) var pos = 0;

		// Find the closest opened tag of the same type
		else {
				tagName = tagName.toLowerCase();
				for (var pos = stack.length - 1; pos >= 0; pos--) {
					if (stack[pos] == tagName) break;
				}
			}
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--) {
				if (handler.end) handler.end(stack[i]);
			} // Remove the open elements from the stack
			stack.length = pos;
		}
	}
};

function makeMap(str) {
	var obj = {},
	    items = str.split(",");
	for (var i = 0; i < items.length; i++) {
		obj[items[i]] = true;
	}return obj;
}

module.exports = HTMLParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWxwYXJzZXIuanMiXSwibmFtZXMiOlsic3RhcnRUYWciLCJlbmRUYWciLCJhdHRyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwic3RhY2siLCJsYXN0IiwiY2hhcnMiLCJodG1sIiwiaW5kZXgiLCJoYW5kbGVyIiwibWF0Y2giLCJ0ZXh0IiwicGFyc2VFbmRUYWciLCJ0YWdOYW1lIiwidW5hcnkiLCJhdHRycyIsInJlc3QiLCJ2YWx1ZSIsImFyZ3VtZW50cyIsIm5hbWUiLCJlc2NhcGVkIiwicG9zIiwiaSIsIm9iaiIsIml0ZW1zIiwic3RyIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7O0FBYUE7O0FBQ0EsSUFBSUEsV0FBSixnSEFBQTtBQUFBLElBQ0NDLFNBREQsNEJBQUE7QUFBQSxJQUVDQyxPQUZELG9HQUFBOztBQUlBO0FBQ0EsSUFBSUMsUUFBUUMsUUFBWixvR0FBWUEsQ0FBWjs7QUFFQTtBQUNBLElBQUlDLFFBQVFELFFBQVosb1RBQVlBLENBQVo7O0FBRUE7QUFDQSxJQUFJRSxTQUFTRixRQUFiLDZMQUFhQSxDQUFiOztBQUVBO0FBQ0E7QUFDQSxJQUFJRyxZQUFZSCxRQUFoQixrREFBZ0JBLENBQWhCOztBQUVBO0FBQ0EsSUFBSUksWUFBWUosUUFBaEIsd0dBQWdCQSxDQUFoQjs7QUFFQTtBQUNBLElBQUlLLFVBQVVMLFFBQWQsb0RBQWNBLENBQWQ7O0FBRUEsU0FBQSxVQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBbUM7QUFDbEMsS0FBQSxLQUFBO0FBQUEsS0FBQSxLQUFBO0FBQUEsS0FBQSxLQUFBO0FBQUEsS0FBeUJNLFFBQXpCLEVBQUE7QUFBQSxLQUFxQ0MsT0FBckMsSUFBQTtBQUNBRCxPQUFBQSxJQUFBQSxHQUFhLFlBQVk7QUFDeEIsU0FBTyxLQUFLLEtBQUEsTUFBQSxHQUFaLENBQU8sQ0FBUDtBQUREQSxFQUFB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OiBodHRwczovL2dpdGh1Yi5jb20vYmxvd3NpZS9QdXJlLUphdmFTY3JpcHQtSFRNTDUtUGFyc2VyXHJcbiAqIFxyXG4gKiBhdXRob3I6IERpICjlvq7kv6HlsI/nqIvluo/lvIDlj5Hlt6XnqIvluIgpXHJcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxyXG4gKiAgICAgICAgICAgICAgIOWeguebtOW+ruS/oeWwj+eoi+W6j+W8gOWPkeS6pOa1geekvuWMulxyXG4gKiBcclxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcclxuICogXHJcbiAqIGZvcjog5b6u5L+h5bCP56iL5bqP5a+M5paH5pys6Kej5p6QXHJcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XHJcbiAqL1xyXG4vLyBSZWd1bGFyIEV4cHJlc3Npb25zIGZvciBwYXJzaW5nIHRhZ3MgYW5kIGF0dHJpYnV0ZXNcclxudmFyIHN0YXJ0VGFnID0gL148KFstQS1aYS16MC05X10rKSgoPzpcXHMrW2EtekEtWl86XVstYS16QS1aMC05XzouXSooPzpcXHMqPVxccyooPzooPzpcIlteXCJdKlwiKXwoPzonW14nXSonKXxbXj5cXHNdKykpPykqKVxccyooXFwvPyk+LyxcclxuXHRlbmRUYWcgPSAvXjxcXC8oWy1BLVphLXowLTlfXSspW14+XSo+LyxcclxuXHRhdHRyID0gLyhbYS16QS1aXzpdWy1hLXpBLVowLTlfOi5dKikoPzpcXHMqPVxccyooPzooPzpcIigoPzpcXFxcLnxbXlwiXSkqKVwiKXwoPzonKCg/OlxcXFwufFteJ10pKiknKXwoW14+XFxzXSspKSk/L2c7XHJcblxyXG4vLyBFbXB0eSBFbGVtZW50cyAtIEhUTUwgNVxyXG52YXIgZW1wdHkgPSBtYWtlTWFwKFwiYXJlYSxiYXNlLGJhc2Vmb250LGJyLGNvbCxmcmFtZSxocixpbWcsaW5wdXQsbGluayxtZXRhLHBhcmFtLGVtYmVkLGNvbW1hbmQsa2V5Z2VuLHNvdXJjZSx0cmFjayx3YnJcIik7XHJcblxyXG4vLyBCbG9jayBFbGVtZW50cyAtIEhUTUwgNVxyXG52YXIgYmxvY2sgPSBtYWtlTWFwKFwiYSxhZGRyZXNzLGNvZGUsYXJ0aWNsZSxhcHBsZXQsYXNpZGUsYXVkaW8sYmxvY2txdW90ZSxidXR0b24sY2FudmFzLGNlbnRlcixkZCxkZWwsZGlyLGRpdixkbCxkdCxmaWVsZHNldCxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsZm9ybSxmcmFtZXNldCxoMSxoMixoMyxoNCxoNSxoNixoZWFkZXIsaGdyb3VwLGhyLGlmcmFtZSxpbnMsaXNpbmRleCxsaSxtYXAsbWVudSxub2ZyYW1lcyxub3NjcmlwdCxvYmplY3Qsb2wsb3V0cHV0LHAscHJlLHNlY3Rpb24sc2NyaXB0LHRhYmxlLHRib2R5LHRkLHRmb290LHRoLHRoZWFkLHRyLHVsLHZpZGVvXCIpO1xyXG5cclxuLy8gSW5saW5lIEVsZW1lbnRzIC0gSFRNTCA1XHJcbnZhciBpbmxpbmUgPSBtYWtlTWFwKFwiYWJicixhY3JvbnltLGFwcGxldCxiLGJhc2Vmb250LGJkbyxiaWcsYnIsYnV0dG9uLGNpdGUsZGVsLGRmbixlbSxmb250LGksaWZyYW1lLGltZyxpbnB1dCxpbnMsa2JkLGxhYmVsLG1hcCxvYmplY3QscSxzLHNhbXAsc2NyaXB0LHNlbGVjdCxzbWFsbCxzcGFuLHN0cmlrZSxzdHJvbmcsc3ViLHN1cCx0ZXh0YXJlYSx0dCx1LHZhclwiKTtcclxuXHJcbi8vIEVsZW1lbnRzIHRoYXQgeW91IGNhbiwgaW50ZW50aW9uYWxseSwgbGVhdmUgb3BlblxyXG4vLyAoYW5kIHdoaWNoIGNsb3NlIHRoZW1zZWx2ZXMpXHJcbnZhciBjbG9zZVNlbGYgPSBtYWtlTWFwKFwiY29sZ3JvdXAsZGQsZHQsbGksb3B0aW9ucyxwLHRkLHRmb290LHRoLHRoZWFkLHRyXCIpO1xyXG5cclxuLy8gQXR0cmlidXRlcyB0aGF0IGhhdmUgdGhlaXIgdmFsdWVzIGZpbGxlZCBpbiBkaXNhYmxlZD1cImRpc2FibGVkXCJcclxudmFyIGZpbGxBdHRycyA9IG1ha2VNYXAoXCJjaGVja2VkLGNvbXBhY3QsZGVjbGFyZSxkZWZlcixkaXNhYmxlZCxpc21hcCxtdWx0aXBsZSxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3dyYXAscmVhZG9ubHksc2VsZWN0ZWRcIik7XHJcblxyXG4vLyBTcGVjaWFsIEVsZW1lbnRzIChjYW4gY29udGFpbiBhbnl0aGluZylcclxudmFyIHNwZWNpYWwgPSBtYWtlTWFwKFwid3h4eGNvZGUtc3R5bGUsc2NyaXB0LHN0eWxlLHZpZXcsc2Nyb2xsLXZpZXcsYmxvY2tcIik7XHJcblxyXG5mdW5jdGlvbiBIVE1MUGFyc2VyKGh0bWwsIGhhbmRsZXIpIHtcclxuXHR2YXIgaW5kZXgsIGNoYXJzLCBtYXRjaCwgc3RhY2sgPSBbXSwgbGFzdCA9IGh0bWw7XHJcblx0c3RhY2subGFzdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XHJcblx0fTtcclxuXHJcblx0d2hpbGUgKGh0bWwpIHtcclxuXHRcdGNoYXJzID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgd2UncmUgbm90IGluIGEgc2NyaXB0IG9yIHN0eWxlIGVsZW1lbnRcclxuXHRcdGlmICghc3RhY2subGFzdCgpIHx8ICFzcGVjaWFsW3N0YWNrLmxhc3QoKV0pIHtcclxuXHJcblx0XHRcdC8vIENvbW1lbnRcclxuXHRcdFx0aWYgKGh0bWwuaW5kZXhPZihcIjwhLS1cIikgPT0gMCkge1xyXG5cdFx0XHRcdGluZGV4ID0gaHRtbC5pbmRleE9mKFwiLS0+XCIpO1xyXG5cclxuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdFx0aWYgKGhhbmRsZXIuY29tbWVudClcclxuXHRcdFx0XHRcdFx0aGFuZGxlci5jb21tZW50KGh0bWwuc3Vic3RyaW5nKDQsIGluZGV4KSk7XHJcblx0XHRcdFx0XHRodG1sID0gaHRtbC5zdWJzdHJpbmcoaW5kZXggKyAzKTtcclxuXHRcdFx0XHRcdGNoYXJzID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBlbmQgdGFnXHJcblx0XHRcdH0gZWxzZSBpZiAoaHRtbC5pbmRleE9mKFwiPC9cIikgPT0gMCkge1xyXG5cdFx0XHRcdG1hdGNoID0gaHRtbC5tYXRjaChlbmRUYWcpO1xyXG5cclxuXHRcdFx0XHRpZiAobWF0Y2gpIHtcclxuXHRcdFx0XHRcdGh0bWwgPSBodG1sLnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpO1xyXG5cdFx0XHRcdFx0bWF0Y2hbMF0ucmVwbGFjZShlbmRUYWcsIHBhcnNlRW5kVGFnKTtcclxuXHRcdFx0XHRcdGNoYXJzID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBzdGFydCB0YWdcclxuXHRcdFx0fSBlbHNlIGlmIChodG1sLmluZGV4T2YoXCI8XCIpID09IDApIHtcclxuXHRcdFx0XHRtYXRjaCA9IGh0bWwubWF0Y2goc3RhcnRUYWcpO1xyXG5cclxuXHRcdFx0XHRpZiAobWF0Y2gpIHtcclxuXHRcdFx0XHRcdGh0bWwgPSBodG1sLnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpO1xyXG5cdFx0XHRcdFx0bWF0Y2hbMF0ucmVwbGFjZShzdGFydFRhZywgcGFyc2VTdGFydFRhZyk7XHJcblx0XHRcdFx0XHRjaGFycyA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNoYXJzKSB7XHJcblx0XHRcdFx0aW5kZXggPSBodG1sLmluZGV4T2YoXCI8XCIpO1xyXG5cdFx0XHRcdHZhciB0ZXh0ID0gJydcclxuXHRcdFx0XHR3aGlsZSAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCI8XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGh0bWwuaW5kZXhPZihcIjxcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRleHQgKz0gaW5kZXggPCAwID8gaHRtbCA6IGh0bWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuXHRcdFx0XHRodG1sID0gaW5kZXggPCAwID8gXCJcIiA6IGh0bWwuc3Vic3RyaW5nKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aWYgKGhhbmRsZXIuY2hhcnMpXHJcblx0XHRcdFx0XHRoYW5kbGVyLmNoYXJzKHRleHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGh0bWwgPSBodG1sLnJlcGxhY2UobmV3IFJlZ0V4cChcIihbXFxcXHNcXFxcU10qPyk8XFwvXCIgKyBzdGFjay5sYXN0KCkgKyBcIltePl0qPlwiKSwgZnVuY3Rpb24gKGFsbCwgdGV4dCkge1xyXG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLzwhLS0oW1xcc1xcU10qPyktLT58PCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KV1dPi9nLCBcIiQxJDJcIik7XHJcblx0XHRcdFx0aWYgKGhhbmRsZXIuY2hhcnMpXHJcblx0XHRcdFx0XHRoYW5kbGVyLmNoYXJzKHRleHQpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdFx0cGFyc2VFbmRUYWcoXCJcIiwgc3RhY2subGFzdCgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaHRtbCA9PSBsYXN0KVxyXG5cdFx0XHR0aHJvdyBcIlBhcnNlIEVycm9yOiBcIiArIGh0bWw7XHJcblx0XHRsYXN0ID0gaHRtbDtcclxuXHR9XHJcblxyXG5cdC8vIENsZWFuIHVwIGFueSByZW1haW5pbmcgdGFnc1xyXG5cdHBhcnNlRW5kVGFnKCk7XHJcblxyXG5cdGZ1bmN0aW9uIHBhcnNlU3RhcnRUYWcodGFnLCB0YWdOYW1lLCByZXN0LCB1bmFyeSkge1xyXG5cdFx0dGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRpZiAoYmxvY2tbdGFnTmFtZV0pIHtcclxuXHRcdFx0d2hpbGUgKHN0YWNrLmxhc3QoKSAmJiBpbmxpbmVbc3RhY2subGFzdCgpXSkge1xyXG5cdFx0XHRcdHBhcnNlRW5kVGFnKFwiXCIsIHN0YWNrLmxhc3QoKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2xvc2VTZWxmW3RhZ05hbWVdICYmIHN0YWNrLmxhc3QoKSA9PSB0YWdOYW1lKSB7XHJcblx0XHRcdHBhcnNlRW5kVGFnKFwiXCIsIHRhZ05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVuYXJ5ID0gZW1wdHlbdGFnTmFtZV0gfHwgISF1bmFyeTtcclxuXHJcblx0XHRpZiAoIXVuYXJ5KVxyXG5cdFx0XHRzdGFjay5wdXNoKHRhZ05hbWUpO1xyXG5cclxuXHRcdGlmIChoYW5kbGVyLnN0YXJ0KSB7XHJcblx0XHRcdHZhciBhdHRycyA9IFtdO1xyXG5cclxuXHRcdFx0cmVzdC5yZXBsYWNlKGF0dHIsIGZ1bmN0aW9uIChtYXRjaCwgbmFtZSkge1xyXG5cdFx0XHRcdHZhciB2YWx1ZSA9IGFyZ3VtZW50c1syXSA/IGFyZ3VtZW50c1syXSA6XHJcblx0XHRcdFx0XHRhcmd1bWVudHNbM10gPyBhcmd1bWVudHNbM10gOlxyXG5cdFx0XHRcdFx0XHRhcmd1bWVudHNbNF0gPyBhcmd1bWVudHNbNF0gOlxyXG5cdFx0XHRcdFx0XHRcdGZpbGxBdHRyc1tuYW1lXSA/IG5hbWUgOiBcIlwiO1xyXG5cclxuXHRcdFx0XHRhdHRycy5wdXNoKHtcclxuXHRcdFx0XHRcdG5hbWU6IG5hbWUsXHJcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHRcdFx0XHRlc2NhcGVkOiB2YWx1ZS5yZXBsYWNlKC8oXnxbXlxcXFxdKVwiL2csICckMVxcXFxcXFwiJykgLy9cIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChoYW5kbGVyLnN0YXJ0KSB7XHJcblx0XHRcdFx0aGFuZGxlci5zdGFydCh0YWdOYW1lLCBhdHRycywgdW5hcnkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFyc2VFbmRUYWcodGFnLCB0YWdOYW1lKSB7XHJcblx0XHQvLyBJZiBubyB0YWcgbmFtZSBpcyBwcm92aWRlZCwgY2xlYW4gc2hvcFxyXG5cdFx0aWYgKCF0YWdOYW1lKVxyXG5cdFx0XHR2YXIgcG9zID0gMDtcclxuXHJcblx0XHQvLyBGaW5kIHRoZSBjbG9zZXN0IG9wZW5lZCB0YWcgb2YgdGhlIHNhbWUgdHlwZVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGZvciAodmFyIHBvcyA9IHN0YWNrLmxlbmd0aCAtIDE7IHBvcyA+PSAwOyBwb3MtLSlcclxuXHRcdFx0XHRpZiAoc3RhY2tbcG9zXSA9PSB0YWdOYW1lKVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRpZiAocG9zID49IDApIHtcclxuXHRcdFx0Ly8gQ2xvc2UgYWxsIHRoZSBvcGVuIGVsZW1lbnRzLCB1cCB0aGUgc3RhY2tcclxuXHRcdFx0Zm9yICh2YXIgaSA9IHN0YWNrLmxlbmd0aCAtIDE7IGkgPj0gcG9zOyBpLS0pXHJcblx0XHRcdFx0aWYgKGhhbmRsZXIuZW5kKVxyXG5cdFx0XHRcdFx0aGFuZGxlci5lbmQoc3RhY2tbaV0pO1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBvcGVuIGVsZW1lbnRzIGZyb20gdGhlIHN0YWNrXHJcblx0XHRcdHN0YWNrLmxlbmd0aCA9IHBvcztcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gbWFrZU1hcChzdHIpIHtcclxuXHR2YXIgb2JqID0ge30sIGl0ZW1zID0gc3RyLnNwbGl0KFwiLFwiKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKVxyXG5cdFx0b2JqW2l0ZW1zW2ldXSA9IHRydWU7XHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIVE1MUGFyc2VyO1xyXG4iXSwiZmlsZSI6Imh0bWxwYXJzZXIuanMifQ==