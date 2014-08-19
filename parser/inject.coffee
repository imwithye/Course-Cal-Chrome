downloadURL = (url) ->
  hiddenIFrameID = 'hiddenDownloader'
  iframe = document.getElementById hiddenIFrameID
  if !iframe?
    iframe = document.createElement 'iframe'
    iframe.id = hiddenIFrameID
    iframe.style.display = 'none'
    document.body.appendChild iframe
  iframe.src = url

createSpin = () ->
  spinDivId = 'spinner'
  spinDiv = document.getElementById spinDivId
  if !spinDiv?
    spinDiv = document.createElement 'div'
    spinDiv.id = spinDivId
    document.body.appendChild spinDiv
  spinDiv.style.display = ""
  spinDiv.style.position = "absolute"
  spinDiv.style.left = "50%"
  spinDiv.style.top = "30%"
  spinDiv.style.marginLeft = "-75px"
  spinDiv.style.width = "150px"
  spinDiv.style.height = "150px"
  spinDiv.style.background = "rgba(0, 0, 0, 0.7)"
  spinDiv.style.borderRadius = "30px"

  opts = {
    lines: 15, # The number of lines to draw
    length: 26, # The length of each line
    width: 2, # The line thickness
    radius: 25, # The radius of the inner circle
    corners: 1, # Corner roundness (0..1)
    rotate: 0, # The rotation offset
    direction: 1, # 1: clockwise, -1: counterclockwise
    color: '#FFF', # #rgb or #rrggbb or array of colors
    speed: 1, # Rounds per second
    trail: 80, # Afterglow percentage
    shadow: false, # Whether to render a shadow
    hwaccel: true, # Whether to use hardware acceleration
    className: 'spinner', # The CSS class to assign to the spinner
    zIndex: 2e9, # The z-index (defaults to 2000000000)
    top: '50%', # Top position relative to parent
    left: '50%' # Left position relative to parent
  }
  spinner = new Spinner(opts).spin spinDiv

removeSpin = () ->
  spinDivId = 'spinner'
  spinDiv = document.getElementById spinDivId
  if spinDiv?
    spinDiv.style.display = "none"

alert 'Test'
createSpin()
setTimeout (-> removeSpin()), 3000
parser = new Parser document.URL, 'auto'
url = '//course-cal.appspot.com/perform.php?json=' + encodeURI JSON.stringify parser.run()
downloadURL url