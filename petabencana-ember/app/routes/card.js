import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return {
      card_id: params.card_id,
      card_number: params.card_number,
      next_card: parseInt(params.card_number)+1, 
      text: "This is card " + params.card_id,
    };
  }
});
