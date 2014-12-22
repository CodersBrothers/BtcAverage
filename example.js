var btcaverage = require('./btcaverage');
btcaverage()
    .then(function(priceDetails){
        console.log('---- By provider ----');
        Object.keys(priceDetails.prices).map(function(providerName){
            console.log(providerName + ': $' + priceDetails.prices[providerName]);
        });
        console.log('---- Average ----');
        console.log('$' + parseFloat(priceDetails.average).toFixed(2));
    });