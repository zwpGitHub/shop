'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/**
 * 
 * showdown: https://github.com/showdownjs/showdown
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

function getDefaultOpts(simple) {
  'use strict';

  var defaultOptions = {
    omitExtraWLInCodeBlocks: {
      defaultValue: false,
      describe: 'Omit the default extra whiteline added to code blocks',
      type: 'boolean'
    },
    noHeaderId: {
      defaultValue: false,
      describe: 'Turn on/off generated header id',
      type: 'boolean'
    },
    prefixHeaderId: {
      defaultValue: false,
      describe: 'Specify a prefix to generated header ids',
      type: 'string'
    },
    headerLevelStart: {
      defaultValue: false,
      describe: 'The header blocks level start',
      type: 'integer'
    },
    parseImgDimensions: {
      defaultValue: false,
      describe: 'Turn on/off image dimension parsing',
      type: 'boolean'
    },
    simplifiedAutoLink: {
      defaultValue: false,
      describe: 'Turn on/off GFM autolink style',
      type: 'boolean'
    },
    literalMidWordUnderscores: {
      defaultValue: false,
      describe: 'Parse midword underscores as literal underscores',
      type: 'boolean'
    },
    strikethrough: {
      defaultValue: false,
      describe: 'Turn on/off strikethrough support',
      type: 'boolean'
    },
    tables: {
      defaultValue: false,
      describe: 'Turn on/off tables support',
      type: 'boolean'
    },
    tablesHeaderId: {
      defaultValue: false,
      describe: 'Add an id to table headers',
      type: 'boolean'
    },
    ghCodeBlocks: {
      defaultValue: true,
      describe: 'Turn on/off GFM fenced code blocks support',
      type: 'boolean'
    },
    tasklists: {
      defaultValue: false,
      describe: 'Turn on/off GFM tasklist support',
      type: 'boolean'
    },
    smoothLivePreview: {
      defaultValue: false,
      describe: 'Prevents weird effects in live previews due to incomplete input',
      type: 'boolean'
    },
    smartIndentationFix: {
      defaultValue: false,
      description: 'Tries to smartly fix identation in es6 strings',
      type: 'boolean'
    }
  };
  if (simple === false) {
    return JSON.parse(JSON.stringify(defaultOptions));
  }
  var ret = {};
  for (var opt in defaultOptions) {
    if (defaultOptions.hasOwnProperty(opt)) {
      ret[opt] = defaultOptions[opt].defaultValue;
    }
  }
  return ret;
}

/**
 * Created by Tivie on 06-01-2015.
 */

// Private properties
var showdown = {},
    parsers = {},
    extensions = {},
    globalOptions = getDefaultOpts(true),
    flavor = {
  github: {
    omitExtraWLInCodeBlocks: true,
    prefixHeaderId: 'user-content-',
    simplifiedAutoLink: true,
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    tablesHeaderId: true,
    ghCodeBlocks: true,
    tasklists: true
  },
  vanilla: getDefaultOpts(true)
};

/**
 * helper namespace
 * @type {{}}
 */
showdown.helper = {};

/**
 * TODO LEGACY SUPPORT CODE
 * @type {{}}
 */
showdown.extensions = {};

/**
 * Set a global option
 * @static
 * @param {string} key
 * @param {*} value
 * @returns {showdown}
 */
showdown.setOption = function (key, value) {
  'use strict';

  globalOptions[key] = value;
  return this;
};

/**
 * Get a global option
 * @static
 * @param {string} key
 * @returns {*}
 */
showdown.getOption = function (key) {
  'use strict';

  return globalOptions[key];
};

/**
 * Get the global options
 * @static
 * @returns {{}}
 */
showdown.getOptions = function () {
  'use strict';

  return globalOptions;
};

/**
 * Reset global options to the default values
 * @static
 */
showdown.resetOptions = function () {
  'use strict';

  globalOptions = getDefaultOpts(true);
};

/**
 * Set the flavor showdown should use as default
 * @param {string} name
 */
showdown.setFlavor = function (name) {
  'use strict';

  if (flavor.hasOwnProperty(name)) {
    var preset = flavor[name];
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        globalOptions[option] = preset[option];
      }
    }
  }
};

/**
 * Get the default options
 * @static
 * @param {boolean} [simple=true]
 * @returns {{}}
 */
showdown.getDefaultOptions = function (simple) {
  'use strict';

  return getDefaultOpts(simple);
};

/**
 * Get or set a subParser
 *
 * subParser(name)       - Get a registered subParser
 * subParser(name, func) - Register a subParser
 * @static
 * @param {string} name
 * @param {function} [func]
 * @returns {*}
 */
showdown.subParser = function (name, func) {
  'use strict';

  if (showdown.helper.isString(name)) {
    if (typeof func !== 'undefined') {
      parsers[name] = func;
    } else {
      if (parsers.hasOwnProperty(name)) {
        return parsers[name];
      } else {
        throw Error('SubParser named ' + name + ' not registered!');
      }
    }
  }
};

/**
 * Gets or registers an extension
 * @static
 * @param {string} name
 * @param {object|function=} ext
 * @returns {*}
 */
showdown.extension = function (name, ext) {
  'use strict';

  if (!showdown.helper.isString(name)) {
    throw Error('Extension \'name\' must be a string');
  }

  name = showdown.helper.stdExtName(name);

  // Getter
  if (showdown.helper.isUndefined(ext)) {
    if (!extensions.hasOwnProperty(name)) {
      throw Error('Extension named ' + name + ' is not registered!');
    }
    return extensions[name];

    // Setter
  } else {
    // Expand extension if it's wrapped in a function
    if (typeof ext === 'function') {
      ext = ext();
    }

    // Ensure extension is an array
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExtension = validate(ext, name);

    if (validExtension.valid) {
      extensions[name] = ext;
    } else {
      throw Error(validExtension.error);
    }
  }
};

/**
 * Gets all extensions registered
 * @returns {{}}
 */
showdown.getAllExtensions = function () {
  'use strict';

  return extensions;
};

/**
 * Remove an extension
 * @param {string} name
 */
showdown.removeExtension = function (name) {
  'use strict';

  delete extensions[name];
};

/**
 * Removes all extensions
 */
showdown.resetExtensions = function () {
  'use strict';

  extensions = {};
};

/**
 * Validate extension
 * @param {array} extension
 * @param {string} name
 * @returns {{valid: boolean, error: string}}
 */
function validate(extension, name) {
  'use strict';

  var errMsg = name ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
      ret = {
    valid: true,
    error: ''
  };

  if (!showdown.helper.isArray(extension)) {
    extension = [extension];
  }

  for (var i = 0; i < extension.length; ++i) {
    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
        ext = extension[i];
    if ((typeof ext === 'undefined' ? 'undefined' : _typeof(ext)) !== 'object') {
      ret.valid = false;
      ret.error = baseMsg + 'must be an object, but ' + (typeof ext === 'undefined' ? 'undefined' : _typeof(ext)) + ' given';
      return ret;
    }

    if (!showdown.helper.isString(ext.type)) {
      ret.valid = false;
      ret.error = baseMsg + 'property "type" must be a string, but ' + _typeof(ext.type) + ' given';
      return ret;
    }

    var type = ext.type = ext.type.toLowerCase();

    // normalize extension type
    if (type === 'language') {
      type = ext.type = 'lang';
    }

    if (type === 'html') {
      type = ext.type = 'output';
    }

    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
      ret.valid = false;
      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
      return ret;
    }

    if (type === 'listener') {
      if (showdown.helper.isUndefined(ext.listeners)) {
        ret.valid = false;
        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
        return ret;
      }
    } else {
      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
        ret.valid = false;
        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
        return ret;
      }
    }

    if (ext.listeners) {
      if (_typeof(ext.listeners) !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + '"listeners" property must be an object but ' + _typeof(ext.listeners) + ' given';
        return ret;
      }
      for (var ln in ext.listeners) {
        if (ext.listeners.hasOwnProperty(ln)) {
          if (typeof ext.listeners[ln] !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + ' must be a function but ' + _typeof(ext.listeners[ln]) + ' given';
            return ret;
          }
        }
      }
    }

    if (ext.filter) {
      if (typeof ext.filter !== 'function') {
        ret.valid = false;
        ret.error = baseMsg + '"filter" must be a function, but ' + _typeof(ext.filter) + ' given';
        return ret;
      }
    } else if (ext.regex) {
      if (showdown.helper.isString(ext.regex)) {
        ext.regex = new RegExp(ext.regex, 'g');
      }
      if (!ext.regex instanceof RegExp) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + _typeof(ext.regex) + ' given';
        return ret;
      }
      if (showdown.helper.isUndefined(ext.replace)) {
        ret.valid = false;
        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
        return ret;
      }
    }
  }
  return ret;
}

/**
 * Validate extension
 * @param {object} ext
 * @returns {boolean}
 */
showdown.validateExtension = function (ext) {
  'use strict';

  var validateExtension = validate(ext, null);
  if (!validateExtension.valid) {
    console.warn(validateExtension.error);
    return false;
  }
  return true;
};

/**
 * showdownjs helper functions
 */

if (!showdown.hasOwnProperty('helper')) {
  showdown.helper = {};
}

/**
 * Check if var is string
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isString = function isString(a) {
  'use strict';

  return typeof a === 'string' || a instanceof String;
};

/**
 * Check if var is a function
 * @static
 * @param {string} a
 * @returns {boolean}
 */
showdown.helper.isFunction = function isFunction(a) {
  'use strict';

  var getType = {};
  return a && getType.toString.call(a) === '[object Function]';
};

/**
 * ForEach helper function
 * @static
 * @param {*} obj
 * @param {function} callback
 */
showdown.helper.forEach = function forEach(obj, callback) {
  'use strict';

  if (typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i], i, obj);
    }
  }
};

/**
 * isArray helper function
 * @static
 * @param {*} a
 * @returns {boolean}
 */
showdown.helper.isArray = function isArray(a) {
  'use strict';

  return a.constructor === Array;
};

/**
 * Check if value is undefined
 * @static
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
showdown.helper.isUndefined = function isUndefined(value) {
  'use strict';

  return typeof value === 'undefined';
};

/**
 * Standardidize extension name
 * @static
 * @param {string} s extension name
 * @returns {string}
 */
showdown.helper.stdExtName = function (s) {
  'use strict';

  return s.replace(/[_-]||\s/g, '').toLowerCase();
};

function escapeCharactersCallback(wholeMatch, m1) {
  'use strict';

  var charCodeToEscape = m1.charCodeAt(0);
  return '~E' + charCodeToEscape + 'E';
}

/**
 * Callback used to escape characters when passing through String.replace
 * @static
 * @param {string} wholeMatch
 * @param {string} m1
 * @returns {string}
 */
showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

/**
 * Escape characters in a string
 * @static
 * @param {string} text
 * @param {string} charsToEscape
 * @param {boolean} afterBackslash
 * @returns {XML|string|void|*}
 */
showdown.helper.escapeCharacters = function escapeCharacters(text, charsToEscape, afterBackslash) {
  'use strict';
  // First we have to escape the escape characters so that
  // we can build a character class out of them

  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

  if (afterBackslash) {
    regexString = '\\\\' + regexString;
  }

  var regex = new RegExp(regexString, 'g');
  text = text.replace(regex, escapeCharactersCallback);

  return text;
};

var rgxFindMatchPos = function rgxFindMatchPos(str, left, right, flags) {
  'use strict';

  var f = flags || '',
      g = f.indexOf('g') > -1,
      x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
      l = new RegExp(left, f.replace(/g/g, '')),
      pos = [],
      t,
      s,
      m,
      start,
      end;

  do {
    t = 0;
    while (m = x.exec(str)) {
      if (l.test(m[0])) {
        if (!t++) {
          s = x.lastIndex;
          start = s - m[0].length;
        }
      } else if (t) {
        if (! --t) {
          end = m.index + m[0].length;
          var obj = {
            left: { start: start, end: s },
            match: { start: s, end: m.index },
            right: { start: m.index, end: end },
            wholeMatch: { start: start, end: end }
          };
          pos.push(obj);
          if (!g) {
            return pos;
          }
        }
      }
    }
  } while (t && (x.lastIndex = s));

  return pos;
};

/**
 * matchRecursiveRegExp
 *
 * (c) 2007 Steven Levithan <stevenlevithan.com>
 * MIT License
 *
 * Accepts a string to search, a left and right format delimiter
 * as regex patterns, and optional regex flags. Returns an array
 * of matches, allowing nested instances of left/right delimiters.
 * Use the "g" flag to return all matches, otherwise only the
 * first is returned. Be careful to ensure that the left and
 * right format delimiters produce mutually exclusive matches.
 * Backreferences are not supported within the right delimiter
 * due to how it is internally combined with the left delimiter.
 * When matching strings whose format delimiters are unbalanced
 * to the left or right, the output is intentionally as a
 * conventional regex library with recursion support would
 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
 * "<" and ">" as the delimiters (both strings contain a single,
 * balanced instance of "<x>").
 *
 * examples:
 * matchRecursiveRegExp("test", "\\(", "\\)")
 * returns: []
 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
 * returns: ["t<<e>><s>", ""]
 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
 * returns: ["test"]
 */
showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
  'use strict';

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      results = [];

  for (var i = 0; i < matchPos.length; ++i) {
    results.push([str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)]);
  }
  return results;
};

/**
 *
 * @param {string} str
 * @param {string|function} replacement
 * @param {string} left
 * @param {string} right
 * @param {string} flags
 * @returns {string}
 */
showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
  'use strict';

  if (!showdown.helper.isFunction(replacement)) {
    var repStr = replacement;
    replacement = function replacement() {
      return repStr;
    };
  }

  var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

  if (lng > 0) {
    var bits = [];
    if (matchPos[0].wholeMatch.start !== 0) {
      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
    }
    for (var i = 0; i < lng; ++i) {
      bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));
      if (i < lng - 1) {
        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
      }
    }
    if (matchPos[lng - 1].wholeMatch.end < str.length) {
      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
    }
    finalStr = bits.join('');
  }
  return finalStr;
};

/**
 * POLYFILLS
 */
if (showdown.helper.isUndefined(console)) {
  console = {
    warn: function warn(msg) {
      'use strict';

      alert(msg);
    },
    log: function log(msg) {
      'use strict';

      alert(msg);
    },
    error: function error(msg) {
      'use strict';

      throw msg;
    }
  };
}

/**
 * Created by Estevao on 31-05-2015.
 */

/**
 * Showdown Converter class
 * @class
 * @param {object} [converterOptions]
 * @returns {Converter}
 */
showdown.Converter = function (converterOptions) {
  'use strict';

  var
  /**
   * Options used by this converter
   * @private
   * @type {{}}
   */
  options = {},


  /**
   * Language extensions used by this converter
   * @private
   * @type {Array}
   */
  langExtensions = [],


  /**
   * Output modifiers extensions used by this converter
   * @private
   * @type {Array}
   */
  outputModifiers = [],


  /**
   * Event listeners
   * @private
   * @type {{}}
   */
  listeners = {};

  _constructor();

  /**
   * Converter constructor
   * @private
   */
  function _constructor() {
    converterOptions = converterOptions || {};

    for (var gOpt in globalOptions) {
      if (globalOptions.hasOwnProperty(gOpt)) {
        options[gOpt] = globalOptions[gOpt];
      }
    }

    // Merge options
    if ((typeof converterOptions === 'undefined' ? 'undefined' : _typeof(converterOptions)) === 'object') {
      for (var opt in converterOptions) {
        if (converterOptions.hasOwnProperty(opt)) {
          options[opt] = converterOptions[opt];
        }
      }
    } else {
      throw Error('Converter expects the passed parameter to be an object, but ' + (typeof converterOptions === 'undefined' ? 'undefined' : _typeof(converterOptions)) + ' was passed instead.');
    }

    if (options.extensions) {
      showdown.helper.forEach(options.extensions, _parseExtension);
    }
  }

  /**
   * Parse extension
   * @param {*} ext
   * @param {string} [name='']
   * @private
   */
  function _parseExtension(ext, name) {

    name = name || null;
    // If it's a string, the extension was previously loaded
    if (showdown.helper.isString(ext)) {
      ext = showdown.helper.stdExtName(ext);
      name = ext;

      // LEGACY_SUPPORT CODE
      if (showdown.extensions[ext]) {
        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' + 'Please inform the developer that the extension should be updated!');
        legacyExtensionLoading(showdown.extensions[ext], ext);
        return;
        // END LEGACY SUPPORT CODE
      } else if (!showdown.helper.isUndefined(extensions[ext])) {
        ext = extensions[ext];
      } else {
        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
      }
    }

    if (typeof ext === 'function') {
      ext = ext();
    }

    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }

    var validExt = validate(ext, name);
    if (!validExt.valid) {
      throw Error(validExt.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {

        case 'lang':
          langExtensions.push(ext[i]);
          break;

        case 'output':
          outputModifiers.push(ext[i]);
          break;
      }
      if (ext[i].hasOwnProperty(listeners)) {
        for (var ln in ext[i].listeners) {
          if (ext[i].listeners.hasOwnProperty(ln)) {
            listen(ln, ext[i].listeners[ln]);
          }
        }
      }
    }
  }

  /**
   * LEGACY_SUPPORT
   * @param {*} ext
   * @param {string} name
   */
  function legacyExtensionLoading(ext, name) {
    if (typeof ext === 'function') {
      ext = ext(new showdown.Converter());
    }
    if (!showdown.helper.isArray(ext)) {
      ext = [ext];
    }
    var valid = validate(ext, name);

    if (!valid.valid) {
      throw Error(valid.error);
    }

    for (var i = 0; i < ext.length; ++i) {
      switch (ext[i].type) {
        case 'lang':
          langExtensions.push(ext[i]);
          break;
        case 'output':
          outputModifiers.push(ext[i]);
          break;
        default:
          // should never reach here
          throw Error('Extension loader error: Type unrecognized!!!');
      }
    }
  }

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   */
  function listen(name, callback) {
    if (!showdown.helper.isString(name)) {
      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)) + ' given');
    }

    if (typeof callback !== 'function') {
      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) + ' given');
    }

    if (!listeners.hasOwnProperty(name)) {
      listeners[name] = [];
    }
    listeners[name].push(callback);
  }

  function rTrimInputText(text) {
    var rsp = text.match(/^\s*/)[0].length,
        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
    return text.replace(rgx, '');
  }

  /**
   * Dispatch an event
   * @private
   * @param {string} evtName Event name
   * @param {string} text Text
   * @param {{}} options Converter Options
   * @param {{}} globals
   * @returns {string}
   */
  this._dispatch = function dispatch(evtName, text, options, globals) {
    if (listeners.hasOwnProperty(evtName)) {
      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
        if (nText && typeof nText !== 'undefined') {
          text = nText;
        }
      }
    }
    return text;
  };

  /**
   * Listen to an event
   * @param {string} name
   * @param {function} callback
   * @returns {showdown.Converter}
   */
  this.listen = function (name, callback) {
    listen(name, callback);
    return this;
  };

  /**
   * Converts a markdown string into HTML
   * @param {string} text
   * @returns {*}
   */
  this.makeHtml = function (text) {
    //check if ttt is not falsy
    if (!text) {
      return text;
    }

    var globals = {
      gHtmlBlocks: [],
      gHtmlMdBlocks: [],
      gHtmlSpans: [],
      gUrls: {},
      gTitles: {},
      gDimensions: {},
      gListLevel: 0,
      hashLinkCounts: {},
      langExtensions: langExtensions,
      outputModifiers: outputModifiers,
      converter: this,
      ghCodeBlocks: []
    };

    // attacklab: Replace ~ with ~T
    // This lets us use tilde as an escape char to avoid md5 hashes
    // The choice of character is arbitrary; anything that isn't
    // magic in Markdown will work.
    text = text.replace(/~/g, '~T');

    // attacklab: Replace $ with ~D
    // RegExp interprets $ as a special character
    // when it's in a replacement string
    text = text.replace(/\$/g, '~D');

    // Standardize line endings
    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
    text = text.replace(/\r/g, '\n'); // Mac to Unix

    if (options.smartIndentationFix) {
      text = rTrimInputText(text);
    }

    // Make sure ttt begins and ends with a couple of newlines:
    //ttt = '\n\n' + ttt + '\n\n';
    text = text;
    // detab
    text = showdown.subParser('detab')(text, options, globals);

    // stripBlankLines
    text = showdown.subParser('stripBlankLines')(text, options, globals);

    //run languageExtensions
    showdown.helper.forEach(langExtensions, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });

    // run the sub parsers
    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('hashHTMLSpans')(text, options, globals);
    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
    text = showdown.subParser('blockGamut')(text, options, globals);
    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

    // attacklab: Restore dollar signs
    text = text.replace(/~D/g, '$$');

    // attacklab: Restore tildes
    text = text.replace(/~T/g, '~');

    // Run output modifiers
    showdown.helper.forEach(outputModifiers, function (ext) {
      text = showdown.subParser('runExtension')(ext, text, options, globals);
    });
    return text;
  };

  /**
   * Set an option of this Converter instance
   * @param {string} key
   * @param {*} value
   */
  this.setOption = function (key, value) {
    options[key] = value;
  };

  /**
   * Get the option of this Converter instance
   * @param {string} key
   * @returns {*}
   */
  this.getOption = function (key) {
    return options[key];
  };

  /**
   * Get the options of this Converter instance
   * @returns {{}}
   */
  this.getOptions = function () {
    return options;
  };

  /**
   * Add extension to THIS converter
   * @param {{}} extension
   * @param {string} [name=null]
   */
  this.addExtension = function (extension, name) {
    name = name || null;
    _parseExtension(extension, name);
  };

  /**
   * Use a global registered extension with THIS converter
   * @param {string} extensionName Name of the previously registered extension
   */
  this.useExtension = function (extensionName) {
    _parseExtension(extensionName);
  };

  /**
   * Set the flavor THIS converter should use
   * @param {string} name
   */
  this.setFlavor = function (name) {
    if (flavor.hasOwnProperty(name)) {
      var preset = flavor[name];
      for (var option in preset) {
        if (preset.hasOwnProperty(option)) {
          options[option] = preset[option];
        }
      }
    }
  };

  /**
   * Remove an extension from THIS converter.
   * Note: This is a costly operation. It's better to initialize a new converter
   * and specify the extensions you wish to use
   * @param {Array} extension
   */
  this.removeExtension = function (extension) {
    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }
    for (var a = 0; a < extension.length; ++a) {
      var ext = extension[a];
      for (var i = 0; i < langExtensions.length; ++i) {
        if (langExtensions[i] === ext) {
          langExtensions[i].splice(i, 1);
        }
      }
      for (var ii = 0; ii < outputModifiers.length; ++i) {
        if (outputModifiers[ii] === ext) {
          outputModifiers[ii].splice(i, 1);
        }
      }
    }
  };

  /**
   * Get all extension of THIS converter
   * @returns {{language: Array, output: Array}}
   */
  this.getAllExtensions = function () {
    return {
      language: langExtensions,
      output: outputModifiers
    };
  };
};

/**
 * Turn Markdown link shortcuts into XHTML <a> tags.
 */
showdown.subParser('anchors', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('anchors.before', text, options, globals);

  var writeAnchorTag = function writeAnchorTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
    if (showdown.helper.isUndefined(m7)) {
      m7 = '';
    }
    wholeMatch = m1;
    var linkText = m2,
        linkId = m3.toLowerCase(),
        url = m4,
        title = m7;

    if (!url) {
      if (!linkId) {
        // lower-case and turn embedded newlines into spaces
        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
        url = globals.gUrls[linkId];
        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
          title = globals.gTitles[linkId];
        }
      } else {
        if (wholeMatch.search(/\(\s*\)$/m) > -1) {
          // Special case for explicit empty url
          url = '';
        } else {
          return wholeMatch;
        }
      }
    }

    url = showdown.helper.escapeCharacters(url, '*_', false);
    var result = '<a href="' + url + '"';

    if (title !== '' && title !== null) {
      title = title.replace(/"/g, '&quot;');
      title = showdown.helper.escapeCharacters(title, '*_', false);
      result += ' title="' + title + '"';
    }

    result += '>' + linkText + '</a>';

    return result;
  };

  // First, handle reference-style links: [link ttt] [id]
  /*
   ttt = ttt.replace(/
   (							// wrap whole match in $1
   \[
   (
   (?:
   \[[^\]]*\]		// allow brackets nested one level
   |
   [^\[]			// or anything else
   )*
   )
   \]
    [ ]?					// one optional space
   (?:\n[ ]*)?				// one optional newline followed by spaces
    \[
   (.*?)					// id = $3
   \]
   )()()()()					// pad remaining backreferences
   /g,_DoAnchors_callback);
   */
  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, writeAnchorTag);

  //
  // Next, inline-style links: [link ttt](url "optional title")
  //

  /*
   ttt = ttt.replace(/
   (						// wrap whole match in $1
   \[
   (
   (?:
   \[[^\]]*\]	// allow brackets nested one level
   |
   [^\[\]]			// or anything else
   )
   )
   \]
   \(						// literal paren
   [ \t]*
   ()						// no id, so leave $3 empty
   <?(.*?)>?				// href = $4
   [ \t]*
   (						// $5
   (['"])				// quote char = $6
   (.*?)				// Title = $7
   \6					// matching quote
   [ \t]*				// ignore any spaces/tabs between closing quote and )
   )?						// title is optional
   \)
   )
   /g,writeAnchorTag);
   */
  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeAnchorTag);

  //
  // Last, handle reference-style shortcuts: [link ttt]
  // These must come last in case you've also got [link test][1]
  // or [link test](/foo)
  //

  /*
   ttt = ttt.replace(/
   (                // wrap whole match in $1
   \[
   ([^\[\]]+)       // link ttt = $2; can't contain '[' or ']'
   \]
   )()()()()()      // pad rest of backreferences
   /g, writeAnchorTag);
   */
  text = text.replace(/(\[([^\[\]]+)])()()()()()/g, writeAnchorTag);

  text = globals.converter._dispatch('anchors.after', text, options, globals);
  return text;
});

showdown.subParser('autoLinks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

  var simpleURLRegex = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,
      delimUrlRegex = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
      simpleMailRegex = /(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi,
      delimMailRegex = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;

  text = text.replace(delimUrlRegex, replaceLink);
  text = text.replace(delimMailRegex, replaceMail);
  // simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[-.+~:?#@!$&'()*,;=[\]\w]+)\b/gi,
  // Email addresses: <address@domain.foo>

  if (options.simplifiedAutoLink) {
    text = text.replace(simpleURLRegex, replaceLink);
    text = text.replace(simpleMailRegex, replaceMail);
  }

  function replaceLink(wm, link) {
    var lnkTxt = link;
    if (/^www\./i.test(link)) {
      link = link.replace(/^www\./i, 'http://www.');
    }
    return '<a href="' + link + '">' + lnkTxt + '</a>';
  }

  function replaceMail(wholeMatch, m1) {
    var unescapedStr = showdown.subParser('unescapeSpecialChars')(m1);
    return showdown.subParser('encodeEmailAddress')(unescapedStr);
  }

  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

  return text;
});

