class Stack {
  items: Array<number | string> = [];
  //压栈
  push(element) {
    this.items.push(element);
  }

  //移除栈顶的元素，同时返回被移除的元素
  pop() {
    return this.items.pop();
  }

  //返回栈顶的元素
  peek() {
    return this.items[this.items.length - 1];
  }

  //判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  //移除栈里的所有元素
  clear() {
    this.items = [];
  }

  //返回栈里的元素个数
  size() {
    return this.items.length;
  }
}