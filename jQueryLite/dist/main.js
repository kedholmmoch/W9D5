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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(array) {\n    this.array = array;\n    this.callbacks = [];\n  }\n\n  html(argument) {\n    if (argument === undefined) {\n      return this.array[0].innerHTML;\n    }\n    for (let i = 0; i < this.array.length; i++) {\n      this.array[i].innerHTML = argument;\n    }\n  }\n\n  empty() {\n    for (let element of this.array){\n      element.innerHTML = \"\";\n    }\n  }\n\n  append(argument) {\n    let outerHTML = \"\";\n    if (argument instanceof HTMLElement) {\n      outerHTML = argument.outerHTML;\n    } else if (argument instanceof DOMNodeCollection) {\n      for (let element of argument.array) {\n        outerHTML += element.outerHTML;\n      }\n    } else if (typeof argument === \"string\") {\n      outerHTML = argument;\n    }\n    for (let element of this.array) {\n      element.innerHTML += outerHTML;\n    }\n  }\n\n  attr(attribute, value) {\n    if (value === undefined) {\n      return this.array.map( el => {\n        return el.getAttribute(attribute);\n      });\n    }\n\n    for (let element of this.array) {\n      element.setAttribute(attribute, value);\n    }\n  }\n\n  addClass(className) {\n    this.attr(\"class\", className);\n  }\n\n  removeClass(className) {\n    let elementsWithClassName = this.array.filter( (el) => {\n      return el.getAttribute(\"class\") === className;\n    });\n    for (let element of elementsWithClassName) {\n      element.removeAttribute(\"class\");\n    }\n  }\n\n  children() {\n    let children = [];\n    for (let element of this.array) {\n      children = children.concat(element.children);\n      console.log(element.children);\n    }\n    return new DOMNodeCollection(children);\n  }\n\n  parent() {\n    let parents = [];\n    for (let element of this.array) {\n      if (element.parentElement) {\n        parents.push(element.parentElement);\n      }\n    }\n    return new DOMNodeCollection(parents);\n  }\n\n  find(selector) {\n    let result = [];\n    for (let element of document.querySelectorAll(selector)) {\n      if (this.allDescendants(this.array).includes(element)) {\n        result.push(element);\n      }\n    }\n    return new DOMNodeCollection(result);\n  }\n\n  allDescendants(elements) {\n    let children = [];\n\n    for (let element of elements) {\n      children = children.concat(Array.from(element.children))\n        .concat(this.allDescendants(Array.from(element.children)));\n    }\n    return children;\n  }\n\n  remove() {\n    let descendants = this.allDescendants(this.array);\n    for (let element of descendants) {\n      element.innerHTML = \"\";\n    }\n    this.empty();\n  }\n\n  on(event, callback) {\n    this.callbacks.push(callback);\n    for (let ele of this.array) {\n      ele.addEventListener(event, callback);\n    }\n  }\n\n  off(event) {\n    this.callbacks.forEach( callback => {\n      for (let el of this.array) {\n        el.removeEventListener(event, callback);\n      }\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nlet queue = [];\n\nsetInterval(() => {\n  if (document.readyState === \"complete\") {\n    let func = queue.shift();\n    if (func) func();\n  }\n}, 0);\n\nconsole.log(document.getElementById(\"first\"));\n\nwindow.$l = function(arg) {\n  \n  if (arg instanceof Function) {\n    queue.push(arg);\n    return;\n  }\n  \n  let array = arg instanceof HTMLElement ?\n    [arg] :\n    Array.from(document.querySelectorAll(arg));\n  return new DOMNodeCollection(array);\n}\n\nwindow.$l.extend = function(a, b, ...objs) {\n  let allObjs = [a, b].concat(objs);\n  let result = {};\n  for (let obj of allObjs) {\n    for (let key of Object.keys(obj)) {\n      result[key] = obj[key];\n    }\n  }\n  return result;\n}\n\nwindow.$l.ajax = function(options) {\n  options = $l.extend({\n    success: function(){console.log(\"Success\")},\n    error: function(){console.log(\"Error\")},\n    url: 'https://reqres.in/api/users/2',\n    method: 'GET',\n    contentType: 'application/json'\n  }, options);\n  \n  const xhr = new XMLHttpRequest();\n  xhr.open(options.method, options.url);\n  xhr.onreadystatechange = function (e) {\n    if (xhr.readyState === 4) {\n      if (xhr.status >= 200 || xhr.status < 300) {\n        options.success();\n        console.log(xhr.responseText);\n      } else {\n        options.error();\n        console.log(\"Error\", xhr.statusText);\n      }\n    }\n  }; \n  xhr.setRequestHeader('Content-Type', options.contentType);\n  xhr.send(options.data);\n}\n\n$l(() => {\n  console.log(document.getElementById(\"first\"));\n\n  let first = document.getElementById(\"first\");\n  let second = document.getElementById(\"second\");\n  let elements = document.getElementsByClassName(\"what-what\");\n  let ours = $l(\"#first\");\n\n  console.log(document.readyState);\n\n  // $l.ajax({\n  //   method: 'POST',\n  //   url: 'https://reqres.in/api/users',\n  //   data: {\n  //     \"name\": \"morpheus\",\n  //     \"job\": \"leader\"\n  //   }\n  // });\n\n  $l.ajax({});\n\n  ours.on(\"click\", () => {\n    alert(\"THIS IS WORKING!\");\n  })\n\n  ours.off(\"click\");\n\n  ours.on(\"click\", () => {\n    alert(\"THIS IS!\");\n  });\n\n  var a = { foo: 1, bar: 1 };\n  var b = { foo: 2, baz: 2 };\n  var c = { foo: 3 };\n  console.log($l.extend(a, b, c));\n\n  // console.log(ours.find(\".grandchild\"));\n  // ours.remove();\n  // console.log(ours.allDescendants(ours.array));\n  // console.log(ours.children());\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });