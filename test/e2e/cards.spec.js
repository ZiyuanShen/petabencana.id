describe('/cards/:id ', function() {

  beforeEach((done) => {
    var baseUrl = process.env.TESTING_URL || 'http://localhost:9000';
    browser.loadAndWaitForAureliaPage(baseUrl +'/cards/test123').then(() => {
      done();
      return;
    });
  });
  
  it('expect title to be correct', () => {
    browser.delay();
    expect(browser.getTitle()).toContain('Flood reports');
  });

  it('expect flood location card', () => {
    //first card should be flood location
    expect(browser.getCurrentUrl()).toContain('location');
    //let's click the previous button, nothing should happen!
    element(by.id('prv')).click();
    browser.delay();
    expect(browser.getCurrentUrl()).toContain('location');

    //now click the translate option
    element(by.id('id')).click();
    browser.delay();
    element(by.id('titleText')).getText().then((text)=> {
      expect(text).toBe('Pilih lokasi banjir');
    });
  });

  it('Click next through a whole stack of cards', () => {
    //okay, so this is a hack:
    //we've configured chrome to ask us if we want to
    //give our location everytime by using incognito mode
    //if we just move the map instead of clicking the chrome
    //notification, then we can click the next button and
    //appear to be in Jakarta/ default city.
    //we move the map by clicking the zoom in button:
    browser.delay();
    var map = element(by.className('leaflet-control-zoom-in'));
    map.click().then(() => {
      browser.delay();
      element(by.id('nxt')).click();
      //expects will wait for all previous acctions to finish before
      //resolving their promise, that's why we don't have to do
      //promise chaining here
      expect(browser.getCurrentUrl()).toContain('depth');

      element(by.id('nxt')).click();
      expect(browser.getCurrentUrl()).toContain('photo');

      element(by.id('nxt')).click();
      expect(browser.getCurrentUrl()).toContain('description');

      element(by.id('nxt')).click();
      expect(browser.getCurrentUrl()).toContain('review');
    });
  });

  //starts at location and then goes until the last name in arrayOfCardNames
  var traverseDeck = function(arrayOfCardNames, delay) {
    var expectCard = function(i){
      expect(browser.getCurrentUrl()).toContain(arrayOfCardNames[i]);
      element(by.id('nxt')).click();
    };

    browser.delay(); //wait a second for the map to adjust
    var map = element(by.className('leaflet-control-zoom-in'));
    map.click().then(() => {
      browser.delay(); //wait a second for the map to adjust
      var i;
      for ( i=0; i < arrayOfCardNames.length-1; i++ ) {
        expectCard(i);
        browser.delay();
      }
    });
  };

  var nextCard = function() {
    return element(by.id('nxt')).click();
  };

  it('Cannot submit a report without either a desc or photo', () => {
    traverseDeck(['location', 'depth', 'photo', 'description', 'review'], 1000);
    expect(element(by.id('nxt')).getAttribute('outerHTML')).toContain('disabled=""');
  });

  it('submit a report after writting desc', () => {
    traverseDeck(['location', 'depth', 'photo', 'description'], 1000);
    var textArea = element(by.id('textarea'));
    textArea.sendKeys('test description');
    nextCard();
    browser.sleep(3000);
  });
});

