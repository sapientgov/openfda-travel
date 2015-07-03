'use strict';

var https = require('https');
var url = require('url');
var uuid = require('node-uuid');

var DIGITS_CONSUMER_KEY = '3fRmH8jiHfBH2CPu8ekjxsDXv';

//Hash of active users that matches public hash uuid to digits ID stored in DB
//format:
//{public_hash (ex: "123-123-123-123"): digits_id (ex: "1234567")}
var _active = {};

var AuthProvider = {
    
    removUserFromHashByDigitsId: function(id) {
        for(var item in _active) {
            if(_active[item] === id) {
                delete _active[item];
            }
        }
    },
    
    clearAllLogins: function() {
        _active = {};
    },
    
    verifyLoginWithDigits: function(options) {

        //parse url
        var provider = url.parse(options.providerUrl);

        //verify that the host is what we expect for digits
        if(provider.host !== 'api.digits.com' && provider.host !== 'api.twitter.com') {
            //this is a provider we don't trust - get out
            throw new Error('Auth provider (' + provider.host + ') is not a trusted host');
        }

        //verify that the consumer key is correct in the authHeader
        if(options.authHeader.indexOf('oauth_consumer_key="' + DIGITS_CONSUMER_KEY + '"') < 0) {
            //different consumer key than we expect - get out
            throw new Error('Unexpected consumer key in authentication header');
        }

        //set HTTPS options
        var httpsOptions = {
            hostname: provider.host,
            path: provider.path,
            headers: {
                'Authorization': options.authHeader
            }
        };

        //make the call
        https.get(httpsOptions, function(res) {
            console.log("statusCode: %d", res.statusCode);
            
            //process response body
            var data = '';
            res.on('data', function(chunk) {
                data += chunk;
            });

            //when done reading deal with response
            res.on('end', function() {
                console.log('retrieved auth response: ', data);

                //try to parse response as JSON
                var resJson;
                try {
                    resJson = JSON.parse(data);
                } catch(er) {
                    console.error('unable to parse Digits response (%s): %s', data, er.message);
                    if(typeof options.error === 'function') {
                        options.error(er);
                        return;
                    }
                }
                
                //check status code
                if(res.statusCode === 200) {
                    
                    //remove the user from hash if they are already in the hash
                    AuthProvider.removUserFromHashByDigitsId(resJson.id_str);
                    
                    //generate a uuid for public use
                    var uuid_str;
                    do {
                        uuid_str = uuid.v4();
                    } while (_active[uuid_str] !== undefined);
                    console.log('generated uuid ', uuid_str);
                    
                    //add user to active hash
                    _active[uuid_str] = resJson.id_str;
                    
                    //execute success callback
                    if(typeof options.success === 'function') {
                        options.success(uuid_str);
                    }
                } else {
                    
                    //non-200 status - execute error status
                    if(typeof options.error === 'function') {
                        options.error(resJson);
                    }
                }
            });
        }).on('error', function(e) {
            if(typeof options.error === 'function') {
                options.error(e);
            }
        });
    },
    
    logout: function(uuid) {
        console.log('digits id to logout: %s', _active[uuid]);
        delete _active[uuid];
    },
    
    checkAuthentication: function(uuid) {
        
        //check auth
        if(typeof uuid === 'string' && uuid.length > 0
          && typeof _active[uuid] !== 'undefined') {
            
            return true;
        } else {
            return false;
        }
    },
    
    getUserId: function(uuid) {
        return _active[uuid];
    },
    
    setUserId: function(uuid, accountId) {
        _active[uuid] = accountId;
    }
};

module.exports = AuthProvider;