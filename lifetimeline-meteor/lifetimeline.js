updateTimeline = function(data) {
  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');
    
  // Create a DataSet (allows two way data-binding)
  var items = data;

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
};

fileToDataSet = function(file) {
  var dataSet = new Array();
  var lines = file.split('\n');
  var lineIdx = 0
  var line = lines[lineIdx];
  while (lineIdx < lines.length) {
    
    if(line[0] != "0" || !line.includes("INDI")) {
      lineIdx++;
      line = lines[lineIdx];
      continue;
    }
    
    var id = lineIdx;
    var name = null;
    var birth = null;
    var death = null
    lineIdx++;
    line = lines[lineIdx];
    // keep going until end of file or next INDI record
    while (lineIdx < lines.length && line[0] != "0") {
      if (line.includes("1 NAME")) {
        name = line.substring(7);
      }
      else if (line.includes("1 BIRT")) {
        lineIdx++;
        line = lines[lineIdx];
        birth = new Date(line.substring(7));
      }
      else if (line.includes("1 DEAT")) {
        lineIdx++;
        line = lines[lineIdx];
        death = new Date(line.substring(7));
      }
      lineIdx++;
      line = lines[lineIdx];
    }

    if (birth != null && death != null) {
      var data = {
        id: id,
        content: name,
        start: birth.toISOString(),
        end: death.toISOString()
      };
      dataSet.push(data);
    }
  }
  return new vis.DataSet(dataSet);
};

if (Meteor.isClient) {
  Template.lifetimeline.helpers({});

  Template.lifetimeline.events({
    'change': function (event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        
        reader.onload = function() {
          var fileData = fileToDataSet(this.result);
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