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

  var downloadURL = function (url, callback) {
    var hiddenIFrameID = 'hiddenDownloader';
    var iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        iframe.onload = callback();
        document.body.appendChild(iframe);
    }
    iframe.src = url;
  }

  var createSpin = function() {
    var spinDivId = 'spinner';
    var spinDiv = document.getElementById(spinDivId);
    if (spinDiv == null) {
      spinDiv = document.createElement('div');
      spinDiv.id = spinDivId;
    }
    spinDiv.style.position = "absolute";
    spinDiv.style.left = "50%";
    spinDiv.style.top = "30%";
    spinDiv.style.marginLeft = "-50px";
    spinDiv.style.width = "100px";
    spinDiv.style.height = "100px";
    document.body.appendChild(spinDiv);

    var opts = {
      lines: 15, // The number of lines to draw
      length: 26, // The length of each line
      width: 2, // The line thickness
      radius: 25, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 80, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: true, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };
    var spinner = new Spinner(opts).spin(spinDiv);
  }

  var serverRequert = function() {
    createSpin();
    var url = '//course-cal.appspot.com/perform.php?json=';
    var args = getInfo();
    args.courses = Array();

    var table = document.getElementsByTagName('table')[2];
    var tr = table.getElementsByTagName('tr');
    for(var i=1; i < tr.length-1; i++) {
      var index = tr[i].getElementsByTagName('td')[0]. getElementsByTagName('font')[0].innerHTML.trim();
      var code = tr[i].getElementsByTagName('td')[1]. getElementsByTagName('font')[0].innerHTML.trim();
      var examTime = tr[i].getElementsByTagName('td')[4]. getElementsByTagName('font')[0].innerHTML.trim();
      if(examTime!='' && examTime!='-' && examTime!=null && examTime!=undefined) {
        var date = examTime.split(' ')[0].trim();
        var time = examTime.split(' ')[1].trim();
        examTime = {};
        examTime.year = date.split('-')[0].trim();
        examTime.month = date.split('-')[0].trim().toLowerCase();
        examTime.day = date.split('-')[1].trim();
        examTime.startTime = time.split('-')[0].trim();
        examTime.endTime = time.split('-')[1].trim();
        args.courses.push({code: code, index: index, examTime: examTime});
      }
      else {
        args.courses.push({code: code, index: index});
      }
    }
    url = url + JSON.stringify(args);
    downloadURL(url, function() {
      alert('loaded');
    });
  }();
})();
