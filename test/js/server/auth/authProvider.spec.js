var proxyquire =  require('proxyquire'),
    assert     =  require('assert'),
    events = require('events'),
    httpMocks = require('node-mocks-http'),
    httpsStub  = {};

// use proxyquire to be able to stub out NodeJS modules we don't want to fire
var AuthProvider = proxyquire('../../../../src/js/server/auth/authProvider', { 
    'https': httpsStub
});

describe('AuthProvider Specs', function() {
    
    afterEach(function() {
        AuthProvider.clearAllLogins();
    });
    
    it('clears all logins', function() {
        AuthProvider.setUserId('test-uuid', 'myUser');
        AuthProvider.setUserId('test-uuid2', 'myUser2');
        AuthProvider.setUserId('test-uuid3', 'myUser3');
        AuthProvider.clearAllLogins();
        assert.equal(AuthProvider.checkAuthentication('test-uuid'), false);
        assert.equal(AuthProvider.checkAuthentication('test-uuid2'), false);
        assert.equal(AuthProvider.checkAuthentication('test-uuid3'), false);
    });
    
    it('sets and gets login values', function() {
        AuthProvider.setUserId('test-uuid', 'myUser');
        assert.equal(AuthProvider.getUserId('test-uuid'), 'myUser');
    });
    
    it('checks valid authentication', function() {
        AuthProvider.setUserId('test-uuid', 'myUser');
        assert.equal(AuthProvider.checkAuthentication('test-uuid'), true);
    });
    
    it('fails invalid authentication', function() {
        assert.equal(AuthProvider.checkAuthentication('bad-uuid'), false);
    });
    
    it('logs out user', function() {
        AuthProvider.setUserId('test-uuid', 'myUser');
        assert.equal(AuthProvider.checkAuthentication('test-uuid'), true);
        AuthProvider.logout('test-uuid');
        assert.equal(AuthProvider.checkAuthentication('test-uuid'), false);
    });
    
    it('removes login by user id', function() {
        AuthProvider.setUserId('test-uuid', 'myUser');
        assert.equal(AuthProvider.checkAuthentication('test-uuid'), true);
        AuthProvider.removUserFromHashByDigitsId('myUser');
        assert.equal(AuthProvider.checkAuthentication('test-uuid'), false);
    });
    
    
    describe('Avoids invalid digits oauth validations', function() {
        it('fails to verify to unexpected oAuth provider', function() {
           assert.throws(function() {
               AuthProvider.verifyLoginWithDigits({
                   providerUrl: 'http://bad-provider.com/a/b/c'
               })
           });
        });

        it('fails to verify with bad Digits application ID', function() {
            assert.throws(function() {
               AuthProvider.verifyLoginWithDigits({
                   providerUrl: 'http://api.digits.com',
                   authHeader: 'oauth_consumer_key="912easc2812398"'
               })
           });
        });
    });
    
    describe('makes verification call', function() {
        
        var res, errorTimeout;
        
        var setupHttpsStub = function(status) {
            //set the http mock
            httpsStub.get = function(options, callback) {
                //verify the options are correct
                assert.equal(options.hostname, 'api.digits.com');
                assert.equal(options.path, '/my/path');
                assert.equal(options.headers['Authorization'], 'oauth_consumer_key="3fRmH8jiHfBH2CPu8ekjxsDXv"');
                
                //execute the callback
                res.statusCode = status;
                callback(res);
                
                //return dummy object for chained error check
                return {on: function() {}};
            };
        };
        
        var executeTestCall = function(options) {
            //call the method to test
            AuthProvider.verifyLoginWithDigits({
                providerUrl: 'http://api.digits.com/my/path',
                authHeader: 'oauth_consumer_key="3fRmH8jiHfBH2CPu8ekjxsDXv"',
                success: options.success,
                error: options.error
            });
        };
        
        beforeEach(function() {
            //create mock response to use
            res = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });
            
            //create a timeout to test whether correct callback was called
            errorTimeout = setTimeout(function() {
                assert.fail(null, null, 'expected method not called');
                done();
            }, 1000);
        });
        
        it('successfully verifies oauth request', function(done) {
            
            setupHttpsStub(200);
            executeTestCall({
                success: function(uuid) {
                    
                    //clear timeout
                    clearTimeout(errorTimeout);

                    //check that the right user was added to the active hash
                    assert.ok(AuthProvider.checkAuthentication(uuid));
                    assert.equal(AuthProvider.getUserId(uuid), '123456');

                    //finish test
                    done();
                }
            });
            
            //emit events to continue execution
            res.emit('data', '{"id_str": "123456"}');
            res.emit('end');
        });
        
        it('calls error on unsuccessful oauth request', function(done) {
            
            setupHttpsStub(404);
            executeTestCall({
                error: function(resjson) {
                    
                    //clear timeout
                    clearTimeout(errorTimeout);

                    //finish test
                    done();
                }
            });
            
            //emit events to continue execution
            res.emit('data', '{"error": "error"}');
            res.emit('end');
        });
    });
    
    
});