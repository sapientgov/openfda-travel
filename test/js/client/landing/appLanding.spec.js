var $ = require('jquery');
var AppLandingView = require('../../../../src/js/client/views/landing/appLandingView');
var DigitsLoginView = require('../../../../src/js/client/views/auth/digitsLoginView');

describe('App Landing', function() {
    var landingView;
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/js/client/fixtures';
        loadFixtures('appLanding.html');
        landingView = new AppLandingView();
    });
    
    describe('renders view', function() {
        
        beforeEach(function() {
            landingView.render();
        });
        
        it('renders template', function() {
            expect($('#full-width-container')).toContainText('App Landing');
        });
        
        it('initializes login view', function() {
            //make sure login view is initialized
            expect(landingView.loginView instanceof DigitsLoginView).toBe(true);
            //check that it is bound to correct element
            expect(landingView.loginView.el).toBe($('.diglogin')[0]);
        });
    });
});