var Q = require('q');
var request = require('request');
var async = require('async');
var Promise = require("bluebird");
var getExchangeRates = require("get-exchange-rates-usd");
var smartaverage = require('smartaverage');
var providers = require('./providers');

var TIMEOUT = 20000;
var ACCEPTABLE_VARIANCE = 3;
var MINIMUM_VALUES_VARIANCE = 3;

/**
 * FIND VALUE BY PATH
 *
 * @param {Object} jsonData
 * @param {String} path
 */
function findValueByPath(jsonData, path, currency, rate) {
	var errorParts = false;
	path.split('.').forEach(function(part) {
		if (!errorParts) {
			if (currency) {
				jsonData = jsonData[part] / rate;
			} else {
				jsonData = jsonData[part]
			}
			if (!jsonData) errorParts = true;
		}
	});
	return errorParts ? 0 : parseFloat(jsonData);
}

/**
 * GET PRICE FROM API SERVICE
 *
 * @param {String} urlAPI
 * @param {Function} callback
 */
function requestPrice(urlAPI, callback) {
	request({
		method: 'GET',
		url: urlAPI,
		timeout: TIMEOUT,
		maxRedirects: 2
	}, function(error, res, body) {
		if (!error) {
			try {
				var current = JSON.parse(body);
				callback(current);
			} catch (e) {}
		}
		if (!current) {
			callback({});
		}
	});
}


/**
 * GET PRICE
 */
module.exports = function getPrice() {
	var df = Q.defer();
	Promise.try(function() {
		return getExchangeRates();
	}).then(function(rates) {
		async.parallel(providers.map(function(provider) {
				return function(callback) {
					requestPrice(provider.url, function(jsonResponse) {
						callback(null, findValueByPath(jsonResponse, provider.path, provider.currency, rates[provider.currency]));
					});
				}
			}),
			function(err, prices) {
				var infoAverage = smartaverage(ACCEPTABLE_VARIANCE, MINIMUM_VALUES_VARIANCE, prices);
				if (infoAverage) {
					var pricesProviders = {};
					prices.forEach(function(price, i) {
						pricesProviders[providers[i].name] = price;
					});
					df.resolve({
						average: infoAverage.average,
						pricesAverage: infoAverage.dataset,
						prices: pricesProviders
					});
				} else {
					df.reject(new Error('Was imposible get price average'));
				}
			});
	});
	return df.promise;
};