/**
 * These are all the transformations that form block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('blockGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

  // we parse blockquotes first so that we can have headings and hrs
  // inside blockquotes
  text = showdown.subParser('blockQuotes')(text, options, globals);
  text = showdown.subParser('headers')(text, options, globals);

  // Do Horizontal Rules:
  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
  text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
  text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
  text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, key);

  text = showdown.subParser('lists')(text, options, globals);
  text = showdown.subParser('codeBlocks')(text, options, globals);
  text = showdown.subParser('tables')(text, options, globals);

  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
  // was to escape raw HTML in the original Markdown source. This time,
  // we're escaping the markup we've just created, so that we don't wrap
  // <p> tags around block-level tags.
  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
  text = showdown.subParser('paragraphs')(text, options, globals);

  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

  return text;
});

showdown.subParser('blockQuotes', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);
  /*
   ttt = ttt.replace(/
   (								// Wrap whole match in $1
   (
   ^[ \t]*>[ \t]?			// '>' at the start of a line
   .+\n					// rest of the first line
   (.+\n)*					// subsequent consecutive lines
   \n*						// blanks
   )+
   )
   /gm, function(){...});
   */

  text = text.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (wholeMatch, m1) {
    var bq = m1;

    // attacklab: hack around Konqueror 3.5.4 bug:
    // "----------bug".replace(/^-/g,"") == "bug"
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, '~0'); // trim one level of quoting

    // attacklab: clean up hack
    bq = bq.replace(/~0/g, '');

    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

    bq = bq.replace(/(^|\n)/g, '$1  ');
    // These leading spaces screw with <pre> content, so we need to fix that:
    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      var pre = m1;
      // attacklab: hack around Konqueror 3.5.4 bug:
      pre = pre.replace(/^  /mg, '~0');
      pre = pre.replace(/~0/g, '');
      return pre;
    });

    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
  });

  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
  return text;
});

/**
 * Process Markdown `<pre><code>` blocks.
 */
showdown.subParser('codeBlocks', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);
  /*
   ttt = ttt.replace(ttt,
   /(?:\n\n|^)
   (								// $1 = the code block -- one or more lines, starting with a space/tab
   (?:
   (?:[ ]{4}|\t)			// Lines must start with a tab or a tab-width of spaces - attacklab: g_tab_width
   .*\n+
   )+
   )
   (\n*[ ]{0,3}[^ \t\n]|(?=~0))	// attacklab: g_tab_width
   /g,function(){...});
   */

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '~0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = showdown.subParser('outdent')(codeblock);
    codeblock = showdown.subParser('encodeCode')(codeblock);
    codeblock = showdown.subParser('detab')(codeblock);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
  });

  // attacklab: strip sentinel
  text = text.replace(/~0/, '');

  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
  return text;
});

/**
 *
 *   *  Backtick quotes are used for <code></code> spans.
 *
 *   *  You can use multiple backticks as the delimiters if you want to
 *     include literal backticks in the code span. So, this input:
 *
 *         Just type ``foo `bar` baz`` at the prompt.
 *
 *       Will translate to:
 *
 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
 *
 *    There's no arbitrary limit to the number of backticks you
 *    can use as delimters. If you need three consecutive backticks
 *    in your code, use four for delimiters, etc.
 *
 *  *  You can use spaces to get literal backticks at the edges:
 *
 *         ... type `` `bar` `` ...
 *
 *       Turns to:
 *
 *         ... type <code>`bar`</code> ...
 */
showdown.subParser('codeSpans', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

  /*
   ttt = ttt.replace(/
   (^|[^\\])					// Character before opening ` can't be a backslash
   (`+)						// $2 = Opening run of `
   (							// $3 = The code block
   [^\r]*?
   [^`]					// attacklab: work around lack of lookbehind
   )
   \2							// Matching closer
   (?!`)
   /gm, function(){...});
   */

  if (typeof text === 'undefined') {
    text = '';
  }
  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (wholeMatch, m1, m2, m3) {
    var c = m3;
    c = c.replace(/^([ \t]*)/g, ''); // leading whitespace
    c = c.replace(/[ \t]*$/g, ''); // trailing whitespace
    c = showdown.subParser('encodeCode')(c);
    return m1 + '<code>' + c + '</code>';
  });

  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
  return text;
});

/**
 * Convert all tabs to spaces
 */
showdown.subParser('detab', function (text) {
  'use strict';

  // expand first n-1 tabs

  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

  // replace the nth with two sentinels
  text = text.replace(/\t/g, '~A~B');

  // use the sentinel to anchor our regex so it doesn't explode
  text = text.replace(/~B(.+?)~A/g, function (wholeMatch, m1) {
    var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4; // g_tab_width

    // there *must* be a better way to do this:
    for (var i = 0; i < numSpaces; i++) {
      leadingText += ' ';
    }

    return leadingText;
  });

  // clean up sentinels
  text = text.replace(/~A/g, '    '); // g_tab_width
  text = text.replace(/~B/g, '');

  return text;
});

/**
 * Smart processing for ampersands and angle brackets that need to be encoded.
 */
showdown.subParser('encodeAmpsAndAngles', function (text) {
  'use strict';
  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
  // http://bumppo.net/projects/amputator/

  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

  // Encode naked <'s
  text = text.replace(/<(?![a-z\/?\$!])/gi, '&lt;');

  return text;
});

/**
 * Returns the string, with after processing the following backslash escape sequences.
 *
 * attacklab: The polite way to do this is with the new escapeCharacters() function:
 *
 *    ttt = escapeCharacters(ttt,"\\",true);
 *    ttt = escapeCharacters(ttt,"`*_{}[]()>#+-.!",true);
 *
 * ...but we're sidestepping its use of the (slow) RegExp constructor
 * as an optimization for Firefox.  This function gets called a LOT.
 */
showdown.subParser('encodeBackslashEscapes', function (text) {
  'use strict';

  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
  text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, showdown.helper.escapeCharactersCallback);
  return text;
});

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
showdown.subParser('encodeCode', function (text) {
  'use strict';

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.

  text = text.replace(/&/g, '&amp;');

  // Do the angle bracket song and dance:
  text = text.replace(/</g, '&lt;');
  text = text.replace(/>/g, '&gt;');

  // Now, escape characters that are magic in Markdown:
  text = showdown.helper.escapeCharacters(text, '*_{}[]\\', false);

  // jj the line above breaks this:
  //---
  //* Item
  //   1. Subitem
  //            special char: *
  // ---

  return text;
});

/**
 *  Input: an email address, e.g. "foo@example.com"
 *
 *  Output: the email address as a mailto link, with each character
 *    of the address encoded as either a decimal or hex entity, in
 *    the hopes of foiling most address harvesting spam bots. E.g.:
 *
 *    <a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
 *       x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
 *       &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
 *
 *  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
 *  mailing list: <http://tinyurl.com/yu7ue>
 *
 */
showdown.subParser('encodeEmailAddress', function (addr) {
  'use strict';

  var encode = [function (ch) {
    return '&#' + ch.charCodeAt(0) + ';';
  }, function (ch) {
    return '&#x' + ch.charCodeAt(0).toString(16) + ';';
  }, function (ch) {
    return ch;
  }];

  addr = 'mailto:' + addr;

  addr = addr.replace(/./g, function (ch) {
    if (ch === '@') {
      // this *must* be encoded. I insist.
      ch = encode[Math.floor(Math.random() * 2)](ch);
    } else if (ch !== ':') {
      // leave ':' alone (to spot mailto: later)
      var r = Math.random();
      // roughly 10% raw, 45% hex, 45% dec
      ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
    }
    return ch;
  });

  addr = '<a href="' + addr + '">' + addr + '</a>';
  addr = addr.replace(/">.+:/g, '">'); // strip the mailto: from the visible part

  return addr;
});

/**
 * Within tags -- meaning between < and > -- encode [\ ` * _] so they
 * don't conflict with their use in Markdown for code, italics and strong.
 */
showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text) {
  'use strict';

  // Build a regex to find HTML tags and comments.  See Friedl's
  // "Mastering Regular Expressions", 2nd Ed., pp. 200-201.

  var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;

  text = text.replace(regex, function (wholeMatch) {
    var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`');
    tag = showdown.helper.escapeCharacters(tag, '\\`*_', false);
    return tag;
  });

  return text;
});

/**
 * Handle github codeblocks prior to running HashHTML so that
 * HTML contained within the codeblock gets escaped properly
 * Example:
 * ```ruby
 *     def hello_world(x)
 *       puts "Hello, #{x}"
 *     end
 * ```
 */
showdown.subParser('githubCodeBlocks', function (text, options, globals) {
  'use strict';

  // early exit if option is not enabled

  if (!options.ghCodeBlocks) {
    return text;
  }

  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

  text += '~0';

  text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (wholeMatch, language, codeblock) {
    var end = options.omitExtraWLInCodeBlocks ? '' : '\n';

    // First parse the github code block
    codeblock = showdown.subParser('encodeCode')(codeblock);
    codeblock = showdown.subParser('detab')(codeblock);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

    // Since GHCodeblocks can be false positives, we need to
    // store the primitive ttt and the parsed ttt in a global var,
    // and then return a token
    return '\n\n~G' + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock: codeblock }) - 1) + 'G\n\n';
  });

  // attacklab: strip sentinel
  text = text.replace(/~0/, '');

  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
});

showdown.subParser('hashBlock', function (text, options, globals) {
  'use strict';

  text = text.replace(/(^\n+|\n+$)/g, '');
  return '\n\n~K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
});

showdown.subParser('hashElement', function (text, options, globals) {
  'use strict';

  return function (wholeMatch, m1) {
    var blockText = m1;

    // Undo double lines
    blockText = blockText.replace(/\n\n/g, '\n');
    blockText = blockText.replace(/^\n/, '');

    // strip trailing blank lines
    blockText = blockText.replace(/\n+$/g, '');

    // Replace the element ttt with a marker ("~KxK" where x is its key)
    blockText = '\n\n~K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

    return blockText;
  };
});

showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
  'use strict';

  var blockTags = ['pre', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'dl', 'ol', 'ul', 'script', 'noscript', 'form', 'fieldset', 'iframe', 'math', 'style', 'section', 'header', 'footer', 'nav', 'article', 'aside', 'address', 'audio', 'canvas', 'figure', 'hgroup', 'output', 'video', 'p'],
      repFunc = function repFunc(wholeMatch, match, left, right) {
    var txt = wholeMatch;
    // check if this html element is marked as markdown
    // if so, it's contents should be parsed as markdown
    if (left.search(/\bmarkdown\b/) !== -1) {
      txt = left + globals.converter.makeHtml(match) + right;
    }
    return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
  };

  for (var i = 0; i < blockTags.length; ++i) {
    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^(?: |\\t){0,3}<' + blockTags[i] + '\\b[^>]*>', '</' + blockTags[i] + '>', 'gim');
  }

  // HR SPECIAL CASE
  text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));

  // Special case for standalone HTML comments:
  text = text.replace(/(<!--[\s\S]*?-->)/g, showdown.subParser('hashElement')(text, options, globals));

  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
  text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashHTMLSpans', function (text, config, globals) {
  'use strict';

  var matches = showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');

  for (var i = 0; i < matches.length; ++i) {
    text = text.replace(matches[i][0], '~L' + (globals.gHtmlSpans.push(matches[i][0]) - 1) + 'L');
  }
  return text;
});

/**
 * Unhash HTML spans
 */
showdown.subParser('unhashHTMLSpans', function (text, config, globals) {
  'use strict';

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    text = text.replace('~L' + i + 'L', globals.gHtmlSpans[i]);
  }

  return text;
});

/**
 * Hash span elements that should not be parsed as markdown
 */
showdown.subParser('hashPreCodeTags', function (text, config, globals) {
  'use strict';

  var repFunc = function repFunc(wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + showdown.subParser('encodeCode')(match) + right;
    return '\n\n~G' + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock: codeblock }) - 1) + 'G\n\n';
  };

  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^(?: |\\t){0,3}</code>\\s*</pre>', 'gim');
  return text;
});

showdown.subParser('headers', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('headers.before', text, options, globals);

  var prefixHeader = options.prefixHeaderId,
      headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart),


  // Set ttt-style headers:
  //	Header 1
  //	========
  //
  //	Header 2
  //	--------
  //
  setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
      setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = options.noHeaderId ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  text = text.replace(setextRegexH2, function (matchFound, m1) {
    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
        hID = options.noHeaderId ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart + 1,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
    return showdown.subParser('hashBlock')(hashBlock, options, globals);
  });

  // atx-style headers:
  //  # Header 1
  //  ## Header 2
  //  ## Header 2 with closing hashes ##
  //  ...
  //  ###### Header 6
  //
  text = text.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function (wholeMatch, m1, m2) {
    var span = showdown.subParser('spanGamut')(m2, options, globals),
        hID = options.noHeaderId ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

    return showdown.subParser('hashBlock')(header, options, globals);
  });

  function headerId(m) {
    var title,
        escapedId = m.replace(/[^\w]/g, '').toLowerCase();

    if (globals.hashLinkCounts[escapedId]) {
      title = escapedId + '-' + globals.hashLinkCounts[escapedId]++;
    } else {
      title = escapedId;
      globals.hashLinkCounts[escapedId] = 1;
    }

    // Prefix id to prevent causing inadvertent pre-existing style matches.
    if (prefixHeader === true) {
      prefixHeader = 'section';
    }

    if (showdown.helper.isString(prefixHeader)) {
      return prefixHeader + title;
    }
    return title;
  }

  text = globals.converter._dispatch('headers.after', text, options, globals);
  return text;
});

/**
 * Turn Markdown image shortcuts into <img> tags.
 */
showdown.subParser('images', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('images.before', text, options, globals);

  var inlineRegExp = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
      referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;

  function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {

    var gUrls = globals.gUrls,
        gTitles = globals.gTitles,
        gDims = globals.gDimensions;

    linkId = linkId.toLowerCase();

    if (!title) {
      title = '';
    }

    if (url === '' || url === null) {
      if (linkId === '' || linkId === null) {
        // lower-case and turn embedded newlines into spaces
        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
      }
      url = '#' + linkId;

      if (!showdown.helper.isUndefined(gUrls[linkId])) {
        url = gUrls[linkId];
        if (!showdown.helper.isUndefined(gTitles[linkId])) {
          title = gTitles[linkId];
        }
        if (!showdown.helper.isUndefined(gDims[linkId])) {
          width = gDims[linkId].width;
          height = gDims[linkId].height;
        }
      } else {
        return wholeMatch;
      }
    }

    altText = altText.replace(/"/g, '&quot;');
    altText = showdown.helper.escapeCharacters(altText, '*_', false);
    url = showdown.helper.escapeCharacters(url, '*_', false);
    var result = '<img src="' + url + '" alt="' + altText + '"';

    if (title) {
      title = title.replace(/"/g, '&quot;');
      title = showdown.helper.escapeCharacters(title, '*_', false);
      result += ' title="' + title + '"';
    }

    if (width && height) {
      width = width === '*' ? 'auto' : width;
      height = height === '*' ? 'auto' : height;

      result += ' width="' + width + '"';
      result += ' height="' + height + '"';
    }

    result += ' />';
    return result;
  }

  // First, handle reference-style labeled images: ![alt ttt][id]
  text = text.replace(referenceRegExp, writeImageTag);

  // Next, handle inline images:  ![alt ttt](url =<width>x<height> "optional title")
  text = text.replace(inlineRegExp, writeImageTag);

  text = globals.converter._dispatch('images.after', text, options, globals);
  return text;
});

showdown.subParser('italicsAndBold', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

  if (options.literalMidWordUnderscores) {
    //underscores
    // Since we are consuming a \s character, we need to add it
    text = text.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, '$1<strong>$2</strong>');
    text = text.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, '$1<em>$2</em>');
    //asterisks
    text = text.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, '<strong>$2</strong>');
    text = text.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
  } else {
    // <strong> must go first:
    text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, '<strong>$2</strong>');
    text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
  }

  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
  return text;
});

/**
 * Form HTML ordered (numbered) and unordered (bulleted) lists.
 */
showdown.subParser('lists', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('lists.before', text, options, globals);
  /**
   * Process the contents of a single ordered or unordered list, splitting it
   * into individual list items.
   * @param {string} listStr
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function processListItems(listStr, trimTrailing) {
    // The $g_list_level global keeps track of when we're inside a list.
    // Each time we enter a list, we increment it; when we leave a list,
    // we decrement. If it's zero, we're not in a list anymore.
    //
    // We do this because when we're not inside a list, we want to treat
    // something like this:
    //
    //    I recommend upgrading to version
    //    8. Oops, now this line is treated
    //    as a sub-list.
    //
    // As a single paragraph, despite the fact that the second line starts
    // with a digit-period-space sequence.
    //
    // Whereas when we're inside a list (or sub-list), that line will be
    // treated as the start of a sub-list. What a kludge, huh? This is
    // an aspect of Markdown's syntax that's hard to parse perfectly
    // without resorting to mind-reading. Perhaps the solution is to
    // change the syntax rules such that sub-lists must start with a
    // starting cardinal number; e.g. "1." or "a.".
    globals.gListLevel++;

    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}$/, '\n');

    // attacklab: add sentinel to emulate \z
    listStr += '~0';

    var rgx = /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = /\n[ \t]*\n(?!~0)/.test(listStr);

    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
      checked = checked && checked.trim() !== '';
      var item = showdown.subParser('outdent')(m4, options, globals),
          bulletStyle = '';

      // Support for github tasklists
      if (taskbtn && options.tasklists) {
        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
          if (checked) {
            otp += ' checked';
          }
          otp += '>';
          return otp;
        });
      }
      // m1 - Leading line or
      // Has a double return (multi paragraph) or
      // Has sublist
      if (m1 || item.search(/\n{2,}/) > -1) {
        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
        item = showdown.subParser('blockGamut')(item, options, globals);
      } else {
        // Recursion for sub-lists:
        item = showdown.subParser('lists')(item, options, globals);
        item = item.replace(/\n$/, ''); // chomp(item)
        if (isParagraphed) {
          item = showdown.subParser('paragraphs')(item, options, globals);
        } else {
          item = showdown.subParser('spanGamut')(item, options, globals);
        }
      }
      item = '\n<li' + bulletStyle + '>' + item + '</li>\n';
      return item;
    });

    // attacklab: strip sentinel
    listStr = listStr.replace(/~0/g, '');

    globals.gListLevel--;

    if (trimTrailing) {
      listStr = listStr.replace(/\s+$/, '');
    }

    return listStr;
  }

  /**
   * Check and parse consecutive lists (better fix for issue #142)
   * @param {string} list
   * @param {string} listType
   * @param {boolean} trimTrailing
   * @returns {string}
   */
  function parseConsecutiveLists(list, listType, trimTrailing) {
    // check if we caught 2 or more consecutive lists by mistake
    // we use the counterRgx, meaning if listType is UL we look for UL and vice versa
    var counterRxg = listType === 'ul' ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm,
        subLists = [],
        result = '';

    if (list.search(counterRxg) !== -1) {
      (function parseCL(txt) {
        var pos = txt.search(counterRxg);
        if (pos !== -1) {
          // slice
          result += '\n\n<' + listType + '>' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n\n';

          // invert counterType and listType
          listType = listType === 'ul' ? 'ol' : 'ul';
          counterRxg = listType === 'ul' ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm;

          //recurse
          parseCL(txt.slice(pos));
        } else {
          result += '\n\n<' + listType + '>' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n\n';
        }
      })(list);
      for (var i = 0; i < subLists.length; ++i) {}
    } else {
      result = '\n\n<' + listType + '>' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n\n';
    }

    return result;
  }

  // attacklab: add sentinel to hack around khtml/safari bug:
  // http://bugs.webkit.org/show_bug.cgi?id=11231
  text += '~0';

  // Re-usable pattern to match any entire ul or ol list:
  var wholeList = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

  if (globals.gListLevel) {
    text = text.replace(wholeList, function (wholeMatch, list, m2) {
      var listType = m2.search(/[*+-]/g) > -1 ? 'ul' : 'ol';
      return parseConsecutiveLists(list, listType, true);
    });
  } else {
    wholeList = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    //wholeList = /(\n\n|^\n?)( {0,3}([*+-]|\d+\.)[ \t]+[\s\S]+?)(?=(~0)|(\n\n(?!\t| {2,}| {0,3}([*+-]|\d+\.)[ \t])))/g;
    text = text.replace(wholeList, function (wholeMatch, m1, list, m3) {

      var listType = m3.search(/[*+-]/g) > -1 ? 'ul' : 'ol';
      return parseConsecutiveLists(list, listType);
    });
  }

  // attacklab: strip sentinel
  text = text.replace(/~0/, '');

  text = globals.converter._dispatch('lists.after', text, options, globals);
  return text;
});

/**
 * Remove one level of line-leading tabs or spaces
 */
showdown.subParser('outdent', function (text) {
  'use strict';

  // attacklab: hack around Konqueror 3.5.4 bug:
  // "----------bug".replace(/^-/g,"") == "bug"

  text = text.replace(/^(\t|[ ]{1,4})/gm, '~0'); // attacklab: g_tab_width

  // attacklab: clean up hack
  text = text.replace(/~0/g, '');

  return text;
});

/**
 *
 */
showdown.subParser('paragraphs', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');

  var grafs = text.split(/\n{2,}/g),
      grafsOut = [],
      end = grafs.length; // Wrap <p> tags

  for (var i = 0; i < end; i++) {
    var str = grafs[i];
    // if this is an HTML marker, copy it
    if (str.search(/~(K|G)(\d+)\1/g) >= 0) {
      grafsOut.push(str);
    } else {
      str = showdown.subParser('spanGamut')(str, options, globals);
      str = str.replace(/^([ \t]*)/g, '<p>');
      str += '</p>';
      grafsOut.push(str);
    }
  }

  /** Unhashify HTML blocks */
  end = grafsOut.length;
  for (i = 0; i < end; i++) {
    var blockText = '',
        grafsOutIt = grafsOut[i],
        codeFlag = false;
    // if this is a marker for an html block...
    while (grafsOutIt.search(/~(K|G)(\d+)\1/) >= 0) {
      var delim = RegExp.$1,
          num = RegExp.$2;

      if (delim === 'K') {
        blockText = globals.gHtmlBlocks[num];
      } else {
        // we need to check if ghBlock is a false positive
        if (codeFlag) {
          // use encoded version of all ttt
          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text);
        } else {
          blockText = globals.ghCodeBlocks[num].codeblock;
        }
      }
      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

      grafsOutIt = grafsOutIt.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, blockText);
      // Check if grafsOutIt is a pre->code
      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
        codeFlag = true;
      }
    }
    grafsOut[i] = grafsOutIt;
  }
  text = grafsOut.join('\n\n');
  // Strip leading and trailing lines:
  text = text.replace(/^\n+/g, '');
  text = text.replace(/\n+$/g, '');
  return globals.converter._dispatch('paragraphs.after', text, options, globals);
});

/**
 * Run extension
 */
showdown.subParser('runExtension', function (ext, text, options, globals) {
  'use strict';

  if (ext.filter) {
    text = ext.filter(text, globals.converter, options);
  } else if (ext.regex) {
    // TODO remove this when old extension loading mechanism is deprecated
    var re = ext.regex;
    if (!re instanceof RegExp) {
      re = new RegExp(re, 'g');
    }
    text = text.replace(re, ext.replace);
  }

  return text;
});

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
showdown.subParser('spanGamut', function (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
  text = showdown.subParser('codeSpans')(text, options, globals);
  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

  // Process anchor and image tags. Images must come first,
  // because ![foo][f] looks like an anchor.
  text = showdown.subParser('images')(text, options, globals);
  text = showdown.subParser('anchors')(text, options, globals);

  // Make links out of things like `<http://example.com/>`
  // Must come after _DoAnchors(), because you can use < and >
  // delimiters in inline links like [this](<url>).
  text = showdown.subParser('autoLinks')(text, options, globals);
  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
  text = showdown.subParser('italicsAndBold')(text, options, globals);
  text = showdown.subParser('strikethrough')(text, options, globals);

  // Do hard breaks:
  text = text.replace(/  +\n/g, ' <br />\n');

  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
  return text;
});

showdown.subParser('strikethrough', function (text, options, globals) {
  'use strict';

  if (options.strikethrough) {
    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
    text = text.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, '<del>$1</del>');
    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
  }

  return text;
});

/**
 * Strip any lines consisting only of spaces and tabs.
 * This makes subsequent regexs easier to write, because we can
 * match consecutive blank lines with /\n+/ instead of something
 * contorted like /[ \t]*\n+/
 */
showdown.subParser('stripBlankLines', function (text) {
  'use strict';

  return text.replace(/^[ \t]+$/mg, '');
});

/**
 * Strips link definitions from ttt, stores the URLs and titles in
 * hash references.
 * Link defs are in the form: ^[id]: url "optional title"
 *
 * ^[ ]{0,3}\[(.+)\]: // id = $1  attacklab: g_tab_width - 1
 * [ \t]*
 * \n?                  // maybe *one* newline
 * [ \t]*
 * <?(\S+?)>?          // url = $2
 * [ \t]*
 * \n?                // maybe one newline
 * [ \t]*
 * (?:
 * (\n*)              // any lines skipped = $3 attacklab: lookbehind removed
 * ["(]
 * (.+?)              // title = $4
 * [")]
 * [ \t]*
 * )?                 // title is optional
 * (?:\n+|$)
 * /gm,
 * function(){...});
 *
 */
showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
  'use strict';

  var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;

  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '~0';

  text = text.replace(regex, function (wholeMatch, linkId, url, width, height, blankLines, title) {
    linkId = linkId.toLowerCase();
    globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url); // Link IDs are case-insensitive

    if (blankLines) {
      // Oops, found blank lines, so it's not a title.
      // Put back the parenthetical statement we stole.
      return blankLines + title;
    } else {
      if (title) {
        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
      }
      if (options.parseImgDimensions && width && height) {
        globals.gDimensions[linkId] = {
          width: width,
          height: height
        };
      }
    }
    // Completely remove the definition from the ttt
    return '';
  });

  // attacklab: strip sentinel
  text = text.replace(/~0/, '');

  return text;
});

showdown.subParser('tables', function (text, options, globals) {
  'use strict';

  if (!options.tables) {
    return text;
  }

  var tableRgx = /^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;

  function parseStyles(sLine) {
    if (/^:[ \t]*--*$/.test(sLine)) {
      return ' style="ttt-align:left;"';
    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
      return ' style="ttt-align:right;"';
    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
      return ' style="ttt-align:center;"';
    } else {
      return '';
    }
  }

  function parseHeaders(header, style) {
    var id = '';
    header = header.trim();
    if (options.tableHeaderId) {
      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
    }
    header = showdown.subParser('spanGamut')(header, options, globals);

    return '<th' + id + style + '>' + header + '</th>\n';
  }

  function parseCells(cell, style) {
    var subText = showdown.subParser('spanGamut')(cell, options, globals);
    return '<td' + style + '>' + subText + '</td>\n';
  }

  function buildTable(headers, cells) {
    var tb = '<table>\n<thead>\n<tr>\n',
        tblLgn = headers.length;

    for (var i = 0; i < tblLgn; ++i) {
      tb += headers[i];
    }
    tb += '</tr>\n</thead>\n<tbody>\n';

    for (i = 0; i < cells.length; ++i) {
      tb += '<tr>\n';
      for (var ii = 0; ii < tblLgn; ++ii) {
        tb += cells[i][ii];
      }
      tb += '</tr>\n';
    }
    tb += '</tbody>\n</table>\n';
    return tb;
  }

  text = globals.converter._dispatch('tables.before', text, options, globals);

  text = text.replace(tableRgx, function (rawTable) {

    var i,
        tableLines = rawTable.split('\n');

    // strip wrong first and last column if wrapped tables are used
    for (i = 0; i < tableLines.length; ++i) {
      if (/^[ \t]{0,3}\|/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/^[ \t]{0,3}\|/, '');
      }
      if (/\|[ \t]*$/.test(tableLines[i])) {
        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
      }
    }

    var rawHeaders = tableLines[0].split('|').map(function (s) {
      return s.trim();
    }),
        rawStyles = tableLines[1].split('|').map(function (s) {
      return s.trim();
    }),
        rawCells = [],
        headers = [],
        styles = [],
        cells = [];

    tableLines.shift();
    tableLines.shift();

    for (i = 0; i < tableLines.length; ++i) {
      if (tableLines[i].trim() === '') {
        continue;
      }
      rawCells.push(tableLines[i].split('|').map(function (s) {
        return s.trim();
      }));
    }

    if (rawHeaders.length < rawStyles.length) {
      return rawTable;
    }

    for (i = 0; i < rawStyles.length; ++i) {
      styles.push(parseStyles(rawStyles[i]));
    }

    for (i = 0; i < rawHeaders.length; ++i) {
      if (showdown.helper.isUndefined(styles[i])) {
        styles[i] = '';
      }
      headers.push(parseHeaders(rawHeaders[i], styles[i]));
    }

    for (i = 0; i < rawCells.length; ++i) {
      var row = [];
      for (var ii = 0; ii < headers.length; ++ii) {
        if (showdown.helper.isUndefined(rawCells[i][ii])) {}
        row.push(parseCells(rawCells[i][ii], styles[ii]));
      }
      cells.push(row);
    }

    return buildTable(headers, cells);
  });

  text = globals.converter._dispatch('tables.after', text, options, globals);

  return text;
});

