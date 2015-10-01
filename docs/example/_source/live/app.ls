/*
" --------------------------------------------------
"   FileName: app.coffee
"       Desc: app.js webapp逻辑脚本
"     Author: chenglifu
"    Version: v1.0
" LastChange: 09/23/2015 23:57
" --------------------------------------------------
*/
/* Notice: 不要修改本文件，本文件由app.ls自动生成 */

'use strict'

$     = @[\jQuery] || @[\Zepto]

_n    = @ndoo

_vars = _n.vars
_func = _n.func
_stor = _n.storage

### 模块定义 {{{ ###
_n.app 'home',
  indexAction: !->
    console.log 'action'

  indexPortionAction: !->
    console.log 'portion action'
### }}} ###
