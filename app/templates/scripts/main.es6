var bob = {
  _name: "Bob",
  _friends: ['Jim'],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
bob.printFriends();

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
})();
