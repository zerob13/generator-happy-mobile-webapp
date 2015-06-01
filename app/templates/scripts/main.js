$(document).ready(function() {
  function updateText(event) {
    var input = $(this);
    // setTimeout(function() {
    var val = input.val();
    if (val != '')
      input.parent().addClass('float-me');
    else
      input.parent().removeClass('float-me');
    // }, 5);
  }
  $('.gt-multiInput input').on('keyup input', updateText);


  $('.gt-search-form .close-icon').on('click', function() {
    $('.search-box', $(this).parent()).val('');
  });
});
console.log('cool');
