var bob = {
  _name: "Bob",
  _friends: ['Jim'],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
bob.printFriends();


