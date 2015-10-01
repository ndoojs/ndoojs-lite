/*
" --------------------------------------------------
"   FileName: app.coffee
"       Desc: app.js webapp逻辑脚本
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
(function(){
  /* Notice: 不要修改本文件，本文件由app.ls自动生成 */
  'use strict';
  var $, _n, _vars, _func, _stor;
  $ = this['jQuery'] || this['Zepto'];
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  _n.app('home', {
    indexAction: function(){
      console.log('action');
    },
    indexPortionAction: function(){
      console.log('portion action');
    }
  });
}).call(this);
