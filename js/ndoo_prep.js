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
  /**
   * ndoojs 全局名称空间，短名称N
   *
   * @namespace ndoo
   */
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  /**
   * _isDebug 是否开启调试模式
   *
   * @name _isDebug
   * @memberof ndoo
   * @type {boolean}
   */
  _n._isDebug = 0;
  _n.PAGE_FAST = 'STATUS:PAGE_STATUS_FAST';
  _n.PAGE_DOMPREP = 'STATUS:PAGE_STATUS_DOMPREP';
  _n.PAGE_DOM = 'STATUS:PAGE_STATUS_DOM';
  _n.PAGE_DOMORLOAD = 'STATUS:PAGE_STATUS_DOMORLOAD';
  _n.PAGE_LOAD = 'STATUS:PAGE_STATUS_LOAD';
  /* event module {{{*/
  _n._eventData = {};
  /**
   * global on
   *
   * @method
   * @name on
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {string} callback 事件回调
   * @example // ndoo alias _n
   * var _n = ndoo;
   * _n.on('testEvent', function(data, data2){
   *   console.log(data);
   *   console.log(data2);
   * });
   * _n.trigger('testEvent', 'testEvent', 'kkk');
   */
  _n.on = function(eventName, callback){
    if (_n._eventData.hasOwnProperty(eventName)) {
      return _n._eventData[eventName].push(callback);
    } else {
      return _n._eventData[eventName] = [callback];
    }
  };
  /**
   * global trigger
   *
   * @method
   * @name trigger
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {array} data 数据
   */
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
  /**
   * global off
   *
   * @method
   * @name off
   * @memberof ndoo
   * @param {string} eventName 事件名称
   */
  _n.off = function(eventName){
    if (_n._eventData.hasOwnProperty(eventName)) {
      delete _n._eventData[eventName];
    }
    return true;
  };
  /* }}} */
  /* 暂存方法 */
  /**
   * delayRun兼容方法，推荐使用on替代
   *
   * @method
   * @name delayRun
   * @memberof ndoo
   * @param {string} level 事件名称
   * @param {function} fn  回调函数
   */
  _n.delayRun = function(level, fn){
    _n.on(level, fn);
  };
  /* }}} */
  /* hook modules {{{ */
  /**
   * hook兼容方法，推荐使用on/trigger替代
   *
   * @method
   * @name hook
   * @memberof ndoo
   * @param {string}   name        名称
   * @param {function} call        回调
   * @param {boolean}  isOverwrite 是否覆盖
   */
  _n.hook = function(name, call, isOverwrite){
    if (call && call.apply) {
      if (this._eventData.hasOwnProperty(name) && !isOverwrite) {
        return false;
      }
      _n._eventData[name] = [call];
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
