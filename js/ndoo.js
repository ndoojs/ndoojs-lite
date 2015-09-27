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
  _n._delayRunHandle = function(){
    var i$, ref$, len$, fn;
    if (this._delayArr[0].length) {
      for (i$ = 0, len$ = (ref$ = this._delayArr[0]).length; i$ < len$; ++i$) {
        fn = ref$[i$];
        fn[1]();
      }
      if (this._isDebug) {
        this._delayArr[0].length = 0;
      }
    }
    if (this._delayArr[1].length || this._delayArr[2].length) {
      $(function(){
        var fns, i$, len$, fn;
        fns = _n._delayArr[1];
        for (i$ = 0, len$ = fns.length; i$ < len$; ++i$) {
          fn = fns[i$];
          fn[1]();
        }
        fns = _n._delayArr[2];
        for (i$ = 0, len$ = fns.length; i$ < len$; ++i$) {
          fn = fns[i$];
          fn[1]();
        }
        if (_n._isDebug) {
          _n._delayArr[1].length = 0;
          fns.length = 0;
        }
      });
    }
    if (this._delayArr[3].length) {
      $(window).bind('load', function(){
        var fns, i$, len$, fn;
        fns = _n._delayArr[3];
        for (i$ = 0, len$ = fns.length; i$ < len$; ++i$) {
          fn = fns[i$];
          fn[1]();
        }
        if (_n._isDebug) {
          fns.length = 0;
        }
      });
    }
  };
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
  _n.app = function(name, app){
    var ref$;
    (ref$ = _n.app)[name] || (ref$[name] = {});
    $.extend(_n.app[name], app);
  };
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
    init: function(id){
      var _stateChange, _entry;
      _func._stateCallback = function(state, pageid, token, call){
        var ref$, storKey, callback;
        if (!call && typeof token === 'function') {
          ref$ = ["token_" + _n.getPK(), token], token = ref$[0], call = ref$[1];
        }
        if (_func.isUseTurbolinks() || state === 'common' || state === 'load') {
          storKey = '';
          switch (state) {
          case 'common':
            storKey = 'pageCommonCall';
            break;
          case 'load':
            storKey = 'pageLoadCall';
            break;
          }
          callback = _stor(storKey) || {};
          callback[pageid] || (callback[pageid] = {});
          callback[pageid][token] = call;
          return _stor(storKey, callback, true);
        }
      };
      (function(){
        var i$, ref$, len$, item, eventName, results$ = [];
        for (i$ = 0, len$ = (ref$ = ['load', 'common']).length; i$ < len$; ++i$) {
          item = ref$[i$];
          eventName = item.replace(/^([a-z]{1})/, fn$);
          _func["addPage" + eventName + "Call"] = new Function('token', 'call', "this._stateCallback('" + item + "', ndoo.pageId, token, call);");
          results$.push(_func["add" + eventName + "Call"] = new Function('token', 'call', "if (call) {\n  this._stateCallback('" + item + "', '_global', token, call);\n}"));
        }
        return results$;
        function fn$(char){
          return char.toUpperCase();
        }
      })();
      _stateChange = function(state){
        var callback, globalcall, key, call, pagecall;
        callback = false;
        switch (state) {
        case 'common':
          callback = _stor('pageCommonCall');
          break;
        case 'load':
          callback = _stor('pageLoadCall');
          break;
        }
        if (!callback) {
          return;
        }
        if (callback && callback['_global']) {
          globalcall = callback['_global'];
          for (key in globalcall) {
            call = globalcall[key];
            if (call) {
              call();
            }
          }
        }
        if (callback && callback[_n.pageId]) {
          pagecall = callback[_n.pageId];
          for (key in pagecall) {
            call = pagecall[key];
            if (call) {
              call();
            }
          }
        }
      };
      _entry = function(){
        var pageIdMatched, controllerId, actionId, rawParams, controller, actionName;
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
            if (controller[actionName + 'Before']) {
              controller[actionName + 'Before'](rawParams);
            }
            if (controller[actionName + 'Action']) {
              controller[actionName + 'Action'](rawParams);
            }
            if (controller[actionName + 'After']) {
              controller[actionName + 'After'](rawParams);
            }
          }
        }
        _stateChange('load');
      };
      this.initPageId(id);
      _n.hook('commonCall', function(){
        return _stateChange('common');
      });
      this.delayRun(this.DELAY_DOM, _entry);
      this._delayRunHandle();
    },
    common: function(){
      _n.hook('commonCall');
      this.commonRun = true;
    },
    commonRun: false,
    initTpl: function(){
      var $code, text, e;
      $code = $('#tplCode');
      if ($code.length) {
        text = $code.get(0).text.replace(/^\s*|\s*$/g, '');
        if (text !== '') {
          try {
            $(text).appendTo('#tplArea');
          } catch (e$) {
            e = e$;
            return false;
          }
        }
        return true;
      }
      return false;
    }
  });
}).call(this);
