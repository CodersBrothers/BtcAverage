# Bitcoin price average
This library uses multiple providers of price for calculate average price in $ (USD), but with one important feature: If some service is broken the average not will be broken. Use a math concept: Variance. This use prices calculating variance and discarding the farthest values. This library is resistant for errors in providers.

## Providers
- Btc-e
- CoinDesk
- CoinBase
- BitStamp
- BlockChain
- OKCoin
- Bitfinex
- LakeBTC
- HitBTC
- CoinTrader
- LoyalBit
- Bitex.la

## Install

```sh
$ npm i --save btcaverage
```

## Usage

```js
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
```

Returns:
```
---- By provider ----
Btc-e: $327.61
CoinDesk: $330.585
CoinBase: $331.84
BitStamp: $331.83
BlockChain: $331.86
OKCoin: $331.36
Bitfinex: $331.71
LakeBTC: $333.07
HitBTC: $333.36
CoinTrader: $335.09
LoyalBit: $331.89
Bitex.la: $332.49498998
---- Average ----
$331.89
```


#### License

The MIT License (MIT)

Copyright (c) 2014 Coders Brothers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.