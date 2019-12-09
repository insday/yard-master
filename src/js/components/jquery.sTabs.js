/*eslint-disable*/

$.fn.sTabs = function (scroll) {
  this.each(function () {
    var $wrapTab = $(this),
      $tabs = $wrapTab.find('.tabsList a'),
      $wrapCont = $wrapTab.find('.tabsBox'),
      $tab_cont = $wrapCont.children('div');

    if (scroll) {
      $tab_cont.customScrollbar({
        skin: 'default-skin',
        hScroll: false,
        updateOnWindowResize: true
      });
    }
    $tabs.on('click', function () {
      var tab_id = $(this).attr('class').split(' ');

      $tabs.removeClass('is-active');
      $(this).addClass('is-active');
      $tab_cont.removeClass('is-active');
      $wrapCont.children('.tabs__con_' + tab_id[0]).addClass('is-active');
      $(window).resize();
      return false;
    });
  });
};
