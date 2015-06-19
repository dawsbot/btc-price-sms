var coinbase = require('coinbase-exchange');
var coinbaseClient = new coinbase.PublicClient();

coinbaseClient.getProductTicker( function(err, response, data) {
    console.log(data.price)
});

