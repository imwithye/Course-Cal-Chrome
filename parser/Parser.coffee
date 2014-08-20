class Parser
	constructor: (url, mode) ->
		@meta = {}
		@meta.mode = mode
		args = url.split('?')[1].split('&')
		@meta.tz = 'Asia/Singapore';
		@meta.unique_id = args[0].split('=')[1].trim()
		@meta.year = args[3].split('=')[1].trim()
		@meta.sem = args[4].split('=')[1].trim()
		@meta.filename = 'AY-' + @meta.year + '-Sem-' + @meta.sem;
		@courses = []

		table = document.getElementsByTagName('table')[2]
		tr = table.getElementsByTagName('tr')

		for i in [1...tr.length-1]
			index = tr[i].getElementsByTagName('td')[0]. getElementsByTagName('font')[0].innerHTML.trim()
			code = tr[i].getElementsByTagName('td')[1]. getElementsByTagName('font')[0].innerHTML.trim()
			name = tr[i].getElementsByTagName('td')[2]. getElementsByTagName('font')[0].innerHTML.trim()
			au = tr[i].getElementsByTagName('td')[3]. getElementsByTagName('font')[0].innerHTML.trim()
			examTime = tr[i].getElementsByTagName('td')[4]. getElementsByTagName('font')[0].innerHTML.trim()
			if examTime? and examTime != '-' and examTime != ''
				date = examTime.split(' ')[0].trim()
				time = examTime.split(' ')[1].trim()
				examTime = {}
				examTime.year = '20' + date.split('-')[2].trim()
				examTime.month = date.split('-')[1].trim().toLowerCase()
				examTime.day = date.split('-')[0].trim()
				examTime.startTime = time.split('-')[0].trim()
				examTime.endTime = time.split('-')[1].trim();
			else examTime = null
			@courses.push new Course(code, index, au, name, examTime)

	addEvent: (code, event) ->
		for course in @courses
			if course.code is code
				course.addEvent event
				break

	toJSON: () ->
		json = {
			mode: @meta.mode,
			unique_id: @meta.unique_id,
			tz: @meta.tz,
			year: @meta.year,
			sem: @meta.sem,
			filename: @meta.filename,
			courses: []
		}
		for course in @courses
			json.courses.push course.toJSON()
		json

	run: () ->
		@toJSON()