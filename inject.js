(function() {
  var getInfo = function() {
    var url = document.URL;
    var args = url.split('?')[1].split('&');
    var info = {};
    info.mode = 'auto';
    info.tz = 'Asia/Singapore',
    info.unique_id = args[0].split('=')[1].trim();
    info.year = args[3].split('=')[1].trim();
    info.sem = args[4].split('=')[1].trim();
    info.filename = 'AY-' + info.year + '-Sem-' + info.sem;
    return info;
  }

  var serverRequert = function() {
    var url = 'http://course-cal.appspot.com/perform.php?json=';
    var args = getInfo();
    args.courses = Array();

    var table = document.getElementsByTagName('table')[2];
    var tr = table.getElementsByTagName('tr');
    for(var i=1; i < tr.length-1; i++) {
      var index = tr[i].getElementsByTagName('td')[0]. getElementsByTagName('font')[0].innerHTML.trim();
      var code = tr[i].getElementsByTagName('td')[1]. getElementsByTagName('font')[0].innerHTML.trim();
      var examTime = tr[i].getElementsByTagName('td')[4]. getElementsByTagName('font')[0].innerHTML.trim();
      args.courses.push({code: code, index: index});
    }
    url = url + JSON.stringify(args);
    window.location = url;
  }();
})();
