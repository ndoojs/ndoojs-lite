(function () {
  "use strict";
  this.N = this.ndoo || (this.ndoo = {});
  var _n = this.ndoo;

  _n.reset = function () {
    // 清空变量暂存
    _n.vars = {}

    // 清空函数暂存
    _n.func = {}

    // 清空存储暂存
    _n.storage._data = {}

    // 清空事件暂存
    _n._eventData = {}

    // 清空page id
    _n.pageId = '';

  };
}).call(this);
