$(() => {
  let activeItem = $('#header li').filter((inx, item) => document.location.href.indexOf($(item).attr('role')) >= 0)
  $(activeItem).addClass('active').siblings().removeClass('active')
})