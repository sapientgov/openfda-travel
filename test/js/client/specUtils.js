'use strict';

var User = require('../../../src/js/client/data/user');
var Profile = require('../../../src/js/client/data/profile');
var ProfileCollection = require('../../../src/js/client/data/profileCollection');

var SpecUtils = {
    
    createEmptyLoggedinUser: function() {
        return new User({
            loggedIn: true,
            profiles: new ProfileCollection(),
            selectedPid: ''
        });
    },
    
    createLoggedOutUser: function() {
        return new User({
            loggedIn: false,
            profiles: null,
            selectedPid: null
        });
    },
    
    createUserWithProfiles: function() {
        return new User({
            loggedIn: true,
            profiles: this.createProfileCollection(),
            selectedPid: '111'
        });
    },
    
    createProfileCollection: function() {
        return new ProfileCollection([
            this.createDummyProfile('111', 'profile 1'),
            this.createDummyProfile('222', 'profile 2'),
            this.createDummyProfile('333', 'profile 3'),
        ]);
    },
    
    createDummyProfile: function(id, name) {
        return new Profile({
            _id: id,
            name: name,
            gender: 'male',
            ageRange: 'child',
            medications: ['med 1'],
            allerigies: ['allergy 1'],
            conditions: ['cond 1'],
        });
    }
};

module.exports = SpecUtils;