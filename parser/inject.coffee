downloadURL = (url) ->
  hiddenIFrameID = 'hiddenDownloader'
  iframe = document.getElementById hiddenIFrameID
  if !iframe?
    iframe = document.createElement 'iframe'
    iframe.id = hiddenIFrameID
    iframe.style.display = 'none'
    document.body.appendChild iframe
  iframe.src = url

createSpin()
setTimeout (-> removeSpin()), 3000
parser = new Parser document.URL, 'auto'
url = '//course-cal.appspot.com//perform.php?json=' + encodeURI JSON.stringify parser.run()
downloadURL url