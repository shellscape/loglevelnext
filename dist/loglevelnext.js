(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["log"] = factory();
	else
		root["log"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./factory/PrefixFactory.js":
/*!**********************************!*\
  !*** ./factory/PrefixFactory.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }\n\nvar MethodFactory = __webpack_require__(/*! ../lib/MethodFactory */ \"./lib/MethodFactory.js\");\n\nvar defaults = {\n  level: function level(opts) {\n    return \"[\".concat(opts.level, \"]\");\n  },\n  name: function name(opts) {\n    return opts.logger.name;\n  },\n  template: '{{time}} {{level}} ',\n  time: function time() {\n    return new Date().toTimeString().split(' ')[0];\n  }\n};\n\nmodule.exports =\n/*#__PURE__*/\nfunction (_MethodFactory) {\n  function PrefixFactory(logger, options) {\n    var _this;\n\n    _classCallCheck(this, PrefixFactory);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrefixFactory).call(this, logger));\n    _this.options = Object.assign({}, defaults, options);\n    return _this;\n  }\n\n  _createClass(PrefixFactory, [{\n    key: \"interpolate\",\n    value: function interpolate(level) {\n      var _this2 = this;\n\n      return this.options.template.replace(/{{([^{}]*)}}/g, function (stache, prop) {\n        var fn = _this2.options[prop];\n\n        if (fn) {\n          return fn({\n            level: level,\n            logger: _this2.logger\n          });\n        }\n\n        return stache;\n      });\n    }\n  }, {\n    key: \"make\",\n    value: function make(methodName) {\n      var _this3 = this;\n\n      var og = _get(_getPrototypeOf(PrefixFactory.prototype), \"make\", this).call(this, methodName);\n\n      return function () {\n        var output = _this3.interpolate(methodName);\n\n        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        var first = args[0];\n\n        if (typeof first === 'string') {\n          args[0] = output + first;\n        } else {\n          args.unshift(output);\n        }\n\n        og.apply(void 0, args);\n      };\n    }\n  }]);\n\n  _inherits(PrefixFactory, _MethodFactory);\n\n  return PrefixFactory;\n}(MethodFactory);\n\n//////////////////\n// WEBPACK FOOTER\n// ./factory/PrefixFactory.js\n// module id = ./factory/PrefixFactory.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./factory/PrefixFactory.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! object.assign/shim */ \"./node_modules/object.assign/shim.js\")();\n/* global window: true */\n\n\nvar LogLevel = __webpack_require__(/*! ./lib/LogLevel */ \"./lib/LogLevel.js\");\n\nvar MethodFactory = __webpack_require__(/*! ./lib/MethodFactory */ \"./lib/MethodFactory.js\");\n\nvar PrefixFactory = __webpack_require__(/*! ./factory/PrefixFactory */ \"./factory/PrefixFactory.js\");\n\nvar defaultLogger = new LogLevel({\n  name: 'default'\n});\nvar cache = {\n  default: defaultLogger\n}; // Grab the current global log variable in case of overwrite\n\nvar existing = typeof window !== 'undefined' ? window.log : null;\nmodule.exports = Object.assign(defaultLogger, {\n  get factories() {\n    return {\n      MethodFactory: MethodFactory,\n      PrefixFactory: PrefixFactory\n    };\n  },\n\n  get loggers() {\n    return cache;\n  },\n\n  getLogger: function getLogger(options) {\n    if (typeof options === 'string') {\n      options = {\n        name: options\n      };\n    }\n\n    if (!options.id) {\n      options.id = options.name;\n    }\n\n    var _options = options,\n        name = _options.name,\n        id = _options.id;\n    var defaults = {\n      level: defaultLogger.level\n    };\n\n    if (typeof name !== 'string' || !name || !name.length) {\n      throw new TypeError('You must supply a name when creating a logger.');\n    }\n\n    var logger = cache[id];\n\n    if (!logger) {\n      logger = new LogLevel(Object.assign({}, defaults, options));\n      cache[id] = logger;\n    }\n\n    return logger;\n  },\n  noConflict: function noConflict() {\n    if (typeof window !== 'undefined' && window.log === defaultLogger) {\n      window.log = existing;\n    }\n\n    return defaultLogger;\n  }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./index.js\n// module id = ./index.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./index.js?");

/***/ }),

