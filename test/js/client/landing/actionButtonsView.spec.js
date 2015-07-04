var $ = require('jquery');
var ActionButtonsView = require('../../../../src/js/client/views/landing/actionButtonsView');
var UserUtils = require('../../../../src/js/client/utils/userUtils');
var User = require('../../../../src/js/client/data/user');

describe('App Buttons', function() {
    var actionButtonsView;
    
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/js/client/fixtures';
        loadFixtures('actionButtons.html');
        actionButtonsView = ActionButtonsView.createInstance();
    });
    
    describe('renders buttons', function() {
        
        it('renders buttons for main page', function() {
            actionButtonsView.render({view: 'Q'});
            expect($('#action-btn-profile')).toBeVisible();
            expect($('#action-btn-label')).toBeHidden();
            expect($('#action-btn-recall')).toBeHidden();
            expect($('#action-btn-approved')).toBeHidden();
        });
        
        it('renders buttons for label page', function() {
            actionButtonsView.render({view: 'LABEL'});
            expect($('#action-btn-profile')).toBeVisible();
            expect($('#action-btn-label')).toBeHidden();
            expect($('#action-btn-recall')).toBeVisible();
            expect($('#action-btn-approved')).toBeVisible();
        });
        
        it('renders buttons for recall page', function() {
            actionButtonsView.render({view: 'RECALL'});
            expect($('#action-btn-profile')).toBeVisible();
            expect($('#action-btn-label')).toBeVisible();
            expect($('#action-btn-recall')).toBeHidden();
            expect($('#action-btn-approved')).toBeVisible();
        });
        
        it('renders buttons for approved page', function() {
            actionButtonsView.render({view: 'APPROVED'});
            expect($('#action-btn-profile')).toBeVisible();
            expect($('#action-btn-label')).toBeVisible();
            expect($('#action-btn-recall')).toBeVisible();
            expect($('#action-btn-approved')).toBeHidden();
        });
        
    });
    
    describe('renders profile text', function() {
        
        it('handles logged in users with profile', function() {
            spyOn(UserUtils, 'getCurrentUser').and.returnValue(new User({
                loggedIn: true,
                selectedPid: '12345'
            }));
            actionButtonsView.render({view: 'Q'});
            expect($('#action-btn-profile')).toContainText('Add an additional profile');
        });
        
        it('handles logged in users without profile', function() {
            spyOn(UserUtils, 'getCurrentUser').and.returnValue(new User({
                loggedIn: true,
                selectedPid: null
            }));
            actionButtonsView.render({view: 'Q'});
            expect($('#action-btn-profile')).toContainText('Personalize your results');
        });
        
         it('handles logged out users', function() {
            spyOn(UserUtils, 'getCurrentUser').and.returnValue(new User({
                loggedIn: false,
                selectedPid: null
            }));
            actionButtonsView.render({view: 'Q'});
            expect($('#action-btn-profile')).toContainText('Personalize your results');
        });
    });
});