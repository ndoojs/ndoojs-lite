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
/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主结构文件 for lite
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
(function(){
  /* Notice: 不要修改本文件，本文件由ndoo.ls自动生成 */
  "use strict";
  var $, _n, _vars, _func, _stor;
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  /* storage module {{{ */
  /**
   * 变量存储
   *
   * @method
   * @name storage
   * @memberof ndoo
   * @param {string} key 存储键名
   * @param {any} value 存储值
   * @param {const} option 选项，覆盖或删除
   * @example // alias _stor
   * var _stor = ndoo.storage;
   * // set abc vlaue 1
   * _stor('abc', 1); // 1
   * // set abc value 2 failed
   * _stor('abc', 2); // false
   * // set abc value 2
   * _stor('abc', 2, _stor.REWRITE); // 2
   * // delete abc
   * _stor('abc', null, _stor.DESTROY); // true
   */
  _n.storage = function(key, value, option){
    var destroy, rewrite, data;
    destroy = option & _n.storage.DESTROY;
    rewrite = option & _n.storage.REWRITE;
    data = _n.storage._data;
    if (value === undefined) {
      return data[key];
    }
    if (destroy) {
      delete data[key];
      return true;
    }
    if (!rewrite && data.hasOwnProperty(key)) {
      return false;
    }
    data[key] = value;
    return data[key];
  };
  _n.storage._data = {};
  _n.storage.REWRITE = 1;
  _n.storage.DESTROY = 2;
  _stor = _n.storage;
  /* }}} */
  /* define app package {{{ */
  /**
   * 添加app实现
   *
   * @method
   * @name app
   * @memberof ndoo
   * @param {string} name 名称空间
   * @param {object} controller 控制器
   */
  _n.app = function(name, controller){
    var ref$;
    (ref$ = _n.app)[name] || (ref$[name] = {});
    $.extend(_n.app[name], controller);
  };
  /* }}} */
  $.extend(_n, {
    /**
     * page id
     *
     * @name pageId
     * @memberof ndoo
     * @type {string}
     */
    pageId: ''
    /**
     * initPageId 初始化 pageId
     *
     * @private
     * @name initPageId
     * @memberof ndoo
     */,
    initPageId: function(id){
      var el;
      if (this.pageId) {
        return;
      }
      if (typeof document !== 'undefined') {
        if (el = document.getElementById(id || 'scriptArea')) {
          this.pageId = el.getAttribute('data-page-id') || '';
        }
      }
      if (!this.pageId && id) {
        this.pageId = id;
      }
    }
    /**
     * 获取唯一key
     *
     * @method
     * @name getPk
     * @memberof ndoo
     * @param {string} prefix
     * @return {number}
     */,
    getPk: function(){
      var _pk;
      _pk = +new Date();
      return function(prefix){
        prefix == null && (prefix = '');
        return prefix + (++_pk);
      };
    }(),
    common: function(){
      return this.commonRun = true;
    }
    /* dispatch {{{ */,
    dispatch: function(){
      var _entry;
      _entry = function(){
        var pageIdMatched, controllerId, actionId, rawParams, controller, actionName, key$;
        if (!_n.commonRun) {
          _n.common();
        }
        if (_n.pageId) {
          if (pageIdMatched = _n.pageId.match(/([^/]+)(?:\/?)([^?#]*)(.*)/)) {
            controllerId = pageIdMatched[1];
            actionId = pageIdMatched[2];
            rawParams = pageIdMatched[3];
          }
          if (controller = _n.app[controllerId]) {
            if (actionId) {
              actionName = actionId.replace(/(\/.)/, function(char){
                return char.substring(1, 2).toUpperCase();
              });
            } else {
              actionName = '_empty';
            }
            if (typeof controller.init == 'function') {
              controller.init();
            }
          }
          if (actionName) {
            if (typeof controller[key$ = actionName + 'Before'] == 'function') {
              controller[key$](rawParams);
            }
            if (typeof controller[key$ = actionName + 'Action'] == 'function') {
              controller[key$](rawParams);
            }
            if (typeof controller[key$ = actionName + 'After'] == 'function') {
              controller[key$](rawParams);
            }
          }
        }
      };
      return _n.on(this.PAGE_DOM, _entry);
    }
    /* }}} */
    /* triggerPageStatus 处理页面暂存状态 {{{ */,
    triggerPageStatus: function(){
      var this$ = this;
      this.trigger(this.PAGE_FAST);
      if (!this._isDebug) {
        this.off(this.PAGE_FAST);
      }
      $(function(){
        this$.trigger(this$.PAGE_DOMPREP);
        if (!this$._isDebug) {
          this$.off(this$.PAGE_DOMPREP);
        }
        this$.trigger(this$.PAGE_DOM);
        if (!this$._isDebug) {
          this$.off(this$.PAGE_DOM);
        }
        this$.trigger(this$.PAGE_DOMORLOAD);
        if (!this$._isDebug) {
          return this$.off(this$.PAGE_DOMORLOAD);
        }
      });
      $(window).on('load', function(){
        this$.trigger(this$.PAGE_LOAD);
        if (!this$._isDebug) {
          return this$.off(this$.PAGE_LOAD);
        }
      });
    }
    /* }}} */
    /* init 初始化 {{{ */
    /**
     * 初始化页面
     *
     * @method
     * @name init
     * @memberof ndoo
     * @param {string} id DOM的ID或指定ID
     */,
    init: function(id){
      this.initPageId(id);
      this.dispatch();
      this.triggerPageStatus();
    }
    /* }}} */
  });
}).call(this);
