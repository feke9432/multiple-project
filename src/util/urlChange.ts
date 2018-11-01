window.onload = function () {
  const urlMap:any = {
    '/': '/index',
    '/Member/Welcome': '/about?three'
  }
  $('a[href]').each((inx, item) => {
    console.log()
    let key:string = $(item).attr('href') || '';
    if (urlMap[key] != null) {
      $(item).attr('href', urlMap[key])
    }
  })
}