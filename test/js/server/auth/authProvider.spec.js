var assert = require('assert');

describe('AuthProvider Specs', function() {
    
    var AuthProvider = require('../../../../src/js/server/auth/authProvider');
    
    it('sets and gets login values', function() {
        AuthProvider.setUserId('test-uuid', 'myUser');
        assert.equal(AuthProvider.getUserId('test-uuid'), 'myUser');
    });
});