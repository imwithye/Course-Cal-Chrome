class Course
	constructor: (@code, @index, au, @name, @examTime)->
		@au = au + ' AU'

	toJSON: ()->
		json = {
			code: @code,
			index: @index,
			name: @name,
			au: @au
		}
		json.examTime = @examTime if @examTime?
		json
