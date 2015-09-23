
/*
" --------------------------------------------------
"   FileName: app.coffee
"       Desc: app.js webapp逻辑脚本
"     Author: chenglifu
"    Version: v0.1
" LastChange: 03/19/2014 11:19
" --------------------------------------------------
 */

/* Notice: 不要修改本文件，本文件由app.coffee自动生成 */
(function($) {
  "use strict";
  var _func, _n, _stor, _vars;
  _n = this;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;

  /* 模块定义 {{{ */
  _n.app('home', {
    indexAction: function() {
      console.log('action');
    },
    indexPortionAction: function() {
      console.log('portion action');
    }
  });

  /* }}} */
  return _n;
}).call(this.N = this.ndoo = this.ndoo || {}, Zepto);
