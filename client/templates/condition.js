
Template.condition.idValid = function() {
  var returnValue = false;
  if(typeof this._id != 'undefined') {
    returnValue = true;
  }
  return returnValue;
};

Template.condition.emptyCondition = {duration: 0, name: 'empty', effect: 'none'};


Template.condition.events = {
  'click .conditionClick': function(event) {
     var theTarget = $(event.currentTarget);
     var theObject = theTarget.parents('.condition');
     theObject.addClass('editing');
     theTarget.find('input').focus();
  },

  'click #updateCondition': function(event) {
     var theButton = $(event.currentTarget);
     var conditionObject = theButton.parents('.condition');
     var characterSet = theButton.parents('.characterSet');
     alert(characterSet);
     var value = conditionObject.find('.conditionName').val().trim();
     var durationValue = conditionObject.find('.duration').val().trim();
     var effectValue = conditionObject.find('.effect').val().trim();
     var characterId = characterSet.find('.characterId').val();
     if ( characterId ) {
       alert(characterId);
       Characters.update({_id: characterId},{$addToSet: { conditions: {name: value, duration: durationValue, effect: effectValue }}});
     }
     conditionObject.removeClass('editing');
  },

  'click #removeCondition': function(event) {
//     Characters.remove(this._id);
  },
  
  'click #returnCondition': function(event) {
     var theButton = $(event.currentTarget);
     var conditionObject = theButton.parents('.condition');
     conditionObject.removeClass('editing');
  },
};