/***/ "./lib/LogLevel.js":
/*!*************************!*\
  !*** ./lib/LogLevel.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* global window: true */\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PrefixFactory = __webpack_require__(/*! ../factory/PrefixFactory */ \"./factory/PrefixFactory.js\");\n\nvar MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"./lib/MethodFactory.js\");\n\nvar defaults = {\n  factory: null,\n  level: 'warn',\n  name: +new Date(),\n  prefix: null\n};\n\nmodule.exports =\n/*#__PURE__*/\nfunction () {\n  function LogLevel(options) {\n    _classCallCheck(this, LogLevel);\n\n    // implement for some _very_ loose type checking. avoids getting into a\n    // circular require between MethodFactory and LogLevel\n    this.type = 'LogLevel';\n    this.options = Object.assign({}, defaults, options);\n    this.methodFactory = options.factory;\n\n    if (!this.methodFactory) {\n      var factory = options.prefix ? new PrefixFactory(this, options.prefix) : new MethodFactory(this);\n      this.methodFactory = factory;\n    }\n\n    if (!this.methodFactory.logger) {\n      this.methodFactory.logger = this;\n    }\n\n    this.name = options.name || '<unknown>'; // this.level is a setter, do this after setting up the factory\n\n    this.level = this.options.level;\n  }\n\n  _createClass(LogLevel, [{\n    key: \"disable\",\n    value: function disable() {\n      this.level = this.levels.SILENT;\n    }\n  }, {\n    key: \"enable\",\n    value: function enable() {\n      this.level = this.levels.TRACE;\n    }\n  }, {\n    key: \"factory\",\n    get: function get() {\n      return this.methodFactory;\n    },\n    set: function set(factory) {\n      factory.logger = this;\n      this.methodFactory = factory;\n      this.methodFactory.replaceMethods(this.level);\n    }\n  }, {\n    key: \"level\",\n    get: function get() {\n      return this.currentLevel;\n    },\n    set: function set(logLevel) {\n      var level = this.methodFactory.distillLevel(logLevel);\n\n      if (level == null) {\n        throw new Error(\"loglevelnext: setLevel() called with invalid level: \".concat(logLevel));\n      }\n\n      this.currentLevel = level;\n      this.methodFactory.replaceMethods(level);\n\n      if (typeof console === 'undefined' && level < this.levels.SILENT) {\n        // eslint-disable-next-line no-console\n        console.warn('loglevelnext: console is undefined. The log will produce no output.');\n      }\n    }\n  }, {\n    key: \"levels\",\n    get: function get() {\n      // eslint-disable-line class-methods-use-this\n      return this.methodFactory.levels;\n    }\n  }]);\n\n  return LogLevel;\n}();\n\n//////////////////\n// WEBPACK FOOTER\n// ./lib/LogLevel.js\n// module id = ./lib/LogLevel.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./lib/LogLevel.js?");

/***/ }),

