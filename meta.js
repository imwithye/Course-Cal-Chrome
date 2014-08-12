(function() {
  url = 'http://course-cal.appspot.com/perform.php?json=';
  args = {
      'mode' : 'auto',
      'unique_id' : 'auto_mode',
      'tz' : 'Asia/Singapore',
      'filename': 'NTU Course Calendar',
      'year' : '2014',
      'sem' : '1',
      'courses' : [
      ]
  };

  table = document.getElementsByTagName('table')[2];
  tr = table.getElementsByTagName('tr');
  for(var i=1; i < tr.length-1; i++) {
    index = tr[i].getElementsByTagName('td')[0]. getElementsByTagName('font')[0].innerHTML.trim();
    code = tr[i].getElementsByTagName('td')[1]. getElementsByTagName('font')[0].innerHTML.trim();
    examTime = tr[i].getElementsByTagName('td')[4]. getElementsByTagName('font')[0].innerHTML.trim();
    args.courses.push({code: code, index: index});
  }
  url = url + JSON.stringify(args);
  window.location = url;
})();
