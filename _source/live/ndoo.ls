/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主结构文件 for lite
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
/* Notice: 不要修改本文件，本文件由ndoo.ls自动生成 */

"use strict"

$ = @[\jQuery] or @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func

### storage module {{{ ###
_n.storage = (key, value, option) ->
  destroy = option .&. _n.storage.DESTROY
  rewrite = option .&. _n.storage.REWRITE

  data = _n.storage._data
  if value is undefined
    return data[key]

  if destroy
    delete data[key]
    return true

  if not rewrite and data.hasOwnProperty key
    return false

  data[key] = value

  data[key]

_n.storage._data = {}
_n.storage.REWRITE = 1
_n.storage.DESTROY = 2

_stor    = _n.storage
### }}} ###

### define app package {{{ ###
_n.app = (name, app) ->
  _n.app[name] ||= {}
  $.extend _n.app[name], app
  return
### }}} ###

$.extend _n,
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
   */
  initPageId: (id) !->
    if @pageId
      return

    if typeof document isnt 'undefined'
      if el = document.getElementById id || \scriptArea
        @pageId = el.getAttribute('data-page-id') || ''

    if not @pageId and id
      @pageId = id
  /**
   * 获取唯一key
   *
   * @method
   * @name getPk
   * @memberof ndoo
   * @param {string} prefix
   * @return {number}
   */
  getPk: do ->
    _pk = +new Date!
    (prefix='')-> prefix+(++_pk)

  common: ->
    @commonRun = true

  dispatch: ->
    _entry = !->
      unless _n.commonRun
        _n.common()

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
          controller[actionName+\Before]?(rawParams)
          controller[actionName+'Action']?(rawParams)
          controller[actionName+'After']?(rawParams)

    _n.on @DELAY_DOM, _entry

  # delay modules {{{
  # 处理暂存函数
  triggerPageStatus: !->
    @trigger @DELAY_FAST
    @off @DELAY_FAST unless @_isDebug

    $ ~>
      @trigger @DELAY_DOM
      @off @DELAY_DOM unless @_isDebug
      @trigger @DELAY_DOMORLOAD
      @off @DELAY_DOMORLOAD unless @_isDebug

    $(window).on 'load', ~>
      @trigger @DELAY_LOAD
      @off @DELAY_LOAD unless @_isDebug
  # }}}

  ###初始化###
  # {{{
  init: (id) !->
    # _entry {{{
    @initPageId id
    @dispatch!
    @triggerPageStatus!
  # }}}

# vim: ts=2 sts=2 sw=2 fdm=marker et
