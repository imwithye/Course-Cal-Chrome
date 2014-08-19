class Parser
	constructor: (url) ->
		@meta = {}
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
			@courses.push new Course(code, index, au, name)

	toJSON: () ->
		json = {
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
		console.log 'Running Parser...'
		console.log @toJSON()

parser = new Parser document.URL
parser.run()