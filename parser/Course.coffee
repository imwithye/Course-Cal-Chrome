class Course
	constructor: (@code, @index, @examTime)->

	toJSON: ()->
		json = {
			code: @code,
			index: @index
		}
		json.examTime = @examTime if @examTime?
		json
