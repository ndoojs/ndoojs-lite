###
" --------------------------------------------------
"   FileName: app.coffee
"       Desc: app.js webapp逻辑脚本
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
###
### Notice: 不要修改本文件，本文件由app.coffee自动生成 ###
( ($)->
  "use strict"
  _n = @

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage

  ### 模块定义 {{{ ###
  # {{{
  # }}}

  _n.app 'home',
    indexAction: ->
      console.log 'action'
      return
    indexPortionAction: ->
      console.log 'portion action'
      return
  ### }}} ###

  _n
).call @N = @ndoo = @ndoo || {}, Zepto

# vim: ts=2 sts=2 sw=2 fdm=marker et
