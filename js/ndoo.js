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
