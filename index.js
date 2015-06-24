var coinbase = require('coinbase-exchange');
var coinbaseClient = new coinbase.PublicClient();

var express = require('express');
var app = express();

var twilio = require('twilio');

var generatePrice = function(res) {

    coinbaseClient.getProductTicker( function(err, response, data) {
        var myMessage = "The current price is $" +
            Number(data.price).toFixed(2) + " per Bitcoin."
        makeTwiml(myMessage, res);
    });

}

var makeTwiml = function(body, res) {

    var twiml = new twilio.TwimlResponse();
    twiml.message(body); //the Coinbase price generated from API call
   res.writeHead(200, {'Content-Type': 'text/xml'});
   res.end(twiml.toString());

}

app.get('/', function(request, response) {
    request.on('end', function() {
        generatePrice(response);
    });
});

app.post('/', function(request, response) {
    request.on('end', function() {
        generatePrice(response);
    });
});

app.listen((process.env.PORT || 3000), function() {
       console.log('Express serving');
});
