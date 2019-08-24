const DOMNodeCollection = require("./dom_node_collection.js");

let queue = [];

setInterval(() => {
  if (document.readyState === "complete") {
    let func = queue.shift();
    if (func) func();
  }
}, 0);

console.log(document.getElementById("first"));

window.$l = function(arg) {
  
  if (arg instanceof Function) {
    queue.push(arg);
    return;
  }
  
  let array = arg instanceof HTMLElement ?
    [arg] :
    Array.from(document.querySelectorAll(arg));
  return new DOMNodeCollection(array);
}

window.$l.extend = function(a, b, ...objs) {
  let allObjs = [a, b].concat(objs);
  let result = {};
  for (let obj of allObjs) {
    for (let key of Object.keys(obj)) {
      result[key] = obj[key];
    }
  }
  return result;
}

window.$l.ajax = function(options) {
  options = $l.extend({
    success: function(){console.log("Success")},
    error: function(){console.log("Error")},
    url: 'https://reqres.in/api/users/2',
    method: 'GET',
    contentType: 'application/json'
  }, options);
  
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 || xhr.status < 300) {
        options.success();
        console.log(xhr.responseText);
      } else {
        options.error();
        console.log("Error", xhr.statusText);
      }
    }
  }; 
  xhr.setRequestHeader('Content-Type', options.contentType);
  xhr.send(options.data);
}

$l(() => {
  console.log(document.getElementById("first"));

  let first = document.getElementById("first");
  let second = document.getElementById("second");
  let elements = document.getElementsByClassName("what-what");
  let ours = $l("#first");

  console.log(document.readyState);

  // $l.ajax({
  //   method: 'POST',
  //   url: 'https://reqres.in/api/users',
  //   data: {
  //     "name": "morpheus",
  //     "job": "leader"
  //   }
  // });

  $l.ajax({});

  ours.on("click", () => {
    alert("THIS IS WORKING!");
  })

  ours.off("click");

  ours.on("click", () => {
    alert("THIS IS!");
  });

  var a = { foo: 1, bar: 1 };
  var b = { foo: 2, baz: 2 };
  var c = { foo: 3 };
  console.log($l.extend(a, b, c));

  // console.log(ours.find(".grandchild"));
  // ours.remove();
  // console.log(ours.allDescendants(ours.array));
  // console.log(ours.children());
});
