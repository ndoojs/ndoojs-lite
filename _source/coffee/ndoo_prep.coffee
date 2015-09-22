###
" --------------------------------------------------
"   FileName: ndoo_prep.coffee
"       Desc: ndoo.js前置文件 for mini
"     Author: chenglifu
"    Version: ndoo.js(v0.1b2)
" LastChange: 11/04/2014 15:48
" --------------------------------------------------
###
### Notice: 不要修改本文件，本文件由ndoo_prep.coffee自动生成 ###

( ->
  "use strict"
  _n = @

  ###变量名称空间###
  _n.vars       ||= {}
  ###函数名称空间###
  _n.func       ||= {}
  ###页面脚本空间###
  _n.app        ||= {}

  ###调试开关###
  _n.isDebug          = 0

  # delay modules {{{
  _n.DELAY_FAST       = 0
  _n.DELAY_DOM        = 1
  _n.DELAY_DOMORLOAD  = 2
  _n.DELAY_LOAD       = 3

  # 暂存数组
  _n._delayArr = [[], [], [], []]

  # 暂存方法
  _n.delayRun = (level, req, fn)->
    fn ||= [req, req=[]][0]

    if typeof req == 'string'
      req = req.split ','

    @_delayArr[level].push [req, fn]

    undefined
  # }}}

  # hook modules {{{
  # hook
  _n._hookData = {}

  _n.hook = (name, call, isOverwrite)->

    if call and call.apply
      return false if @_hookData[name] and not isOverwrite
      @_hookData[name] = call
      true
    else
      if call = [@_hookData[name], args = [].concat(call)||[]][0] then call args...

  # }}}
  _n
).call @N = @ndoo = @ndoo || {}
# vim: ts=2 sts=2 sw=2 fdm=marker et
