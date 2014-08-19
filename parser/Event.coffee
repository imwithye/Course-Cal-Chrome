class Event
	constructor: (@name)->
		@type = ''
		@group = ''
		@venue = ''
		@description = ''
		@remark = ''
		@time = null

	setTime: (startTime, endTime, wkDay) ->
		@time = {startTime: startTime, endTime: endTime, wkDay: wkDay}

	toJSON: ()->
		json = {
			type: @type,
			group: @group,
			venue: @venue,
			description: @description,
			remark: @remark
		}
		json.time = @time if @time?
		json