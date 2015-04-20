
(function() {
  _M.Module.defMod('zmod-a',function(){
    return {
      click:function(e,el,root){
        console.log(el+'is clicked');
      }
    }
  });
_M.Module.defMod('zmod-b',function(){
    return {
      click:function(e,el,root){
        console.log(el+'is clicked mod-b');
      }
    }
  });
  _M.Module.init();
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
