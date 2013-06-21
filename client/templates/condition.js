
Template.condition.idValid = function() {
  var returnValue = false;
  if(typeof this._id != 'undefined') {
    returnValue = true;
  }
  return returnValue;
};

Template.condition.emptyCondition = function() {
  var idDate = new Date();
  return { conditionId: idDate.getMilliseconds() , duration: 0, name: 'empty', effect: 'none'};
};

Template.condition.needsWork = function() {
  return this.duration < 1
};


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
     var nameValue = conditionObject.find('.conditionName').val().trim();
     var durationValue = conditionObject.find('.duration').val().trim();
     var effectValue = conditionObject.find('.effect').val().trim();
     var conditionId = conditionObject.find('.conditionId').val();
     var characterId = characterSet.find('.characterId').val();
     if ( characterId ) {
       var params=[characterId,conditionId,nameValue,durationValue,effectValue];
       Meteor.apply('updateCondition',params);
     }
     conditionObject.removeClass('editing');
  },

  'click #removeCondition': function(event) {
     var theButton = $(event.currentTarget);
     var conditionObject = theButton.parents('.condition');
     var characterSet = theButton.parents('.characterSet');
     var conditionId = conditionObject.find('.conditionId').val();
     var characterId = characterSet.find('.characterId').val();
     if ( characterId ) {
       var params=[characterId,conditionId];
       Meteor.apply('removeCondition',params);
     }
  },
  
  'click #returnCondition': function(event) {
     var theButton = $(event.currentTarget);
     var conditionObject = theButton.parents('.condition');
     conditionObject.removeClass('editing');
  },
};

