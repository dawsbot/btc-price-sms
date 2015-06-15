var express = require('express');
var http = require('http');
var twilio = require('twilio');
var config = require('./config');
var bodyParser = require('body-parser');
var Bitfinex = require('bitfinex');

var app = express();
var bitfinex = new Bitfinex(config.BITFINEX_KEY, config.BITFINEX_SECRET);

var bitfinexTicker = function(res) {
    bitfinex.ticker('btcusd', function(err, resp) {
        if (!err){
            var data = ''
            data += 'Bitfinex BTC to USD\n' +
                'Last Price: ' + resp.last_price + '\n' +
                'Day Low: ' + resp.low + "\n" +
                'Day High: ' + resp.high + "\n" +
                'Thanks for using BitcoinSMS!'
            makeTwiml(data, res);
        }
        else {
            makeTwiml(err, res);
        }
    });
}

var makeTwiml = function(body, res) {

    var twiml = new twilio.TwimlResponse();

    twiml.message(body);

   res.writeHead(200, {'Content-Type': 'text/xml'});
   res.end(twiml.toString());

}

app.get('/', function(req, res) {

  req.on('end', function() {
    //if (req.body.Body === 'Bitfinex'){
    bitfinexTicker(res);
   });
});

app.listen(process.env.PORT || 3000, function() {
   console.log('Express serving up');
});
