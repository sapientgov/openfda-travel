
'use strict';

/**
  * Defines the REST web service interface to access and manipulate profiles in
  * a mongodb instance (profileProfider-mongodb.js)

  code based on http://www.qat.com/rest-service-node-js-mongodb-express/  
  */

var mongoServer = 'localhost';
var mongoPort = 27017;
var ProfileManager = function(app) {
 
  // Imports the MongoDB interface
  var ProfileProvider = require('./profileProvider-mongodb').ProfileProvider;

  //Implements an instance of the MongoDB interface
  var profileProvider = new ProfileProvider(mongoServer, mongoPort);


  /**
    * RESTful GET method that defines the context and input to retrieve
    * all profiles with the specified accountId
    */
  app.get('/profiles/:accountId', function(req, res) {

    //calls the MongoDB interface method with the reqest paramter that is expected
    //to be the accountId
    profileProvider.fetchAllProfilesByAccountId(req.params.accountId, function(error, profiles) {
      if (error) {
        res.send(error, 500);
      } else {
        res.send(profiles);
      }
    });
  });


  /**
    * RESTful POST method that defines the context and input to add a new
    * profile document
    */
  app.post('/profiles', function(req, res) {


    profileProvider.insertProfile(req.body, function(error, profile) {
      if (error) {
        res.send(error, 500);
      } else {
        res.send(profile);
      }
    });
  });



  /**
    * RESTful PUT method that defines the context and input to update an
    * existing profile document only if _id field matches the input 
    * 'id' request parameter.
    */
  app.put('/profiles/:id', function(req, res) {
    var _profile = req.body;
    _profile._id = req.params.id;

    profileProvider.updateProfile(_profile, function(error, profile) {
      if (error) {
        console.log(error);
        res.status(404).send(error);
      } else {
        res.send('');
      }
    });
  });


  /**
    * RESTful DELETE method that defines the context and input to remove
    * a profile document only if _id field matches the input 
    * 'id' request parameter.
    */
  app.delete('/profiles/:id', function(req, res) {
    profileProvider.deleteProfile(req.params.id, function(error, profile) {
      if (error) {
        res.status(404).send(error);
      } else {
        res.send('');
      }
    });
  });
};

exports.ProfileManager = ProfileManager;