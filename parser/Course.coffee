class Course
	constructor: (@code, @index, au, @name)->
		@au = au + ' AU'
		@examTime = null
		@events = []

	setExamTime: (year, month, day, startTime, endTime) ->
		@examTime = {
			year: year,
			month: month,
			day: day,
			startTime: startTime,
			endTime: endTime
		}

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
