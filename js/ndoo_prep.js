/*
" --------------------------------------------------
"   FileName: ndoo_prep.coffee
"       Desc: ndoo.js前置文件 for lite
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
(function(){
  /* Notice: 不要修改本文件，本文件由ndoo_prep.ls自动生成 */
  "use strict";
  var _n;
  if (this.ndoo) {
    return;
  }
  this.N = this.ndoo || (this.ndoo = {});
  /**
   * ndoojs 全局名称空间，短名称N
   *
   * @namespace ndoo
   */
  _n = this.ndoo;
  /**
   * _isDebug 是否开启调试模式
   *
   * @name _isDebug
   * @memberof ndoo
   * @type {boolean}
   */
  _n._isDebug = 0;
  _n.DELAY_FAST = 0;
  _n.DELAY_DOM = 1;
  _n.DELAY_DOMORLOAD = 2;
  _n.DELAY_LOAD = 3;
  _n._delayArr = [[], [], [], []];
  _n.delayRun = function(level, req, fn){
    fn || (fn = [req, req = []][0]);
    if (typeof req === 'string') {
      req = req.split(',');
    }
    this._delayArr[level].push([req, fn]);
  };
  _n._hookData = {};
  _n.hook = function(name, call, isOverwrite){
    var args;
    if (call && call.apply) {
      if (this._hookData[name] && !isOverwrite) {
        return false;
      }
      this._hookData[name] = call;
      return true;
    } else {
      call = this._hookData[name];
      args = [].concat(call);
      if (call) {
        return call.apply(null, args);
      }
    }
  };
  /**
   * 变量存储名称空间
   *
   * @namespace
   * @name vars
   * @memberof ndoo
   * @type {object}
   * @example // alias _vars
   * var _vars = ndoo.vars;
   * vars.bar = 'bar';
   */
  _n.vars || (_n.vars = {});
  /**
   * 函数存储名称空间
   *
   * @namespace
   * @name func
   * @memberof ndoo
   * @type {object}
   * @example // alias _func
   * var _func = ndoo.func;
   * _func.foo = function() {
   *   console.log('foo');
   * }
   */
  _n.func || (_n.func = {});
}).call(this);
