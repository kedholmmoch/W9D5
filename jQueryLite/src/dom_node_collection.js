class DOMNodeCollection {
  constructor(array) {
    this.array = array;
    this.callbacks = [];
  }

  html(argument) {
    if (argument === undefined) {
      return this.array[0].innerHTML;
    }
    for (let i = 0; i < this.array.length; i++) {
      this.array[i].innerHTML = argument;
    }
  }

  empty() {
    for (let element of this.array){
      element.innerHTML = "";
    }
  }

  append(argument) {
    let outerHTML = "";
    if (argument instanceof HTMLElement) {
      outerHTML = argument.outerHTML;
    } else if (argument instanceof DOMNodeCollection) {
      for (let element of argument.array) {
        outerHTML += element.outerHTML;
      }
    } else if (typeof argument === "string") {
      outerHTML = argument;
    }
    for (let element of this.array) {
      element.innerHTML += outerHTML;
    }
  }

  attr(attribute, value) {
    if (value === undefined) {
      return this.array.map( el => {
        return el.getAttribute(attribute);
      });
    }

    for (let element of this.array) {
      element.setAttribute(attribute, value);
    }
  }

  addClass(className) {
    this.attr("class", className);
  }

  removeClass(className) {
    let elementsWithClassName = this.array.filter( (el) => {
      return el.getAttribute("class") === className;
    });
    for (let element of elementsWithClassName) {
      element.removeAttribute("class");
    }
  }

  children() {
    let children = [];
    for (let element of this.array) {
      children = children.concat(element.children);
      console.log(element.children);
    }
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    for (let element of this.array) {
      if (element.parentElement) {
        parents.push(element.parentElement);
      }
    }
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let result = [];
    for (let element of document.querySelectorAll(selector)) {
      if (this.allDescendants(this.array).includes(element)) {
        result.push(element);
      }
    }
    return new DOMNodeCollection(result);
  }

  allDescendants(elements) {
    let children = [];

    for (let element of elements) {
      children = children.concat(Array.from(element.children))
        .concat(this.allDescendants(Array.from(element.children)));
    }
    return children;
  }

  remove() {
    let descendants = this.allDescendants(this.array);
    for (let element of descendants) {
      element.innerHTML = "";
    }
    this.empty();
  }

  on(event, callback) {
    this.callbacks.push(callback);
    for (let ele of this.array) {
      ele.addEventListener(event, callback);
    }
  }

  off(event) {
    this.callbacks.forEach( callback => {
      for (let el of this.array) {
        el.removeEventListener(event, callback);
      }
    });
  }
}

module.exports = DOMNodeCollection;