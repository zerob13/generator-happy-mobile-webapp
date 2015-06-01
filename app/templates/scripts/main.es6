var bob = {
  _name: "Bob",
  _friends: ['Jim'],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
bob.printFriends();

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
