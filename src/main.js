const div1 = dom.create("<div>表格</div>");
console.log(div1);

const createdDiv = dom.create("<div>createdDiv</div>");
console.log(createdDiv);
const testDiv = dom.find("#test")[0];
dom.after(testDiv, createdDiv);
dom.before(testDiv, div1);
dom.append(testDiv, createdDiv);
const pDiv = dom.create("<div id='parent'>pDiv</div>");

dom.wrap(testDiv, pDiv);
dom.class.add(pDiv, "redBorder");
dom.class.remove(pDiv, "redBorder");
console.log(dom.class.has(pDiv, "redBorder"));

console.log(dom.remove(div1));

console.log(dom.empty(dom.find("#empty")[0]));
const div = dom.find("#test>.red")[0]; // 获取对应的元素
dom.style(div, "color", "red"); // 设置 div.style.color

const divList = dom.find(".red"); // 获取多个 div.red 元素
dom.each(divList, (n) => console.log(n)); // 遍历 divList 里的所有元素
const fn = () => console.log("点击了");
dom.on(pDiv, "click", fn);
dom.children(pDiv);
dom.sibling(dom.find("#empty")[0]);
console.dir(dom.next(pDiv));
console.log(dom.index(dom.find("#empty")[0]));
