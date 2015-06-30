'use strict';

/**
  * Defines to methods to access and manipulate profiles in
  * a mongodb instance.  The profile structure is a collection of the
  * following structure: 
  *  
    {
      "accountId":"idValue",
      "primary":"y",
      "profileName":"nameValue",
      "ageRange":"rangeValue",
      "gender":"Male",
      "medications":[
          "med1",
          "med2",
          "med3"
      ],
      "conditions":[
          "cond1"
      ],
      "allergies":[
          "aller1",
          "aller2"
      ]
    }

  code based on http://www.qat.com/rest-service-node-js-mongodb-express/  
  */

var profilesTable = 'profiles';
var MongoClient = require('mongodb').MongoClient;
var BSON = require('bson').BSONPure;

//setup connection URL
var dbName = 'fda-anywhere';
var dbConnectUrl = 'mongodb://localhost:27017/';
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  dbConnectUrl = process.env.OPENSHIFT_MONGODB_DB_URL;
}
dbConnectUrl += dbName;
console.log('mongo URL: ' + dbConnectUrl);

var _db;

var ProfileProvider = function(host, port) {
  var self = this;
    
  //create DB connection and store it
  MongoClient.connect(dbConnectUrl, function(err, db) {
      if(err) {
          console.error('Error connecting to Mongo!', err);
      } else {
          console.log("Connected correctly to mongo server");
          _db = db;
      }
  });
  
  /**
    * Retrieves all the profiles in the database with the input accountId
    * @param   {String}  myAccountId the accountId of the the profiles
    * @return  {Array}   an array of profile documents
    */
  this.fetchAllProfilesByAccountId = function(myAccountId, cb) {
    _db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        //finds all profile documents with the accountId and returns in an array
        profiles.find({accountId:myAccountId}).toArray(function(error, results) {
          cb(error, results);
        });
      }
    });
  };


  /**
    * Retrieves a profile by its DB generated _id field 
    * @param   {String}  myAccountId the accountId of the the profiles
    * @return  {String}   the profile document
    */
  this.fetchProfileById = function(id, cb) {
    _db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        //finds a single document with the input id.  The input id must be
        //converted to a ObjectId when dealing with the db generated id
        //when searching
        profiles.findOne({_id:new BSON.ObjectID(id)
        }, function(error, result) {
          cb(error, result);
        });
      }
    });
  };



  /**
    * Adds a profile document to the profiles collection
    * @param   {String}  profile the profile document to add
    */
  this.insertProfile = function(profile, cb) {
    
    _db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
        console.error(error);
      } else {

        //verify the accountId field is present in profile
        if (profile.accountId === null) {
          throw "illegal profile document. It does not contain the required" +
          " 'accountId' field at the root";
        }

        profiles.insert([profile], function() {
          cb(null, profile);
        });
      }
    });
  };


  /**
    * Updates a profile document to the profiles collection only if 
    * the profile exists based on DB generated _id field.  Does nothing 
    * (no error nor does it add) if the profile does not exist.
    * @param   {String}  profile the profile document to update
    */
  this.updateProfile = function(id, profile, cb) {
    _db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {
        
        //verify the accountId field is present in profile
        if (profile.accountId === null) {
          throw "illegal profile document. It does not contain the required" +
          " 'accountId' field at the root";
        }
          
        //setup the BSON id
        var bsonId = new BSON.ObjectID(id);
        profile._id = bsonId;

        //finds a single document with the DB generated _id in the input
        //profile.  The db generated _id must be converted to a ObjectId when 
        //searching
        profiles.update({_id: bsonId}, profile, 
          function(error, result) {
            cb(error, result);
        });

      }
    });
  };

  /**
    * Deletes the profile whose DB generated _id field matches the input id 
    * @param   {String}  the db generated _id of the profile to be deleted
    */
  this.deleteProfile = function(id, cb) {
    _db.collection(profilesTable, function(error, profiles) {
      if (error) {
        cb(error, null);
      } else {

        //removes the document with the input id.  The input id must be
        //converted to a ObjectId when dealing with the db generated id
        //when searching
       profiles.remove({_id:new BSON.ObjectID(id)},
          function(error, result) {
            cb(error, result);
        });

      }
    });
  };



};

exports.ProfileProvider = ProfileProvider;