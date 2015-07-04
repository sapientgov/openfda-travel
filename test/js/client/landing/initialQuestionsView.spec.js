var $ = require('jquery');
var InitialQuestionsView = require('../../../../src/js/client/views/landing/initialQuestionsView');

describe('Initial Questions View', function() {
    var qView;
    
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/js/client/fixtures';
        loadFixtures('initialQuestions.html');
        qView = new InitialQuestionsView();
        
        //mock tooltip jquery plugin
        $.fn.tooltip = function() {};
    });
    
    it('renders template', function() {
        qView.render();
        expect($('#primary-content')).toContainText('Initial Questions');
    });
});