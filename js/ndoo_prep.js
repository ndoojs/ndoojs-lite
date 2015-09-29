/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件 for lite
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
(function(){
  /* Notice: 不要修改本文件，本文件由ndoo_prep.ls自动生成 */
  "use strict";
  var _n, slice$ = [].slice;
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
  _n.DELAY_FAST = 'STATUS:DELAY_FAST';
  _n.DELAY_DOM = 'STATUS:DELAY_DOM';
  _n.DELAY_DOMORLOAD = 'STATUS:DELAY_DOMORLOAD';
  _n.DELAY_LOAD = 'STATUS:DELAY_LOAD';
  _n._delayArr = [[], [], [], []];
  _n.delayRun = function(level, fn){
    _n.on(level, fn);
  };
  /* event module {{{*/
  _n._eventData = {};
  _n.on = function(eventName, callback){
    if (_n._eventData.hasOwnProperty(eventName)) {
      return _n._eventData[eventName].push(callback);
    } else {
      return _n._eventData[eventName] = [callback];
    }
  };
  _n.trigger = function(eventName){
    var data, callbacks, i$, len$, call;
    data = slice$.call(arguments, 1);
    if (_n._eventData.hasOwnProperty(eventName)) {
      callbacks = _n._eventData[eventName];
      for (i$ = 0, len$ = callbacks.length; i$ < len$; ++i$) {
        call = callbacks[i$];
        call.apply(null, data);
      }
    }
  };
  _n.off = function(eventName){
    if (_n._eventData.hasOwnProperty(eventName)) {
      delete _n._eventData[eventName];
    }
    return true;
  };
  /* }}} */
  /* hook modules {{{ */
  _n.hook = function(name, call, isOverwrite){
    if (call && call.apply) {
      if (this._eventData[name] && !isOverwrite) {
        return false;
      }
      _n._eventData[name] = call;
      return true;
    } else {
      return _n.trigger.apply(_n, [].concat(name, call || []));
    }
  };
  /* }}} */
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
