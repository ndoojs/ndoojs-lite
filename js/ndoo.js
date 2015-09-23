
/*
" --------------------------------------------------
"   FileName: ndoo.coffee
"       Desc: ndoo.js主结构文件 for lite
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
 */

/* Notice: 不要修改本文件，本文件由ndoo.coffee自动生成 */
(function($) {
  "use strict";
  var _func, _n, _stor, _vars;
  _n = this;
  _n._delayRunHandle = function() {
    var fn, i, len, ref;
    if (this._delayArr[0].length) {
      ref = this._delayArr[0];
      for (i = 0, len = ref.length; i < len; i++) {
        fn = ref[i];
        fn[1]();
      }
      if (this._isDebug) {
        this._delayArr[0].length = 0;
      }
    }
    if (this._delayArr[1].length || this._delayArr[2].length) {
      $(function() {
        var fns, j, k, len1, len2;
        fns = _n._delayArr[1];
        for (j = 0, len1 = fns.length; j < len1; j++) {
          fn = fns[j];
          fn[1]();
        }
        fns = _n._delayArr[2];
        for (k = 0, len2 = fns.length; k < len2; k++) {
          fn = fns[k];
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
        var fns, j, len1;
        fns = _n._delayArr[3];
        for (j = 0, len1 = fns.length; j < len1; j++) {
          fn = fns[j];
          fn[1]();
        }
        if (_n._isDebug) {
          fns.length = 0;
        }
      });
    }
  };

  /* storage module {{{ */
  _n.storage = function(key, value, option) {
    var data, destroy, rewrite;
    destroy = option & _n.storage.DESTROY;
    rewrite = option & _n.storage.REWRITE;
    data = _n.storage._data;
    if (value === void 0) {
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
  _n.app = function(name, app) {
    var base;
    (base = _n.app)[name] || (base[name] = {});
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
        var callback, ref, storKey;
        if (!call && typeof token === 'function') {
          ref = ["token_" + (_n.getPK()), token], token = ref[0], call = ref[1];
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
        var eventName, i, item, len, ref, results;
        ref = ['load', 'common'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          eventName = item.replace(/^([a-z]{1})/, function(char) {
            return char.toUpperCase();
          });
          _func["addPage" + eventName + "Call"] = new Function('token', 'call', "this._stateCallback('" + item + "', ndoo.pageId, token, call);");
          results.push(_func["add" + eventName + "Call"] = new Function('token', 'call', "if (call) {\n  this._stateCallback('" + item + "', '_global', token, call);\n}"));
        }
        return results;

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
          if (pageIdMatched = _n.pageId.match(/([^\/]+)(?:\/?)([^?#]*)(.*)/)) {
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
