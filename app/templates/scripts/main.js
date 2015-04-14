(function() {

  function showFloat() {
    $('.float_view').addClass('show');
  }

  function gotoTab(index) {
    $(".container-tab").removeClass('-active').eq(index).addClass('-active');
  }

  gotoTab(0);
  $('.nav-tab').on('click', function() {
    var index = $(this).index();
    gotoTab(index);
  });
  console.log('done');
})()
