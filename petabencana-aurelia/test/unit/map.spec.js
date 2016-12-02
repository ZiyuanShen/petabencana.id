import {Mapp} from '../../src/routes/map/map';
import {Container} from 'aurelia-dependency-injection';  
import {BehaviorInstance} from 'aurelia-templating';


describe('Map tests', () => {
  var map; 

  beforeEach( () => {
    new Container().makeGlobal();
    expect(Mapp).toBeDefined(); 
    map = BehaviorInstance.createForUnitTest(Mapp);
    expect(map).toBeDefined(); 
  }); 

  it('Jakarta is a city in the map', () => {
    expect(map.city_regions.includes('jakarta')).toBe(true); 
  }); 

  it('changing cities works', () => {
    map.changeCity('surubaya'); 
    expect(browser().window().href()).toContain('surubaya'); 
  }); 
});
