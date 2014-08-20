class Course
	constructor: (@code, @index, au, @name, @examTime)->
		@au = au + ' AU'
		@events = null

	addEvent: (event) ->
		if !@events?
			@events = []
		@events.push event

	toJSON: ()->
		json = {
			code: @code,
			index: @index,
			name: @name,
			au: @au
		}
		json.examTime = @examTime if @examTime?
		if @events?
			json.events = []
			for event in @events
				json.events.push event.toJSON()
		json
