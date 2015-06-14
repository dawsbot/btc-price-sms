var http = require('http');
var twilio = require('twilio');

http.createServer(function (req, res) {

  var body = '';

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    //Create TwiML response
    var twiml = new twilio.TwimlResponse();

    twiml.message('Thanks, your message of "' + body + '" was received!');

   res.writeHead(200, {'Content-Type': 'text/xml'});
   res.end(twiml.toString());
   });

}).listen(process.env.PORT || 3000);
