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
- RockTrading

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
Btc-e: $328.04
CoinDesk: $331.15
CoinBase: $331.93
BitStamp: $331.9
BlockChain: $330.45
OKCoin: $332.25
Bitfinex: $331.96
LakeBTC: $334.02
HitBTC: $334.09
CoinTrader: $335.3
LoyalBit: $331.9
Bitex.la: $332.54509018
RockTrading: $329.93
---- Average ----
$332.29 calculated from 12 prices (Removing farthest|problematic values)
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