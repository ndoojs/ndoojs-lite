/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件 for lite
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
/* Notice: 不要修改本文件，本文件由ndoo_prep.ls自动生成 */

"use strict"

if @ndoo
  return

@N = @ndoo ||= {}

/**
 * ndoojs 全局名称空间，短名称N
 *
 * @namespace ndoo
 */
_n = @ndoo

/**
 * _isDebug 是否开启调试模式
 *
 * @name _isDebug
 * @memberof ndoo
 * @type {boolean}
 */
_n._isDebug        = 0

# delay modules {{{
_n.DELAY_FAST       = 0
_n.DELAY_DOM        = 1
_n.DELAY_DOMORLOAD  = 2
_n.DELAY_LOAD       = 3

# 暂存数组
_n._delayArr = [[], [], [], []]

# 暂存方法
_n.delayRun = (level, req, fn) !->
  fn ||= [req, req=[]][0]

  if typeof req == 'string'
    req = req.split ','

  @_delayArr[level].push [req, fn]
# }}}



_n._eventData = {}

_n.on = (eventName, callback) ->
  if _n._eventData.hasOwnProperty eventName
    _n._eventData[eventName].push callback
  else
    _n._eventData[eventName] = [callback]

_n.trigger = (eventName, ...data) !->
  if _n._eventData.hasOwnProperty eventName
    callbacks = _n._eventData[eventName]
    for call in callbacks
      call ...data

_n.off = (eventName) ->
  if _n._eventData.hasOwnProperty eventName
    delete _n._eventData[eventName]
  true

# hook modules {{{
_n.hook = (name, call, isOverwrite) ->
  if call and call.apply
    return false if @_eventData[name] and not isOverwrite
    _n._eventData[name] = call
    true
  else
    _n.trigger.apply _n, [].concat(name, call or [])
# }}}

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
_n.vars ||= {}

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
_n.func ||= {}