/**
 * Swap back in all the special characters we've hidden.
 */
showdown.subParser('unescapeSpecialChars', function (text) {
  'use strict';

  text = text.replace(/~E(\d+)E/g, function (wholeMatch, m1) {
    var charCodeToReplace = parseInt(m1);
    return String.fromCharCode(charCodeToReplace);
  });
  return text;
});
module.exports = showdown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3dkb3duLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRPcHRpb25zIiwib21pdEV4dHJhV0xJbkNvZGVCbG9ja3MiLCJkZWZhdWx0VmFsdWUiLCJkZXNjcmliZSIsInR5cGUiLCJub0hlYWRlcklkIiwicHJlZml4SGVhZGVySWQiLCJoZWFkZXJMZXZlbFN0YXJ0IiwicGFyc2VJbWdEaW1lbnNpb25zIiwic2ltcGxpZmllZEF1dG9MaW5rIiwibGl0ZXJhbE1pZFdvcmRVbmRlcnNjb3JlcyIsInN0cmlrZXRocm91Z2giLCJ0YWJsZXMiLCJ0YWJsZXNIZWFkZXJJZCIsImdoQ29kZUJsb2NrcyIsInRhc2tsaXN0cyIsInNtb290aExpdmVQcmV2aWV3Iiwic21hcnRJbmRlbnRhdGlvbkZpeCIsImRlc2NyaXB0aW9uIiwic2ltcGxlIiwiSlNPTiIsInJldCIsInNob3dkb3duIiwicGFyc2VycyIsImV4dGVuc2lvbnMiLCJnbG9iYWxPcHRpb25zIiwiZ2V0RGVmYXVsdE9wdHMiLCJmbGF2b3IiLCJnaXRodWIiLCJ2YW5pbGxhIiwicHJlc2V0IiwiRXJyb3IiLCJuYW1lIiwiZXh0IiwidmFsaWRFeHRlbnNpb24iLCJ2YWxpZGF0ZSIsImVyck1zZyIsInZhbGlkIiwiZXJyb3IiLCJleHRlbnNpb24iLCJpIiwiYmFzZU1zZyIsInZhbGlkYXRlRXh0ZW5zaW9uIiwiY29uc29sZSIsImEiLCJnZXRUeXBlIiwib2JqIiwiY2FsbGJhY2siLCJzIiwiY2hhckNvZGVUb0VzY2FwZSIsIm0xIiwicmVnZXhTdHJpbmciLCJjaGFyc1RvRXNjYXBlIiwicmVnZXgiLCJ0ZXh0Iiwicmd4RmluZE1hdGNoUG9zIiwiZiIsImZsYWdzIiwiZyIsIngiLCJsZWZ0IiwibCIsInBvcyIsInQiLCJtIiwic3RhcnQiLCJlbmQiLCJtYXRjaCIsInJpZ2h0Iiwid2hvbGVNYXRjaCIsIm1hdGNoUG9zIiwicmVzdWx0cyIsInN0ciIsInJlcFN0ciIsInJlcGxhY2VtZW50IiwiZmluYWxTdHIiLCJsbmciLCJiaXRzIiwid2FybiIsImFsZXJ0IiwibG9nIiwib3B0aW9ucyIsImxhbmdFeHRlbnNpb25zIiwib3V0cHV0TW9kaWZpZXJzIiwibGlzdGVuZXJzIiwiX2NvbnN0cnVjdG9yIiwiY29udmVydGVyT3B0aW9ucyIsImxlZ2FjeUV4dGVuc2lvbkxvYWRpbmciLCJ2YWxpZEV4dCIsImxpc3RlbiIsInJzcCIsInJneCIsImVpIiwiblRleHQiLCJnbG9iYWxzIiwiZ0h0bWxCbG9ja3MiLCJnSHRtbE1kQmxvY2tzIiwiZ0h0bWxTcGFucyIsImdVcmxzIiwiZ1RpdGxlcyIsImdEaW1lbnNpb25zIiwiZ0xpc3RMZXZlbCIsImhhc2hMaW5rQ291bnRzIiwiY29udmVydGVyIiwiclRyaW1JbnB1dFRleHQiLCJfcGFyc2VFeHRlbnNpb24iLCJpaSIsImxhbmd1YWdlIiwib3V0cHV0Iiwid3JpdGVBbmNob3JUYWciLCJtNyIsImxpbmtUZXh0IiwibGlua0lkIiwibTMiLCJ1cmwiLCJ0aXRsZSIsInJlc3VsdCIsInNpbXBsZVVSTFJlZ2V4IiwiZGVsaW1VcmxSZWdleCIsInNpbXBsZU1haWxSZWdleCIsImRlbGltTWFpbFJlZ2V4IiwibG5rVHh0IiwibGluayIsInVuZXNjYXBlZFN0ciIsImtleSIsImJxIiwicHJlIiwicGF0dGVybiIsImNvZGVibG9jayIsIm5leHRDaGFyIiwiYyIsImxlYWRpbmdUZXh0IiwibnVtU3BhY2VzIiwiZW5jb2RlIiwiY2giLCJhZGRyIiwiTWF0aCIsInIiLCJ0YWciLCJibG9ja1RleHQiLCJibG9ja1RhZ3MiLCJyZXBGdW5jIiwidHh0IiwibWF0Y2hlcyIsInByZWZpeEhlYWRlciIsImlzTmFOIiwicGFyc2VJbnQiLCJzZXRleHRSZWdleEgxIiwic2V0ZXh0UmVnZXhIMiIsInNwYW5HYW11dCIsImhJRCIsImhlYWRlcklkIiwiaExldmVsIiwiaGFzaEJsb2NrIiwic3BhbiIsImhlYWRlciIsImVzY2FwZWRJZCIsImlubGluZVJlZ0V4cCIsInJlZmVyZW5jZVJlZ0V4cCIsImdEaW1zIiwiYWx0VGV4dCIsIndpZHRoIiwiaGVpZ2h0IiwibGlzdFN0ciIsImlzUGFyYWdyYXBoZWQiLCJjaGVja2VkIiwiaXRlbSIsImJ1bGxldFN0eWxlIiwidGFza2J0biIsIm90cCIsImNvdW50ZXJSeGciLCJsaXN0VHlwZSIsInN1Ykxpc3RzIiwibGlzdCIsInByb2Nlc3NMaXN0SXRlbXMiLCJwYXJzZUNMIiwid2hvbGVMaXN0IiwibTIiLCJwYXJzZUNvbnNlY3V0aXZlTGlzdHMiLCJncmFmcyIsImdyYWZzT3V0IiwiZ3JhZnNPdXRJdCIsImNvZGVGbGFnIiwiZGVsaW0iLCJSZWdFeHAiLCJudW0iLCJyZSIsImJsYW5rTGluZXMiLCJ0YWJsZVJneCIsImlkIiwic3ViVGV4dCIsInRiIiwidGJsTGduIiwiaGVhZGVycyIsImNlbGxzIiwidGFibGVMaW5lcyIsInJhd1RhYmxlIiwicmF3SGVhZGVycyIsInJhd1N0eWxlcyIsInJhd0NlbGxzIiwic3R5bGVzIiwicGFyc2VTdHlsZXMiLCJwYXJzZUhlYWRlcnMiLCJyb3ciLCJwYXJzZUNlbGxzIiwiYnVpbGRUYWJsZSIsImNoYXJDb2RlVG9SZXBsYWNlIiwiU3RyaW5nIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBQSxjQUFBLENBQUEsTUFBQSxFQUFnQztBQUM5Qjs7QUFFQSxNQUFJQSxpQkFBaUI7QUFDbkJDLDZCQUF5QjtBQUN2QkMsb0JBRHVCLEtBQUE7QUFFdkJDLGdCQUZ1Qix1REFBQTtBQUd2QkMsWUFBTTtBQUhpQixLQUROO0FBTW5CQyxnQkFBWTtBQUNWSCxvQkFEVSxLQUFBO0FBRVZDLGdCQUZVLGlDQUFBO0FBR1ZDLFlBQU07QUFISSxLQU5PO0FBV25CRSxvQkFBZ0I7QUFDZEosb0JBRGMsS0FBQTtBQUVkQyxnQkFGYywwQ0FBQTtBQUdkQyxZQUFNO0FBSFEsS0FYRztBQWdCbkJHLHNCQUFrQjtBQUNoQkwsb0JBRGdCLEtBQUE7QUFFaEJDLGdCQUZnQiwrQkFBQTtBQUdoQkMsWUFBTTtB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TUFBQSxFQUFzQyxFQUF0QyxFQUFBLEVBQTRDO0FBQzFDLFlBQUkzSyxTQUFBQSxNQUFBQSxDQUFBQSxXQUFBQSxDQUE0QmlMLFNBQUFBLENBQUFBLEVBQWhDLEVBQWdDQSxDQUE1QmpMLENBQUosRUFBa0QsQ0FFakQ7QUFDRHFMLFlBQUFBLElBQUFBLENBQVNDLFdBQVdMLFNBQUFBLENBQUFBLEVBQVhLLEVBQVdMLENBQVhLLEVBQTRCSixPQUFyQ0csRUFBcUNILENBQTVCSSxDQUFURDtBQUNEO0FBQ0RULFlBQUFBLElBQUFBLENBQUFBLEdBQUFBO0FBQ0Q7O0FBRUQsV0FBT1csV0FBQUEsT0FBQUEsRUFBUCxLQUFPQSxDQUFQO0FBL0RGdkosR0FBTyxDQUFQQTs7QUFrRUFBLFNBQU93QyxRQUFBQSxTQUFBQSxDQUFBQSxTQUFBQSxDQUFBQSxjQUFBQSxFQUFBQSxJQUFBQSxFQUFBQSxPQUFBQSxFQUFQeEMsT0FBT3dDLENBQVB4Qzs7QUFFQSxTQUFBLElBQUE7QUEvSEZoQyxDQUFBQTs7QUFrSUE7OztBQUdBQSxTQUFBQSxTQUFBQSxDQUFBQSxzQkFBQUEsRUFBMkMsVUFBQSxJQUFBLEVBQWdCO0FBQ3pEOztBQUVBZ0MsU0FBTyxLQUFBLE9BQUEsQ0FBQSxXQUFBLEVBQTBCLFVBQUEsVUFBQSxFQUFBLEVBQUEsRUFBMEI7QUFDekQsUUFBSXdKLG9CQUFvQjVELFNBQXhCLEVBQXdCQSxDQUF4QjtBQUNBLFdBQU82RCxPQUFBQSxZQUFBQSxDQUFQLGlCQUFPQSxDQUFQO0FBRkZ6SixHQUFPLENBQVBBO0FBSUEsU0FBQSxJQUFBO0FBUEZoQyxDQUFBQTtBQVNBMEwsT0FBQUEsT0FBQUEsR0FBQUEsUUFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFxuICogc2hvd2Rvd246IGh0dHBzOi8vZ2l0aHViLmNvbS9zaG93ZG93bmpzL3Nob3dkb3duXG4gKiBcbiAqIGF1dGhvcjogRGkgKOW+ruS/oeWwj+eoi+W6j+W8gOWPkeW3peeoi+W4iClcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxuICogICAgICAgICAgICAgICDlnoLnm7Tlvq7kv6HlsI/nqIvluo/lvIDlj5HkuqTmtYHnpL7ljLpcbiAqIFxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcbiAqIFxuICogZm9yOiDlvq7kv6HlsI/nqIvluo/lr4zmlofmnKzop6PmnpBcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdHMoc2ltcGxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgb21pdEV4dHJhV0xJbkNvZGVCbG9ja3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ09taXQgdGhlIGRlZmF1bHQgZXh0cmEgd2hpdGVsaW5lIGFkZGVkIHRvIGNvZGUgYmxvY2tzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgbm9IZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgZ2VuZXJhdGVkIGhlYWRlciBpZCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHByZWZpeEhlYWRlcklkOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdTcGVjaWZ5IGEgcHJlZml4IHRvIGdlbmVyYXRlZCBoZWFkZXIgaWRzJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBoZWFkZXJMZXZlbFN0YXJ0OiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdUaGUgaGVhZGVyIGJsb2NrcyBsZXZlbCBzdGFydCcsXG4gICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICB9LFxuICAgIHBhcnNlSW1nRGltZW5zaW9uczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgaW1hZ2UgZGltZW5zaW9uIHBhcnNpbmcnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBzaW1wbGlmaWVkQXV0b0xpbms6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1R1cm4gb24vb2ZmIEdGTSBhdXRvbGluayBzdHlsZScsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIGxpdGVyYWxNaWRXb3JkVW5kZXJzY29yZXM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1BhcnNlIG1pZHdvcmQgdW5kZXJzY29yZXMgYXMgbGl0ZXJhbCB1bmRlcnNjb3JlcycsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHN0cmlrZXRocm91Z2g6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICBkZXNjcmliZTogJ1R1cm4gb24vb2ZmIHN0cmlrZXRocm91Z2ggc3VwcG9ydCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHRhYmxlczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgdGFibGVzIHN1cHBvcnQnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICB0YWJsZXNIZWFkZXJJZDoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIGRlc2NyaWJlOiAnQWRkIGFuIGlkIHRvIHRhYmxlIGhlYWRlcnMnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBnaENvZGVCbG9ja3M6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIGRlc2NyaWJlOiAnVHVybiBvbi9vZmYgR0ZNIGZlbmNlZCBjb2RlIGJsb2NrcyBzdXBwb3J0JyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG4gICAgdGFza2xpc3RzOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdUdXJuIG9uL29mZiBHRk0gdGFza2xpc3Qgc3VwcG9ydCcsXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICB9LFxuICAgIHNtb290aExpdmVQcmV2aWV3OiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpYmU6ICdQcmV2ZW50cyB3ZWlyZCBlZmZlY3RzIGluIGxpdmUgcHJldmlld3MgZHVlIHRvIGluY29tcGxldGUgaW5wdXQnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgfSxcbiAgICBzbWFydEluZGVudGF0aW9uRml4OiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdUcmllcyB0byBzbWFydGx5IGZpeCBpZGVudGF0aW9uIGluIGVzNiBzdHJpbmdzJyxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH1cbiAgfTtcbiAgaWYgKHNpbXBsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWZhdWx0T3B0aW9ucykpO1xuICB9XG4gIHZhciByZXQgPSB7fTtcbiAgZm9yICh2YXIgb3B0IGluIGRlZmF1bHRPcHRpb25zKSB7XG4gICAgaWYgKGRlZmF1bHRPcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcbiAgICAgIHJldFtvcHRdID0gZGVmYXVsdE9wdGlvbnNbb3B0XS5kZWZhdWx0VmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlZCBieSBUaXZpZSBvbiAwNi0wMS0yMDE1LlxuICovXG5cbi8vIFByaXZhdGUgcHJvcGVydGllc1xudmFyIHNob3dkb3duID0ge30sXG4gICAgcGFyc2VycyA9IHt9LFxuICAgIGV4dGVuc2lvbnMgPSB7fSxcbiAgICBnbG9iYWxPcHRpb25zID0gZ2V0RGVmYXVsdE9wdHModHJ1ZSksXG4gICAgZmxhdm9yID0ge1xuICAgICAgZ2l0aHViOiB7XG4gICAgICAgIG9taXRFeHRyYVdMSW5Db2RlQmxvY2tzOiAgIHRydWUsXG4gICAgICAgIHByZWZpeEhlYWRlcklkOiAgICAgICAgICAgICd1c2VyLWNvbnRlbnQtJyxcbiAgICAgICAgc2ltcGxpZmllZEF1dG9MaW5rOiAgICAgICAgdHJ1ZSxcbiAgICAgICAgbGl0ZXJhbE1pZFdvcmRVbmRlcnNjb3JlczogdHJ1ZSxcbiAgICAgICAgc3RyaWtldGhyb3VnaDogICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGFibGVzOiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGFibGVzSGVhZGVySWQ6ICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgZ2hDb2RlQmxvY2tzOiAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGFza2xpc3RzOiAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgfSxcbiAgICAgIHZhbmlsbGE6IGdldERlZmF1bHRPcHRzKHRydWUpXG4gICAgfTtcblxuLyoqXG4gKiBoZWxwZXIgbmFtZXNwYWNlXG4gKiBAdHlwZSB7e319XG4gKi9cbnNob3dkb3duLmhlbHBlciA9IHt9O1xuXG4vKipcbiAqIFRPRE8gTEVHQUNZIFNVUFBPUlQgQ09ERVxuICogQHR5cGUge3t9fVxuICovXG5zaG93ZG93bi5leHRlbnNpb25zID0ge307XG5cbi8qKlxuICogU2V0IGEgZ2xvYmFsIG9wdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybnMge3Nob3dkb3dufVxuICovXG5zaG93ZG93bi5zZXRPcHRpb24gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAndXNlIHN0cmljdCc7XG4gIGdsb2JhbE9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0IGEgZ2xvYmFsIG9wdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybnMgeyp9XG4gKi9cbnNob3dkb3duLmdldE9wdGlvbiA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZ2xvYmFsT3B0aW9uc1trZXldO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGdsb2JhbCBvcHRpb25zXG4gKiBAc3RhdGljXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbnNob3dkb3duLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIGdsb2JhbE9wdGlvbnM7XG59O1xuXG4vKipcbiAqIFJlc2V0IGdsb2JhbCBvcHRpb25zIHRvIHRoZSBkZWZhdWx0IHZhbHVlc1xuICogQHN0YXRpY1xuICovXG5zaG93ZG93bi5yZXNldE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZ2xvYmFsT3B0aW9ucyA9IGdldERlZmF1bHRPcHRzKHRydWUpO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGZsYXZvciBzaG93ZG93biBzaG91bGQgdXNlIGFzIGRlZmF1bHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKi9cbnNob3dkb3duLnNldEZsYXZvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKGZsYXZvci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgIHZhciBwcmVzZXQgPSBmbGF2b3JbbmFtZV07XG4gICAgZm9yICh2YXIgb3B0aW9uIGluIHByZXNldCkge1xuICAgICAgaWYgKHByZXNldC5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XG4gICAgICAgIGdsb2JhbE9wdGlvbnNbb3B0aW9uXSA9IHByZXNldFtvcHRpb25dO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtib29sZWFufSBbc2ltcGxlPXRydWVdXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbnNob3dkb3duLmdldERlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gKHNpbXBsZSkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBnZXREZWZhdWx0T3B0cyhzaW1wbGUpO1xufTtcblxuLyoqXG4gKiBHZXQgb3Igc2V0IGEgc3ViUGFyc2VyXG4gKlxuICogc3ViUGFyc2VyKG5hbWUpICAgICAgIC0gR2V0IGEgcmVnaXN0ZXJlZCBzdWJQYXJzZXJcbiAqIHN1YlBhcnNlcihuYW1lLCBmdW5jKSAtIFJlZ2lzdGVyIGEgc3ViUGFyc2VyXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2Z1bmNdXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgaWYgKHR5cGVvZiBmdW5jICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGFyc2Vyc1tuYW1lXSA9IGZ1bmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJzZXJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZXJzW25hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1YlBhcnNlciBuYW1lZCAnICsgbmFtZSArICcgbm90IHJlZ2lzdGVyZWQhJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEdldHMgb3IgcmVnaXN0ZXJzIGFuIGV4dGVuc2lvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9uPX0gZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuc2hvd2Rvd24uZXh0ZW5zaW9uID0gZnVuY3Rpb24gKG5hbWUsIGV4dCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcobmFtZSkpIHtcbiAgICB0aHJvdyBFcnJvcignRXh0ZW5zaW9uIFxcJ25hbWVcXCcgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgbmFtZSA9IHNob3dkb3duLmhlbHBlci5zdGRFeHROYW1lKG5hbWUpO1xuXG4gIC8vIEdldHRlclxuICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dCkpIHtcbiAgICBpZiAoIWV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdFeHRlbnNpb24gbmFtZWQgJyArIG5hbWUgKyAnIGlzIG5vdCByZWdpc3RlcmVkIScpO1xuICAgIH1cbiAgICByZXR1cm4gZXh0ZW5zaW9uc1tuYW1lXTtcblxuICAgIC8vIFNldHRlclxuICB9IGVsc2Uge1xuICAgIC8vIEV4cGFuZCBleHRlbnNpb24gaWYgaXQncyB3cmFwcGVkIGluIGEgZnVuY3Rpb25cbiAgICBpZiAodHlwZW9mIGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXh0ID0gZXh0KCk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGV4dGVuc2lvbiBpcyBhbiBhcnJheVxuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0KSkge1xuICAgICAgZXh0ID0gW2V4dF07XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkRXh0ZW5zaW9uID0gdmFsaWRhdGUoZXh0LCBuYW1lKTtcblxuICAgIGlmICh2YWxpZEV4dGVuc2lvbi52YWxpZCkge1xuICAgICAgZXh0ZW5zaW9uc1tuYW1lXSA9IGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IodmFsaWRFeHRlbnNpb24uZXJyb3IpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBHZXRzIGFsbCBleHRlbnNpb25zIHJlZ2lzdGVyZWRcbiAqIEByZXR1cm5zIHt7fX1cbiAqL1xuc2hvd2Rvd24uZ2V0QWxsRXh0ZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZXh0ZW5zaW9ucztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqL1xuc2hvd2Rvd24ucmVtb3ZlRXh0ZW5zaW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBkZWxldGUgZXh0ZW5zaW9uc1tuYW1lXTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgZXh0ZW5zaW9uc1xuICovXG5zaG93ZG93bi5yZXNldEV4dGVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZXh0ZW5zaW9ucyA9IHt9O1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSBleHRlbnNpb25cbiAqIEBwYXJhbSB7YXJyYXl9IGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHt7dmFsaWQ6IGJvb2xlYW4sIGVycm9yOiBzdHJpbmd9fVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZShleHRlbnNpb24sIG5hbWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBlcnJNc2cgPSAobmFtZSkgPyAnRXJyb3IgaW4gJyArIG5hbWUgKyAnIGV4dGVuc2lvbi0+JyA6ICdFcnJvciBpbiB1bm5hbWVkIGV4dGVuc2lvbicsXG4gICAgcmV0ID0ge1xuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBlcnJvcjogJydcbiAgICB9O1xuXG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0ZW5zaW9uKSkge1xuICAgIGV4dGVuc2lvbiA9IFtleHRlbnNpb25dO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlbnNpb24ubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYmFzZU1zZyA9IGVyck1zZyArICcgc3ViLWV4dGVuc2lvbiAnICsgaSArICc6ICcsXG4gICAgICAgIGV4dCA9IGV4dGVuc2lvbltpXTtcbiAgICBpZiAodHlwZW9mIGV4dCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdtdXN0IGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgZXh0ICsgJyBnaXZlbic7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzU3RyaW5nKGV4dC50eXBlKSkge1xuICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJ3Byb3BlcnR5IFwidHlwZVwiIG11c3QgYmUgYSBzdHJpbmcsIGJ1dCAnICsgdHlwZW9mIGV4dC50eXBlICsgJyBnaXZlbic7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gZXh0LnR5cGUgPSBleHQudHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gbm9ybWFsaXplIGV4dGVuc2lvbiB0eXBlXG4gICAgaWYgKHR5cGUgPT09ICdsYW5ndWFnZScpIHtcbiAgICAgIHR5cGUgPSBleHQudHlwZSA9ICdsYW5nJztcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2h0bWwnKSB7XG4gICAgICB0eXBlID0gZXh0LnR5cGUgPSAnb3V0cHV0JztcbiAgICB9XG5cbiAgICBpZiAodHlwZSAhPT0gJ2xhbmcnICYmIHR5cGUgIT09ICdvdXRwdXQnICYmIHR5cGUgIT09ICdsaXN0ZW5lcicpIHtcbiAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICd0eXBlICcgKyB0eXBlICsgJyBpcyBub3QgcmVjb2duaXplZC4gVmFsaWQgdmFsdWVzOiBcImxhbmcvbGFuZ3VhZ2VcIiwgXCJvdXRwdXQvaHRtbFwiIG9yIFwibGlzdGVuZXJcIic7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnbGlzdGVuZXInKSB7XG4gICAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5saXN0ZW5lcnMpKSB7XG4gICAgICAgIHJldC52YWxpZCA9IGZhbHNlO1xuICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJy4gRXh0ZW5zaW9ucyBvZiB0eXBlIFwibGlzdGVuZXJcIiBtdXN0IGhhdmUgYSBwcm9wZXJ0eSBjYWxsZWQgXCJsaXN0ZW5lcnNcIic7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZXh0LmZpbHRlcikgJiYgc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5yZWdleCkpIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyB0eXBlICsgJyBleHRlbnNpb25zIG11c3QgZGVmaW5lIGVpdGhlciBhIFwicmVnZXhcIiBwcm9wZXJ0eSBvciBhIFwiZmlsdGVyXCIgbWV0aG9kJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXh0Lmxpc3RlbmVycykge1xuICAgICAgaWYgKHR5cGVvZiBleHQubGlzdGVuZXJzICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdcImxpc3RlbmVyc1wiIHByb3BlcnR5IG11c3QgYmUgYW4gb2JqZWN0IGJ1dCAnICsgdHlwZW9mIGV4dC5saXN0ZW5lcnMgKyAnIGdpdmVuJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGxuIGluIGV4dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKGV4dC5saXN0ZW5lcnMuaGFzT3duUHJvcGVydHkobG4pKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHQubGlzdGVuZXJzW2xuXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICByZXQuZXJyb3IgPSBiYXNlTXNnICsgJ1wibGlzdGVuZXJzXCIgcHJvcGVydHkgbXVzdCBiZSBhbiBoYXNoIG9mIFtldmVudCBuYW1lXTogW2NhbGxiYWNrXS4gbGlzdGVuZXJzLicgKyBsbiArXG4gICAgICAgICAgICAgICcgbXVzdCBiZSBhIGZ1bmN0aW9uIGJ1dCAnICsgdHlwZW9mIGV4dC5saXN0ZW5lcnNbbG5dICsgJyBnaXZlbic7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHQuZmlsdGVyKSB7XG4gICAgICBpZiAodHlwZW9mIGV4dC5maWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAnXCJmaWx0ZXJcIiBtdXN0IGJlIGEgZnVuY3Rpb24sIGJ1dCAnICsgdHlwZW9mIGV4dC5maWx0ZXIgKyAnIGdpdmVuJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV4dC5yZWdleCkge1xuICAgICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1N0cmluZyhleHQucmVnZXgpKSB7XG4gICAgICAgIGV4dC5yZWdleCA9IG5ldyBSZWdFeHAoZXh0LnJlZ2V4LCAnZycpO1xuICAgICAgfVxuICAgICAgaWYgKCFleHQucmVnZXggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0LnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldC5lcnJvciA9IGJhc2VNc2cgKyAnXCJyZWdleFwiIHByb3BlcnR5IG11c3QgZWl0aGVyIGJlIGEgc3RyaW5nIG9yIGEgUmVnRXhwIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgZXh0LnJlZ2V4ICsgJyBnaXZlbic7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGV4dC5yZXBsYWNlKSkge1xuICAgICAgICByZXQudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0LmVycm9yID0gYmFzZU1zZyArICdcInJlZ2V4XCIgZXh0ZW5zaW9ucyBtdXN0IGltcGxlbWVudCBhIHJlcGxhY2Ugc3RyaW5nIG9yIGZ1bmN0aW9uJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBleHRlbnNpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5zaG93ZG93bi52YWxpZGF0ZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB2YWxpZGF0ZUV4dGVuc2lvbiA9IHZhbGlkYXRlKGV4dCwgbnVsbCk7XG4gIGlmICghdmFsaWRhdGVFeHRlbnNpb24udmFsaWQpIHtcbiAgICBjb25zb2xlLndhcm4odmFsaWRhdGVFeHRlbnNpb24uZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogc2hvd2Rvd25qcyBoZWxwZXIgZnVuY3Rpb25zXG4gKi9cblxuaWYgKCFzaG93ZG93bi5oYXNPd25Qcm9wZXJ0eSgnaGVscGVyJykpIHtcbiAgc2hvd2Rvd24uaGVscGVyID0ge307XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFyIGlzIHN0cmluZ1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IGFcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5zaG93ZG93bi5oZWxwZXIuaXNTdHJpbmcgPSBmdW5jdGlvbiBpc1N0cmluZyhhKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuICh0eXBlb2YgYSA9PT0gJ3N0cmluZycgfHwgYSBpbnN0YW5jZW9mIFN0cmluZyk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHZhciBpcyBhIGZ1bmN0aW9uXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gYVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbnNob3dkb3duLmhlbHBlci5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gaXNGdW5jdGlvbihhKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGEgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGEpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxuLyoqXG4gKiBGb3JFYWNoIGhlbHBlciBmdW5jdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHsqfSBvYmpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbnNob3dkb3duLmhlbHBlci5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChvYmosIGNhbGxiYWNrKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHR5cGVvZiBvYmouZm9yRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9iai5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2sob2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBpc0FycmF5IGhlbHBlciBmdW5jdGlvblxuICogQHN0YXRpY1xuICogQHBhcmFtIHsqfSBhXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGEpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gYS5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGlzIHVuZGVmaW5lZFxuICogQHN0YXRpY1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYCwgZWxzZSBgZmFsc2VgLlxuICovXG5zaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xufTtcblxuLyoqXG4gKiBTdGFuZGFyZGlkaXplIGV4dGVuc2lvbiBuYW1lXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gcyBleHRlbnNpb24gbmFtZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuc2hvd2Rvd24uaGVscGVyLnN0ZEV4dE5hbWUgPSBmdW5jdGlvbiAocykge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBzLnJlcGxhY2UoL1tfLV18fFxccy9nLCAnJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayh3aG9sZU1hdGNoLCBtMSkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBjaGFyQ29kZVRvRXNjYXBlID0gbTEuY2hhckNvZGVBdCgwKTtcbiAgcmV0dXJuICd+RScgKyBjaGFyQ29kZVRvRXNjYXBlICsgJ0UnO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIHVzZWQgdG8gZXNjYXBlIGNoYXJhY3RlcnMgd2hlbiBwYXNzaW5nIHRocm91Z2ggU3RyaW5nLnJlcGxhY2VcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSB3aG9sZU1hdGNoXG4gKiBAcGFyYW0ge3N0cmluZ30gbTFcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbnNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2sgPSBlc2NhcGVDaGFyYWN0ZXJzQ2FsbGJhY2s7XG5cbi8qKlxuICogRXNjYXBlIGNoYXJhY3RlcnMgaW4gYSBzdHJpbmdcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhcnNUb0VzY2FwZVxuICogQHBhcmFtIHtib29sZWFufSBhZnRlckJhY2tzbGFzaFxuICogQHJldHVybnMge1hNTHxzdHJpbmd8dm9pZHwqfVxuICovXG5zaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyA9IGZ1bmN0aW9uIGVzY2FwZUNoYXJhY3RlcnModGV4dCwgY2hhcnNUb0VzY2FwZSwgYWZ0ZXJCYWNrc2xhc2gpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBGaXJzdCB3ZSBoYXZlIHRvIGVzY2FwZSB0aGUgZXNjYXBlIGNoYXJhY3RlcnMgc28gdGhhdFxuICAvLyB3ZSBjYW4gYnVpbGQgYSBjaGFyYWN0ZXIgY2xhc3Mgb3V0IG9mIHRoZW1cbiAgdmFyIHJlZ2V4U3RyaW5nID0gJyhbJyArIGNoYXJzVG9Fc2NhcGUucmVwbGFjZSgvKFtcXFtcXF1cXFxcXSkvZywgJ1xcXFwkMScpICsgJ10pJztcblxuICBpZiAoYWZ0ZXJCYWNrc2xhc2gpIHtcbiAgICByZWdleFN0cmluZyA9ICdcXFxcXFxcXCcgKyByZWdleFN0cmluZztcbiAgfVxuXG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcsICdnJyk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVnZXgsIGVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG5cbiAgcmV0dXJuIHRleHQ7XG59O1xuXG52YXIgcmd4RmluZE1hdGNoUG9zID0gZnVuY3Rpb24gKHN0ciwgbGVmdCwgcmlnaHQsIGZsYWdzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGYgPSBmbGFncyB8fCAnJyxcbiAgICBnID0gZi5pbmRleE9mKCdnJykgPiAtMSxcbiAgICB4ID0gbmV3IFJlZ0V4cChsZWZ0ICsgJ3wnICsgcmlnaHQsICdnJyArIGYucmVwbGFjZSgvZy9nLCAnJykpLFxuICAgIGwgPSBuZXcgUmVnRXhwKGxlZnQsIGYucmVwbGFjZSgvZy9nLCAnJykpLFxuICAgIHBvcyA9IFtdLFxuICAgIHQsIHMsIG0sIHN0YXJ0LCBlbmQ7XG5cbiAgZG8ge1xuICAgIHQgPSAwO1xuICAgIHdoaWxlICgobSA9IHguZXhlYyhzdHIpKSkge1xuICAgICAgaWYgKGwudGVzdChtWzBdKSkge1xuICAgICAgICBpZiAoISh0KyspKSB7XG4gICAgICAgICAgcyA9IHgubGFzdEluZGV4O1xuICAgICAgICAgIHN0YXJ0ID0gcyAtIG1bMF0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHQpIHtcbiAgICAgICAgaWYgKCEtLXQpIHtcbiAgICAgICAgICBlbmQgPSBtLmluZGV4ICsgbVswXS5sZW5ndGg7XG4gICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgIGxlZnQ6IHtzdGFydDogc3RhcnQsIGVuZDogc30sXG4gICAgICAgICAgICBtYXRjaDoge3N0YXJ0OiBzLCBlbmQ6IG0uaW5kZXh9LFxuICAgICAgICAgICAgcmlnaHQ6IHtzdGFydDogbS5pbmRleCwgZW5kOiBlbmR9LFxuICAgICAgICAgICAgd2hvbGVNYXRjaDoge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBwb3MucHVzaChvYmopO1xuICAgICAgICAgIGlmICghZykge1xuICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gd2hpbGUgKHQgJiYgKHgubGFzdEluZGV4ID0gcykpO1xuXG4gIHJldHVybiBwb3M7XG59O1xuXG4vKipcbiAqIG1hdGNoUmVjdXJzaXZlUmVnRXhwXG4gKlxuICogKGMpIDIwMDcgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIEFjY2VwdHMgYSBzdHJpbmcgdG8gc2VhcmNoLCBhIGxlZnQgYW5kIHJpZ2h0IGZvcm1hdCBkZWxpbWl0ZXJcbiAqIGFzIHJlZ2V4IHBhdHRlcm5zLCBhbmQgb3B0aW9uYWwgcmVnZXggZmxhZ3MuIFJldHVybnMgYW4gYXJyYXlcbiAqIG9mIG1hdGNoZXMsIGFsbG93aW5nIG5lc3RlZCBpbnN0YW5jZXMgb2YgbGVmdC9yaWdodCBkZWxpbWl0ZXJzLlxuICogVXNlIHRoZSBcImdcIiBmbGFnIHRvIHJldHVybiBhbGwgbWF0Y2hlcywgb3RoZXJ3aXNlIG9ubHkgdGhlXG4gKiBmaXJzdCBpcyByZXR1cm5lZC4gQmUgY2FyZWZ1bCB0byBlbnN1cmUgdGhhdCB0aGUgbGVmdCBhbmRcbiAqIHJpZ2h0IGZvcm1hdCBkZWxpbWl0ZXJzIHByb2R1Y2UgbXV0dWFsbHkgZXhjbHVzaXZlIG1hdGNoZXMuXG4gKiBCYWNrcmVmZXJlbmNlcyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoaW4gdGhlIHJpZ2h0IGRlbGltaXRlclxuICogZHVlIHRvIGhvdyBpdCBpcyBpbnRlcm5hbGx5IGNvbWJpbmVkIHdpdGggdGhlIGxlZnQgZGVsaW1pdGVyLlxuICogV2hlbiBtYXRjaGluZyBzdHJpbmdzIHdob3NlIGZvcm1hdCBkZWxpbWl0ZXJzIGFyZSB1bmJhbGFuY2VkXG4gKiB0byB0aGUgbGVmdCBvciByaWdodCwgdGhlIG91dHB1dCBpcyBpbnRlbnRpb25hbGx5IGFzIGFcbiAqIGNvbnZlbnRpb25hbCByZWdleCBsaWJyYXJ5IHdpdGggcmVjdXJzaW9uIHN1cHBvcnQgd291bGRcbiAqIHByb2R1Y2UsIGUuZy4gXCI8PHg+XCIgYW5kIFwiPHg+PlwiIGJvdGggcHJvZHVjZSBbXCJ4XCJdIHdoZW4gdXNpbmdcbiAqIFwiPFwiIGFuZCBcIj5cIiBhcyB0aGUgZGVsaW1pdGVycyAoYm90aCBzdHJpbmdzIGNvbnRhaW4gYSBzaW5nbGUsXG4gKiBiYWxhbmNlZCBpbnN0YW5jZSBvZiBcIjx4PlwiKS5cbiAqXG4gKiBleGFtcGxlczpcbiAqIG1hdGNoUmVjdXJzaXZlUmVnRXhwKFwidGVzdFwiLCBcIlxcXFwoXCIsIFwiXFxcXClcIilcbiAqIHJldHVybnM6IFtdXG4gKiBtYXRjaFJlY3Vyc2l2ZVJlZ0V4cChcIjx0PDxlPj48cz4+dDw+XCIsIFwiPFwiLCBcIj5cIiwgXCJnXCIpXG4gKiByZXR1cm5zOiBbXCJ0PDxlPj48cz5cIiwgXCJcIl1cbiAqIG1hdGNoUmVjdXJzaXZlUmVnRXhwKFwiPGRpdiBpZD1cXFwieFxcXCI+dGVzdDwvZGl2PlwiLCBcIjxkaXZcXFxcYltePl0qPlwiLCBcIjwvZGl2PlwiLCBcImdpXCIpXG4gKiByZXR1cm5zOiBbXCJ0ZXN0XCJdXG4gKi9cbnNob3dkb3duLmhlbHBlci5tYXRjaFJlY3Vyc2l2ZVJlZ0V4cCA9IGZ1bmN0aW9uIChzdHIsIGxlZnQsIHJpZ2h0LCBmbGFncykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1hdGNoUG9zID0gcmd4RmluZE1hdGNoUG9zIChzdHIsIGxlZnQsIHJpZ2h0LCBmbGFncyksXG4gICAgcmVzdWx0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWF0Y2hQb3MubGVuZ3RoOyArK2kpIHtcbiAgICByZXN1bHRzLnB1c2goW1xuICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLndob2xlTWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLndob2xlTWF0Y2guZW5kKSxcbiAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS5tYXRjaC5zdGFydCwgbWF0Y2hQb3NbaV0ubWF0Y2guZW5kKSxcbiAgICAgIHN0ci5zbGljZShtYXRjaFBvc1tpXS5sZWZ0LnN0YXJ0LCBtYXRjaFBvc1tpXS5sZWZ0LmVuZCksXG4gICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ucmlnaHQuc3RhcnQsIG1hdGNoUG9zW2ldLnJpZ2h0LmVuZClcbiAgICBdKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9ufSByZXBsYWNlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGxlZnRcbiAqIEBwYXJhbSB7c3RyaW5nfSByaWdodFxuICogQHBhcmFtIHtzdHJpbmd9IGZsYWdzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5zaG93ZG93bi5oZWxwZXIucmVwbGFjZVJlY3Vyc2l2ZVJlZ0V4cCA9IGZ1bmN0aW9uIChzdHIsIHJlcGxhY2VtZW50LCBsZWZ0LCByaWdodCwgZmxhZ3MpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmICghc2hvd2Rvd24uaGVscGVyLmlzRnVuY3Rpb24ocmVwbGFjZW1lbnQpKSB7XG4gICAgdmFyIHJlcFN0ciA9IHJlcGxhY2VtZW50O1xuICAgIHJlcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlcFN0cjtcbiAgICB9O1xuICB9XG5cbiAgdmFyIG1hdGNoUG9zID0gcmd4RmluZE1hdGNoUG9zKHN0ciwgbGVmdCwgcmlnaHQsIGZsYWdzKSxcbiAgICAgIGZpbmFsU3RyID0gc3RyLFxuICAgICAgbG5nID0gbWF0Y2hQb3MubGVuZ3RoO1xuXG4gIGlmIChsbmcgPiAwKSB7XG4gICAgdmFyIGJpdHMgPSBbXTtcbiAgICBpZiAobWF0Y2hQb3NbMF0ud2hvbGVNYXRjaC5zdGFydCAhPT0gMCkge1xuICAgICAgYml0cy5wdXNoKHN0ci5zbGljZSgwLCBtYXRjaFBvc1swXS53aG9sZU1hdGNoLnN0YXJ0KSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG5nOyArK2kpIHtcbiAgICAgIGJpdHMucHVzaChcbiAgICAgICAgcmVwbGFjZW1lbnQoXG4gICAgICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLndob2xlTWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLndob2xlTWF0Y2guZW5kKSxcbiAgICAgICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ubWF0Y2guc3RhcnQsIG1hdGNoUG9zW2ldLm1hdGNoLmVuZCksXG4gICAgICAgICAgc3RyLnNsaWNlKG1hdGNoUG9zW2ldLmxlZnQuc3RhcnQsIG1hdGNoUG9zW2ldLmxlZnQuZW5kKSxcbiAgICAgICAgICBzdHIuc2xpY2UobWF0Y2hQb3NbaV0ucmlnaHQuc3RhcnQsIG1hdGNoUG9zW2ldLnJpZ2h0LmVuZClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGlmIChpIDwgbG5nIC0gMSkge1xuICAgICAgICBiaXRzLnB1c2goc3RyLnNsaWNlKG1hdGNoUG9zW2ldLndob2xlTWF0Y2guZW5kLCBtYXRjaFBvc1tpICsgMV0ud2hvbGVNYXRjaC5zdGFydCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobWF0Y2hQb3NbbG5nIC0gMV0ud2hvbGVNYXRjaC5lbmQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICBiaXRzLnB1c2goc3RyLnNsaWNlKG1hdGNoUG9zW2xuZyAtIDFdLndob2xlTWF0Y2guZW5kKSk7XG4gICAgfVxuICAgIGZpbmFsU3RyID0gYml0cy5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gZmluYWxTdHI7XG59O1xuXG4vKipcbiAqIFBPTFlGSUxMU1xuICovXG5pZiAoc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGNvbnNvbGUpKSB7XG4gIGNvbnNvbGUgPSB7XG4gICAgd2FybjogZnVuY3Rpb24gKG1zZykge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgYWxlcnQobXNnKTtcbiAgICB9LFxuICAgIGxvZzogZnVuY3Rpb24gKG1zZykge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgYWxlcnQobXNnKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICB0aHJvdyBtc2c7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZWQgYnkgRXN0ZXZhbyBvbiAzMS0wNS0yMDE1LlxuICovXG5cbi8qKlxuICogU2hvd2Rvd24gQ29udmVydGVyIGNsYXNzXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBbY29udmVydGVyT3B0aW9uc11cbiAqIEByZXR1cm5zIHtDb252ZXJ0ZXJ9XG4gKi9cbnNob3dkb3duLkNvbnZlcnRlciA9IGZ1bmN0aW9uIChjb252ZXJ0ZXJPcHRpb25zKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXJcbiAgICAgIC8qKlxuICAgICAgICogT3B0aW9ucyB1c2VkIGJ5IHRoaXMgY29udmVydGVyXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICovXG4gICAgICBvcHRpb25zID0ge30sXG5cbiAgICAgIC8qKlxuICAgICAgICogTGFuZ3VhZ2UgZXh0ZW5zaW9ucyB1c2VkIGJ5IHRoaXMgY29udmVydGVyXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICovXG4gICAgICBsYW5nRXh0ZW5zaW9ucyA9IFtdLFxuXG4gICAgICAvKipcbiAgICAgICAqIE91dHB1dCBtb2RpZmllcnMgZXh0ZW5zaW9ucyB1c2VkIGJ5IHRoaXMgY29udmVydGVyXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICovXG4gICAgICBvdXRwdXRNb2RpZmllcnMgPSBbXSxcblxuICAgICAgLyoqXG4gICAgICAgKiBFdmVudCBsaXN0ZW5lcnNcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgKi9cbiAgICAgIGxpc3RlbmVycyA9IHt9O1xuXG4gIF9jb25zdHJ1Y3RvcigpO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0ZXIgY29uc3RydWN0b3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIF9jb25zdHJ1Y3RvcigpIHtcbiAgICBjb252ZXJ0ZXJPcHRpb25zID0gY29udmVydGVyT3B0aW9ucyB8fCB7fTtcblxuICAgIGZvciAodmFyIGdPcHQgaW4gZ2xvYmFsT3B0aW9ucykge1xuICAgICAgaWYgKGdsb2JhbE9wdGlvbnMuaGFzT3duUHJvcGVydHkoZ09wdCkpIHtcbiAgICAgICAgb3B0aW9uc1tnT3B0XSA9IGdsb2JhbE9wdGlvbnNbZ09wdF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWVyZ2Ugb3B0aW9uc1xuICAgIGlmICh0eXBlb2YgY29udmVydGVyT3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodmFyIG9wdCBpbiBjb252ZXJ0ZXJPcHRpb25zKSB7XG4gICAgICAgIGlmIChjb252ZXJ0ZXJPcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcbiAgICAgICAgICBvcHRpb25zW29wdF0gPSBjb252ZXJ0ZXJPcHRpb25zW29wdF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NvbnZlcnRlciBleHBlY3RzIHRoZSBwYXNzZWQgcGFyYW1ldGVyIHRvIGJlIGFuIG9iamVjdCwgYnV0ICcgKyB0eXBlb2YgY29udmVydGVyT3B0aW9ucyArXG4gICAgICAnIHdhcyBwYXNzZWQgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5leHRlbnNpb25zKSB7XG4gICAgICBzaG93ZG93bi5oZWxwZXIuZm9yRWFjaChvcHRpb25zLmV4dGVuc2lvbnMsIF9wYXJzZUV4dGVuc2lvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGV4dGVuc2lvblxuICAgKiBAcGFyYW0geyp9IGV4dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9JyddXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBfcGFyc2VFeHRlbnNpb24oZXh0LCBuYW1lKSB7XG5cbiAgICBuYW1lID0gbmFtZSB8fCBudWxsO1xuICAgIC8vIElmIGl0J3MgYSBzdHJpbmcsIHRoZSBleHRlbnNpb24gd2FzIHByZXZpb3VzbHkgbG9hZGVkXG4gICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1N0cmluZyhleHQpKSB7XG4gICAgICBleHQgPSBzaG93ZG93bi5oZWxwZXIuc3RkRXh0TmFtZShleHQpO1xuICAgICAgbmFtZSA9IGV4dDtcblxuICAgICAgLy8gTEVHQUNZX1NVUFBPUlQgQ09ERVxuICAgICAgaWYgKHNob3dkb3duLmV4dGVuc2lvbnNbZXh0XSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RFUFJFQ0FUSU9OIFdBUk5JTkc6ICcgKyBleHQgKyAnIGlzIGFuIG9sZCBleHRlbnNpb24gdGhhdCB1c2VzIGEgZGVwcmVjYXRlZCBsb2FkaW5nIG1ldGhvZC4nICtcbiAgICAgICAgICAnUGxlYXNlIGluZm9ybSB0aGUgZGV2ZWxvcGVyIHRoYXQgdGhlIGV4dGVuc2lvbiBzaG91bGQgYmUgdXBkYXRlZCEnKTtcbiAgICAgICAgbGVnYWN5RXh0ZW5zaW9uTG9hZGluZyhzaG93ZG93bi5leHRlbnNpb25zW2V4dF0sIGV4dCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIC8vIEVORCBMRUdBQ1kgU1VQUE9SVCBDT0RFXG5cbiAgICAgIH0gZWxzZSBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChleHRlbnNpb25zW2V4dF0pKSB7XG4gICAgICAgIGV4dCA9IGV4dGVuc2lvbnNbZXh0XTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0V4dGVuc2lvbiBcIicgKyBleHQgKyAnXCIgY291bGQgbm90IGJlIGxvYWRlZC4gSXQgd2FzIGVpdGhlciBub3QgZm91bmQgb3IgaXMgbm90IGEgdmFsaWQgZXh0ZW5zaW9uLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBleHQgPSBleHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc0FycmF5KGV4dCkpIHtcbiAgICAgIGV4dCA9IFtleHRdO1xuICAgIH1cblxuICAgIHZhciB2YWxpZEV4dCA9IHZhbGlkYXRlKGV4dCwgbmFtZSk7XG4gICAgaWYgKCF2YWxpZEV4dC52YWxpZCkge1xuICAgICAgdGhyb3cgRXJyb3IodmFsaWRFeHQuZXJyb3IpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBzd2l0Y2ggKGV4dFtpXS50eXBlKSB7XG5cbiAgICAgICAgY2FzZSAnbGFuZyc6XG4gICAgICAgICAgbGFuZ0V4dGVuc2lvbnMucHVzaChleHRbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ291dHB1dCc6XG4gICAgICAgICAgb3V0cHV0TW9kaWZpZXJzLnB1c2goZXh0W2ldKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChleHRbaV0uaGFzT3duUHJvcGVydHkobGlzdGVuZXJzKSkge1xuICAgICAgICBmb3IgKHZhciBsbiBpbiBleHRbaV0ubGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGV4dFtpXS5saXN0ZW5lcnMuaGFzT3duUHJvcGVydHkobG4pKSB7XG4gICAgICAgICAgICBsaXN0ZW4obG4sIGV4dFtpXS5saXN0ZW5lcnNbbG5dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBMRUdBQ1lfU1VQUE9SVFxuICAgKiBAcGFyYW0geyp9IGV4dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gbGVnYWN5RXh0ZW5zaW9uTG9hZGluZyhleHQsIG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXh0ID0gZXh0KG5ldyBzaG93ZG93bi5Db252ZXJ0ZXIoKSk7XG4gICAgfVxuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0KSkge1xuICAgICAgZXh0ID0gW2V4dF07XG4gICAgfVxuICAgIHZhciB2YWxpZCA9IHZhbGlkYXRlKGV4dCwgbmFtZSk7XG5cbiAgICBpZiAoIXZhbGlkLnZhbGlkKSB7XG4gICAgICB0aHJvdyBFcnJvcih2YWxpZC5lcnJvcik7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHQubGVuZ3RoOyArK2kpIHtcbiAgICAgIHN3aXRjaCAoZXh0W2ldLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFuZyc6XG4gICAgICAgICAgbGFuZ0V4dGVuc2lvbnMucHVzaChleHRbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdXRwdXQnOlxuICAgICAgICAgIG91dHB1dE1vZGlmaWVycy5wdXNoKGV4dFtpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6Ly8gc2hvdWxkIG5ldmVyIHJlYWNoIGhlcmVcbiAgICAgICAgICB0aHJvdyBFcnJvcignRXh0ZW5zaW9uIGxvYWRlciBlcnJvcjogVHlwZSB1bnJlY29nbml6ZWQhISEnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIGFuIGV2ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBmdW5jdGlvbiBsaXN0ZW4obmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgaW4gY29udmVydGVyLmxpc3RlbigpIG1ldGhvZDogbmFtZSBtdXN0IGJlIGEgc3RyaW5nLCBidXQgJyArIHR5cGVvZiBuYW1lICsgJyBnaXZlbicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IGluIGNvbnZlcnRlci5saXN0ZW4oKSBtZXRob2Q6IGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbiwgYnV0ICcgKyB0eXBlb2YgY2FsbGJhY2sgKyAnIGdpdmVuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGxpc3RlbmVyc1tuYW1lXSA9IFtdO1xuICAgIH1cbiAgICBsaXN0ZW5lcnNbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiByVHJpbUlucHV0VGV4dCh0ZXh0KSB7XG4gICAgdmFyIHJzcCA9IHRleHQubWF0Y2goL15cXHMqLylbMF0ubGVuZ3RoLFxuICAgICAgICByZ3ggPSBuZXcgUmVnRXhwKCdeXFxcXHN7MCwnICsgcnNwICsgJ30nLCAnZ20nKTtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJneCwgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGFuIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnROYW1lIEV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dFxuICAgKiBAcGFyYW0ge3t9fSBvcHRpb25zIENvbnZlcnRlciBPcHRpb25zXG4gICAqIEBwYXJhbSB7e319IGdsb2JhbHNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRoaXMuX2Rpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2ggKGV2dE5hbWUsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGV2dE5hbWUpKSB7XG4gICAgICBmb3IgKHZhciBlaSA9IDA7IGVpIDwgbGlzdGVuZXJzW2V2dE5hbWVdLmxlbmd0aDsgKytlaSkge1xuICAgICAgICB2YXIgblRleHQgPSBsaXN0ZW5lcnNbZXZ0TmFtZV1bZWldKGV2dE5hbWUsIHRleHQsIHRoaXMsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICBpZiAoblRleHQgJiYgdHlwZW9mIG5UZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRleHQgPSBuVGV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGFuIGV2ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHtzaG93ZG93bi5Db252ZXJ0ZXJ9XG4gICAqL1xuICB0aGlzLmxpc3RlbiA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIGxpc3RlbihuYW1lLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgbWFya2Rvd24gc3RyaW5nIGludG8gSFRNTFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHRoaXMubWFrZUh0bWwgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIC8vY2hlY2sgaWYgdHR0IGlzIG5vdCBmYWxzeVxuICAgIGlmICghdGV4dCkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGdsb2JhbHMgPSB7XG4gICAgICBnSHRtbEJsb2NrczogICAgIFtdLFxuICAgICAgZ0h0bWxNZEJsb2NrczogICBbXSxcbiAgICAgIGdIdG1sU3BhbnM6ICAgICAgW10sXG4gICAgICBnVXJsczogICAgICAgICAgIHt9LFxuICAgICAgZ1RpdGxlczogICAgICAgICB7fSxcbiAgICAgIGdEaW1lbnNpb25zOiAgICAge30sXG4gICAgICBnTGlzdExldmVsOiAgICAgIDAsXG4gICAgICBoYXNoTGlua0NvdW50czogIHt9LFxuICAgICAgbGFuZ0V4dGVuc2lvbnM6ICBsYW5nRXh0ZW5zaW9ucyxcbiAgICAgIG91dHB1dE1vZGlmaWVyczogb3V0cHV0TW9kaWZpZXJzLFxuICAgICAgY29udmVydGVyOiAgICAgICB0aGlzLFxuICAgICAgZ2hDb2RlQmxvY2tzOiAgICBbXVxuICAgIH07XG5cbiAgICAvLyBhdHRhY2tsYWI6IFJlcGxhY2UgfiB3aXRoIH5UXG4gICAgLy8gVGhpcyBsZXRzIHVzIHVzZSB0aWxkZSBhcyBhbiBlc2NhcGUgY2hhciB0byBhdm9pZCBtZDUgaGFzaGVzXG4gICAgLy8gVGhlIGNob2ljZSBvZiBjaGFyYWN0ZXIgaXMgYXJiaXRyYXJ5OyBhbnl0aGluZyB0aGF0IGlzbid0XG4gICAgLy8gbWFnaWMgaW4gTWFya2Rvd24gd2lsbCB3b3JrLlxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL34vZywgJ35UJyk7XG5cbiAgICAvLyBhdHRhY2tsYWI6IFJlcGxhY2UgJCB3aXRoIH5EXG4gICAgLy8gUmVnRXhwIGludGVycHJldHMgJCBhcyBhIHNwZWNpYWwgY2hhcmFjdGVyXG4gICAgLy8gd2hlbiBpdCdzIGluIGEgcmVwbGFjZW1lbnQgc3RyaW5nXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFwkL2csICd+RCcpO1xuXG4gICAgLy8gU3RhbmRhcmRpemUgbGluZSBlbmRpbmdzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTsgLy8gRE9TIHRvIFVuaXhcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHIvZywgJ1xcbicpOyAvLyBNYWMgdG8gVW5peFxuXG4gICAgaWYgKG9wdGlvbnMuc21hcnRJbmRlbnRhdGlvbkZpeCkge1xuICAgICAgdGV4dCA9IHJUcmltSW5wdXRUZXh0KHRleHQpO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0dHQgYmVnaW5zIGFuZCBlbmRzIHdpdGggYSBjb3VwbGUgb2YgbmV3bGluZXM6XG4gICAgLy90dHQgPSAnXFxuXFxuJyArIHR0dCArICdcXG5cXG4nO1xuICAgIHRleHQgPSB0ZXh0O1xuICAgIC8vIGRldGFiXG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZGV0YWInKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAgIC8vIHN0cmlwQmxhbmtMaW5lc1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlwQmxhbmtMaW5lcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gICAgLy9ydW4gbGFuZ3VhZ2VFeHRlbnNpb25zXG4gICAgc2hvd2Rvd24uaGVscGVyLmZvckVhY2gobGFuZ0V4dGVuc2lvbnMsIGZ1bmN0aW9uIChleHQpIHtcbiAgICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3J1bkV4dGVuc2lvbicpKGV4dCwgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgfSk7XG5cbiAgICAvLyBydW4gdGhlIHN1YiBwYXJzZXJzXG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaFByZUNvZGVUYWdzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZ2l0aHViQ29kZUJsb2NrcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MQmxvY2tzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxTcGFucycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlwTGlua0RlZmluaXRpb25zJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignYmxvY2tHYW11dCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3VuaGFzaEhUTUxTcGFucycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3VuZXNjYXBlU3BlY2lhbENoYXJzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgICAvLyBhdHRhY2tsYWI6IFJlc3RvcmUgZG9sbGFyIHNpZ25zXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvfkQvZywgJyQkJyk7XG5cbiAgICAvLyBhdHRhY2tsYWI6IFJlc3RvcmUgdGlsZGVzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvflQvZywgJ34nKTtcblxuICAgIC8vIFJ1biBvdXRwdXQgbW9kaWZpZXJzXG4gICAgc2hvd2Rvd24uaGVscGVyLmZvckVhY2gob3V0cHV0TW9kaWZpZXJzLCBmdW5jdGlvbiAoZXh0KSB7XG4gICAgICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdydW5FeHRlbnNpb24nKShleHQsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgYW4gb3B0aW9uIG9mIHRoaXMgQ29udmVydGVyIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKi9cbiAgdGhpcy5zZXRPcHRpb24gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIG9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG9wdGlvbiBvZiB0aGlzIENvbnZlcnRlciBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgdGhpcy5nZXRPcHRpb24gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG9wdGlvbnNba2V5XTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBvcHRpb25zIG9mIHRoaXMgQ29udmVydGVyIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIHRoaXMuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGV4dGVuc2lvbiB0byBUSElTIGNvbnZlcnRlclxuICAgKiBAcGFyYW0ge3t9fSBleHRlbnNpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPW51bGxdXG4gICAqL1xuICB0aGlzLmFkZEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChleHRlbnNpb24sIG5hbWUpIHtcbiAgICBuYW1lID0gbmFtZSB8fCBudWxsO1xuICAgIF9wYXJzZUV4dGVuc2lvbihleHRlbnNpb24sIG5hbWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVc2UgYSBnbG9iYWwgcmVnaXN0ZXJlZCBleHRlbnNpb24gd2l0aCBUSElTIGNvbnZlcnRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXh0ZW5zaW9uTmFtZSBOYW1lIG9mIHRoZSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgZXh0ZW5zaW9uXG4gICAqL1xuICB0aGlzLnVzZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChleHRlbnNpb25OYW1lKSB7XG4gICAgX3BhcnNlRXh0ZW5zaW9uKGV4dGVuc2lvbk5hbWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZsYXZvciBUSElTIGNvbnZlcnRlciBzaG91bGQgdXNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqL1xuICB0aGlzLnNldEZsYXZvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKGZsYXZvci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgdmFyIHByZXNldCA9IGZsYXZvcltuYW1lXTtcbiAgICAgIGZvciAodmFyIG9wdGlvbiBpbiBwcmVzZXQpIHtcbiAgICAgICAgaWYgKHByZXNldC5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XG4gICAgICAgICAgb3B0aW9uc1tvcHRpb25dID0gcHJlc2V0W29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBleHRlbnNpb24gZnJvbSBUSElTIGNvbnZlcnRlci5cbiAgICogTm90ZTogVGhpcyBpcyBhIGNvc3RseSBvcGVyYXRpb24uIEl0J3MgYmV0dGVyIHRvIGluaXRpYWxpemUgYSBuZXcgY29udmVydGVyXG4gICAqIGFuZCBzcGVjaWZ5IHRoZSBleHRlbnNpb25zIHlvdSB3aXNoIHRvIHVzZVxuICAgKiBAcGFyYW0ge0FycmF5fSBleHRlbnNpb25cbiAgICovXG4gIHRoaXMucmVtb3ZlRXh0ZW5zaW9uID0gZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzQXJyYXkoZXh0ZW5zaW9uKSkge1xuICAgICAgZXh0ZW5zaW9uID0gW2V4dGVuc2lvbl07XG4gICAgfVxuICAgIGZvciAodmFyIGEgPSAwOyBhIDwgZXh0ZW5zaW9uLmxlbmd0aDsgKythKSB7XG4gICAgICB2YXIgZXh0ID0gZXh0ZW5zaW9uW2FdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYW5nRXh0ZW5zaW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAobGFuZ0V4dGVuc2lvbnNbaV0gPT09IGV4dCkge1xuICAgICAgICAgIGxhbmdFeHRlbnNpb25zW2ldLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG91dHB1dE1vZGlmaWVycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAob3V0cHV0TW9kaWZpZXJzW2lpXSA9PT0gZXh0KSB7XG4gICAgICAgICAgb3V0cHV0TW9kaWZpZXJzW2lpXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgZXh0ZW5zaW9uIG9mIFRISVMgY29udmVydGVyXG4gICAqIEByZXR1cm5zIHt7bGFuZ3VhZ2U6IEFycmF5LCBvdXRwdXQ6IEFycmF5fX1cbiAgICovXG4gIHRoaXMuZ2V0QWxsRXh0ZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFuZ3VhZ2U6IGxhbmdFeHRlbnNpb25zLFxuICAgICAgb3V0cHV0OiBvdXRwdXRNb2RpZmllcnNcbiAgICB9O1xuICB9O1xufTtcblxuLyoqXG4gKiBUdXJuIE1hcmtkb3duIGxpbmsgc2hvcnRjdXRzIGludG8gWEhUTUwgPGE+IHRhZ3MuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignYW5jaG9ycycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdhbmNob3JzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciB3cml0ZUFuY2hvclRhZyA9IGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSwgbTIsIG0zLCBtNCwgbTUsIG02LCBtNykge1xuICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQobTcpKSB7XG4gICAgICBtNyA9ICcnO1xuICAgIH1cbiAgICB3aG9sZU1hdGNoID0gbTE7XG4gICAgdmFyIGxpbmtUZXh0ID0gbTIsXG4gICAgICAgIGxpbmtJZCA9IG0zLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHVybCA9IG00LFxuICAgICAgICB0aXRsZSA9IG03O1xuXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIGlmICghbGlua0lkKSB7XG4gICAgICAgIC8vIGxvd2VyLWNhc2UgYW5kIHR1cm4gZW1iZWRkZWQgbmV3bGluZXMgaW50byBzcGFjZXNcbiAgICAgICAgbGlua0lkID0gbGlua1RleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gP1xcbi9nLCAnICcpO1xuICAgICAgfVxuICAgICAgdXJsID0gJyMnICsgbGlua0lkO1xuXG4gICAgICBpZiAoIXNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChnbG9iYWxzLmdVcmxzW2xpbmtJZF0pKSB7XG4gICAgICAgIHVybCA9IGdsb2JhbHMuZ1VybHNbbGlua0lkXTtcbiAgICAgICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZ2xvYmFscy5nVGl0bGVzW2xpbmtJZF0pKSB7XG4gICAgICAgICAgdGl0bGUgPSBnbG9iYWxzLmdUaXRsZXNbbGlua0lkXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHdob2xlTWF0Y2guc2VhcmNoKC9cXChcXHMqXFwpJC9tKSA+IC0xKSB7XG4gICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBleHBsaWNpdCBlbXB0eSB1cmxcbiAgICAgICAgICB1cmwgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gd2hvbGVNYXRjaDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHVybCA9IHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzKHVybCwgJypfJywgZmFsc2UpO1xuICAgIHZhciByZXN1bHQgPSAnPGEgaHJlZj1cIicgKyB1cmwgKyAnXCInO1xuXG4gICAgaWYgKHRpdGxlICE9PSAnJyAmJiB0aXRsZSAhPT0gbnVsbCkge1xuICAgICAgdGl0bGUgPSB0aXRsZS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gICAgICB0aXRsZSA9IHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzKHRpdGxlLCAnKl8nLCBmYWxzZSk7XG4gICAgICByZXN1bHQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gICAgfVxuXG4gICAgcmVzdWx0ICs9ICc+JyArIGxpbmtUZXh0ICsgJzwvYT4nO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBGaXJzdCwgaGFuZGxlIHJlZmVyZW5jZS1zdHlsZSBsaW5rczogW2xpbmsgdHR0XSBbaWRdXG4gIC8qXG4gICB0dHQgPSB0dHQucmVwbGFjZSgvXG4gICAoXHRcdFx0XHRcdFx0XHQvLyB3cmFwIHdob2xlIG1hdGNoIGluICQxXG4gICBcXFtcbiAgIChcbiAgICg/OlxuICAgXFxbW15cXF1dKlxcXVx0XHQvLyBhbGxvdyBicmFja2V0cyBuZXN0ZWQgb25lIGxldmVsXG4gICB8XG4gICBbXlxcW11cdFx0XHQvLyBvciBhbnl0aGluZyBlbHNlXG4gICApKlxuICAgKVxuICAgXFxdXG5cbiAgIFsgXT9cdFx0XHRcdFx0Ly8gb25lIG9wdGlvbmFsIHNwYWNlXG4gICAoPzpcXG5bIF0qKT9cdFx0XHRcdC8vIG9uZSBvcHRpb25hbCBuZXdsaW5lIGZvbGxvd2VkIGJ5IHNwYWNlc1xuXG4gICBcXFtcbiAgICguKj8pXHRcdFx0XHRcdC8vIGlkID0gJDNcbiAgIFxcXVxuICAgKSgpKCkoKSgpXHRcdFx0XHRcdC8vIHBhZCByZW1haW5pbmcgYmFja3JlZmVyZW5jZXNcbiAgIC9nLF9Eb0FuY2hvcnNfY2FsbGJhY2spO1xuICAgKi9cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFxcWygoPzpcXFtbXlxcXV0qXXxbXlxcW1xcXV0pKildWyBdPyg/OlxcblsgXSopP1xcWyguKj8pXSkoKSgpKCkoKS9nLCB3cml0ZUFuY2hvclRhZyk7XG5cbiAgLy9cbiAgLy8gTmV4dCwgaW5saW5lLXN0eWxlIGxpbmtzOiBbbGluayB0dHRdKHVybCBcIm9wdGlvbmFsIHRpdGxlXCIpXG4gIC8vXG5cbiAgLypcbiAgIHR0dCA9IHR0dC5yZXBsYWNlKC9cbiAgIChcdFx0XHRcdFx0XHQvLyB3cmFwIHdob2xlIG1hdGNoIGluICQxXG4gICBcXFtcbiAgIChcbiAgICg/OlxuICAgXFxbW15cXF1dKlxcXVx0Ly8gYWxsb3cgYnJhY2tldHMgbmVzdGVkIG9uZSBsZXZlbFxuICAgfFxuICAgW15cXFtcXF1dXHRcdFx0Ly8gb3IgYW55dGhpbmcgZWxzZVxuICAgKVxuICAgKVxuICAgXFxdXG4gICBcXChcdFx0XHRcdFx0XHQvLyBsaXRlcmFsIHBhcmVuXG4gICBbIFxcdF0qXG4gICAoKVx0XHRcdFx0XHRcdC8vIG5vIGlkLCBzbyBsZWF2ZSAkMyBlbXB0eVxuICAgPD8oLio/KT4/XHRcdFx0XHQvLyBocmVmID0gJDRcbiAgIFsgXFx0XSpcbiAgIChcdFx0XHRcdFx0XHQvLyAkNVxuICAgKFsnXCJdKVx0XHRcdFx0Ly8gcXVvdGUgY2hhciA9ICQ2XG4gICAoLio/KVx0XHRcdFx0Ly8gVGl0bGUgPSAkN1xuICAgXFw2XHRcdFx0XHRcdC8vIG1hdGNoaW5nIHF1b3RlXG4gICBbIFxcdF0qXHRcdFx0XHQvLyBpZ25vcmUgYW55IHNwYWNlcy90YWJzIGJldHdlZW4gY2xvc2luZyBxdW90ZSBhbmQgKVxuICAgKT9cdFx0XHRcdFx0XHQvLyB0aXRsZSBpcyBvcHRpb25hbFxuICAgXFwpXG4gICApXG4gICAvZyx3cml0ZUFuY2hvclRhZyk7XG4gICAqL1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFxbKCg/OlxcW1teXFxdXSpdfFteXFxbXFxdXSkqKV1cXChbIFxcdF0qKCk8PyguKj8oPzpcXCguKj9cXCkuKj8pPyk+P1sgXFx0XSooKFsnXCJdKSguKj8pXFw2WyBcXHRdKik/XFwpKS9nLFxuICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQW5jaG9yVGFnKTtcblxuICAvL1xuICAvLyBMYXN0LCBoYW5kbGUgcmVmZXJlbmNlLXN0eWxlIHNob3J0Y3V0czogW2xpbmsgdHR0XVxuICAvLyBUaGVzZSBtdXN0IGNvbWUgbGFzdCBpbiBjYXNlIHlvdSd2ZSBhbHNvIGdvdCBbbGluayB0ZXN0XVsxXVxuICAvLyBvciBbbGluayB0ZXN0XSgvZm9vKVxuICAvL1xuXG4gIC8qXG4gICB0dHQgPSB0dHQucmVwbGFjZSgvXG4gICAoICAgICAgICAgICAgICAgIC8vIHdyYXAgd2hvbGUgbWF0Y2ggaW4gJDFcbiAgIFxcW1xuICAgKFteXFxbXFxdXSspICAgICAgIC8vIGxpbmsgdHR0ID0gJDI7IGNhbid0IGNvbnRhaW4gJ1snIG9yICddJ1xuICAgXFxdXG4gICApKCkoKSgpKCkoKSAgICAgIC8vIHBhZCByZXN0IG9mIGJhY2tyZWZlcmVuY2VzXG4gICAvZywgd3JpdGVBbmNob3JUYWcpO1xuICAgKi9cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFxcWyhbXlxcW1xcXV0rKV0pKCkoKSgpKCkoKS9nLCB3cml0ZUFuY2hvclRhZyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYW5jaG9ycy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2F1dG9MaW5rcycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdhdXRvTGlua3MuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdmFyIHNpbXBsZVVSTFJlZ2V4ICA9IC9cXGIoKChodHRwcz98ZnRwfGRpY3QpOlxcL1xcL3x3d3dcXC4pW14nXCI+XFxzXStcXC5bXidcIj5cXHNdKykoPz1cXHN8JCkoPyFbXCI8Pl0pL2dpLFxuICAgICAgZGVsaW1VcmxSZWdleCAgID0gLzwoKChodHRwcz98ZnRwfGRpY3QpOlxcL1xcL3x3d3dcXC4pW14nXCI+XFxzXSspPi9naSxcbiAgICAgIHNpbXBsZU1haWxSZWdleCA9IC8oPzpefFsgXFxuXFx0XSkoW0EtWmEtejAtOSEjJCUmJyorLS89P15fYFxce3x9flxcLl0rQFstYS16MC05XSsoXFwuWy1hLXowLTldKykqXFwuW2Etel0rKSg/OiR8WyBcXG5cXHRdKS9naSxcbiAgICAgIGRlbGltTWFpbFJlZ2V4ICA9IC88KD86bWFpbHRvOik/KFstLlxcd10rQFstYS16MC05XSsoXFwuWy1hLXowLTldKykqXFwuW2Etel0rKT4vZ2k7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShkZWxpbVVybFJlZ2V4LCByZXBsYWNlTGluayk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoZGVsaW1NYWlsUmVnZXgsIHJlcGxhY2VNYWlsKTtcbiAgLy8gc2ltcGxlVVJMUmVnZXggID0gL1xcYigoKGh0dHBzP3xmdHB8ZGljdCk6XFwvXFwvfHd3d1xcLilbLS4rfjo/I0AhJCYnKCkqLDs9W1xcXVxcd10rKVxcYi9naSxcbiAgLy8gRW1haWwgYWRkcmVzc2VzOiA8YWRkcmVzc0Bkb21haW4uZm9vPlxuXG4gIGlmIChvcHRpb25zLnNpbXBsaWZpZWRBdXRvTGluaykge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2Uoc2ltcGxlVVJMUmVnZXgsIHJlcGxhY2VMaW5rKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNpbXBsZU1haWxSZWdleCwgcmVwbGFjZU1haWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZUxpbmsod20sIGxpbmspIHtcbiAgICB2YXIgbG5rVHh0ID0gbGluaztcbiAgICBpZiAoL153d3dcXC4vaS50ZXN0KGxpbmspKSB7XG4gICAgICBsaW5rID0gbGluay5yZXBsYWNlKC9ed3d3XFwuL2ksICdodHRwOi8vd3d3LicpO1xuICAgIH1cbiAgICByZXR1cm4gJzxhIGhyZWY9XCInICsgbGluayArICdcIj4nICsgbG5rVHh0ICsgJzwvYT4nO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZU1haWwod2hvbGVNYXRjaCwgbTEpIHtcbiAgICB2YXIgdW5lc2NhcGVkU3RyID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmVzY2FwZVNwZWNpYWxDaGFycycpKG0xKTtcbiAgICByZXR1cm4gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVFbWFpbEFkZHJlc3MnKSh1bmVzY2FwZWRTdHIpO1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYXV0b0xpbmtzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBUaGVzZSBhcmUgYWxsIHRoZSB0cmFuc2Zvcm1hdGlvbnMgdGhhdCBmb3JtIGJsb2NrLWxldmVsXG4gKiB0YWdzIGxpa2UgcGFyYWdyYXBocywgaGVhZGVycywgYW5kIGxpc3QgaXRlbXMuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignYmxvY2tHYW11dCcsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdibG9ja0dhbXV0LmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIHdlIHBhcnNlIGJsb2NrcXVvdGVzIGZpcnN0IHNvIHRoYXQgd2UgY2FuIGhhdmUgaGVhZGluZ3MgYW5kIGhyc1xuICAvLyBpbnNpZGUgYmxvY2txdW90ZXNcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignYmxvY2tRdW90ZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaGVhZGVycycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIERvIEhvcml6b250YWwgUnVsZXM6XG4gIHZhciBrZXkgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKCc8aHIgLz4nLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlsgXXswLDJ9KFsgXT9cXCpbIF0/KXszLH1bIFxcdF0qJC9nbSwga2V5KTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlsgXXswLDJ9KFsgXT9cXC1bIF0/KXszLH1bIFxcdF0qJC9nbSwga2V5KTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlsgXXswLDJ9KFsgXT9fWyBdPyl7Myx9WyBcXHRdKiQvZ20sIGtleSk7XG5cbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignbGlzdHMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignY29kZUJsb2NrcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCd0YWJsZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBXZSBhbHJlYWR5IHJhbiBfSGFzaEhUTUxCbG9ja3MoKSBiZWZvcmUsIGluIE1hcmtkb3duKCksIGJ1dCB0aGF0XG4gIC8vIHdhcyB0byBlc2NhcGUgcmF3IEhUTUwgaW4gdGhlIG9yaWdpbmFsIE1hcmtkb3duIHNvdXJjZS4gVGhpcyB0aW1lLFxuICAvLyB3ZSdyZSBlc2NhcGluZyB0aGUgbWFya3VwIHdlJ3ZlIGp1c3QgY3JlYXRlZCwgc28gdGhhdCB3ZSBkb24ndCB3cmFwXG4gIC8vIDxwPiB0YWdzIGFyb3VuZCBibG9jay1sZXZlbCB0YWdzLlxuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoSFRNTEJsb2NrcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdwYXJhZ3JhcGhzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYmxvY2tHYW11dC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbnNob3dkb3duLnN1YlBhcnNlcignYmxvY2tRdW90ZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnYmxvY2tRdW90ZXMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIC8qXG4gICB0dHQgPSB0dHQucmVwbGFjZSgvXG4gICAoXHRcdFx0XHRcdFx0XHRcdC8vIFdyYXAgd2hvbGUgbWF0Y2ggaW4gJDFcbiAgIChcbiAgIF5bIFxcdF0qPlsgXFx0XT9cdFx0XHQvLyAnPicgYXQgdGhlIHN0YXJ0IG9mIGEgbGluZVxuICAgLitcXG5cdFx0XHRcdFx0Ly8gcmVzdCBvZiB0aGUgZmlyc3QgbGluZVxuICAgKC4rXFxuKSpcdFx0XHRcdFx0Ly8gc3Vic2VxdWVudCBjb25zZWN1dGl2ZSBsaW5lc1xuICAgXFxuKlx0XHRcdFx0XHRcdC8vIGJsYW5rc1xuICAgKStcbiAgIClcbiAgIC9nbSwgZnVuY3Rpb24oKXsuLi59KTtcbiAgICovXG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKCheWyBcXHRdezAsM30+WyBcXHRdPy4rXFxuKC4rXFxuKSpcXG4qKSspL2dtLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEpIHtcbiAgICB2YXIgYnEgPSBtMTtcblxuICAgIC8vIGF0dGFja2xhYjogaGFjayBhcm91bmQgS29ucXVlcm9yIDMuNS40IGJ1ZzpcbiAgICAvLyBcIi0tLS0tLS0tLS1idWdcIi5yZXBsYWNlKC9eLS9nLFwiXCIpID09IFwiYnVnXCJcbiAgICBicSA9IGJxLnJlcGxhY2UoL15bIFxcdF0qPlsgXFx0XT8vZ20sICd+MCcpOyAvLyB0cmltIG9uZSBsZXZlbCBvZiBxdW90aW5nXG5cbiAgICAvLyBhdHRhY2tsYWI6IGNsZWFuIHVwIGhhY2tcbiAgICBicSA9IGJxLnJlcGxhY2UoL34wL2csICcnKTtcblxuICAgIGJxID0gYnEucmVwbGFjZSgvXlsgXFx0XSskL2dtLCAnJyk7IC8vIHRyaW0gd2hpdGVzcGFjZS1vbmx5IGxpbmVzXG4gICAgYnEgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2dpdGh1YkNvZGVCbG9ja3MnKShicSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgYnEgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2Jsb2NrR2FtdXQnKShicSwgb3B0aW9ucywgZ2xvYmFscyk7IC8vIHJlY3Vyc2VcblxuICAgIGJxID0gYnEucmVwbGFjZSgvKF58XFxuKS9nLCAnJDEgICcpO1xuICAgIC8vIFRoZXNlIGxlYWRpbmcgc3BhY2VzIHNjcmV3IHdpdGggPHByZT4gY29udGVudCwgc28gd2UgbmVlZCB0byBmaXggdGhhdDpcbiAgICBicSA9IGJxLnJlcGxhY2UoLyhcXHMqPHByZT5bXlxccl0rPzxcXC9wcmU+KS9nbSwgZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xKSB7XG4gICAgICB2YXIgcHJlID0gbTE7XG4gICAgICAvLyBhdHRhY2tsYWI6IGhhY2sgYXJvdW5kIEtvbnF1ZXJvciAzLjUuNCBidWc6XG4gICAgICBwcmUgPSBwcmUucmVwbGFjZSgvXiAgL21nLCAnfjAnKTtcbiAgICAgIHByZSA9IHByZS5yZXBsYWNlKC9+MC9nLCAnJyk7XG4gICAgICByZXR1cm4gcHJlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoJzxibG9ja3F1b3RlPlxcbicgKyBicSArICdcXG48L2Jsb2NrcXVvdGU+Jywgb3B0aW9ucywgZ2xvYmFscyk7XG4gIH0pO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2Jsb2NrUXVvdGVzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbi8qKlxuICogUHJvY2VzcyBNYXJrZG93biBgPHByZT48Y29kZT5gIGJsb2Nrcy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdjb2RlQmxvY2tzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2NvZGVCbG9ja3MuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIC8qXG4gICB0dHQgPSB0dHQucmVwbGFjZSh0dHQsXG4gICAvKD86XFxuXFxufF4pXG4gICAoXHRcdFx0XHRcdFx0XHRcdC8vICQxID0gdGhlIGNvZGUgYmxvY2sgLS0gb25lIG9yIG1vcmUgbGluZXMsIHN0YXJ0aW5nIHdpdGggYSBzcGFjZS90YWJcbiAgICg/OlxuICAgKD86WyBdezR9fFxcdClcdFx0XHQvLyBMaW5lcyBtdXN0IHN0YXJ0IHdpdGggYSB0YWIgb3IgYSB0YWItd2lkdGggb2Ygc3BhY2VzIC0gYXR0YWNrbGFiOiBnX3RhYl93aWR0aFxuICAgLipcXG4rXG4gICApK1xuICAgKVxuICAgKFxcbipbIF17MCwzfVteIFxcdFxcbl18KD89fjApKVx0Ly8gYXR0YWNrbGFiOiBnX3RhYl93aWR0aFxuICAgL2csZnVuY3Rpb24oKXsuLi59KTtcbiAgICovXG5cbiAgLy8gYXR0YWNrbGFiOiBzZW50aW5lbCB3b3JrYXJvdW5kcyBmb3IgbGFjayBvZiBcXEEgYW5kIFxcWiwgc2FmYXJpXFxraHRtbCBidWdcbiAgdGV4dCArPSAnfjAnO1xuXG4gIHZhciBwYXR0ZXJuID0gLyg/OlxcblxcbnxeKSgoPzooPzpbIF17NH18XFx0KS4qXFxuKykrKShcXG4qWyBdezAsM31bXiBcXHRcXG5dfCg/PX4wKSkvZztcbiAgdGV4dCA9IHRleHQucmVwbGFjZShwYXR0ZXJuLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIG0yKSB7XG4gICAgdmFyIGNvZGVibG9jayA9IG0xLFxuICAgICAgICBuZXh0Q2hhciA9IG0yLFxuICAgICAgICBlbmQgPSAnXFxuJztcblxuICAgIGNvZGVibG9jayA9IHNob3dkb3duLnN1YlBhcnNlcignb3V0ZGVudCcpKGNvZGVibG9jayk7XG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykoY29kZWJsb2NrKTtcbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJykoY29kZWJsb2NrKTtcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXlxcbisvZywgJycpOyAvLyB0cmltIGxlYWRpbmcgbmV3bGluZXNcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXFxuKyQvZywgJycpOyAvLyB0cmltIHRyYWlsaW5nIG5ld2xpbmVzXG5cbiAgICBpZiAob3B0aW9ucy5vbWl0RXh0cmFXTEluQ29kZUJsb2Nrcykge1xuICAgICAgZW5kID0gJyc7XG4gICAgfVxuXG4gICAgY29kZWJsb2NrID0gJzxwcmU+PGNvZGU+JyArIGNvZGVibG9jayArIGVuZCArICc8L2NvZGU+PC9wcmU+JztcblxuICAgIHJldHVybiBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscykgKyBuZXh0Q2hhcjtcbiAgfSk7XG5cbiAgLy8gYXR0YWNrbGFiOiBzdHJpcCBzZW50aW5lbFxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9+MC8sICcnKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdjb2RlQmxvY2tzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbi8qKlxuICpcbiAqICAgKiAgQmFja3RpY2sgcXVvdGVzIGFyZSB1c2VkIGZvciA8Y29kZT48L2NvZGU+IHNwYW5zLlxuICpcbiAqICAgKiAgWW91IGNhbiB1c2UgbXVsdGlwbGUgYmFja3RpY2tzIGFzIHRoZSBkZWxpbWl0ZXJzIGlmIHlvdSB3YW50IHRvXG4gKiAgICAgaW5jbHVkZSBsaXRlcmFsIGJhY2t0aWNrcyBpbiB0aGUgY29kZSBzcGFuLiBTbywgdGhpcyBpbnB1dDpcbiAqXG4gKiAgICAgICAgIEp1c3QgdHlwZSBgYGZvbyBgYmFyYCBiYXpgYCBhdCB0aGUgcHJvbXB0LlxuICpcbiAqICAgICAgIFdpbGwgdHJhbnNsYXRlIHRvOlxuICpcbiAqICAgICAgICAgPHA+SnVzdCB0eXBlIDxjb2RlPmZvbyBgYmFyYCBiYXo8L2NvZGU+IGF0IHRoZSBwcm9tcHQuPC9wPlxuICpcbiAqICAgIFRoZXJlJ3Mgbm8gYXJiaXRyYXJ5IGxpbWl0IHRvIHRoZSBudW1iZXIgb2YgYmFja3RpY2tzIHlvdVxuICogICAgY2FuIHVzZSBhcyBkZWxpbXRlcnMuIElmIHlvdSBuZWVkIHRocmVlIGNvbnNlY3V0aXZlIGJhY2t0aWNrc1xuICogICAgaW4geW91ciBjb2RlLCB1c2UgZm91ciBmb3IgZGVsaW1pdGVycywgZXRjLlxuICpcbiAqICAqICBZb3UgY2FuIHVzZSBzcGFjZXMgdG8gZ2V0IGxpdGVyYWwgYmFja3RpY2tzIGF0IHRoZSBlZGdlczpcbiAqXG4gKiAgICAgICAgIC4uLiB0eXBlIGBgIGBiYXJgIGBgIC4uLlxuICpcbiAqICAgICAgIFR1cm5zIHRvOlxuICpcbiAqICAgICAgICAgLi4uIHR5cGUgPGNvZGU+YGJhcmA8L2NvZGU+IC4uLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2NvZGVTcGFucycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdjb2RlU3BhbnMuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLypcbiAgIHR0dCA9IHR0dC5yZXBsYWNlKC9cbiAgIChefFteXFxcXF0pXHRcdFx0XHRcdC8vIENoYXJhY3RlciBiZWZvcmUgb3BlbmluZyBgIGNhbid0IGJlIGEgYmFja3NsYXNoXG4gICAoYCspXHRcdFx0XHRcdFx0Ly8gJDIgPSBPcGVuaW5nIHJ1biBvZiBgXG4gICAoXHRcdFx0XHRcdFx0XHQvLyAkMyA9IFRoZSBjb2RlIGJsb2NrXG4gICBbXlxccl0qP1xuICAgW15gXVx0XHRcdFx0XHQvLyBhdHRhY2tsYWI6IHdvcmsgYXJvdW5kIGxhY2sgb2YgbG9va2JlaGluZFxuICAgKVxuICAgXFwyXHRcdFx0XHRcdFx0XHQvLyBNYXRjaGluZyBjbG9zZXJcbiAgICg/IWApXG4gICAvZ20sIGZ1bmN0aW9uKCl7Li4ufSk7XG4gICAqL1xuXG4gIGlmICh0eXBlb2YodGV4dCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGV4dCA9ICcnO1xuICB9XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhefFteXFxcXF0pKGArKShbXlxccl0qP1teYF0pXFwyKD8hYCkvZ20sXG4gICAgZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xLCBtMiwgbTMpIHtcbiAgICAgIHZhciBjID0gbTM7XG4gICAgICBjID0gYy5yZXBsYWNlKC9eKFsgXFx0XSopL2csICcnKTtcdC8vIGxlYWRpbmcgd2hpdGVzcGFjZVxuICAgICAgYyA9IGMucmVwbGFjZSgvWyBcXHRdKiQvZywgJycpO1x0Ly8gdHJhaWxpbmcgd2hpdGVzcGFjZVxuICAgICAgYyA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScpKGMpO1xuICAgICAgcmV0dXJuIG0xICsgJzxjb2RlPicgKyBjICsgJzwvY29kZT4nO1xuICAgIH1cbiAgKTtcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdjb2RlU3BhbnMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGFsbCB0YWJzIHRvIHNwYWNlc1xuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJywgZnVuY3Rpb24gKHRleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIGV4cGFuZCBmaXJzdCBuLTEgdGFic1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQoPz1cXHQpL2csICcgICAgJyk7IC8vIGdfdGFiX3dpZHRoXG5cbiAgLy8gcmVwbGFjZSB0aGUgbnRoIHdpdGggdHdvIHNlbnRpbmVsc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZywgJ35BfkInKTtcblxuICAvLyB1c2UgdGhlIHNlbnRpbmVsIHRvIGFuY2hvciBvdXIgcmVnZXggc28gaXQgZG9lc24ndCBleHBsb2RlXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL35CKC4rPyl+QS9nLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEpIHtcbiAgICB2YXIgbGVhZGluZ1RleHQgPSBtMSxcbiAgICAgICAgbnVtU3BhY2VzID0gNCAtIGxlYWRpbmdUZXh0Lmxlbmd0aCAlIDQ7ICAvLyBnX3RhYl93aWR0aFxuXG4gICAgLy8gdGhlcmUgKm11c3QqIGJlIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzOlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtU3BhY2VzOyBpKyspIHtcbiAgICAgIGxlYWRpbmdUZXh0ICs9ICcgJztcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZGluZ1RleHQ7XG4gIH0pO1xuXG4gIC8vIGNsZWFuIHVwIHNlbnRpbmVsc1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9+QS9nLCAnICAgICcpOyAgLy8gZ190YWJfd2lkdGhcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvfkIvZywgJycpO1xuXG4gIHJldHVybiB0ZXh0O1xuXG59KTtcblxuLyoqXG4gKiBTbWFydCBwcm9jZXNzaW5nIGZvciBhbXBlcnNhbmRzIGFuZCBhbmdsZSBicmFja2V0cyB0aGF0IG5lZWQgdG8gYmUgZW5jb2RlZC5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVBbXBzQW5kQW5nbGVzJywgZnVuY3Rpb24gKHRleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBBbXBlcnNhbmQtZW5jb2RpbmcgYmFzZWQgZW50aXJlbHkgb24gTmF0IElyb25zJ3MgQW1wdXRhdG9yIE1UIHBsdWdpbjpcbiAgLy8gaHR0cDovL2J1bXBwby5uZXQvcHJvamVjdHMvYW1wdXRhdG9yL1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mKD8hIz9beFhdPyg/OlswLTlhLWZBLUZdK3xcXHcrKTspL2csICcmYW1wOycpO1xuXG4gIC8vIEVuY29kZSBuYWtlZCA8J3NcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvPCg/IVthLXpcXC8/XFwkIV0pL2dpLCAnJmx0OycpO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RyaW5nLCB3aXRoIGFmdGVyIHByb2Nlc3NpbmcgdGhlIGZvbGxvd2luZyBiYWNrc2xhc2ggZXNjYXBlIHNlcXVlbmNlcy5cbiAqXG4gKiBhdHRhY2tsYWI6IFRoZSBwb2xpdGUgd2F5IHRvIGRvIHRoaXMgaXMgd2l0aCB0aGUgbmV3IGVzY2FwZUNoYXJhY3RlcnMoKSBmdW5jdGlvbjpcbiAqXG4gKiAgICB0dHQgPSBlc2NhcGVDaGFyYWN0ZXJzKHR0dCxcIlxcXFxcIix0cnVlKTtcbiAqICAgIHR0dCA9IGVzY2FwZUNoYXJhY3RlcnModHR0LFwiYCpfe31bXSgpPiMrLS4hXCIsdHJ1ZSk7XG4gKlxuICogLi4uYnV0IHdlJ3JlIHNpZGVzdGVwcGluZyBpdHMgdXNlIG9mIHRoZSAoc2xvdykgUmVnRXhwIGNvbnN0cnVjdG9yXG4gKiBhcyBhbiBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guICBUaGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGEgTE9ULlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUJhY2tzbGFzaEVzY2FwZXMnLCBmdW5jdGlvbiAodGV4dCkge1xuICAndXNlIHN0cmljdCc7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcXFwoXFxcXCkvZywgc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnNDYWxsYmFjayk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcXFwoW2AqX3t9XFxbXFxdKCk+IystLiFdKS9nLCBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVyc0NhbGxiYWNrKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBFbmNvZGUvZXNjYXBlIGNlcnRhaW4gY2hhcmFjdGVycyBpbnNpZGUgTWFya2Rvd24gY29kZSBydW5zLlxuICogVGhlIHBvaW50IGlzIHRoYXQgaW4gY29kZSwgdGhlc2UgY2hhcmFjdGVycyBhcmUgbGl0ZXJhbHMsXG4gKiBhbmQgbG9zZSB0aGVpciBzcGVjaWFsIE1hcmtkb3duIG1lYW5pbmdzLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2VuY29kZUNvZGUnLCBmdW5jdGlvbiAodGV4dCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRW5jb2RlIGFsbCBhbXBlcnNhbmRzOyBIVE1MIGVudGl0aWVzIGFyZSBub3RcbiAgLy8gZW50aXRpZXMgd2l0aGluIGEgTWFya2Rvd24gY29kZSBzcGFuLlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8mL2csICcmYW1wOycpO1xuXG4gIC8vIERvIHRoZSBhbmdsZSBicmFja2V0IHNvbmcgYW5kIGRhbmNlOlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC88L2csICcmbHQ7Jyk7XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLz4vZywgJyZndDsnKTtcblxuICAvLyBOb3csIGVzY2FwZSBjaGFyYWN0ZXJzIHRoYXQgYXJlIG1hZ2ljIGluIE1hcmtkb3duOlxuICB0ZXh0ID0gc2hvd2Rvd24uaGVscGVyLmVzY2FwZUNoYXJhY3RlcnModGV4dCwgJypfe31bXVxcXFwnLCBmYWxzZSk7XG5cbiAgLy8gamogdGhlIGxpbmUgYWJvdmUgYnJlYWtzIHRoaXM6XG4gIC8vLS0tXG4gIC8vKiBJdGVtXG4gIC8vICAgMS4gU3ViaXRlbVxuICAvLyAgICAgICAgICAgIHNwZWNpYWwgY2hhcjogKlxuICAvLyAtLS1cblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXG4vKipcbiAqICBJbnB1dDogYW4gZW1haWwgYWRkcmVzcywgZS5nLiBcImZvb0BleGFtcGxlLmNvbVwiXG4gKlxuICogIE91dHB1dDogdGhlIGVtYWlsIGFkZHJlc3MgYXMgYSBtYWlsdG8gbGluaywgd2l0aCBlYWNoIGNoYXJhY3RlclxuICogICAgb2YgdGhlIGFkZHJlc3MgZW5jb2RlZCBhcyBlaXRoZXIgYSBkZWNpbWFsIG9yIGhleCBlbnRpdHksIGluXG4gKiAgICB0aGUgaG9wZXMgb2YgZm9pbGluZyBtb3N0IGFkZHJlc3MgaGFydmVzdGluZyBzcGFtIGJvdHMuIEUuZy46XG4gKlxuICogICAgPGEgaHJlZj1cIiYjeDZEOyYjOTc7JiMxMDU7JiMxMDg7JiN4NzQ7JiMxMTE7OiYjMTAyOyYjMTExOyYjMTExOyYjNjQ7JiMxMDE7XG4gKiAgICAgICB4JiN4NjE7JiMxMDk7JiN4NzA7JiMxMDg7JiN4NjU7JiN4MkU7JiM5OTsmIzExMTsmIzEwOTtcIj4mIzEwMjsmIzExMTsmIzExMTtcbiAqICAgICAgICYjNjQ7JiMxMDE7eCYjeDYxOyYjMTA5OyYjeDcwOyYjMTA4OyYjeDY1OyYjeDJFOyYjOTk7JiMxMTE7JiMxMDk7PC9hPlxuICpcbiAqICBCYXNlZCBvbiBhIGZpbHRlciBieSBNYXR0aGV3IFdpY2tsaW5lLCBwb3N0ZWQgdG8gdGhlIEJCRWRpdC1UYWxrXG4gKiAgbWFpbGluZyBsaXN0OiA8aHR0cDovL3Rpbnl1cmwuY29tL3l1N3VlPlxuICpcbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVFbWFpbEFkZHJlc3MnLCBmdW5jdGlvbiAoYWRkcikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGVuY29kZSA9IFtcbiAgICBmdW5jdGlvbiAoY2gpIHtcbiAgICAgIHJldHVybiAnJiMnICsgY2guY2hhckNvZGVBdCgwKSArICc7JztcbiAgICB9LFxuICAgIGZ1bmN0aW9uIChjaCkge1xuICAgICAgcmV0dXJuICcmI3gnICsgY2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikgKyAnOyc7XG4gICAgfSxcbiAgICBmdW5jdGlvbiAoY2gpIHtcbiAgICAgIHJldHVybiBjaDtcbiAgICB9XG4gIF07XG5cbiAgYWRkciA9ICdtYWlsdG86JyArIGFkZHI7XG5cbiAgYWRkciA9IGFkZHIucmVwbGFjZSgvLi9nLCBmdW5jdGlvbiAoY2gpIHtcbiAgICBpZiAoY2ggPT09ICdAJykge1xuICAgICAgLy8gdGhpcyAqbXVzdCogYmUgZW5jb2RlZC4gSSBpbnNpc3QuXG4gICAgICBjaCA9IGVuY29kZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV0oY2gpO1xuICAgIH0gZWxzZSBpZiAoY2ggIT09ICc6Jykge1xuICAgICAgLy8gbGVhdmUgJzonIGFsb25lICh0byBzcG90IG1haWx0bzogbGF0ZXIpXG4gICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAvLyByb3VnaGx5IDEwJSByYXcsIDQ1JSBoZXgsIDQ1JSBkZWNcbiAgICAgIGNoID0gKFxuICAgICAgICByID4gMC45ID8gZW5jb2RlWzJdKGNoKSA6IHIgPiAwLjQ1ID8gZW5jb2RlWzFdKGNoKSA6IGVuY29kZVswXShjaClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjaDtcbiAgfSk7XG5cbiAgYWRkciA9ICc8YSBocmVmPVwiJyArIGFkZHIgKyAnXCI+JyArIGFkZHIgKyAnPC9hPic7XG4gIGFkZHIgPSBhZGRyLnJlcGxhY2UoL1wiPi4rOi9nLCAnXCI+Jyk7IC8vIHN0cmlwIHRoZSBtYWlsdG86IGZyb20gdGhlIHZpc2libGUgcGFydFxuXG4gIHJldHVybiBhZGRyO1xufSk7XG5cbi8qKlxuICogV2l0aGluIHRhZ3MgLS0gbWVhbmluZyBiZXR3ZWVuIDwgYW5kID4gLS0gZW5jb2RlIFtcXCBgICogX10gc28gdGhleVxuICogZG9uJ3QgY29uZmxpY3Qgd2l0aCB0aGVpciB1c2UgaW4gTWFya2Rvd24gZm9yIGNvZGUsIGl0YWxpY3MgYW5kIHN0cm9uZy5cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdlc2NhcGVTcGVjaWFsQ2hhcnNXaXRoaW5UYWdBdHRyaWJ1dGVzJywgZnVuY3Rpb24gKHRleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEJ1aWxkIGEgcmVnZXggdG8gZmluZCBIVE1MIHRhZ3MgYW5kIGNvbW1lbnRzLiAgU2VlIEZyaWVkbCdzXG4gIC8vIFwiTWFzdGVyaW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnNcIiwgMm5kIEVkLiwgcHAuIDIwMC0yMDEuXG4gIHZhciByZWdleCA9IC8oPFthLXpcXC8hJF0oXCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj58PCEoLS0uKj8tLVxccyopKz4pL2dpO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVnZXgsIGZ1bmN0aW9uICh3aG9sZU1hdGNoKSB7XG4gICAgdmFyIHRhZyA9IHdob2xlTWF0Y2gucmVwbGFjZSgvKC4pPFxcLz9jb2RlPig/PS4pL2csICckMWAnKTtcbiAgICB0YWcgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh0YWcsICdcXFxcYCpfJywgZmFsc2UpO1xuICAgIHJldHVybiB0YWc7XG4gIH0pO1xuXG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGdpdGh1YiBjb2RlYmxvY2tzIHByaW9yIHRvIHJ1bm5pbmcgSGFzaEhUTUwgc28gdGhhdFxuICogSFRNTCBjb250YWluZWQgd2l0aGluIHRoZSBjb2RlYmxvY2sgZ2V0cyBlc2NhcGVkIHByb3Blcmx5XG4gKiBFeGFtcGxlOlxuICogYGBgcnVieVxuICogICAgIGRlZiBoZWxsb193b3JsZCh4KVxuICogICAgICAgcHV0cyBcIkhlbGxvLCAje3h9XCJcbiAqICAgICBlbmRcbiAqIGBgYFxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2dpdGh1YkNvZGVCbG9ja3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gZWFybHkgZXhpdCBpZiBvcHRpb24gaXMgbm90IGVuYWJsZWRcbiAgaWYgKCFvcHRpb25zLmdoQ29kZUJsb2Nrcykge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZ2l0aHViQ29kZUJsb2Nrcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB0ZXh0ICs9ICd+MCc7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvKD86XnxcXG4pYGBgKC4qKVxcbihbXFxzXFxTXSo/KVxcbmBgYC9nLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbGFuZ3VhZ2UsIGNvZGVibG9jaykge1xuICAgIHZhciBlbmQgPSAob3B0aW9ucy5vbWl0RXh0cmFXTEluQ29kZUJsb2NrcykgPyAnJyA6ICdcXG4nO1xuXG4gICAgLy8gRmlyc3QgcGFyc2UgdGhlIGdpdGh1YiBjb2RlIGJsb2NrXG4gICAgY29kZWJsb2NrID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykoY29kZWJsb2NrKTtcbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2RldGFiJykoY29kZWJsb2NrKTtcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXlxcbisvZywgJycpOyAvLyB0cmltIGxlYWRpbmcgbmV3bGluZXNcbiAgICBjb2RlYmxvY2sgPSBjb2RlYmxvY2sucmVwbGFjZSgvXFxuKyQvZywgJycpOyAvLyB0cmltIHRyYWlsaW5nIHdoaXRlc3BhY2VcblxuICAgIGNvZGVibG9jayA9ICc8cHJlPjxjb2RlJyArIChsYW5ndWFnZSA/ICcgY2xhc3M9XCInICsgbGFuZ3VhZ2UgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZSArICdcIicgOiAnJykgKyAnPicgKyBjb2RlYmxvY2sgKyBlbmQgKyAnPC9jb2RlPjwvcHJlPic7XG5cbiAgICBjb2RlYmxvY2sgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGNvZGVibG9jaywgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgICAvLyBTaW5jZSBHSENvZGVibG9ja3MgY2FuIGJlIGZhbHNlIHBvc2l0aXZlcywgd2UgbmVlZCB0b1xuICAgIC8vIHN0b3JlIHRoZSBwcmltaXRpdmUgdHR0IGFuZCB0aGUgcGFyc2VkIHR0dCBpbiBhIGdsb2JhbCB2YXIsXG4gICAgLy8gYW5kIHRoZW4gcmV0dXJuIGEgdG9rZW5cbiAgICByZXR1cm4gJ1xcblxcbn5HJyArIChnbG9iYWxzLmdoQ29kZUJsb2Nrcy5wdXNoKHt0ZXh0OiB3aG9sZU1hdGNoLCBjb2RlYmxvY2s6IGNvZGVibG9ja30pIC0gMSkgKyAnR1xcblxcbic7XG4gIH0pO1xuXG4gIC8vIGF0dGFja2xhYjogc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvfjAvLCAnJyk7XG5cbiAgcmV0dXJuIGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnZ2l0aHViQ29kZUJsb2Nrcy5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xufSk7XG5cbnNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXlxcbit8XFxuKyQpL2csICcnKTtcbiAgcmV0dXJuICdcXG5cXG5+SycgKyAoZ2xvYmFscy5nSHRtbEJsb2Nrcy5wdXNoKHRleHQpIC0gMSkgKyAnS1xcblxcbic7XG59KTtcblxuc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoRWxlbWVudCcsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICByZXR1cm4gZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG0xKSB7XG4gICAgdmFyIGJsb2NrVGV4dCA9IG0xO1xuXG4gICAgLy8gVW5kbyBkb3VibGUgbGluZXNcbiAgICBibG9ja1RleHQgPSBibG9ja1RleHQucmVwbGFjZSgvXFxuXFxuL2csICdcXG4nKTtcbiAgICBibG9ja1RleHQgPSBibG9ja1RleHQucmVwbGFjZSgvXlxcbi8sICcnKTtcblxuICAgIC8vIHN0cmlwIHRyYWlsaW5nIGJsYW5rIGxpbmVzXG4gICAgYmxvY2tUZXh0ID0gYmxvY2tUZXh0LnJlcGxhY2UoL1xcbiskL2csICcnKTtcblxuICAgIC8vIFJlcGxhY2UgdGhlIGVsZW1lbnQgdHR0IHdpdGggYSBtYXJrZXIgKFwifkt4S1wiIHdoZXJlIHggaXMgaXRzIGtleSlcbiAgICBibG9ja1RleHQgPSAnXFxuXFxufksnICsgKGdsb2JhbHMuZ0h0bWxCbG9ja3MucHVzaChibG9ja1RleHQpIC0gMSkgKyAnS1xcblxcbic7XG5cbiAgICByZXR1cm4gYmxvY2tUZXh0O1xuICB9O1xufSk7XG5cbnNob3dkb3duLnN1YlBhcnNlcignaGFzaEhUTUxCbG9ja3MnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGJsb2NrVGFncyA9IFtcbiAgICAgICdwcmUnLFxuICAgICAgJ2RpdicsXG4gICAgICAnaDEnLFxuICAgICAgJ2gyJyxcbiAgICAgICdoMycsXG4gICAgICAnaDQnLFxuICAgICAgJ2g1JyxcbiAgICAgICdoNicsXG4gICAgICAnYmxvY2txdW90ZScsXG4gICAgICAndGFibGUnLFxuICAgICAgJ2RsJyxcbiAgICAgICdvbCcsXG4gICAgICAndWwnLFxuICAgICAgJ3NjcmlwdCcsXG4gICAgICAnbm9zY3JpcHQnLFxuICAgICAgJ2Zvcm0nLFxuICAgICAgJ2ZpZWxkc2V0JyxcbiAgICAgICdpZnJhbWUnLFxuICAgICAgJ21hdGgnLFxuICAgICAgJ3N0eWxlJyxcbiAgICAgICdzZWN0aW9uJyxcbiAgICAgICdoZWFkZXInLFxuICAgICAgJ2Zvb3RlcicsXG4gICAgICAnbmF2JyxcbiAgICAgICdhcnRpY2xlJyxcbiAgICAgICdhc2lkZScsXG4gICAgICAnYWRkcmVzcycsXG4gICAgICAnYXVkaW8nLFxuICAgICAgJ2NhbnZhcycsXG4gICAgICAnZmlndXJlJyxcbiAgICAgICdoZ3JvdXAnLFxuICAgICAgJ291dHB1dCcsXG4gICAgICAndmlkZW8nLFxuICAgICAgJ3AnXG4gICAgXSxcbiAgICByZXBGdW5jID0gZnVuY3Rpb24gKHdob2xlTWF0Y2gsIG1hdGNoLCBsZWZ0LCByaWdodCkge1xuICAgICAgdmFyIHR4dCA9IHdob2xlTWF0Y2g7XG4gICAgICAvLyBjaGVjayBpZiB0aGlzIGh0bWwgZWxlbWVudCBpcyBtYXJrZWQgYXMgbWFya2Rvd25cbiAgICAgIC8vIGlmIHNvLCBpdCdzIGNvbnRlbnRzIHNob3VsZCBiZSBwYXJzZWQgYXMgbWFya2Rvd25cbiAgICAgIGlmIChsZWZ0LnNlYXJjaCgvXFxibWFya2Rvd25cXGIvKSAhPT0gLTEpIHtcbiAgICAgICAgdHh0ID0gbGVmdCArIGdsb2JhbHMuY29udmVydGVyLm1ha2VIdG1sKG1hdGNoKSArIHJpZ2h0O1xuICAgICAgfVxuICAgICAgcmV0dXJuICdcXG5cXG5+SycgKyAoZ2xvYmFscy5nSHRtbEJsb2Nrcy5wdXNoKHR4dCkgLSAxKSArICdLXFxuXFxuJztcbiAgICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tUYWdzLmxlbmd0aDsgKytpKSB7XG4gICAgdGV4dCA9IHNob3dkb3duLmhlbHBlci5yZXBsYWNlUmVjdXJzaXZlUmVnRXhwKHRleHQsIHJlcEZ1bmMsICdeKD86IHxcXFxcdCl7MCwzfTwnICsgYmxvY2tUYWdzW2ldICsgJ1xcXFxiW14+XSo+JywgJzwvJyArIGJsb2NrVGFnc1tpXSArICc+JywgJ2dpbScpO1xuICB9XG5cbiAgLy8gSFIgU1BFQ0lBTCBDQVNFXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhcXG5bIF17MCwzfSg8KGhyKVxcYihbXjw+XSkqP1xcLz8+KVsgXFx0XSooPz1cXG57Mix9KSkvZyxcbiAgICBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hFbGVtZW50JykodGV4dCwgb3B0aW9ucywgZ2xvYmFscykpO1xuXG4gIC8vIFNwZWNpYWwgY2FzZSBmb3Igc3RhbmRhbG9uZSBIVE1MIGNvbW1lbnRzOlxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oPCEtLVtcXHNcXFNdKj8tLT4pL2csXG4gICAgc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoRWxlbWVudCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpKTtcblxuICAvLyBQSFAgYW5kIEFTUC1zdHlsZSBwcm9jZXNzb3IgaW5zdHJ1Y3Rpb25zICg8Py4uLj8+IGFuZCA8JS4uLiU+KVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oPzpcXG5cXG4pKFsgXXswLDN9KD86PChbPyVdKVteXFxyXSo/XFwyPilbIFxcdF0qKD89XFxuezIsfSkpL2csXG4gICAgc2hvd2Rvd24uc3ViUGFyc2VyKCdoYXNoRWxlbWVudCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBIYXNoIHNwYW4gZWxlbWVudHMgdGhhdCBzaG91bGQgbm90IGJlIHBhcnNlZCBhcyBtYXJrZG93blxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hIVE1MU3BhbnMnLCBmdW5jdGlvbiAodGV4dCwgY29uZmlnLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hlcyA9IHNob3dkb3duLmhlbHBlci5tYXRjaFJlY3Vyc2l2ZVJlZ0V4cCh0ZXh0LCAnPGNvZGVcXFxcYltePl0qPicsICc8L2NvZGU+JywgJ2dpJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgKytpKSB7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShtYXRjaGVzW2ldWzBdLCAnfkwnICsgKGdsb2JhbHMuZ0h0bWxTcGFucy5wdXNoKG1hdGNoZXNbaV1bMF0pIC0gMSkgKyAnTCcpO1xuICB9XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbi8qKlxuICogVW5oYXNoIEhUTUwgc3BhbnNcbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCd1bmhhc2hIVE1MU3BhbnMnLCBmdW5jdGlvbiAodGV4dCwgY29uZmlnLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGdsb2JhbHMuZ0h0bWxTcGFucy5sZW5ndGg7ICsraSkge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoJ35MJyArIGkgKyAnTCcsIGdsb2JhbHMuZ0h0bWxTcGFuc1tpXSk7XG4gIH1cblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXG4vKipcbiAqIEhhc2ggc3BhbiBlbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgcGFyc2VkIGFzIG1hcmtkb3duXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaGFzaFByZUNvZGVUYWdzJywgZnVuY3Rpb24gKHRleHQsIGNvbmZpZywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHJlcEZ1bmMgPSBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbWF0Y2gsIGxlZnQsIHJpZ2h0KSB7XG4gICAgLy8gZW5jb2RlIGh0bWwgZW50aXRpZXNcbiAgICB2YXIgY29kZWJsb2NrID0gbGVmdCArIHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQ29kZScpKG1hdGNoKSArIHJpZ2h0O1xuICAgIHJldHVybiAnXFxuXFxufkcnICsgKGdsb2JhbHMuZ2hDb2RlQmxvY2tzLnB1c2goe3RleHQ6IHdob2xlTWF0Y2gsIGNvZGVibG9jazogY29kZWJsb2NrfSkgLSAxKSArICdHXFxuXFxuJztcbiAgfTtcblxuICB0ZXh0ID0gc2hvd2Rvd24uaGVscGVyLnJlcGxhY2VSZWN1cnNpdmVSZWdFeHAodGV4dCwgcmVwRnVuYywgJ14oPzogfFxcXFx0KXswLDN9PHByZVxcXFxiW14+XSo+XFxcXHMqPGNvZGVcXFxcYltePl0qPicsICdeKD86IHxcXFxcdCl7MCwzfTwvY29kZT5cXFxccyo8L3ByZT4nLCAnZ2ltJyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbnNob3dkb3duLnN1YlBhcnNlcignaGVhZGVycycsIGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdoZWFkZXJzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHZhciBwcmVmaXhIZWFkZXIgPSBvcHRpb25zLnByZWZpeEhlYWRlcklkLFxuICAgICAgaGVhZGVyTGV2ZWxTdGFydCA9IChpc05hTihwYXJzZUludChvcHRpb25zLmhlYWRlckxldmVsU3RhcnQpKSkgPyAxIDogcGFyc2VJbnQob3B0aW9ucy5oZWFkZXJMZXZlbFN0YXJ0KSxcblxuICAvLyBTZXQgdHR0LXN0eWxlIGhlYWRlcnM6XG4gIC8vXHRIZWFkZXIgMVxuICAvL1x0PT09PT09PT1cbiAgLy9cbiAgLy9cdEhlYWRlciAyXG4gIC8vXHQtLS0tLS0tLVxuICAvL1xuICAgICAgc2V0ZXh0UmVnZXhIMSA9IChvcHRpb25zLnNtb290aExpdmVQcmV2aWV3KSA/IC9eKC4rKVsgXFx0XSpcXG49ezIsfVsgXFx0XSpcXG4rL2dtIDogL14oLispWyBcXHRdKlxcbj0rWyBcXHRdKlxcbisvZ20sXG4gICAgICBzZXRleHRSZWdleEgyID0gKG9wdGlvbnMuc21vb3RoTGl2ZVByZXZpZXcpID8gL14oLispWyBcXHRdKlxcbi17Mix9WyBcXHRdKlxcbisvZ20gOiAvXiguKylbIFxcdF0qXFxuLStbIFxcdF0qXFxuKy9nbTtcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHNldGV4dFJlZ2V4SDEsIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSkge1xuXG4gICAgdmFyIHNwYW5HYW11dCA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykobTEsIG9wdGlvbnMsIGdsb2JhbHMpLFxuICAgICAgICBoSUQgPSAob3B0aW9ucy5ub0hlYWRlcklkKSA/ICcnIDogJyBpZD1cIicgKyBoZWFkZXJJZChtMSkgKyAnXCInLFxuICAgICAgICBoTGV2ZWwgPSBoZWFkZXJMZXZlbFN0YXJ0LFxuICAgICAgICBoYXNoQmxvY2sgPSAnPGgnICsgaExldmVsICsgaElEICsgJz4nICsgc3BhbkdhbXV0ICsgJzwvaCcgKyBoTGV2ZWwgKyAnPic7XG4gICAgcmV0dXJuIHNob3dkb3duLnN1YlBhcnNlcignaGFzaEJsb2NrJykoaGFzaEJsb2NrLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgfSk7XG5cbiAgdGV4dCA9IHRleHQucmVwbGFjZShzZXRleHRSZWdleEgyLCBmdW5jdGlvbiAobWF0Y2hGb3VuZCwgbTEpIHtcbiAgICB2YXIgc3BhbkdhbXV0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShtMSwgb3B0aW9ucywgZ2xvYmFscyksXG4gICAgICAgIGhJRCA9IChvcHRpb25zLm5vSGVhZGVySWQpID8gJycgOiAnIGlkPVwiJyArIGhlYWRlcklkKG0xKSArICdcIicsXG4gICAgICAgIGhMZXZlbCA9IGhlYWRlckxldmVsU3RhcnQgKyAxLFxuICAgICAgaGFzaEJsb2NrID0gJzxoJyArIGhMZXZlbCArIGhJRCArICc+JyArIHNwYW5HYW11dCArICc8L2gnICsgaExldmVsICsgJz4nO1xuICAgIHJldHVybiBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGhhc2hCbG9jaywgb3B0aW9ucywgZ2xvYmFscyk7XG4gIH0pO1xuXG4gIC8vIGF0eC1zdHlsZSBoZWFkZXJzOlxuICAvLyAgIyBIZWFkZXIgMVxuICAvLyAgIyMgSGVhZGVyIDJcbiAgLy8gICMjIEhlYWRlciAyIHdpdGggY2xvc2luZyBoYXNoZXMgIyNcbiAgLy8gIC4uLlxuICAvLyAgIyMjIyMjIEhlYWRlciA2XG4gIC8vXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL14oI3sxLDZ9KVsgXFx0XSooLis/KVsgXFx0XSojKlxcbisvZ20sIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSwgbTIpIHtcbiAgICB2YXIgc3BhbiA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JykobTIsIG9wdGlvbnMsIGdsb2JhbHMpLFxuICAgICAgICBoSUQgPSAob3B0aW9ucy5ub0hlYWRlcklkKSA/ICcnIDogJyBpZD1cIicgKyBoZWFkZXJJZChtMikgKyAnXCInLFxuICAgICAgICBoTGV2ZWwgPSBoZWFkZXJMZXZlbFN0YXJ0IC0gMSArIG0xLmxlbmd0aCxcbiAgICAgICAgaGVhZGVyID0gJzxoJyArIGhMZXZlbCArIGhJRCArICc+JyArIHNwYW4gKyAnPC9oJyArIGhMZXZlbCArICc+JztcblxuICAgIHJldHVybiBzaG93ZG93bi5zdWJQYXJzZXIoJ2hhc2hCbG9jaycpKGhlYWRlciwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhlYWRlcklkKG0pIHtcbiAgICB2YXIgdGl0bGUsIGVzY2FwZWRJZCA9IG0ucmVwbGFjZSgvW15cXHddL2csICcnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGdsb2JhbHMuaGFzaExpbmtDb3VudHNbZXNjYXBlZElkXSkge1xuICAgICAgdGl0bGUgPSBlc2NhcGVkSWQgKyAnLScgKyAoZ2xvYmFscy5oYXNoTGlua0NvdW50c1tlc2NhcGVkSWRdKyspO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZSA9IGVzY2FwZWRJZDtcbiAgICAgIGdsb2JhbHMuaGFzaExpbmtDb3VudHNbZXNjYXBlZElkXSA9IDE7XG4gICAgfVxuXG4gICAgLy8gUHJlZml4IGlkIHRvIHByZXZlbnQgY2F1c2luZyBpbmFkdmVydGVudCBwcmUtZXhpc3Rpbmcgc3R5bGUgbWF0Y2hlcy5cbiAgICBpZiAocHJlZml4SGVhZGVyID09PSB0cnVlKSB7XG4gICAgICBwcmVmaXhIZWFkZXIgPSAnc2VjdGlvbic7XG4gICAgfVxuXG4gICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1N0cmluZyhwcmVmaXhIZWFkZXIpKSB7XG4gICAgICByZXR1cm4gcHJlZml4SGVhZGVyICsgdGl0bGU7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZTtcbiAgfVxuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2hlYWRlcnMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBUdXJuIE1hcmtkb3duIGltYWdlIHNob3J0Y3V0cyBpbnRvIDxpbWc+IHRhZ3MuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignaW1hZ2VzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2ltYWdlcy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICB2YXIgaW5saW5lUmVnRXhwICAgID0gLyFcXFsoLio/KV1cXHM/XFwoWyBcXHRdKigpPD8oXFxTKz8pPj8oPzogPShbKlxcZF0rW0EtWmEteiVdezAsNH0peChbKlxcZF0rW0EtWmEteiVdezAsNH0pKT9bIFxcdF0qKD86KFsnXCJdKSguKj8pXFw2WyBcXHRdKik/XFwpL2csXG4gICAgICByZWZlcmVuY2VSZWdFeHAgPSAvIVxcWyhbXlxcXV0qPyldID8oPzpcXG4gKik/XFxbKC4qPyldKCkoKSgpKCkoKS9nO1xuXG4gIGZ1bmN0aW9uIHdyaXRlSW1hZ2VUYWcgKHdob2xlTWF0Y2gsIGFsdFRleHQsIGxpbmtJZCwgdXJsLCB3aWR0aCwgaGVpZ2h0LCBtNSwgdGl0bGUpIHtcblxuICAgIHZhciBnVXJscyAgID0gZ2xvYmFscy5nVXJscyxcbiAgICAgICAgZ1RpdGxlcyA9IGdsb2JhbHMuZ1RpdGxlcyxcbiAgICAgICAgZ0RpbXMgICA9IGdsb2JhbHMuZ0RpbWVuc2lvbnM7XG5cbiAgICBsaW5rSWQgPSBsaW5rSWQudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHRpdGxlID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHVybCA9PT0gJycgfHwgdXJsID09PSBudWxsKSB7XG4gICAgICBpZiAobGlua0lkID09PSAnJyB8fCBsaW5rSWQgPT09IG51bGwpIHtcbiAgICAgICAgLy8gbG93ZXItY2FzZSBhbmQgdHVybiBlbWJlZGRlZCBuZXdsaW5lcyBpbnRvIHNwYWNlc1xuICAgICAgICBsaW5rSWQgPSBhbHRUZXh0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvID9cXG4vZywgJyAnKTtcbiAgICAgIH1cbiAgICAgIHVybCA9ICcjJyArIGxpbmtJZDtcblxuICAgICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZ1VybHNbbGlua0lkXSkpIHtcbiAgICAgICAgdXJsID0gZ1VybHNbbGlua0lkXTtcbiAgICAgICAgaWYgKCFzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoZ1RpdGxlc1tsaW5rSWRdKSkge1xuICAgICAgICAgIHRpdGxlID0gZ1RpdGxlc1tsaW5rSWRdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2hvd2Rvd24uaGVscGVyLmlzVW5kZWZpbmVkKGdEaW1zW2xpbmtJZF0pKSB7XG4gICAgICAgICAgd2lkdGggPSBnRGltc1tsaW5rSWRdLndpZHRoO1xuICAgICAgICAgIGhlaWdodCA9IGdEaW1zW2xpbmtJZF0uaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd2hvbGVNYXRjaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhbHRUZXh0ID0gYWx0VGV4dC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gICAgYWx0VGV4dCA9IHNob3dkb3duLmhlbHBlci5lc2NhcGVDaGFyYWN0ZXJzKGFsdFRleHQsICcqXycsIGZhbHNlKTtcbiAgICB1cmwgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh1cmwsICcqXycsIGZhbHNlKTtcbiAgICB2YXIgcmVzdWx0ID0gJzxpbWcgc3JjPVwiJyArIHVybCArICdcIiBhbHQ9XCInICsgYWx0VGV4dCArICdcIic7XG5cbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIHRpdGxlID0gdGl0bGUucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICAgICAgdGl0bGUgPSBzaG93ZG93bi5oZWxwZXIuZXNjYXBlQ2hhcmFjdGVycyh0aXRsZSwgJypfJywgZmFsc2UpO1xuICAgICAgcmVzdWx0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cblxuICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcbiAgICAgIHdpZHRoICA9ICh3aWR0aCA9PT0gJyonKSA/ICdhdXRvJyA6IHdpZHRoO1xuICAgICAgaGVpZ2h0ID0gKGhlaWdodCA9PT0gJyonKSA/ICdhdXRvJyA6IGhlaWdodDtcblxuICAgICAgcmVzdWx0ICs9ICcgd2lkdGg9XCInICsgd2lkdGggKyAnXCInO1xuICAgICAgcmVzdWx0ICs9ICcgaGVpZ2h0PVwiJyArIGhlaWdodCArICdcIic7XG4gICAgfVxuXG4gICAgcmVzdWx0ICs9ICcgLz4nO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBGaXJzdCwgaGFuZGxlIHJlZmVyZW5jZS1zdHlsZSBsYWJlbGVkIGltYWdlczogIVthbHQgdHR0XVtpZF1cbiAgdGV4dCA9IHRleHQucmVwbGFjZShyZWZlcmVuY2VSZWdFeHAsIHdyaXRlSW1hZ2VUYWcpO1xuXG4gIC8vIE5leHQsIGhhbmRsZSBpbmxpbmUgaW1hZ2VzOiAgIVthbHQgdHR0XSh1cmwgPTx3aWR0aD54PGhlaWdodD4gXCJvcHRpb25hbCB0aXRsZVwiKVxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGlubGluZVJlZ0V4cCwgd3JpdGVJbWFnZVRhZyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaW1hZ2VzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHJldHVybiB0ZXh0O1xufSk7XG5cbnNob3dkb3duLnN1YlBhcnNlcignaXRhbGljc0FuZEJvbGQnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnaXRhbGljc0FuZEJvbGQuYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgaWYgKG9wdGlvbnMubGl0ZXJhbE1pZFdvcmRVbmRlcnNjb3Jlcykge1xuICAgIC8vdW5kZXJzY29yZXNcbiAgICAvLyBTaW5jZSB3ZSBhcmUgY29uc3VtaW5nIGEgXFxzIGNoYXJhY3Rlciwgd2UgbmVlZCB0byBhZGQgaXRcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXnxcXHN8PnxcXGIpX18oPz1cXFMpKFtcXHNcXFNdKz8pX18oPz1cXGJ8PHxcXHN8JCkvZ20sICckMTxzdHJvbmc+JDI8L3N0cm9uZz4nKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXnxcXHN8PnxcXGIpXyg/PVxcUykoW1xcc1xcU10rPylfKD89XFxifDx8XFxzfCQpL2dtLCAnJDE8ZW0+JDI8L2VtPicpO1xuICAgIC8vYXN0ZXJpc2tzXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKFxcKlxcKikoPz1cXFMpKFteXFxyXSo/XFxTWypdKilcXDEvZywgJzxzdHJvbmc+JDI8L3N0cm9uZz4nKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFwqKSg/PVxcUykoW15cXHJdKj9cXFMpXFwxL2csICc8ZW0+JDI8L2VtPicpO1xuXG4gIH0gZWxzZSB7XG4gICAgLy8gPHN0cm9uZz4gbXVzdCBnbyBmaXJzdDpcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFwqXFwqfF9fKSg/PVxcUykoW15cXHJdKj9cXFNbKl9dKilcXDEvZywgJzxzdHJvbmc+JDI8L3N0cm9uZz4nKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oXFwqfF8pKD89XFxTKShbXlxccl0qP1xcUylcXDEvZywgJzxlbT4kMjwvZW0+Jyk7XG4gIH1cblxuICB0ZXh0ID0gZ2xvYmFscy5jb252ZXJ0ZXIuX2Rpc3BhdGNoKCdpdGFsaWNzQW5kQm9sZC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXG4vKipcbiAqIEZvcm0gSFRNTCBvcmRlcmVkIChudW1iZXJlZCkgYW5kIHVub3JkZXJlZCAoYnVsbGV0ZWQpIGxpc3RzLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ2xpc3RzJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ2xpc3RzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAvKipcbiAgICogUHJvY2VzcyB0aGUgY29udGVudHMgb2YgYSBzaW5nbGUgb3JkZXJlZCBvciB1bm9yZGVyZWQgbGlzdCwgc3BsaXR0aW5nIGl0XG4gICAqIGludG8gaW5kaXZpZHVhbCBsaXN0IGl0ZW1zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdFN0clxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHRyaW1UcmFpbGluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcHJvY2Vzc0xpc3RJdGVtcyAobGlzdFN0ciwgdHJpbVRyYWlsaW5nKSB7XG4gICAgLy8gVGhlICRnX2xpc3RfbGV2ZWwgZ2xvYmFsIGtlZXBzIHRyYWNrIG9mIHdoZW4gd2UncmUgaW5zaWRlIGEgbGlzdC5cbiAgICAvLyBFYWNoIHRpbWUgd2UgZW50ZXIgYSBsaXN0LCB3ZSBpbmNyZW1lbnQgaXQ7IHdoZW4gd2UgbGVhdmUgYSBsaXN0LFxuICAgIC8vIHdlIGRlY3JlbWVudC4gSWYgaXQncyB6ZXJvLCB3ZSdyZSBub3QgaW4gYSBsaXN0IGFueW1vcmUuXG4gICAgLy9cbiAgICAvLyBXZSBkbyB0aGlzIGJlY2F1c2Ugd2hlbiB3ZSdyZSBub3QgaW5zaWRlIGEgbGlzdCwgd2Ugd2FudCB0byB0cmVhdFxuICAgIC8vIHNvbWV0aGluZyBsaWtlIHRoaXM6XG4gICAgLy9cbiAgICAvLyAgICBJIHJlY29tbWVuZCB1cGdyYWRpbmcgdG8gdmVyc2lvblxuICAgIC8vICAgIDguIE9vcHMsIG5vdyB0aGlzIGxpbmUgaXMgdHJlYXRlZFxuICAgIC8vICAgIGFzIGEgc3ViLWxpc3QuXG4gICAgLy9cbiAgICAvLyBBcyBhIHNpbmdsZSBwYXJhZ3JhcGgsIGRlc3BpdGUgdGhlIGZhY3QgdGhhdCB0aGUgc2Vjb25kIGxpbmUgc3RhcnRzXG4gICAgLy8gd2l0aCBhIGRpZ2l0LXBlcmlvZC1zcGFjZSBzZXF1ZW5jZS5cbiAgICAvL1xuICAgIC8vIFdoZXJlYXMgd2hlbiB3ZSdyZSBpbnNpZGUgYSBsaXN0IChvciBzdWItbGlzdCksIHRoYXQgbGluZSB3aWxsIGJlXG4gICAgLy8gdHJlYXRlZCBhcyB0aGUgc3RhcnQgb2YgYSBzdWItbGlzdC4gV2hhdCBhIGtsdWRnZSwgaHVoPyBUaGlzIGlzXG4gICAgLy8gYW4gYXNwZWN0IG9mIE1hcmtkb3duJ3Mgc3ludGF4IHRoYXQncyBoYXJkIHRvIHBhcnNlIHBlcmZlY3RseVxuICAgIC8vIHdpdGhvdXQgcmVzb3J0aW5nIHRvIG1pbmQtcmVhZGluZy4gUGVyaGFwcyB0aGUgc29sdXRpb24gaXMgdG9cbiAgICAvLyBjaGFuZ2UgdGhlIHN5bnRheCBydWxlcyBzdWNoIHRoYXQgc3ViLWxpc3RzIG11c3Qgc3RhcnQgd2l0aCBhXG4gICAgLy8gc3RhcnRpbmcgY2FyZGluYWwgbnVtYmVyOyBlLmcuIFwiMS5cIiBvciBcImEuXCIuXG4gICAgZ2xvYmFscy5nTGlzdExldmVsKys7XG5cbiAgICAvLyB0cmltIHRyYWlsaW5nIGJsYW5rIGxpbmVzOlxuICAgIGxpc3RTdHIgPSBsaXN0U3RyLnJlcGxhY2UoL1xcbnsyLH0kLywgJ1xcbicpO1xuXG4gICAgLy8gYXR0YWNrbGFiOiBhZGQgc2VudGluZWwgdG8gZW11bGF0ZSBcXHpcbiAgICBsaXN0U3RyICs9ICd+MCc7XG5cbiAgICB2YXIgcmd4ID0gLyhcXG4pPyheWyBcXHRdKikoWyorLV18XFxkK1suXSlbIFxcdF0rKChcXFsoeHxYfCApP10pP1sgXFx0XSpbXlxccl0rPyhcXG57MSwyfSkpKD89XFxuKih+MHxcXDIoWyorLV18XFxkK1suXSlbIFxcdF0rKSkvZ20sXG4gICAgICAgIGlzUGFyYWdyYXBoZWQgPSAoL1xcblsgXFx0XSpcXG4oPyF+MCkvLnRlc3QobGlzdFN0cikpO1xuXG4gICAgbGlzdFN0ciA9IGxpc3RTdHIucmVwbGFjZShyZ3gsIGZ1bmN0aW9uICh3aG9sZU1hdGNoLCBtMSwgbTIsIG0zLCBtNCwgdGFza2J0biwgY2hlY2tlZCkge1xuICAgICAgY2hlY2tlZCA9IChjaGVja2VkICYmIGNoZWNrZWQudHJpbSgpICE9PSAnJyk7XG4gICAgICB2YXIgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignb3V0ZGVudCcpKG00LCBvcHRpb25zLCBnbG9iYWxzKSxcbiAgICAgICAgICBidWxsZXRTdHlsZSA9ICcnO1xuXG4gICAgICAvLyBTdXBwb3J0IGZvciBnaXRodWIgdGFza2xpc3RzXG4gICAgICBpZiAodGFza2J0biAmJiBvcHRpb25zLnRhc2tsaXN0cykge1xuICAgICAgICBidWxsZXRTdHlsZSA9ICcgY2xhc3M9XCJ0YXNrLWxpc3QtaXRlbVwiIHN0eWxlPVwibGlzdC1zdHlsZS10eXBlOiBub25lO1wiJztcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXlsgXFx0XSpcXFsoeHxYfCApP10vbSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvdHAgPSAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRpc2FibGVkIHN0eWxlPVwibWFyZ2luOiAwcHggMC4zNWVtIDAuMjVlbSAtMS42ZW07IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XCInO1xuICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICBvdHAgKz0gJyBjaGVja2VkJztcbiAgICAgICAgICB9XG4gICAgICAgICAgb3RwICs9ICc+JztcbiAgICAgICAgICByZXR1cm4gb3RwO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIG0xIC0gTGVhZGluZyBsaW5lIG9yXG4gICAgICAvLyBIYXMgYSBkb3VibGUgcmV0dXJuIChtdWx0aSBwYXJhZ3JhcGgpIG9yXG4gICAgICAvLyBIYXMgc3VibGlzdFxuICAgICAgaWYgKG0xIHx8IChpdGVtLnNlYXJjaCgvXFxuezIsfS8pID4gLTEpKSB7XG4gICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2dpdGh1YkNvZGVCbG9ja3MnKShpdGVtLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcignYmxvY2tHYW11dCcpKGl0ZW0sIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVjdXJzaW9uIGZvciBzdWItbGlzdHM6XG4gICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2xpc3RzJykoaXRlbSwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL1xcbiQvLCAnJyk7IC8vIGNob21wKGl0ZW0pXG4gICAgICAgIGlmIChpc1BhcmFncmFwaGVkKSB7XG4gICAgICAgICAgaXRlbSA9IHNob3dkb3duLnN1YlBhcnNlcigncGFyYWdyYXBocycpKGl0ZW0sIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0gPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NwYW5HYW11dCcpKGl0ZW0sIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpdGVtID0gICdcXG48bGknICsgYnVsbGV0U3R5bGUgKyAnPicgKyBpdGVtICsgJzwvbGk+XFxuJztcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuXG4gICAgLy8gYXR0YWNrbGFiOiBzdHJpcCBzZW50aW5lbFxuICAgIGxpc3RTdHIgPSBsaXN0U3RyLnJlcGxhY2UoL34wL2csICcnKTtcblxuICAgIGdsb2JhbHMuZ0xpc3RMZXZlbC0tO1xuXG4gICAgaWYgKHRyaW1UcmFpbGluZykge1xuICAgICAgbGlzdFN0ciA9IGxpc3RTdHIucmVwbGFjZSgvXFxzKyQvLCAnJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RTdHI7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYW5kIHBhcnNlIGNvbnNlY3V0aXZlIGxpc3RzIChiZXR0ZXIgZml4IGZvciBpc3N1ZSAjMTQyKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdFR5cGVcbiAgICogQHBhcmFtIHtib29sZWFufSB0cmltVHJhaWxpbmdcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlQ29uc2VjdXRpdmVMaXN0cyhsaXN0LCBsaXN0VHlwZSwgdHJpbVRyYWlsaW5nKSB7XG4gICAgLy8gY2hlY2sgaWYgd2UgY2F1Z2h0IDIgb3IgbW9yZSBjb25zZWN1dGl2ZSBsaXN0cyBieSBtaXN0YWtlXG4gICAgLy8gd2UgdXNlIHRoZSBjb3VudGVyUmd4LCBtZWFuaW5nIGlmIGxpc3RUeXBlIGlzIFVMIHdlIGxvb2sgZm9yIFVMIGFuZCB2aWNlIHZlcnNhXG4gICAgdmFyIGNvdW50ZXJSeGcgPSAobGlzdFR5cGUgPT09ICd1bCcpID8gL14gezAsMn1cXGQrXFwuWyBcXHRdL2dtIDogL14gezAsMn1bKistXVsgXFx0XS9nbSxcbiAgICAgIHN1Ykxpc3RzID0gW10sXG4gICAgICByZXN1bHQgPSAnJztcblxuICAgIGlmIChsaXN0LnNlYXJjaChjb3VudGVyUnhnKSAhPT0gLTEpIHtcbiAgICAgIChmdW5jdGlvbiBwYXJzZUNMKHR4dCkge1xuICAgICAgICB2YXIgcG9zID0gdHh0LnNlYXJjaChjb3VudGVyUnhnKTtcbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBzbGljZVxuICAgICAgICAgIHJlc3VsdCArPSAnXFxuXFxuPCcgKyBsaXN0VHlwZSArICc+JyArIHByb2Nlc3NMaXN0SXRlbXModHh0LnNsaWNlKDAsIHBvcyksICEhdHJpbVRyYWlsaW5nKSArICc8LycgKyBsaXN0VHlwZSArICc+XFxuXFxuJztcblxuICAgICAgICAgIC8vIGludmVydCBjb3VudGVyVHlwZSBhbmQgbGlzdFR5cGVcbiAgICAgICAgICBsaXN0VHlwZSA9IChsaXN0VHlwZSA9PT0gJ3VsJykgPyAnb2wnIDogJ3VsJztcbiAgICAgICAgICBjb3VudGVyUnhnID0gKGxpc3RUeXBlID09PSAndWwnKSA/IC9eIHswLDJ9XFxkK1xcLlsgXFx0XS9nbSA6IC9eIHswLDJ9WyorLV1bIFxcdF0vZ207XG5cbiAgICAgICAgICAvL3JlY3Vyc2VcbiAgICAgICAgICBwYXJzZUNMKHR4dC5zbGljZShwb3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgKz0gJ1xcblxcbjwnICsgbGlzdFR5cGUgKyAnPicgKyBwcm9jZXNzTGlzdEl0ZW1zKHR4dCwgISF0cmltVHJhaWxpbmcpICsgJzwvJyArIGxpc3RUeXBlICsgJz5cXG5cXG4nO1xuICAgICAgICB9XG4gICAgICB9KShsaXN0KTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ViTGlzdHMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSAnXFxuXFxuPCcgKyBsaXN0VHlwZSArICc+JyArIHByb2Nlc3NMaXN0SXRlbXMobGlzdCwgISF0cmltVHJhaWxpbmcpICsgJzwvJyArIGxpc3RUeXBlICsgJz5cXG5cXG4nO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBhdHRhY2tsYWI6IGFkZCBzZW50aW5lbCB0byBoYWNrIGFyb3VuZCBraHRtbC9zYWZhcmkgYnVnOlxuICAvLyBodHRwOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTIzMVxuICB0ZXh0ICs9ICd+MCc7XG5cbiAgLy8gUmUtdXNhYmxlIHBhdHRlcm4gdG8gbWF0Y2ggYW55IGVudGlyZSB1bCBvciBvbCBsaXN0OlxuICB2YXIgd2hvbGVMaXN0ID0gL14oKFsgXXswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKylbXlxccl0rPyh+MHxcXG57Mix9KD89XFxTKSg/IVsgXFx0XSooPzpbKistXXxcXGQrWy5dKVsgXFx0XSspKSkvZ207XG5cbiAgaWYgKGdsb2JhbHMuZ0xpc3RMZXZlbCkge1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2Uod2hvbGVMaXN0LCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbGlzdCwgbTIpIHtcbiAgICAgIHZhciBsaXN0VHlwZSA9IChtMi5zZWFyY2goL1sqKy1dL2cpID4gLTEpID8gJ3VsJyA6ICdvbCc7XG4gICAgICByZXR1cm4gcGFyc2VDb25zZWN1dGl2ZUxpc3RzKGxpc3QsIGxpc3RUeXBlLCB0cnVlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB3aG9sZUxpc3QgPSAvKFxcblxcbnxeXFxuPykoKFsgXXswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKylbXlxccl0rPyh+MHxcXG57Mix9KD89XFxTKSg/IVsgXFx0XSooPzpbKistXXxcXGQrWy5dKVsgXFx0XSspKSkvZ207XG4gICAgLy93aG9sZUxpc3QgPSAvKFxcblxcbnxeXFxuPykoIHswLDN9KFsqKy1dfFxcZCtcXC4pWyBcXHRdK1tcXHNcXFNdKz8pKD89KH4wKXwoXFxuXFxuKD8hXFx0fCB7Mix9fCB7MCwzfShbKistXXxcXGQrXFwuKVsgXFx0XSkpKS9nO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2Uod2hvbGVMaXN0LCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEsIGxpc3QsIG0zKSB7XG5cbiAgICAgIHZhciBsaXN0VHlwZSA9IChtMy5zZWFyY2goL1sqKy1dL2cpID4gLTEpID8gJ3VsJyA6ICdvbCc7XG4gICAgICByZXR1cm4gcGFyc2VDb25zZWN1dGl2ZUxpc3RzKGxpc3QsIGxpc3RUeXBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGF0dGFja2xhYjogc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvfjAvLCAnJyk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnbGlzdHMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBSZW1vdmUgb25lIGxldmVsIG9mIGxpbmUtbGVhZGluZyB0YWJzIG9yIHNwYWNlc1xuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ291dGRlbnQnLCBmdW5jdGlvbiAodGV4dCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gYXR0YWNrbGFiOiBoYWNrIGFyb3VuZCBLb25xdWVyb3IgMy41LjQgYnVnOlxuICAvLyBcIi0tLS0tLS0tLS1idWdcIi5yZXBsYWNlKC9eLS9nLFwiXCIpID09IFwiYnVnXCJcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXihcXHR8WyBdezEsNH0pL2dtLCAnfjAnKTsgLy8gYXR0YWNrbGFiOiBnX3RhYl93aWR0aFxuXG4gIC8vIGF0dGFja2xhYjogY2xlYW4gdXAgaGFja1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9+MC9nLCAnJyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3BhcmFncmFwaHMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgncGFyYWdyYXBocy5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgLy8gU3RyaXAgbGVhZGluZyBhbmQgdHJhaWxpbmcgbGluZXM6XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL15cXG4rL2csICcnKTtcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuKyQvZywgJycpO1xuXG4gIHZhciBncmFmcyA9IHRleHQuc3BsaXQoL1xcbnsyLH0vZyksXG4gICAgICBncmFmc091dCA9IFtdLFxuICAgICAgZW5kID0gZ3JhZnMubGVuZ3RoOyAvLyBXcmFwIDxwPiB0YWdzXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuICAgIHZhciBzdHIgPSBncmFmc1tpXTtcbiAgICAvLyBpZiB0aGlzIGlzIGFuIEhUTUwgbWFya2VyLCBjb3B5IGl0XG4gICAgaWYgKHN0ci5zZWFyY2goL34oS3xHKShcXGQrKVxcMS9nKSA+PSAwKSB7XG4gICAgICBncmFmc091dC5wdXNoKHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IHNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0Jykoc3RyLCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eKFsgXFx0XSopL2csICc8cD4nKTtcbiAgICAgIHN0ciArPSAnPC9wPic7XG4gICAgICBncmFmc091dC5wdXNoKHN0cik7XG4gICAgfVxuICB9XG5cbiAgLyoqIFVuaGFzaGlmeSBIVE1MIGJsb2NrcyAqL1xuICBlbmQgPSBncmFmc091dC5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuICAgIHZhciBibG9ja1RleHQgPSAnJyxcbiAgICAgICAgZ3JhZnNPdXRJdCA9IGdyYWZzT3V0W2ldLFxuICAgICAgICBjb2RlRmxhZyA9IGZhbHNlO1xuICAgIC8vIGlmIHRoaXMgaXMgYSBtYXJrZXIgZm9yIGFuIGh0bWwgYmxvY2suLi5cbiAgICB3aGlsZSAoZ3JhZnNPdXRJdC5zZWFyY2goL34oS3xHKShcXGQrKVxcMS8pID49IDApIHtcbiAgICAgIHZhciBkZWxpbSA9IFJlZ0V4cC4kMSxcbiAgICAgICAgICBudW0gICA9IFJlZ0V4cC4kMjtcblxuICAgICAgaWYgKGRlbGltID09PSAnSycpIHtcbiAgICAgICAgYmxvY2tUZXh0ID0gZ2xvYmFscy5nSHRtbEJsb2Nrc1tudW1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpZiBnaEJsb2NrIGlzIGEgZmFsc2UgcG9zaXRpdmVcbiAgICAgICAgaWYgKGNvZGVGbGFnKSB7XG4gICAgICAgICAgLy8gdXNlIGVuY29kZWQgdmVyc2lvbiBvZiBhbGwgdHR0XG4gICAgICAgICAgYmxvY2tUZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVDb2RlJykoZ2xvYmFscy5naENvZGVCbG9ja3NbbnVtXS50ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBibG9ja1RleHQgPSBnbG9iYWxzLmdoQ29kZUJsb2Nrc1tudW1dLmNvZGVibG9jaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYmxvY2tUZXh0ID0gYmxvY2tUZXh0LnJlcGxhY2UoL1xcJC9nLCAnJCQkJCcpOyAvLyBFc2NhcGUgYW55IGRvbGxhciBzaWduc1xuXG4gICAgICBncmFmc091dEl0ID0gZ3JhZnNPdXRJdC5yZXBsYWNlKC8oXFxuXFxuKT9+KEt8RylcXGQrXFwyKFxcblxcbik/LywgYmxvY2tUZXh0KTtcbiAgICAgIC8vIENoZWNrIGlmIGdyYWZzT3V0SXQgaXMgYSBwcmUtPmNvZGVcbiAgICAgIGlmICgvXjxwcmVcXGJbXj5dKj5cXHMqPGNvZGVcXGJbXj5dKj4vLnRlc3QoZ3JhZnNPdXRJdCkpIHtcbiAgICAgICAgY29kZUZsYWcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBncmFmc091dFtpXSA9IGdyYWZzT3V0SXQ7XG4gIH1cbiAgdGV4dCA9IGdyYWZzT3V0LmpvaW4oJ1xcblxcbicpO1xuICAvLyBTdHJpcCBsZWFkaW5nIGFuZCB0cmFpbGluZyBsaW5lczpcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxcbisvZywgJycpO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4rJC9nLCAnJyk7XG4gIHJldHVybiBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3BhcmFncmFwaHMuYWZ0ZXInLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbn0pO1xuXG4vKipcbiAqIFJ1biBleHRlbnNpb25cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdydW5FeHRlbnNpb24nLCBmdW5jdGlvbiAoZXh0LCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoZXh0LmZpbHRlcikge1xuICAgIHRleHQgPSBleHQuZmlsdGVyKHRleHQsIGdsb2JhbHMuY29udmVydGVyLCBvcHRpb25zKTtcblxuICB9IGVsc2UgaWYgKGV4dC5yZWdleCkge1xuICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBvbGQgZXh0ZW5zaW9uIGxvYWRpbmcgbWVjaGFuaXNtIGlzIGRlcHJlY2F0ZWRcbiAgICB2YXIgcmUgPSBleHQucmVnZXg7XG4gICAgaWYgKCFyZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmUgPSBuZXcgUmVnRXhwKHJlLCAnZycpO1xuICAgIH1cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlLCBleHQucmVwbGFjZSk7XG4gIH1cblxuICByZXR1cm4gdGV4dDtcbn0pO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBhbGwgdGhlIHRyYW5zZm9ybWF0aW9ucyB0aGF0IG9jY3VyICp3aXRoaW4qIGJsb2NrLWxldmVsXG4gKiB0YWdzIGxpa2UgcGFyYWdyYXBocywgaGVhZGVycywgYW5kIGxpc3QgaXRlbXMuXG4gKi9cbnNob3dkb3duLnN1YlBhcnNlcignc3BhbkdhbXV0JywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3NwYW5HYW11dC5iZWZvcmUnLCB0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignY29kZVNwYW5zJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2VzY2FwZVNwZWNpYWxDaGFyc1dpdGhpblRhZ0F0dHJpYnV0ZXMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQmFja3NsYXNoRXNjYXBlcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIC8vIFByb2Nlc3MgYW5jaG9yIGFuZCBpbWFnZSB0YWdzLiBJbWFnZXMgbXVzdCBjb21lIGZpcnN0LFxuICAvLyBiZWNhdXNlICFbZm9vXVtmXSBsb29rcyBsaWtlIGFuIGFuY2hvci5cbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignaW1hZ2VzJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gIHRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ2FuY2hvcnMnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcblxuICAvLyBNYWtlIGxpbmtzIG91dCBvZiB0aGluZ3MgbGlrZSBgPGh0dHA6Ly9leGFtcGxlLmNvbS8+YFxuICAvLyBNdXN0IGNvbWUgYWZ0ZXIgX0RvQW5jaG9ycygpLCBiZWNhdXNlIHlvdSBjYW4gdXNlIDwgYW5kID5cbiAgLy8gZGVsaW1pdGVycyBpbiBpbmxpbmUgbGlua3MgbGlrZSBbdGhpc10oPHVybD4pLlxuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdhdXRvTGlua3MnKSh0ZXh0LCBvcHRpb25zLCBnbG9iYWxzKTtcbiAgdGV4dCA9IHNob3dkb3duLnN1YlBhcnNlcignZW5jb2RlQW1wc0FuZEFuZ2xlcycpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdpdGFsaWNzQW5kQm9sZCcpKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB0ZXh0ID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzdHJpa2V0aHJvdWdoJykodGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgLy8gRG8gaGFyZCBicmVha3M6XG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyAgK1xcbi9nLCAnIDxiciAvPlxcbicpO1xuXG4gIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3NwYW5HYW11dC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICByZXR1cm4gdGV4dDtcbn0pO1xuXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlrZXRocm91Z2gnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKG9wdGlvbnMuc3RyaWtldGhyb3VnaCkge1xuICAgIHRleHQgPSBnbG9iYWxzLmNvbnZlcnRlci5fZGlzcGF0Y2goJ3N0cmlrZXRocm91Z2guYmVmb3JlJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKD86flQpezJ9KFtcXHNcXFNdKz8pKD86flQpezJ9L2csICc8ZGVsPiQxPC9kZWw+Jyk7XG4gICAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgnc3RyaWtldGhyb3VnaC5hZnRlcicsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICB9XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBTdHJpcCBhbnkgbGluZXMgY29uc2lzdGluZyBvbmx5IG9mIHNwYWNlcyBhbmQgdGFicy5cbiAqIFRoaXMgbWFrZXMgc3Vic2VxdWVudCByZWdleHMgZWFzaWVyIHRvIHdyaXRlLCBiZWNhdXNlIHdlIGNhblxuICogbWF0Y2ggY29uc2VjdXRpdmUgYmxhbmsgbGluZXMgd2l0aCAvXFxuKy8gaW5zdGVhZCBvZiBzb21ldGhpbmdcbiAqIGNvbnRvcnRlZCBsaWtlIC9bIFxcdF0qXFxuKy9cbiAqL1xuc2hvd2Rvd24uc3ViUGFyc2VyKCdzdHJpcEJsYW5rTGluZXMnLCBmdW5jdGlvbiAodGV4dCkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL15bIFxcdF0rJC9tZywgJycpO1xufSk7XG5cbi8qKlxuICogU3RyaXBzIGxpbmsgZGVmaW5pdGlvbnMgZnJvbSB0dHQsIHN0b3JlcyB0aGUgVVJMcyBhbmQgdGl0bGVzIGluXG4gKiBoYXNoIHJlZmVyZW5jZXMuXG4gKiBMaW5rIGRlZnMgYXJlIGluIHRoZSBmb3JtOiBeW2lkXTogdXJsIFwib3B0aW9uYWwgdGl0bGVcIlxuICpcbiAqIF5bIF17MCwzfVxcWyguKylcXF06IC8vIGlkID0gJDEgIGF0dGFja2xhYjogZ190YWJfd2lkdGggLSAxXG4gKiBbIFxcdF0qXG4gKiBcXG4/ICAgICAgICAgICAgICAgICAgLy8gbWF5YmUgKm9uZSogbmV3bGluZVxuICogWyBcXHRdKlxuICogPD8oXFxTKz8pPj8gICAgICAgICAgLy8gdXJsID0gJDJcbiAqIFsgXFx0XSpcbiAqIFxcbj8gICAgICAgICAgICAgICAgLy8gbWF5YmUgb25lIG5ld2xpbmVcbiAqIFsgXFx0XSpcbiAqICg/OlxuICogKFxcbiopICAgICAgICAgICAgICAvLyBhbnkgbGluZXMgc2tpcHBlZCA9ICQzIGF0dGFja2xhYjogbG9va2JlaGluZCByZW1vdmVkXG4gKiBbXCIoXVxuICogKC4rPykgICAgICAgICAgICAgIC8vIHRpdGxlID0gJDRcbiAqIFtcIildXG4gKiBbIFxcdF0qXG4gKiApPyAgICAgICAgICAgICAgICAgLy8gdGl0bGUgaXMgb3B0aW9uYWxcbiAqICg/Olxcbit8JClcbiAqIC9nbSxcbiAqIGZ1bmN0aW9uKCl7Li4ufSk7XG4gKlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3N0cmlwTGlua0RlZmluaXRpb25zJywgZnVuY3Rpb24gKHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciByZWdleCA9IC9eIHswLDN9XFxbKC4rKV06WyBcXHRdKlxcbj9bIFxcdF0qPD8oXFxTKz8pPj8oPzogPShbKlxcZF0rW0EtWmEteiVdezAsNH0peChbKlxcZF0rW0EtWmEteiVdezAsNH0pKT9bIFxcdF0qXFxuP1sgXFx0XSooPzooXFxuKilbXCJ8JyhdKC4rPylbXCJ8JyldWyBcXHRdKik/KD86XFxuK3woPz1+MCkpL2dtO1xuXG4gIC8vIGF0dGFja2xhYjogc2VudGluZWwgd29ya2Fyb3VuZHMgZm9yIGxhY2sgb2YgXFxBIGFuZCBcXFosIHNhZmFyaVxca2h0bWwgYnVnXG4gIHRleHQgKz0gJ34wJztcblxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ2V4LCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbGlua0lkLCB1cmwsIHdpZHRoLCBoZWlnaHQsIGJsYW5rTGluZXMsIHRpdGxlKSB7XG4gICAgbGlua0lkID0gbGlua0lkLnRvTG93ZXJDYXNlKCk7XG4gICAgZ2xvYmFscy5nVXJsc1tsaW5rSWRdID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdlbmNvZGVBbXBzQW5kQW5nbGVzJykodXJsKTsgIC8vIExpbmsgSURzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cbiAgICBpZiAoYmxhbmtMaW5lcykge1xuICAgICAgLy8gT29wcywgZm91bmQgYmxhbmsgbGluZXMsIHNvIGl0J3Mgbm90IGEgdGl0bGUuXG4gICAgICAvLyBQdXQgYmFjayB0aGUgcGFyZW50aGV0aWNhbCBzdGF0ZW1lbnQgd2Ugc3RvbGUuXG4gICAgICByZXR1cm4gYmxhbmtMaW5lcyArIHRpdGxlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBnbG9iYWxzLmdUaXRsZXNbbGlua0lkXSA9IHRpdGxlLnJlcGxhY2UoL1wifCcvZywgJyZxdW90OycpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMucGFyc2VJbWdEaW1lbnNpb25zICYmIHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgICBnbG9iYWxzLmdEaW1lbnNpb25zW2xpbmtJZF0gPSB7XG4gICAgICAgICAgd2lkdGg6ICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDb21wbGV0ZWx5IHJlbW92ZSB0aGUgZGVmaW5pdGlvbiBmcm9tIHRoZSB0dHRcbiAgICByZXR1cm4gJyc7XG4gIH0pO1xuXG4gIC8vIGF0dGFja2xhYjogc3RyaXAgc2VudGluZWxcbiAgdGV4dCA9IHRleHQucmVwbGFjZSgvfjAvLCAnJyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuc2hvd2Rvd24uc3ViUGFyc2VyKCd0YWJsZXMnLCBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucywgZ2xvYmFscykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCFvcHRpb25zLnRhYmxlcykge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgdmFyIHRhYmxlUmd4ID0gL15bIFxcdF17MCwzfVxcfD8uK1xcfC4rXFxuWyBcXHRdezAsM31cXHw/WyBcXHRdKjo/WyBcXHRdKig/Oi18PSl7Mix9WyBcXHRdKjo/WyBcXHRdKlxcfFsgXFx0XSo6P1sgXFx0XSooPzotfD0pezIsfVtcXHNcXFNdKz8oPzpcXG5cXG58fjApL2dtO1xuXG4gIGZ1bmN0aW9uIHBhcnNlU3R5bGVzKHNMaW5lKSB7XG4gICAgaWYgKC9eOlsgXFx0XSotLSokLy50ZXN0KHNMaW5lKSkge1xuICAgICAgcmV0dXJuICcgc3R5bGU9XCJ0dHQtYWxpZ246bGVmdDtcIic7XG4gICAgfSBlbHNlIGlmICgvXi0tKlsgXFx0XSo6WyBcXHRdKiQvLnRlc3Qoc0xpbmUpKSB7XG4gICAgICByZXR1cm4gJyBzdHlsZT1cInR0dC1hbGlnbjpyaWdodDtcIic7XG4gICAgfSBlbHNlIGlmICgvXjpbIFxcdF0qLS0qWyBcXHRdKjokLy50ZXN0KHNMaW5lKSkge1xuICAgICAgcmV0dXJuICcgc3R5bGU9XCJ0dHQtYWxpZ246Y2VudGVyO1wiJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXIsIHN0eWxlKSB7XG4gICAgdmFyIGlkID0gJyc7XG4gICAgaGVhZGVyID0gaGVhZGVyLnRyaW0oKTtcbiAgICBpZiAob3B0aW9ucy50YWJsZUhlYWRlcklkKSB7XG4gICAgICBpZCA9ICcgaWQ9XCInICsgaGVhZGVyLnJlcGxhY2UoLyAvZywgJ18nKS50b0xvd2VyQ2FzZSgpICsgJ1wiJztcbiAgICB9XG4gICAgaGVhZGVyID0gc2hvd2Rvd24uc3ViUGFyc2VyKCdzcGFuR2FtdXQnKShoZWFkZXIsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gICAgcmV0dXJuICc8dGgnICsgaWQgKyBzdHlsZSArICc+JyArIGhlYWRlciArICc8L3RoPlxcbic7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUNlbGxzKGNlbGwsIHN0eWxlKSB7XG4gICAgdmFyIHN1YlRleHQgPSBzaG93ZG93bi5zdWJQYXJzZXIoJ3NwYW5HYW11dCcpKGNlbGwsIG9wdGlvbnMsIGdsb2JhbHMpO1xuICAgIHJldHVybiAnPHRkJyArIHN0eWxlICsgJz4nICsgc3ViVGV4dCArICc8L3RkPlxcbic7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZFRhYmxlKGhlYWRlcnMsIGNlbGxzKSB7XG4gICAgdmFyIHRiID0gJzx0YWJsZT5cXG48dGhlYWQ+XFxuPHRyPlxcbicsXG4gICAgICAgIHRibExnbiA9IGhlYWRlcnMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YmxMZ247ICsraSkge1xuICAgICAgdGIgKz0gaGVhZGVyc1tpXTtcbiAgICB9XG4gICAgdGIgKz0gJzwvdHI+XFxuPC90aGVhZD5cXG48dGJvZHk+XFxuJztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7ICsraSkge1xuICAgICAgdGIgKz0gJzx0cj5cXG4nO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHRibExnbjsgKytpaSkge1xuICAgICAgICB0YiArPSBjZWxsc1tpXVtpaV07XG4gICAgICB9XG4gICAgICB0YiArPSAnPC90cj5cXG4nO1xuICAgIH1cbiAgICB0YiArPSAnPC90Ym9keT5cXG48L3RhYmxlPlxcbic7XG4gICAgcmV0dXJuIHRiO1xuICB9XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgndGFibGVzLmJlZm9yZScsIHRleHQsIG9wdGlvbnMsIGdsb2JhbHMpO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UodGFibGVSZ3gsIGZ1bmN0aW9uIChyYXdUYWJsZSkge1xuXG4gICAgdmFyIGksIHRhYmxlTGluZXMgPSByYXdUYWJsZS5zcGxpdCgnXFxuJyk7XG5cbiAgICAvLyBzdHJpcCB3cm9uZyBmaXJzdCBhbmQgbGFzdCBjb2x1bW4gaWYgd3JhcHBlZCB0YWJsZXMgYXJlIHVzZWRcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFibGVMaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKC9eWyBcXHRdezAsM31cXHwvLnRlc3QodGFibGVMaW5lc1tpXSkpIHtcbiAgICAgICAgdGFibGVMaW5lc1tpXSA9IHRhYmxlTGluZXNbaV0ucmVwbGFjZSgvXlsgXFx0XXswLDN9XFx8LywgJycpO1xuICAgICAgfVxuICAgICAgaWYgKC9cXHxbIFxcdF0qJC8udGVzdCh0YWJsZUxpbmVzW2ldKSkge1xuICAgICAgICB0YWJsZUxpbmVzW2ldID0gdGFibGVMaW5lc1tpXS5yZXBsYWNlKC9cXHxbIFxcdF0qJC8sICcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmF3SGVhZGVycyA9IHRhYmxlTGluZXNbMF0uc3BsaXQoJ3wnKS5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudHJpbSgpO30pLFxuICAgICAgICByYXdTdHlsZXMgPSB0YWJsZUxpbmVzWzFdLnNwbGl0KCd8JykubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRyaW0oKTt9KSxcbiAgICAgICAgcmF3Q2VsbHMgPSBbXSxcbiAgICAgICAgaGVhZGVycyA9IFtdLFxuICAgICAgICBzdHlsZXMgPSBbXSxcbiAgICAgICAgY2VsbHMgPSBbXTtcblxuICAgIHRhYmxlTGluZXMuc2hpZnQoKTtcbiAgICB0YWJsZUxpbmVzLnNoaWZ0KCk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGFibGVMaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRhYmxlTGluZXNbaV0udHJpbSgpID09PSAnJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJhd0NlbGxzLnB1c2goXG4gICAgICAgIHRhYmxlTGluZXNbaV1cbiAgICAgICAgICAuc3BsaXQoJ3wnKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyaW0oKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocmF3SGVhZGVycy5sZW5ndGggPCByYXdTdHlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcmF3VGFibGU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHJhd1N0eWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgc3R5bGVzLnB1c2gocGFyc2VTdHlsZXMocmF3U3R5bGVzW2ldKSk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHJhd0hlYWRlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChzaG93ZG93bi5oZWxwZXIuaXNVbmRlZmluZWQoc3R5bGVzW2ldKSkge1xuICAgICAgICBzdHlsZXNbaV0gPSAnJztcbiAgICAgIH1cbiAgICAgIGhlYWRlcnMucHVzaChwYXJzZUhlYWRlcnMocmF3SGVhZGVyc1tpXSwgc3R5bGVzW2ldKSk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHJhd0NlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaGVhZGVycy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgaWYgKHNob3dkb3duLmhlbHBlci5pc1VuZGVmaW5lZChyYXdDZWxsc1tpXVtpaV0pKSB7XG5cbiAgICAgICAgfVxuICAgICAgICByb3cucHVzaChwYXJzZUNlbGxzKHJhd0NlbGxzW2ldW2lpXSwgc3R5bGVzW2lpXSkpO1xuICAgICAgfVxuICAgICAgY2VsbHMucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFRhYmxlKGhlYWRlcnMsIGNlbGxzKTtcbiAgfSk7XG5cbiAgdGV4dCA9IGdsb2JhbHMuY29udmVydGVyLl9kaXNwYXRjaCgndGFibGVzLmFmdGVyJywgdGV4dCwgb3B0aW9ucywgZ2xvYmFscyk7XG5cbiAgcmV0dXJuIHRleHQ7XG59KTtcblxuLyoqXG4gKiBTd2FwIGJhY2sgaW4gYWxsIHRoZSBzcGVjaWFsIGNoYXJhY3RlcnMgd2UndmUgaGlkZGVuLlxuICovXG5zaG93ZG93bi5zdWJQYXJzZXIoJ3VuZXNjYXBlU3BlY2lhbENoYXJzJywgZnVuY3Rpb24gKHRleHQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHRleHQgPSB0ZXh0LnJlcGxhY2UoL35FKFxcZCspRS9nLCBmdW5jdGlvbiAod2hvbGVNYXRjaCwgbTEpIHtcbiAgICB2YXIgY2hhckNvZGVUb1JlcGxhY2UgPSBwYXJzZUludChtMSk7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGVUb1JlcGxhY2UpO1xuICB9KTtcbiAgcmV0dXJuIHRleHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc2hvd2Rvd247XG4iXSwiZmlsZSI6InNob3dkb3duLmpzIn0=