/***/ "./lib/MethodFactory.js":
/*!******************************!*\
  !*** ./lib/MethodFactory.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar noop = function noop() {};\n\nvar levels = Symbol('valid log levels');\nvar instance = Symbol('a log instance');\n\nmodule.exports =\n/*#__PURE__*/\nfunction () {\n  function MethodFactory(logger) {\n    _classCallCheck(this, MethodFactory);\n\n    this[instance] = logger;\n    this[levels] = {\n      TRACE: 0,\n      DEBUG: 1,\n      INFO: 2,\n      WARN: 3,\n      ERROR: 4,\n      SILENT: 5\n    };\n  }\n\n  _createClass(MethodFactory, [{\n    key: \"bindMethod\",\n    // eslint-disable-next-line class-methods-use-this\n    value: function bindMethod(obj, methodName) {\n      var method = obj[methodName];\n\n      if (typeof method.bind === 'function') {\n        return method.bind(obj);\n      }\n\n      try {\n        return Function.prototype.bind.call(method, obj);\n      } catch (e) {\n        // Missing bind shim or IE8 + Modernizr, fallback to wrapping\n        return function result() {\n          // eslint-disable-next-line prefer-rest-params\n          return Function.prototype.apply.apply(method, [obj, arguments]);\n        };\n      }\n    }\n  }, {\n    key: \"distillLevel\",\n    value: function distillLevel(level) {\n      var result = level;\n\n      if (typeof result === 'string' && typeof this.levels[result.toUpperCase()] !== 'undefined') {\n        result = this.levels[result.toUpperCase()];\n      }\n\n      if (this.levelValid(result)) {\n        return result;\n      }\n    }\n  }, {\n    key: \"levelValid\",\n    value: function levelValid(level) {\n      if (typeof level === 'number' && level >= 0 && level <= this.levels.SILENT) {\n        return true;\n      }\n\n      return false;\n    }\n    /**\n     * Build the best logging method possible for this env\n     * Wherever possible we want to bind, not wrap, to preserve stack traces.\n     * Since we're targeting modern browsers, there's no need to wait for the\n     * console to become available.\n     */\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: \"make\",\n    value: function make(methodName) {\n      if (methodName === 'debug') {\n        methodName = 'log';\n      }\n      /* eslint-disable no-console */\n\n\n      if (typeof console[methodName] !== 'undefined') {\n        return this.bindMethod(console, methodName);\n      } else if (typeof console.log !== 'undefined') {\n        return this.bindMethod(console, 'log');\n      }\n      /* eslint-enable no-console */\n\n\n      return noop;\n    }\n  }, {\n    key: \"replaceMethods\",\n    value: function replaceMethods(logLevel) {\n      var level = this.distillLevel(logLevel);\n\n      if (level == null) {\n        throw new Error(\"loglevelnext: replaceMethods() called with invalid level: \".concat(logLevel));\n      }\n\n      if (!this.logger || this.logger.type !== 'LogLevel') {\n        throw new TypeError('loglevelnext: Logger is undefined or invalid. Please specify a valid Logger instance.');\n      }\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this.methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var methodName = _step.value;\n          var methodLevel = this.levels[methodName.toUpperCase()];\n          this.logger[methodName] = methodLevel < level ? noop : this.make(methodName);\n        } // Define log.log as an alias for log.debug\n\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return != null) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n\n      this.logger.log = this.logger.debug;\n    }\n  }, {\n    key: \"levels\",\n    get: function get() {\n      return this[levels];\n    }\n  }, {\n    key: \"logger\",\n    get: function get() {\n      return this[instance];\n    },\n    set: function set(logger) {\n      this[instance] = logger;\n    }\n  }, {\n    key: \"methods\",\n    get: function get() {\n      return Object.keys(this.levels).map(function (key) {\n        return key.toLowerCase();\n      }).filter(function (key) {\n        return key !== 'silent';\n      });\n    }\n  }]);\n\n  return MethodFactory;\n}();\n\n//////////////////\n// WEBPACK FOOTER\n// ./lib/MethodFactory.js\n// module id = ./lib/MethodFactory.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./lib/MethodFactory.js?");

/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar foreach = __webpack_require__(/*! foreach */ \"./node_modules/foreach/index.js\");\nvar hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';\n\nvar toStr = Object.prototype.toString;\n\nvar isFunction = function (fn) {\n\treturn typeof fn === 'function' && toStr.call(fn) === '[object Function]';\n};\n\nvar arePropertyDescriptorsSupported = function () {\n\tvar obj = {};\n\ttry {\n\t\tObject.defineProperty(obj, 'x', { enumerable: false, value: obj });\n        /* eslint-disable no-unused-vars, no-restricted-syntax */\n        for (var _ in obj) { return false; }\n        /* eslint-enable no-unused-vars, no-restricted-syntax */\n\t\treturn obj.x === obj;\n\t} catch (e) { /* this is IE 8. */\n\t\treturn false;\n\t}\n};\nvar supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();\n\nvar defineProperty = function (object, name, value, predicate) {\n\tif (name in object && (!isFunction(predicate) || !predicate())) {\n\t\treturn;\n\t}\n\tif (supportsDescriptors) {\n\t\tObject.defineProperty(object, name, {\n\t\t\tconfigurable: true,\n\t\t\tenumerable: false,\n\t\t\tvalue: value,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\tobject[name] = value;\n\t}\n};\n\nvar defineProperties = function (object, map) {\n\tvar predicates = arguments.length > 2 ? arguments[2] : {};\n\tvar props = keys(map);\n\tif (hasSymbols) {\n\t\tprops = props.concat(Object.getOwnPropertySymbols(map));\n\t}\n\tforeach(props, function (name) {\n\t\tdefineProperty(object, name, map[name], predicates[name]);\n\t});\n};\n\ndefineProperties.supportsDescriptors = !!supportsDescriptors;\n\nmodule.exports = defineProperties;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/define-properties/index.js\n// module id = ./node_modules/define-properties/index.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/define-properties/index.js?");

/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar hasOwn = Object.prototype.hasOwnProperty;\nvar toString = Object.prototype.toString;\n\nmodule.exports = function forEach (obj, fn, ctx) {\n    if (toString.call(fn) !== '[object Function]') {\n        throw new TypeError('iterator must be a function');\n    }\n    var l = obj.length;\n    if (l === +l) {\n        for (var i = 0; i < l; i++) {\n            fn.call(ctx, obj[i], i, obj);\n        }\n    } else {\n        for (var k in obj) {\n            if (hasOwn.call(obj, k)) {\n                fn.call(ctx, obj[k], k, obj);\n            }\n        }\n    }\n};\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/foreach/index.js\n// module id = ./node_modules/foreach/index.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/foreach/index.js?");

/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint no-invalid-this: 1 */\n\nvar ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';\nvar slice = Array.prototype.slice;\nvar toStr = Object.prototype.toString;\nvar funcType = '[object Function]';\n\nmodule.exports = function bind(that) {\n    var target = this;\n    if (typeof target !== 'function' || toStr.call(target) !== funcType) {\n        throw new TypeError(ERROR_MESSAGE + target);\n    }\n    var args = slice.call(arguments, 1);\n\n    var bound;\n    var binder = function () {\n        if (this instanceof bound) {\n            var result = target.apply(\n                this,\n                args.concat(slice.call(arguments))\n            );\n            if (Object(result) === result) {\n                return result;\n            }\n            return this;\n        } else {\n            return target.apply(\n                that,\n                args.concat(slice.call(arguments))\n            );\n        }\n    };\n\n    var boundLength = Math.max(0, target.length - args.length);\n    var boundArgs = [];\n    for (var i = 0; i < boundLength; i++) {\n        boundArgs.push('$' + i);\n    }\n\n    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);\n\n    if (target.prototype) {\n        var Empty = function Empty() {};\n        Empty.prototype = target.prototype;\n        bound.prototype = new Empty();\n        Empty.prototype = null;\n    }\n\n    return bound;\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/function-bind/implementation.js\n// module id = ./node_modules/function-bind/implementation.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/function-bind/implementation.js?");

/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/function-bind/implementation.js\");\n\nmodule.exports = Function.prototype.bind || implementation;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/function-bind/index.js\n// module id = ./node_modules/function-bind/index.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/function-bind/index.js?");

/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint complexity: [2, 17], max-statements: [2, 33] */\nmodule.exports = function hasSymbols() {\n\tif (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }\n\tif (typeof Symbol.iterator === 'symbol') { return true; }\n\n\tvar obj = {};\n\tvar sym = Symbol('test');\n\tvar symObj = Object(sym);\n\tif (typeof sym === 'string') { return false; }\n\n\tif (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }\n\tif (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }\n\n\t// temp disabled per https://github.com/ljharb/object.assign/issues/17\n\t// if (sym instanceof Symbol) { return false; }\n\t// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4\n\t// if (!(symObj instanceof Symbol)) { return false; }\n\n\t// if (typeof Symbol.prototype.toString !== 'function') { return false; }\n\t// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }\n\n\tvar symVal = 42;\n\tobj[sym] = symVal;\n\tfor (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax\n\tif (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }\n\n\tif (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }\n\n\tvar syms = Object.getOwnPropertySymbols(obj);\n\tif (syms.length !== 1 || syms[0] !== sym) { return false; }\n\n\tif (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }\n\n\tif (typeof Object.getOwnPropertyDescriptor === 'function') {\n\t\tvar descriptor = Object.getOwnPropertyDescriptor(obj, sym);\n\t\tif (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }\n\t}\n\n\treturn true;\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/has-symbols/shams.js\n// module id = ./node_modules/has-symbols/shams.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/has-symbols/shams.js?");

/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// modified from https://github.com/es-shims/es5-shim\nvar has = Object.prototype.hasOwnProperty;\nvar toStr = Object.prototype.toString;\nvar slice = Array.prototype.slice;\nvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/object-keys/isArguments.js\");\nvar isEnumerable = Object.prototype.propertyIsEnumerable;\nvar hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');\nvar hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');\nvar dontEnums = [\n\t'toString',\n\t'toLocaleString',\n\t'valueOf',\n\t'hasOwnProperty',\n\t'isPrototypeOf',\n\t'propertyIsEnumerable',\n\t'constructor'\n];\nvar equalsConstructorPrototype = function (o) {\n\tvar ctor = o.constructor;\n\treturn ctor && ctor.prototype === o;\n};\nvar excludedKeys = {\n\t$console: true,\n\t$external: true,\n\t$frame: true,\n\t$frameElement: true,\n\t$frames: true,\n\t$innerHeight: true,\n\t$innerWidth: true,\n\t$outerHeight: true,\n\t$outerWidth: true,\n\t$pageXOffset: true,\n\t$pageYOffset: true,\n\t$parent: true,\n\t$scrollLeft: true,\n\t$scrollTop: true,\n\t$scrollX: true,\n\t$scrollY: true,\n\t$self: true,\n\t$webkitIndexedDB: true,\n\t$webkitStorageInfo: true,\n\t$window: true\n};\nvar hasAutomationEqualityBug = (function () {\n\t/* global window */\n\tif (typeof window === 'undefined') { return false; }\n\tfor (var k in window) {\n\t\ttry {\n\t\t\tif (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {\n\t\t\t\ttry {\n\t\t\t\t\tequalsConstructorPrototype(window[k]);\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (e) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n}());\nvar equalsConstructorPrototypeIfNotBuggy = function (o) {\n\t/* global window */\n\tif (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n\t\treturn equalsConstructorPrototype(o);\n\t}\n\ttry {\n\t\treturn equalsConstructorPrototype(o);\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n\nvar keysShim = function keys(object) {\n\tvar isObject = object !== null && typeof object === 'object';\n\tvar isFunction = toStr.call(object) === '[object Function]';\n\tvar isArguments = isArgs(object);\n\tvar isString = isObject && toStr.call(object) === '[object String]';\n\tvar theKeys = [];\n\n\tif (!isObject && !isFunction && !isArguments) {\n\t\tthrow new TypeError('Object.keys called on a non-object');\n\t}\n\n\tvar skipProto = hasProtoEnumBug && isFunction;\n\tif (isString && object.length > 0 && !has.call(object, 0)) {\n\t\tfor (var i = 0; i < object.length; ++i) {\n\t\t\ttheKeys.push(String(i));\n\t\t}\n\t}\n\n\tif (isArguments && object.length > 0) {\n\t\tfor (var j = 0; j < object.length; ++j) {\n\t\t\ttheKeys.push(String(j));\n\t\t}\n\t} else {\n\t\tfor (var name in object) {\n\t\t\tif (!(skipProto && name === 'prototype') && has.call(object, name)) {\n\t\t\t\ttheKeys.push(String(name));\n\t\t\t}\n\t\t}\n\t}\n\n\tif (hasDontEnumBug) {\n\t\tvar skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n\n\t\tfor (var k = 0; k < dontEnums.length; ++k) {\n\t\t\tif (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {\n\t\t\t\ttheKeys.push(dontEnums[k]);\n\t\t\t}\n\t\t}\n\t}\n\treturn theKeys;\n};\n\nkeysShim.shim = function shimObjectKeys() {\n\tif (Object.keys) {\n\t\tvar keysWorksWithArguments = (function () {\n\t\t\t// Safari 5.0 bug\n\t\t\treturn (Object.keys(arguments) || '').length === 2;\n\t\t}(1, 2));\n\t\tif (!keysWorksWithArguments) {\n\t\t\tvar originalKeys = Object.keys;\n\t\t\tObject.keys = function keys(object) {\n\t\t\t\tif (isArgs(object)) {\n\t\t\t\t\treturn originalKeys(slice.call(object));\n\t\t\t\t} else {\n\t\t\t\t\treturn originalKeys(object);\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t} else {\n\t\tObject.keys = keysShim;\n\t}\n\treturn Object.keys || keysShim;\n};\n\nmodule.exports = keysShim;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/object-keys/index.js\n// module id = ./node_modules/object-keys/index.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/object-keys/index.js?");

/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar toStr = Object.prototype.toString;\n\nmodule.exports = function isArguments(value) {\n\tvar str = toStr.call(value);\n\tvar isArgs = str === '[object Arguments]';\n\tif (!isArgs) {\n\t\tisArgs = str !== '[object Array]' &&\n\t\t\tvalue !== null &&\n\t\t\ttypeof value === 'object' &&\n\t\t\ttypeof value.length === 'number' &&\n\t\t\tvalue.length >= 0 &&\n\t\t\ttoStr.call(value.callee) === '[object Function]';\n\t}\n\treturn isArgs;\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/object-keys/isArguments.js\n// module id = ./node_modules/object-keys/isArguments.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/object-keys/isArguments.js?");

/***/ }),

/***/ "./node_modules/object.assign/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/object.assign/implementation.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// modified from https://github.com/es-shims/es6-shim\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar canBeObject = function (obj) {\n\treturn typeof obj !== 'undefined' && obj !== null;\n};\nvar hasSymbols = __webpack_require__(/*! has-symbols/shams */ \"./node_modules/has-symbols/shams.js\")();\nvar toObject = Object;\nvar push = bind.call(Function.call, Array.prototype.push);\nvar propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);\nvar originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;\n\nmodule.exports = function assign(target, source1) {\n\tif (!canBeObject(target)) { throw new TypeError('target must be an object'); }\n\tvar objTarget = toObject(target);\n\tvar s, source, i, props, syms, value, key;\n\tfor (s = 1; s < arguments.length; ++s) {\n\t\tsource = toObject(arguments[s]);\n\t\tprops = keys(source);\n\t\tvar getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);\n\t\tif (getSymbols) {\n\t\t\tsyms = getSymbols(source);\n\t\t\tfor (i = 0; i < syms.length; ++i) {\n\t\t\t\tkey = syms[i];\n\t\t\t\tif (propIsEnumerable(source, key)) {\n\t\t\t\t\tpush(props, key);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfor (i = 0; i < props.length; ++i) {\n\t\t\tkey = props[i];\n\t\t\tvalue = source[key];\n\t\t\tif (propIsEnumerable(source, key)) {\n\t\t\t\tobjTarget[key] = value;\n\t\t\t}\n\t\t}\n\t}\n\treturn objTarget;\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/object.assign/implementation.js\n// module id = ./node_modules/object.assign/implementation.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/object.assign/implementation.js?");

/***/ }),

