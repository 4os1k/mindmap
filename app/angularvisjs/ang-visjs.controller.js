(function() {
  "use strict";

  angular
    .module('visModule')
    .controller('visController', visController);

  visController.$inject = ["$scope", "visService"];

  function visController($scope, visService) {
    var visService = visService;

    var nodes = null;
    var edges = null;
    var network = null;

    // var addNode = function() {};
    // var deleteNode = function() {};
    // $scope.editeNode = function() {

    //   var options = {
    //     // nodes: {
    //     //   font: '12px arial red',
    //     //   shadow: true,
    //     //   shape: 'ellipse'
    //     // }
    //   };
    //   network.setOptions(options);
    //   console.log("Shape changed");
    // };

    // $scope.changeShape = function() {

    //   var nodes = new vis.DataSet([
    //     {id: 1, label: 'NodeChanged', shape: 'star'}
    //     ]);
    //   console.log('nodes generated');
    //   return nodes;
    //   };
     

    // var addEdge = function() {};
    // var deleteEdge = function() {};
    // var editeEdge = function() {};


    var nodes = new vis.DataSet([
      { id: 1, label: 'Node 1', shape: 'triangle' },
      { id: 2, label: 'Node 2', shape: '' },
      { id: 3, label: 'Node 3', shape: '' },
      { id: 4, label: 'Node 4', shape: '' },
      { id: 5, label: 'Node 5', shape: '' }
    ]);

    var edges = new vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 4, to: 5 }
    ]);

    var container = document.getElementById('mynetwork');

    var data = {
      nodes: nodes,
      edges: edges
    };
    // var options = {};
    var options = {
      // layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
      // locale: document.getElementById('locale').value,
      manipulation: {
        addNode: function(data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Add Node";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          // document.getElementById('node-shape').value = data.shape;
          data.shape = document.getElementById('node-shape').value;
          // document.getElementById('node-color').value = data.color;
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('saveButton').onclick = network.setOptions(options);
          document.getElementById('cancelButton').onclick = clearPopUp.bind();
          document.getElementById('network-popUp').style.display = 'block';
        },
        editNode: function(data, callback) {
          console.log(data, callback);
          data.shape = "ellipse";
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Edit Node";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          // document.getElementById('node-shape').value = data.shape;
          // document.getElementById('node-color').value = data.color.highlight;
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = cancelEdit.bind(this, callback);
          document.getElementById('network-popUp').style.display = 'block';

        },
        addEdge: function(data, callback) {
          if (data.from == data.to) {
            var r = confirm("Do you want to connect the node to itself?");
            if (r == true) {
              callback(data);
            }
          } else {
            callback(data);
          }
        }
      }
    };
    var network = new vis.Network(container, data, options);


    function destroy() {
      if (network !== null) {
        network.destroy();
        network = null;
      }
    };

    function draw() {

      destroy();
    }

    function clearPopUp() {
      document.getElementById('saveButton').onclick = null;
      document.getElementById('cancelButton').onclick = null;
      document.getElementById('network-popUp').style.display = 'none';
    }

    function cancelEdit(callback) {
      clearPopUp();
      callback(null);
    }

    function saveData(data, callback) {
      data.id = document.getElementById('node-id').value;
      data.label = document.getElementById('node-label').value;
      clearPopUp();
      callback(data);
    }
  };
})();
