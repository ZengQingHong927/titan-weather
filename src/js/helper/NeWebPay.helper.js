'use strict';

import          OtcError                    from './OtcError.helper';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';

var HashKey             = 'AFiVYE7uDC0bszIa3kJsu9jSmtbCN8Zw';
var HashIV              = 'CwN23zfjQbLdNN4P';

var mockData = {
    MerchantID          : 3430112,
    RespondType         : 'JSON',
    TimeStamp           : 1485232229,
    Version             : 1.4,
    MerchantOrderNo     : 'S_1485232229',
    Amt                 : 40,
    ItemDesc            : 'UnitTest',
}


var sleepP      =       function (time)
{
        return new Promise ((resolve, reject) => {
                setTimeout (resolve, time);
        });
};

var createMpgAesEncrypt = function (TradeInfo)
{
        let     encrypt     = createCipheriv('aes256', HashKey, HashIV);
        let     enc         = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex');
        return enc + encrypt.final('hex');
};
    
var createMpgShaEncrypt = function (TradeInfo)
{
        let     sha         = createHash('sha256');
        let     plainText   = `HashKey=${HashKey}&${TradeInfo}&HashIV=${HashIV}`;
    
        return sha.update(plainText).digest('hex').toUpperCase();
}
    
var genDataChain        = function (TradeInfo)
{
        const results = [];
        for (const kv of Object.entries(TradeInfo)) {
          results.push(`${kv[0]}=${kv[1]}`);
        }
        return results.join('&');
};
    
var createMpgAesDecrypt = function (TradeInfo)
{
        let     decrypt     = createDecipheriv('aes256', HashKey, HashIV);
        decrypt.setAutoPadding(false);
        let     text        = decrypt.update(TradeInfo, 'hex', 'utf8');
        let     plainText   = text + decrypt.final('utf8');
        let     result      = plainText.replace(/[\x00-\x20]+/g, '');
        return result;
};


export default {
        sleepP,
        createMpgAesEncrypt,
        createMpgAesDecrypt,
        genDataChain,
        createMpgShaEncrypt,
};