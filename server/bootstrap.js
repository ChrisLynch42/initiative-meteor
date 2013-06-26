Meteor.startup(function () {
  var returnValue = Controls.find({});
    console.log(returnValue.count());
    if(returnValue.count() > 0) {
    } else {
      Controls.insert({started: 0});
    }
});



