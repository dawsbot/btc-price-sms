var express = require('express');
var app = express();
var config = require('./config.js');
var twilio = require('twilio');

var client = new twilio.RestClient(config.ACCOUNT_SID, config.AUTH_TOKEN);

app.get('/', function (req, res) {
    res.send('Hello World');

    client.sendMessage({
        to: config.TO_PHONE,
        from: config.FROM_PHONE,
        body: 'This is a test'
    }, function(err, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log('Successful message sent from %s with body: %s', resp.from, resp.body);
        }
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App running on port %s at address %s', port, host);
})
