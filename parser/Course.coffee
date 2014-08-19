class Course
	constructor: (@code, @index, au, @name, @examTime)->
		@au = au + ' AU'
		@events = []

	addEvent: (event) ->
		@event.push event

	toJSON: ()->
		json = {
			code: @code,
			index: @index,
			name: @name,
			au: @au,
			events: []
		}
		json.examTime = @examTime if @examTime?
		for event in @events
			json.events.push event.toJSON
		json
