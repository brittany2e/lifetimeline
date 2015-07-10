if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      var count = Session.get('counter') + 1;
      Session.set('counter', count);

      if (count === 20)
      {
        alert("Calm down... Everything will be okay.");
      }
      else if (count === 30)
      {
        alert("Go ahead and keep clicking if it makes you feel better.");
      }
    }
  });

  Template.lifetimeline.onRendered(function () {
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');
    
    // Create a DataSet (allows two way data-binding)
    var items = initData();

    // Configuration for the Timeline
    var options = {
      height: '300px',
      min: new Date(1880, 0, 1),             // lower limit of visible range
      max: new Date(2015, 0, 1),             // upper limit of visible range
      zoomMin: 1000 * 60 * 60 * 24 * 31 * 3, // about three months in milliseconds
      zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 100  // about 100 years in milliseconds
    };


    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

initData = function() {
  var items = new vis.DataSet([
      {id: 1, content: 'John B. Oswald', start: 'year=1864', end: 'year=1932'},
      {id: 2, content: 'item 2', start: '2014-04-14', end: '2014-04-19'},
      {id: 3, content: 'item 3', start: '2014-04-18', end: '2014-04-19'},
      {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
      {id: 5, content: 'item 5', start: '2014-04-25', end: '2014-04-19'},
      {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
    ]);
  return items;
};


