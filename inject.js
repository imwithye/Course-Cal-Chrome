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

  var createSpinDiv = function() {
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
    spinDiv.style.border = "1px solid #ABF";
    spinDiv.style.backgroundColor = "#DDF";
    document.body.appendChild(spinDiv);
  }

  var serverRequert = function() {
    createSpinDiv();
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
