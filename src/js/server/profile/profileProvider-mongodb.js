'use strict';

var profilesTable = 'profiles';
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;


var ProfileProvider = function(host, port) {
  
  this.db = new Db('profiles', new Server(host, port));
  this.db.open(function(){});


  this.fetchAllProfilesByAccountId = function(myAccountId, cb) {
    this.db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        profiles.find({accountId:myAccountId}).toArray(function(error, results) {
          cb(error, results);
        });
      }
    });
  };


  this.fetchProfileById = function(id, cb) {
    this.db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        profiles.findOne({
          _id:profiles.db.bson_serializer.ObjectID.createFromHexString(id)
        }, function(error, result) {
          cb(error, result);
        });
      }
    });
  };

  this.fetchProfileByAccountId = function(accountId, cb) {
    this.db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        profiles.find({
          accountId:profiles.db.bson_serializer.ObjectID.createFromHexString(accountId)
        }, function(error, result) {
          cb(error, result);
        });
      }
    });
  };


  this.insertProfile = function(profile, cb) {
    
    this.db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
        console.error(error);
      } else {
        profiles.insert([profile], function() {
          cb(null, profile);
        });
      }
    });
  };


  this.updateProfile = function(profile, cb) {
    this.db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        profiles.update({_id:profiles.db.bson_serializer.ObjectID.createFromHexString(profile._id)},
          {accountId:profile.accountId, primary:profile.primary, profileName:profile.profileName,
            ageRange:profile.ageRange, gender:profile.gender, medications:profile.medications,
            conditions:profile.conditions, allergies:profile.allergies},
          function(error, result) {
            cb(error, result);
        });
      }
    });
  };


  this.deleteProfile = function(id, cb) {
    this.db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        profiles.remove({_id:profiles.db.bson_serializer.ObjectID.createFromHexString(id)},
          function(error, result) {
            cb(error, result);
        });
      }
    });
  };
};

exports.ProfileProvider = ProfileProvider;