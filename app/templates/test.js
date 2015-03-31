
casper.start('http://127.0.0.1:9000/', function() {
    this.echo(this.getTitle());
});


casper.run();
