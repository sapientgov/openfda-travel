
'use strict';

/**
  * Defines the REST web service interface to access and manipulate profiles in
  * a mongodb instance (profileProfider-mongodb.js)

  code based on http://www.qat.com/rest-service-node-js-mongodb-express/  
  */

var mongoServer = 'localhost';
var mongoPort = 27017;
var AuthProvider = require('../auth/authProvider');

function getAccountId(req, res) {
    //read cookie
    var token = req.cookies['fdaaw-token'];
    if(AuthProvider.checkAuthentication(token)) {
        return AuthProvider.getUserId(token);
    } else {
        //send unauthorized response
        res.sendStatus(401);
        return undefined;
    }
}

var ProfileManager = function(app) {
 
  // Imports the MongoDB interface
  var ProfileProvider = require('./profileProvider-mongodb').ProfileProvider;

  //Implements an instance of the MongoDB interface
  var profileProvider = new ProfileProvider(mongoServer, mongoPort);

  /**
    * RESTful GET method that defines the context and input to retrieve
    * all profiles with the specified accountId
    */
  app.get('/profiles', function(req, res) {

    var accountId = getAccountId(req, res);
      if(accountId) {
          
        //calls the MongoDB interface method with the reqest paramter that is expected
        //to be the accountId
          //TODO: remove account ID param?
        profileProvider.fetchAllProfilesByAccountId(accountId, function(error, profiles) {
          if (error) {
            res.status(500).send(error);
          } else {
            res.json(profiles);
          }
        });
      }
  });
    
  /**
    * RESTful POST method that defines the context and input to add a new
    * profile document
    */
  app.post('/profiles', function(req, res) {
    var accountId = getAccountId(req, res);
      if(accountId) {
          
        //add the account id to the data
        var toAdd = req.body;
        toAdd.accountId = accountId;

        profileProvider.insertProfile(req.body, function(error, profile) {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(profile);
          }
        });
      }
  });

  /**
    * RESTful PUT method that defines the context and input to update an
    * existing profile document only if _id field matches the input 
    * 'id' request parameter.
    */
  app.put('/profiles/:id', function(req, res) {
    var accountId = getAccountId(req, res);
      if(accountId) {
        var _profile = req.body;
        _profile._id = req.params.id;
        _profile.accountId = accountId;

        profileProvider.updateProfile(_profile, function(error, profile) {
          if (error) {
            console.log(error);
            res.status(404).send(error);
          } else {
            res.json(_profile);
          }
        });
      }
  });
    
  /**
    * RESTful DELETE method that defines the context and input to remove
    * a profile document only if _id field matches the input 
    * 'id' request parameter.
    */
  app.delete('/profiles/:id', function(req, res) {
    var accountId = getAccountId(req, res);
      if(accountId) {
        profileProvider.deleteProfile(req.params.id, function(error, profile) {
          if (error) {
            res.status(404).send(error);
          } else {
            res.json({});
          }
        });
      }
  });
};

exports.ProfileManager = ProfileManager;