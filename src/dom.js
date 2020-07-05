window.dom = {
  create(string) {
    const container = document.createElement("template");
    //template标签可以容纳任意标签或内容
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    console.log(node);
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //新增子节点
  append(parent, node) {
    parent.appendChild(node);
  },
  //新增父节点
  wrap(node, parent) {
    this.before(node, parent);
    parent.appendChild(node);
  },
  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //删除所有子节点
  empty(node) {
    const { childNodes } = node; //等于 const childNodes = node.childNodes;
    const array = [];
    while (childNodes.length > 0) {
      array.push(dom.remove(node.firstChild));
    }
    return array;
  },
  //读写属性
  attr(node, name, value) {
    //重载：根据参数个数执行不同的操作
    if (arguments.length === 2) {
      return node.getAttribute(name);
    } else if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
  },
  //读写文本内容
  text(node, string) {
    if (arguments.length === 2) {
      //适配：
      if ("innerText" in node) {
        // innerText:ie;
        node.innerText = string;
      } else if ("textContent" in node) {
        //textContent:firefox/Chrome
        node.textContent = string;
      }
    }
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  //增删查class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    // console.log(typeof node.childNodes);
    // console.log(typeof node.children);
    return node.children;
  },
  sibling(node) {
    console.dir(node.parentNode.children); //不包含text
    console.dir(node.parentNode.childNodes); //包含text
    console.dir(Array.from(node.parentNode.children));
    console.dir(Array.from(node.parentNode.childNodes));

    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  previous(node) {
    let nextNode = node.previousSibling;
    while (nextNode.nodeType === Node.TEXT_NODE) {
      //3为文本，1为元素
      nextNode = nextNode.previousSibling;
    }
    return nextNode;
  },
  next(node) {
    let nextNode = node.nextSibling;
    while (nextNode.nodeType === Node.TEXT_NODE) {
      //3为文本，1为元素
      nextNode = nextNode.nextSibling;
    }
    return nextNode;
  },
  index(node) {
    const list = node.parentNode.children;
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
