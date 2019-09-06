/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/greet.js":
/*!**********************!*\
  !*** ./app/greet.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// common.JS规范；node就是common.js规范；\r\nmodule.exports= function () {\r\n    let greet = document.createElement(\"div\");\r\n    greet.innerHTML = \"Hi ,马老师怎么没来\";\r\n    return greet;\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZ3JlZXQuanM/MGQwNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9hcHAvZ3JlZXQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb21tb24uSlPop4TojIPvvJtub2Rl5bCx5pivY29tbW9uLmpz6KeE6IyD77ybXHJcbm1vZHVsZS5leHBvcnRzPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgZ3JlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZ3JlZXQuaW5uZXJIVE1MID0gXCJIaSAs6ams6ICB5biI5oCO5LmI5rKh5p2lXCI7XHJcbiAgICByZXR1cm4gZ3JlZXQ7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app/greet.js\n");

/***/ }),

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\r\n// export  import;\r\n\r\n// require 就是导入；把greet.js中导出的内容接收到；\r\nconst gre = __webpack_require__(/*! ./greet.js */ \"./app/greet.js\");\r\ndocument.getElementById(\"root\").appendChild(gre());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcz9mMTYxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7QUFFQTtBQUNBLFlBQVksbUJBQU8sQ0FBQyxrQ0FBWTtBQUNoQyIsImZpbGUiOiIuL2FwcC9tYWluLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGV4cG9ydCAgaW1wb3J0O1xyXG5cclxuLy8gcmVxdWlyZSDlsLHmmK/lr7zlhaXvvJvmiopncmVldC5qc+S4reWvvOWHuueahOWGheWuueaOpeaUtuWIsO+8m1xyXG5jb25zdCBncmUgPSByZXF1aXJlKFwiLi9ncmVldC5qc1wiKTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLmFwcGVuZENoaWxkKGdyZSgpKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/main.js\n");

/***/ })

/******/ });