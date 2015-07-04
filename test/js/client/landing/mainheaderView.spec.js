var $ = require('jquery');
var MainHeaderView = require('../../../../src/js/client/views/landing/mainHeaderView');
var DigitsLoginView = require('../../../../src/js/client/views/auth/digitsLoginView');
var SpecUtils = require('../specUtils');

describe('Main Header View', function() {
    var view, model;
    
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/js/client/fixtures';
        loadFixtures('mainHeader.html');
    });
    
    describe('logged out users', function() {
        
        beforeEach(function() {
            model = SpecUtils.createLoggedOutUser();
            view = new MainHeaderView({model: model});
            view.render();
        });
        
        it('initializes login view', function() {
            //make sure login view is initialized
            expect(view.loginView instanceof DigitsLoginView).toBe(true);
            //check that it is bound to correct element
            expect(view.loginView.el).toBe($('#nav-login')[0]);
        });
        
        it('shows login link', function() {
            expect($('#nav-login')).toContainText('Login');
        });
        
        it('displays no profiles', function() {
            expect($('.profile-link').length).toBe(0);
        });
        
        it('changes link text on login', function() {
            model.set('loggedIn', true);
            expect($('#nav-login')).toContainText('Logout');
        });
    });
    
    describe('logged in users', function() {
        beforeEach(function() {
            model = SpecUtils.createUserWithProfiles();
            view = new MainHeaderView({model: model});
            view.render();
        });
        
        it('shows logout link', function() {
            expect($('#nav-login')).toContainText('Logout');
        });
        
        it('changes link text on logout', function() {
            model.set('loggedIn', false);
            expect($('#nav-login')).toContainText('Login');
        });
        
        it('shows profile links', function() {
            expect($('.profile-link').length).toBe(model.get('profiles').length);
            
            //check selected profile
            var selected = model.get('profiles').find(function(p) {
                return p.get('_id') === model.get('selectedPid');
            });
            expect($('.profile-link.primary')).toContainText(selected.get('name'));
        });
        
        it('switches profile', function() {
            $('.profile-link[data-pid="222"]').trigger('click');
            expect(model.get('selectedPid')).toBe(222);
        });
    });
});