var Q = require('q');
var request = require('request');
var async = require('async');
var smartaverage = require('smartaverage');
var providers = require('./providers');

var TIMEOUT = 5000;
var ACCEPTABLE_VARIANCE = 3;
var MINIMUM_VALUES_VARIANCE = 3;

/**
 * GET PRICE FROM API SERVICE
 *
 * @param {String} urlAPI
 * @param {String} objectPath
 * @param {Function} callback
 */
function requestPrice(urlAPI, objectPath, callback){
    request({
        method: 'GET',
        url: urlAPI,
        timeout: TIMEOUT
    }, function(error, res, body){

        if(error){
            callback(0);
            return;
        }

        try{

            var current = JSON.parse(body);
            var partsObject = objectPath.split('.');
            var errorParts = false;
            partsObject.forEach(function(part){
                if(!errorParts){
                    current = current[part];
                    if(!current){
                        errorParts = true;
                    }
                }
            });

            if(errorParts){
                callback(0);
            }else{
                callback(parseFloat(current));
            }

        }catch(err){
            callback(0);
        }

    });
}

/**
 * GET PRICE
 */
function getPrice(){
    var df = Q.defer();
    async.parallel(providers.map(function(provider){
            return function(callback){
                requestPrice(provider.url, provider.path, function(price){
                    callback(null, price);
                });
            }
        }),
        function(err, prices){
            var infoAverage = smartaverage(ACCEPTABLE_VARIANCE, MINIMUM_VALUES_VARIANCE, prices);
            var pricesProviders = {};
            prices.forEach(function(price, i){
                pricesProviders[providers[i].name] = price;
            });
            df.resolve({
                average: infoAverage.average,
                pricesAverage: infoAverage.dataset,
                prices: pricesProviders
            });
        });
    return df.promise;
}
module.exports = getPrice;