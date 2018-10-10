/// <reference types="jquery" />.
$(() => {
  let _locat = window.document.location || {
    href: ''
  }
  let activeItem = $('#header li').filter((inx, item) => _locat.href.indexOf($(item).attr('role') || '') >= 0)
  
  $(activeItem)
    .addClass('active')
    .siblings()
    .removeClass('active')
})