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

  Template.lifetimeline.helpers({
    // DOM element where the Timeline will be attached
    container: function () {
      return document.getElementById('visualization');
    },

    // Create a DataSet (allows two way data-binding)
    items: function () {
      return new vis.DataSet([
        {id: 1, content: 'item 1', start: '2014-04-20'},
        {id: 2, content: 'item 2', start: '2014-04-14'},
        {id: 3, content: 'item 3', start: '2014-04-18'},
        {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
        {id: 5, content: 'item 5', start: '2014-04-25'},
        {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
      ]);
    },

    // Configuration for the Timeline
    options: function () {
      return {};
    },

    // Create a Timeline
    timeline: function () {
      return new vis.Timeline(container, items, options);
    }   
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