/***/ "./node_modules/object.assign/polyfill.js":
/*!************************************************!*\
  !*** ./node_modules/object.assign/polyfill.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/object.assign/implementation.js\");\n\nvar lacksProperEnumerationOrder = function () {\n\tif (!Object.assign) {\n\t\treturn false;\n\t}\n\t// v8, specifically in node 4.x, has a bug with incorrect property enumeration order\n\t// note: this does not detect the bug unless there's 20 characters\n\tvar str = 'abcdefghijklmnopqrst';\n\tvar letters = str.split('');\n\tvar map = {};\n\tfor (var i = 0; i < letters.length; ++i) {\n\t\tmap[letters[i]] = letters[i];\n\t}\n\tvar obj = Object.assign({}, map);\n\tvar actual = '';\n\tfor (var k in obj) {\n\t\tactual += k;\n\t}\n\treturn str !== actual;\n};\n\nvar assignHasPendingExceptions = function () {\n\tif (!Object.assign || !Object.preventExtensions) {\n\t\treturn false;\n\t}\n\t// Firefox 37 still has \"pending exception\" logic in its Object.assign implementation,\n\t// which is 72% slower than our shim, and Firefox 40's native implementation.\n\tvar thrower = Object.preventExtensions({ 1: 2 });\n\ttry {\n\t\tObject.assign(thrower, 'xy');\n\t} catch (e) {\n\t\treturn thrower[1] === 'y';\n\t}\n\treturn false;\n};\n\nmodule.exports = function getPolyfill() {\n\tif (!Object.assign) {\n\t\treturn implementation;\n\t}\n\tif (lacksProperEnumerationOrder()) {\n\t\treturn implementation;\n\t}\n\tif (assignHasPendingExceptions()) {\n\t\treturn implementation;\n\t}\n\treturn Object.assign;\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/object.assign/polyfill.js\n// module id = ./node_modules/object.assign/polyfill.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/object.assign/polyfill.js?");

/***/ }),

/***/ "./node_modules/object.assign/shim.js":
/*!********************************************!*\
  !*** ./node_modules/object.assign/shim.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar define = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/object.assign/polyfill.js\");\n\nmodule.exports = function shimAssign() {\n\tvar polyfill = getPolyfill();\n\tdefine(\n\t\tObject,\n\t\t{ assign: polyfill },\n\t\t{ assign: function () { return Object.assign !== polyfill; } }\n\t);\n\treturn polyfill;\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/object.assign/shim.js\n// module id = ./node_modules/object.assign/shim.js\n// module chunks = main\n\n//# sourceURL=webpack://log/./node_modules/object.assign/shim.js?");

/***/ })

/******/ });
});