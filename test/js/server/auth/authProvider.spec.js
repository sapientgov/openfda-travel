var proxyquire =  require('proxyquire'),
    assert     =  require('assert'),
    httpsStub  = {},
    uuidStub = {}

// use proxyquire to be able to stub out NodeJS modules we don't want to fire
var AuthProvider = proxyquire('../../../../src/js/server/auth/authProvider', { 
    'https': httpsStub,
    'uuid': uuidStub
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
    
    
    describe('Verifies Digits OAuth login', function() {
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
                   authHeader: 'oauth_consumer_key=912easc2812398'
               })
           });
        });
        
        
    });
    
    
});