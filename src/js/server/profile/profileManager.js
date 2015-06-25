'use strict';

var mongoServer = 'localhost';
var mongoPort = 27017;
var ProfileManager = function(app) {

  var ProfileProvider = require('./profileProvider-mongodb').ProfileProvider;
  var profileProvider = new ProfileProvider(mongoServer, mongoPort);


  app.get('/profiles/:accountId', function(req, res) {
    profileProvider.fetchAllProfilesByAccountId(req.params.accountId, function(error, profiles) {
      if (error) {
        res.send(error, 500);
      } else {
        res.send(profiles);
      }
    });
  });


  app.post('/profiles', function(req, res) {
    profileProvider.insertProfile(req.body, function(error, profile) {
      if (error) {
        res.send(error, 500);
      } else {
        res.send(profile);
      }
    });
  });

/*
  app.get('/profiles/:id', function(req, res) {
    profileProvider.fetchProfileById(req.params.id, function(error, profile) {
      if (profile === null) {
        res.send(error, 404);
      } else {
        res.send(profile);
      }
    });
  });
*/

  app.post('/profiles/:id', function(req, res) {
    var _profile = req.body;
    _profile._id = req.params.id;
    profileProvider.updateProfile(_profile, function(error, profile) {
      if (error) {
        res.send(error, 404);
      } else {
        res.send(profile);
      }
    });
  });


  app.delete('/profiles/:id', function(req, res) {
    profileProvider.deleteProfile(req.params.id, function(error, profile) {
      if (error) {
        res.send(error, 404);
      } else {
        res.send('');
      }
    });
  });
};

exports.ProfileManager = ProfileManager;