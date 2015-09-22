/*
" --------------------------------------------------
"   FileName: ndoo.coffee
"       Desc: ndoo.js主结构文件 for mini
"     Author: chenglifu
"    Version: ndoo.js(v0.1b2)
" LastChange: 11/04/2014 15:48
" --------------------------------------------------
 */

/* Notice: 不要修改本文件，本文件由ndoo.coffee自动生成 */
(function($) {
  "use strict";
  var _func, _n, _stor, _vars;
  _n = this;
  _n._delayRunHandle = function() {
    var fn, _i, _len, _ref;
    if (this._delayArr[0].length) {
      _ref = this._delayArr[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        fn[1]();
      }
      if (this._isDebug) {
        this._delayArr[0].length = 0;
      }
    }
    if (this._delayArr[1].length || this._delayArr[2].length) {
      $(function() {
        var fns, _j, _k, _len1, _len2;
        fns = _n._delayArr[1];
        for (_j = 0, _len1 = fns.length; _j < _len1; _j++) {
          fn = fns[_j];
          fn[1]();
        }
        fns = _n._delayArr[2];
        for (_k = 0, _len2 = fns.length; _k < _len2; _k++) {
          fn = fns[_k];
          fn[1]();
        }
        if (_n._isDebug) {
          _n._delayArr[1].length = 0;
          fns.length = 0;
        }
      });
    }
    if (this._delayArr[3].length) {
      $(window).bind('load', function() {
        var fns, _j, _len1;
        fns = _n._delayArr[3];
        for (_j = 0, _len1 = fns.length; _j < _len1; _j++) {
          fn = fns[_j];
          fn[1]();
        }
        if (_n._isDebug) {
          fns.length = 0;
        }
      });
    }
  };

  /* storage module {{{ */
  _n.storage = function(key, value, force, destroy) {
    var data;
    data = _n.storage._data;
    if (value === void 0) {
      return data[key];
    }
    if (destroy) {
      delete data[key];
      return true;
    }
    if (!force && data.hasOwnProperty(key)) {
      return false;
    }
    return data[key] = value;
  };
  _n.storage._data = {};

  /* }}} */

  /* define app package {{{ */
  _n.app = function(name, app) {
    var _base;
    (_base = _n.app)[name] || (_base[name] = {});
    $.extend(_n.app[name], app);
  };

  /* }}} */
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  $.extend(_n, {

    /*自增量 */
    _pk: +new Date(),
    getPK: function() {
      return ++this._pk;
    },

    /*初始化 */
    init: function() {
      var _entry, _stateChange;
      _func._stateCallback = function(state, pageid, token, call) {
        var callback, storKey, _ref;
        if (!call && typeof token === 'function') {
          _ref = ["token_" + (_n.getPK()), token], token = _ref[0], call = _ref[1];
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
      (function() {

        /* state function generate */
        var eventName, item, _i, _len, _ref, _results;
        _ref = ['load', 'common'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          eventName = item.replace(/^([a-z]{1})/, function(char) {
            return char.toUpperCase();
          });
          _func["addPage" + eventName + "Call"] = new Function('token', 'call', "this._stateCallback('" + item + "', ndoo.pageId, token, call);");
          _results.push(_func["add" + eventName + "Call"] = new Function('token', 'call', "if (call) {\n  this._stateCallback('" + item + "', '_global', token, call);\n}"));
        }
        return _results;

        /*
         * _func.addPageLoad             ([token,] call)
         * _func.addLoadCall             (token, call)
         *
         * _func.addPageCommonCall       ([token,] call)
         * _func.addCommonCall           (token, call)
         */
      })();
      _stateChange = function(state) {
        var call, callback, globalcall, key, pagecall;
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
      _entry = function() {

        /*页面标识 */
        var actionId, actionName, controller, controllerId, pageIdMatched, rawParams;
        _n.pageId = $('#scriptArea').data('pageId');
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
              actionName = actionId.replace(/(\/.)/, function(char) {
                return char.substring(1, 2).toUpperCase();
              });
            } else {
              actionName = '_empty';
            }
            if (typeof controller.init === "function") {
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
      _n.hook('commonCall', function() {
        return _stateChange('common');
      });
      this.delayRun(this.DELAY_DOM, _entry);

      /*延迟执行DOMLOAD */
      this._delayRunHandle();
    },

    /*公共调用 */
    common: function() {

      /*init tpl */
      _n.hook('commonCall');
      this.commonRun = true;
    },
    commonRun: false,

    /*初始化Dialog模板 initTpl */
    initTpl: function() {
      var $code, e, text;
      $code = $('#tplCode');
      if ($code.length) {
        text = $code.get(0).text.replace(/^\s*|\s*$/g, '');
        if (text !== '') {
          try {
            $(text).appendTo('#tplArea');
          } catch (_error) {
            e = _error;
            return false;
          }
        }
        return true;
      }
      return false;
    },

    /* visit接口 */
    visit: function(url) {
      if (_func.isUseTurbolinks()) {
        Turbolinks.visit(url);
      } else {
        location.href = url;
      }
    }
  });

  /*初始化入口 */
  return _n;
}).call(this.N = this.ndoo = this.ndoo || {}, Zepto);
