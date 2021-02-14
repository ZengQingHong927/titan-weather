'use strict';

import      OtcError                    from '../helper/OtcError.helper';

var generateSN  =       function (len)
{
        let     charset = '0123456789';
        let     randchar = '';
        for (let i = 0 ; i < len ; i ++) {
                randchar += charset [Math.floor (Math.random () * (charset.length))];
        }
        return randchar;
};

var generateSQ  =       function (len)
{
        let     charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let     randchar = '';
        for (let i = 0 ; i < len ; i ++) {
                randchar += charset [Math.floor (Math.random () * (charset.length))];
        }
        return randchar;
};

var getNowdf    = function (date) {
        date            = date || new Date ();
        console.log (`date: ${date}`);
        let     tzoff   = date.getTimezoneOffset ();
        let     nowdf   = new Date (~~((date.getTime () - tzoff*60000)/24/3600000) * 24*3600000 + tzoff*1000*60);
        return  nowdf;
};

var getNowhf = function (date)
{
        date            = date || new Date ();
        let     nowhf   = new Date (~~(date.getTime () / 3600000) * 3600000);
        return nowhf;
};

var getNowmf = function (date)
{
        let     now     = date || new Date ();
        let     year    = now.getFullYear ();
        let     month   = now.getMonth ();
        let     nowmf   = new Date (year, month);
        return nowmf;
};

var getNowmc = function (date)
{
        let     now     = date || new Date ();
        let     year    = now.getFullYear ();
        let     month   = now.getMonth () + 1;
        let     nowmc   = new Date (year, month);
        return nowmc;
};

var getNowwc = function (date)
{
        let     now     = date || new Date ();
        let     year    = now.getFullYear ();
        let     month   = now.getMonth ();
        let     currd   = now.getDate ();
        let     day     = now.getDay ();
        console.log ('getNowwc', day);

        let     nowwc   = new Date (year, month, currd + (6 - day));
        return nowwc;
};

var getNowwf = function (date)
{
        let     now     = date || new Date ();
        let     year    = now.getFullYear ();
        let     month   = now.getMonth ();
        let     currd   = now.getDate ();
        let     day     = now.getDay ();
        console.log ('getNowwf', day);

        let     nowwf   = new Date (year, month, currd + (- day));
        return nowwf;
};

var sleepP      =       function (time)
{
        return new Promise ((resolve, reject) => {
                setTimeout (resolve, time);
        });
};

var commonRegex = function (regtype)
{
        let     regInfo = {
                'email': {
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        errmsg: 'invalid email format',
                },
                'phonenum': {
                        pattern: /^09[0-9]{8}$/,
                        errmsg: 'invalid taiwan phone number'
                }
        };

        return regInfo[regtype] ? regInfo[regtype] : 'invalid regtype';
}

var validateArgs      = function (args)
{
        try {
                for (let obj of args) {
                        let   { val,
                                errmsg,
                                type,
                                chktype,
                                func,
                                regex,
                                // required,
                        }             = obj;

                        errmsg  = errmsg || '参数异常';

                        // if (typeof val === 'undefined' && !required) {
                        //         continue;
                        // }

                        switch (chktype) {
                                case 'exists': {
                                        if (typeof val === 'undefined' || (typeof val === 'string' && val.length === 0))    throw errmsg;
                                        break;
                                }
                                case 'type': {
                                        if (type === String && typeof val !== 'string')     throw errmsg;
                                        if (type === Number && typeof val !== 'number')     throw errmsg;
                                        break;
                                }
                                case 'length': {
                                        if (!func (val.toString ().length))                 throw errmsg;
                                        break;
                                }
                                case 'regex': {
                                        if (!regex.test (val))                              throw errmsg;
                                        break;
                                }
                                case 'diff': {
                                        if (val[0] !== val[1])                              throw errmsg;
                                        break;
                                }
                                case 'value': {
                                        if (!func (val))                                    throw errmsg;
                                        break;
                                }
                                default:
                                throw new OtcError (500, '参数不正确');

                        }
                }
        }
        catch (err) {
                throw new OtcError (500, err);
        }
};

// * TODOS
var raceSuccessP        = function () {
        const invert  = p  => new Promise((res, rej) => p.then(rej, res));
                const firstOf = ps => invert(Promise.all(ps.map(invert)));

                // Utility routines used only in testing.
                // const wait1    = ms => OtcHttpHelper.engetA (api, query1, 'query');
                // const wait2    = ms => OtcHttpHelper.engetA (api, query2, 'query');
                // const wait    = ms => new Promise(res => setTimeout(() => res(ms), ms));
                const fail    = f  => Promise.reject(f);
                const log     = p  => p.then(v => console.log("pass", v), v => console.log("fail", v));

                // Test.
                // log(firstOf([wait1(1000), wait2(500) ]));
                // log(firstOf([wait1(1000), fail(100) ]));
                // log(firstOf([wait(1000), wait(500) ]));
                // log(firstOf([wait(1000), fail("f1")]));
                // log(firstOf([fail("f1"), fail("f2")]));
}

export {
        generateSQ,
        validateArgs,
        commonRegex,
        getNowdf,
        getNowhf,
        getNowmf,
        getNowmc,

        getNowwf,
        getNowwc,
        // formatLocalDate,
        generateSN,
        sleepP
};