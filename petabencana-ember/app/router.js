import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Ember.Router.map(function(){
  this.route('about', { path: '/about'});
  this.route('component/card-content', { path: '/report/:card_id'});
});

export default Router;
