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
_n.app = (name, controller) ->
  _n.app[name] ||= {}
  $.extend _n.app[name], controller
  return
/* }}} */

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

  /* dispatch {{{ */
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

    _n.on @PAGE_DOM, _entry
  /* }}} */

  /* triggerPageStatus 处理页面暂存状态 {{{ */
  triggerPageStatus: !->
    @trigger @PAGE_FAST
    @off @PAGE_FAST unless @_isDebug

    $ ~>
      @trigger @PAGE_DOMPREP
      @off @PAGE_DOMPREP unless @_isDebug

      @trigger @PAGE_DOM
      @off @PAGE_DOM unless @_isDebug

      @trigger @PAGE_DOMORLOAD
      @off @PAGE_DOMORLOAD unless @_isDebug

    $(window).on 'load', ~>
      @trigger @PAGE_LOAD
      @off @PAGE_LOAD unless @_isDebug
  /* }}} */

  /* init 初始化 {{{ */
  /**
   * 初始化页面
   *
   * @method
   * @name init
   * @memberof ndoo
   * @param {string} id DOM的ID或指定ID
   */
  init: (id) !->
    @initPageId id
    @dispatch!
    @triggerPageStatus!
  /* }}} */

# vim: ts=2 sts=2 sw=2 fdm=marker et
