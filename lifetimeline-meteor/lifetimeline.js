updateTimeline = function(data) {
  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');
    
  // Create a DataSet (allows two way data-binding)
  var items = data;

  // Configuration for the Timeline
  var options = {
    height: '300px',
    min: new Date(1850, 0, 1),             // lower limit of visible range
    max: new Date(2020, 0, 1),             // upper limit of visible range
    zoomMin: 1000 * 60 * 60 * 24 * 31 * 3, // about three months in milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 100  // about 100 years in milliseconds
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
};

fileToDataSet = function(file) {
   // TODO: actually read from the file
  return new vis.DataSet([
    {id: 1, content: 'Brittany', start: 'year=1999', end: 'year=2019'},
    {id: 2, content: 'George', start: '2018-11-01', end: '2018-11-02'},
    {id: 3, content: 'Henry', start: '2018-11-05', end: '2018-11-06'},
    {id: 4, content: 'Barbara', start: '2018-11-06', end: '2018-11-19'},
  ]);
};

if (Meteor.isClient) {
  Template.lifetimeline.helpers({});

  Template.lifetimeline.events({
    'change': function (event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        
        reader.onload = function(onLoadEvent) {
          var fileData = fileToDataSet(file);
          updateTimeline(fileData);
        };

        reader.readAsText(file);
      }
    }
  });

  Template.lifetimeline.onRendered(function () {});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}