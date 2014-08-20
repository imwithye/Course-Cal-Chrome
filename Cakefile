fs     = require 'fs'
{exec} = require 'child_process'
util   = require 'util'

CoffeeSrcDir = 'parser'
CoffeeSrcFiles = ['Event', 'Course', 'Parser', 'inject']
CoffeeSrcFileList = ''
for f in CoffeeSrcFiles
	CoffeeSrcFileList += "#{CoffeeSrcDir}/#{f}.coffee "

CoffeeTargerDir = 'build'
CoffeeTargerName = 'parser'

CoffeeTargetJsFile = "#{CoffeeTargerDir}/#{CoffeeTargerName}.js"

CoffeeOpts = "--join #{CoffeeTargetJsFile} --compile #{CoffeeSrcFileList}"

Zipfile = "Course-Cal"

task 'build', 'build a single JavaScript file from coffee files', ->
	util.log "coffee #{CoffeeOpts}" 
	exec "coffee #{CoffeeOpts}", (err) ->
		if err
			util.log err
		else
			util.log "Compiled #{CoffeeTargetJsFile}"

task 'watch', 'watch coffee source files and build changes', ->
	util.log "Watching for changes in #{CoffeeSrcDir}"

	for file in CoffeeSrcFiles then do (file) ->
		fs.watchFile "#{CoffeeSrcDir}/#{file}.coffee", (curr, prev) ->
			if +curr.mtime isnt +prev.mtime
				util.log "Saw change in #{CoffeeSrcDir}/#{file}.coffee"
				invoke 'build'

task 'zip', 'create a zip file for distributing', ->
	util.log "Building zipfile #{Zipfile}"

	exec "zip -r #{Zipfile}.zip . -x '.*' -x '*/.*'", (err) ->
		if err
			util.log err
		else
			util.log "Builded #{Zipfile}.zip"

task 'clean', 'clean out temporary build files', ->
	util.log "rm #{CoffeeTargerDir}"
	exec "rm -rf #{CoffeeTargerDir} directory & rm -rf #{Zipfile}.zip", (err) ->
		if err
			util.log err
		else
			util.log "Completed"