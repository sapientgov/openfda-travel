var $ = require('jquery');
var IntroductionContentView = require('../../../../src/js/client/views/landing/introductionContentView');

describe('Intro Content View', function() {
    var view;
    
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/js/client/fixtures';
        loadFixtures('introContent.html');
        view = new IntroductionContentView();
    });
    
    it('renders template', function() {
        view.render();
        expect($('#full-width-container')).toContainText('Intro Content');
    });
});