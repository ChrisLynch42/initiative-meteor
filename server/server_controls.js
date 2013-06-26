Controls = new Meteor.Collection("controls");

Meteor.publish('controls', function () {
  return Controls.find();
});


Meteor.methods({
  updateControls: function (controlsId, startedValue) {
    console.log('updateControls controlsId='+ controlsId);
    var returnValue = ControlData.update({_id: controlsId},{started: startedValue});
    return returnValue;
  }
});
