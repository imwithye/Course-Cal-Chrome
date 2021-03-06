(function() {
  var validateUrl = function(url) {
      url = url.toLowerCase();
      var result = true;
      if(url.indexOf("wish.wis.ntu.edu.sg")==-1
        || url.indexOf("aus_stars_planner.planner")==-1
        || url.indexOf('p1')==-1 || url.indexOf('p2')==-1
        || url.indexOf("subj_code")==-1 || url.indexOf("index_nmbr")==-1)
          result = false;
      return result;
  }

  var show = function(tabId, changeInfo, tab) {
    if(validateUrl(tab.url))
      chrome.pageAction.show(tabId);
  }

  var run = function(tab) {
    chrome.tabs.insertCSS({file: 'bower_components/animate.css/animate.min.css'}, function() {
      chrome.tabs.executeScript({file: 'bower_components/spinjs/spin.js'}, function() {
        chrome.tabs.executeScript({file: "build/parser.js"});
      });
    });
  }

  chrome.tabs.onUpdated.addListener(show);
  chrome.pageAction.onClicked.addListener(run);
})();
