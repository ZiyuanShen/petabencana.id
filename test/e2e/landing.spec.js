
describe('Landing page', function() {
//  var delay = function() {
//    browser.sleep(process.env.TEST_DELAY || 2000); 
//  }; 

  beforeEach((done) => {
    var baseUrl = process.env.TESTING_URL || 'http://localhost:9000';
    browser.loadAndWaitForAureliaPage(baseUrl +'/').then(() => {
      done();
      return;
    });
    browser.delay(); 
  });
  
  it('expect title to be correct', () => {
    expect(browser.getTitle()).toBe('PetaBencana.id'); 
  });

  it('expect city choosing popup', () => {
    browser.delay(); 
    let finder = element(by.id('cityPopup')); 
    finder.getText().then((text) => {
      expect(text).toContain("Select city"); 
      element(by.id('jakarta')).click();
      browser.delay(); 
      let url = browser.getCurrentUrl(); 
      expect(url).toContain("map/jakarta"); 

      //expect that the flood-gauges layer is being rendered- specific to Jakarta. 
      expect(element(by.css('.leaflet-gauges-pane')).isPresent()).toBe(true); 
    }); 
  }); 
});

