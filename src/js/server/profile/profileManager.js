'use strict';

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

var ProfileManager = function (app) {

    var ProfileProvider = require('./profileProvider-mongodb').ProfileProvider;
    var profileProvider = new ProfileProvider(mongoServer, mongoPort);

    app.get('/profiles/', function (req, res) {
        var accountId = getAccountId(req, res);
        if(accountId) {
            profileProvider.fetchAllProfilesByAccountId(accountId, function (error, profiles) {
                if (error) {
                    res.status(500).send(error);
                } else {
                    //TODO: remove accountId fields from results
                    res.json(profiles);
                }
            });
        }
    });

    app.post('/profiles', function (req, res) {
        var accountId = getAccountId(req, res);
        if(accountId) {
            
            //add the account id to the data
            var toAdd = req.body;
            toAdd.accountId = accountId;
            
            //save the new profile
            profileProvider.insertProfile(toAdd, function (error, profile) {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.json(profile);
                }
            });
        }
    });

    app.post('/profiles/:id', function (req, res) {
        var accountId = getAccountId(req, res);
        if(accountId) {
            var _profile = req.body;
            _profile._id = req.params.id;
            profileProvider.updateProfile(_profile, function (error, profile) {
                if (error) {
                    res.status(404).send(error);
                } else {
                    res.json(profile);
                }
            });
        }
    });

    app.delete('/profiles/:id', function (req, res) {
        profileProvider.deleteProfile(req.params.id, function (error, profile) {
            if (error) {
                res.status(404).send(error);
            } else {
                res.sendStatus(200);
            }
        });
    });
};

exports.ProfileManager = ProfileManager;