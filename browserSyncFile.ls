path = require \path
exec = require \child_process .exec
browserSync = require \browser-sync .create!

# config {{{
baseDir = '.'

outputDir = '.'
cssOutputDir = "#baseDir/css"
jsOutputDir = "#baseDir/js"

docsDir = "#baseDir/docs"
exampleDir = "#docsDir/example"


reloadWatchFile = ''
  # "#outputDir/*.html"
  # "#jsOutputDir/*.js"
  # "HZ.WapApp.UI/Content/img/*.*"

compileWatchFile =
  "_source/coffee/*.coffee"
  "_source/live/*.ls"

autoCompileFile = false
#autoCompileFile = true
# }}}
# getTimeToken {{{
getTimeToken = ->
  currDate = new Date()
  hours = currDate.getHours()
  minutes = currDate.getMinutes()
  seconds = currDate.getSeconds()
  if hours < 10
    hours = "0#hours"
  if minutes < 10
    minutes = "0#minutes"
  if seconds < 10
    seconds = "0#seconds"
  "#hours:#minutes:#seconds"
# }}}
# compileTask {{{
getCompileCmdAndFileName = (file, ext) ->
  filename = path.basename file, ext
  relativePath = path.relative baseDir, path.dirname(file)
  if path.sep isnt \/
    relativePath = relativePath.split path.sep .join \/
    file = file.split path.sep .join \/

  switch ext
  case '.jade' then
    compileFileName = "#outputDir/#{filename}.html"
    cmd = "jade -Po #outputDir #file"
  case '.sass' then
    compileFileName = "#cssOutputDir/#{filename}.css"
    cmd = "sass --sourcemap=none --style compact #file|sed '/^@charset/d'>#compileFileName"
  case '.coffee' then
    compileFileName = "#jsOutputDir/#{filename}.js"
    cmd = "coffee --no-header -bco #jsOutputDir #file"
  case '.ls' then
    compileFileName = "#jsOutputDir/#{filename}.js"
    if filename.indexOf \all < -1
      cmd =
        "lsc --no-header -co #jsOutputDir #file",
        "cat #baseDir/js/ndoo_prep.js #baseDir/js/ndoo.js > #baseDir/js/ndoo_all.js"
    else
      cmd = "lsc --no-header -co #jsOutputDir #file"
  default
    compileFileName = cmd = ''

  [cmd, compileFileName]

compileTask = (file, ext, reload) !->
  cmdIndex = -1
  try
    [cmd, filename] = getCompileCmdAndFileName file, ext

  if not cmd or not filename
    console.log "cmd not define. file: #file ext: #ext"

  # exec callback
  execCallback = (err, stdo, stde) !->
    if err is null and not stde
      if cmdIndex is -1
        console.log "[#{getTimeToken!}] compiled #filename"
        reload filename if reload
      else
        execCmd()
    else
      console.log err || stde

  # execute command
  do execCmd = !->
    if Array.isArray cmd
      currCmd = cmd[++cmdIndex]
      if cmd.length <= cmdIndex+1
        ``cmdIndex = -1;``
    else
      currCmd = cmd

    if currCmd
      exec currCmd, execCallback

compileCallback = (file) !->
  ext = path.extname file
  filename = path.basename file

  # ignore partial file
  if filename.charAt(0) is '_'
    return undefined

  switch ext
  case '.jade', '.coffee', '.ls', '.sass', '.scss'
    #   compileTask file, ext
    # case '.sass'
    compileTask file, ext, browserSync.reload
  default
    console.log 'unknown file type.'
# }}}
# browserSync {{{
browserSync.init do
  server:
    baseDir: baseDir
    index: \index.html
  open: false

if reloadWatchFile and reloadWatchFile.length
  browserSync.watch reloadWatchFile
  .on \change, browserSync.reload

wacher = browserSync.watch compileWatchFile
.on \change, compileCallback

# auto compile file
if autoCompileFile
  wacher.on \add, compileCallback
# }}}

# vim: set sw=2 ts=2 sts=2 et fdm=marker:
