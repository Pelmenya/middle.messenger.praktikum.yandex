export default  function getUrlRoute (win: Window):string {
  return win.location.href.replace(win.location.origin, "")
} 