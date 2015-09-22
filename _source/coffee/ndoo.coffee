###
" --------------------------------------------------
"   FileName: ndoo.coffee
"       Desc: ndoo.js主结构文件 for mini
"     Author: chenglifu
"    Version: ndoo.js(v0.1b2)
" LastChange: 11/04/2014 15:48
" --------------------------------------------------
###
### Notice: 不要修改本文件，本文件由ndoo.coffee自动生成 ###
( ($)->
  "use strict"
  _n = @

  # delay modules {{{
  # 处理暂存函数
  _n._delayRunHandle = ->
    if @_delayArr[0].length
      for fn in @_delayArr[0]
        fn[1]()
      @_delayArr[0].length = 0 if @_isDebug

    if @_delayArr[1].length || @_delayArr[2].length
      $ ->
        fns = _n._delayArr[1]
        for fn in fns
          fn[1]()
        fns = _n._delayArr[2]
        for fn in fns
          fn[1]()
        if _n._isDebug
          _n._delayArr[1].length = 0
          fns.length = 0

        return

    if @_delayArr[3].length
      $(window).bind 'load', ->
        fns = _n._delayArr[3]
        for fn in fns
          fn[1]()
        fns.length = 0 if _n._isDebug

        return

    return
  # }}}
  ### storage module {{{ ###
  _n.storage = (key, value, force, destroy) ->
    data = _n.storage._data

    if value is undefined
      return data[key]

    if destroy
      delete data[key]
      return true

    if not force and data.hasOwnProperty(key)
      return false

    data[key] = value

  _n.storage._data = {}
  ### }}} ###

  ### define app package {{{ ###
  _n.app = (name, app) ->
    _n.app[name] ||= {}
    $.extend _n.app[name], app
    return
  ### }}} ###

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage

  $.extend _n,
    ###自增量###
    _pk: +new Date()
    getPK: ->
      ++@_pk

    ###初始化###
    # {{{
    init: ->
      # {{{
      _func._stateCallback = (state, pageid, token, call) ->
        if not call and typeof token is 'function'
          [token, call] = ["token_#{_n.getPK()}", token]
        if _func.isUseTurbolinks() or state is 'common' or state is 'load'
          storKey = ''
          switch state
            when 'common'
              storKey = 'pageCommonCall'
              break
            when 'load'
              storKey = 'pageLoadCall'
              break

          callback = _stor(storKey) or {}
          callback[pageid] ||= {}
          callback[pageid][token] = call

          _stor storKey, callback, true

      do ->
        ### state function generate ###
        for item in ['load', 'common']
          eventName = item.replace /^([a-z]{1})/, (char) -> char.toUpperCase()
          _func["addPage#{eventName}Call"] = new Function 'token', 'call', """
            this._stateCallback('#{item}', ndoo.pageId, token, call);
          """
          _func["add#{eventName}Call"] = new Function 'token', 'call', """
            if (call) {
              this._stateCallback('#{item}', '_global', token, call);
            }
          """
        ###
        # _func.addPageLoad             ([token,] call)
        # _func.addLoadCall             (token, call)
        #
        # _func.addPageCommonCall       ([token,] call)
        # _func.addCommonCall           (token, call)
        ###

      # }}}
      # _stateChange {{{
      _stateChange = (state)->
        callback = false

        switch state
          when 'common'
            callback = _stor 'pageCommonCall'
            break
          when 'load'
            callback = _stor 'pageLoadCall'
            break
        unless callback
          return

        if callback && callback['_global']
          globalcall = callback['_global']
          for key, call of globalcall
            call() if call

        if callback && callback[_n.pageId]
          pagecall = callback[_n.pageId]
          for key, call of pagecall
            call() if call

        return
      # }}}
      # _entry {{{
      _entry = ->

        ###页面标识###
        _n.pageId = $('#scriptArea').data 'pageId'

        unless _n.commonRun
          _n.common()
        # console.log "run: #{_n.pageId}"
        if _n.pageId
          if pageIdMatched = _n.pageId.match /([^/]+)(?:\/?)([^?#]*)(.*)/
            controllerId = pageIdMatched[1]
            actionId     = pageIdMatched[2]
            rawParams    = pageIdMatched[3]

          if controller = _n.app[controllerId]
            if actionId
              actionName = actionId.replace /(\/.)/, (char)-> char.substring(1, 2).toUpperCase()
            else
              actionName = '_empty'

            # if not controller.inited and controller.init
            #   controller.inited = true
            controller.init?()

          if actionName
            controller[actionName+'Before'](rawParams) if controller[actionName+'Before']
            controller[actionName+'Action'](rawParams) if controller[actionName+'Action']
            controller[actionName+'After'](rawParams) if controller[actionName+'After']

        _stateChange 'load'

        return
      # }}}
      _n.hook 'commonCall', ->
        _stateChange 'common'

      @delayRun @DELAY_DOM, _entry
      ###延迟执行DOMLOAD###
      @_delayRunHandle()

      return

    # }}}
    ###公共调用###
    # {{{
    common: ->
      ###init tpl###
      #@initTpl()
      _n.hook('commonCall')
      @commonRun = true

      return
    commonRun: false
    # }}}
    ###初始化Dialog模板 initTpl###
    # {{{
    initTpl: ->
      $code = $ '#tplCode'
      if $code.length
        text = $code.get( 0 ).text.replace( /^\s*|\s*$/g, '' )
        if text isnt ''
          try
            $(text).appendTo '#tplArea'
          catch e
            return false
        return true

      false
    # }}}
    ### visit接口 ###
    # {{{
    visit: (url)->
      if _func.isUseTurbolinks()
        Turbolinks.visit url
      else
        location.href = url
      return
    # }}}

  ###初始化入口###
  # _n.init()

  _n
).call @N = @ndoo = @ndoo || {}, Zepto

# vim: ts=2 sts=2 sw=2 fdm=marker et
