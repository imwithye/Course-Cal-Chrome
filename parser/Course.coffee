class Course
	constructor: (@code, @index)->
		@name = ''
		@au = ''
		@examTime = null
		@events = []

	setAU: (au) ->
		@au = au + ' AU'

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
			name: @name,
			au: @au
		}
		json.examTime = @examTime if @examTime?
		json.events = []
		for event in @events
			json.events.push event.toJSON
