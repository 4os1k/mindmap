(function() {
  "use strict";

  angular
    .module('visModule')
    .controller('visController', visController);

  visController.$inject = ["$scope", "visService"];

  function visController($scope, visService) {
    var visService = visService;
    var nodeColorChange = $scope.nodeColorChange;
    var nodeShapeChange = $scope.nodeShapeChange;
    var edgeColorChange = $scope.edgeColorChange;
    var edgeTypeChange = $scope.edgeTypeChange;
    var fontSizeChange = $scope.fontSizeChange;
    var fontColorChange = $scope.fontColorChange;
    var fontTypeChange = $scope.fontTypeChange;

    var nodes = null;
    var edges = null;
    var network;
    var container;

    var exportArea;
    var importButton;
    var exportButton;

    exportArea = document.getElementById('input_output');
    importButton = document.getElementById('import_button');
    exportButton = document.getElementById('export_button');
    container = document.getElementById('mynetwork');

    $scope.destroyNetwork = function() {
      network.destroy();
      console.log("destroyNetwork Ended");
    };

    function clearOutputArea() {
      exportArea.value = "";
      console.log("clearOutputArea Ended");
    };

    function addContextualInformation(elem, index, array) {
      addId(elem, index);
      addConnections(elem, index);
      console.log("addContextualInformation Ended");
    };

    function addId(elem, index) {
      elem.id = index;
      console.log("addId Ended");
    };

    function addConnections(elem, index) {
      // need to replace this with a tree of the network, then get child direct children of the element
      elem.connections = network.getConnectedNodes(index);
      console.log("addConnections Ended");
    };

    $scope.exportNetwork = function() {

      clearOutputArea();

      var nodes = objectToArray(network.getPositions());

      // console.log("----------Start------------");
      // console.log("Nodes:");
      // console.log("nodes", nodes);
      // console.log("----------------------");

      nodes.forEach(addContextualInformation);

      // console.log("----------Start------------");
      // console.log("Nodes with CntextualInfo:");
      // console.log("nodes", nodes);
      // console.log("----------------------");

      // pretty print node data
      var exportValue = JSON.stringify(nodes, undefined, 2);
      // console.log("----------Start------------");
      // console.log("exportValue:");
      // console.log("exportValue", exportValue);
      // console.log("----------------------");
      exportArea.value = exportValue;
      // console.log("----------Start------------");
      // console.log("exportArea.value:");
      // console.log("exportArea.value", exportArea.value);
      // console.log("----------------------");

      // var catchedOptions = network.getOptionsFromConfigurator();
      // console.log("----------Start------------");
      // console.log("catchedOptions:");
      // console.log("catchedOptions", catchedOptions);
      // console.log("----------------------");

      // var catchedOptionsArray = objectToArray(network.getOptionsFromConfigurator());
      // console.log("----------Start------------");
      // console.log("catchedOptionsArray:");
      // console.log("catchedOptionsArray", catchedOptionsArray);
      // console.log("----------------------");

      resizeExportArea();
    };

    $scope.importNetwork = function() {
      var inputValue = exportArea.value;
      var inputData = JSON.parse(inputValue);

      var data = {
        nodes: getNodeData(inputData),
        edges: getEdgeData(inputData)
      };

      network = new vis.Network(container, data, {});

      resizeExportArea();
    };

    function getNodeData(data) {
      var networkNodes = [];

      data.forEach(function(elem, index, array) {
        networkNodes.push({ id: elem.id, label: elem.id, x: elem.x, y: elem.y });
      });

      return new vis.DataSet(networkNodes);
    }

    function getEdgeData(data) {
      var networkEdges = [];

      data.forEach(function(node, index, array) {
        // add the connection
        node.connections.forEach(function(connId, cIndex, conns) {
          networkEdges.push({ from: node.id, to: connId });

          var elementConnections = array[connId].connections;

          // remove the connection from the other node to prevent duplicate connections
          var duplicateIndex = elementConnections.findIndex(function(connection) {
            connection === node.id;
          });

          elementConnections = elementConnections.splice(0, duplicateIndex - 1).concat(elementConnections.splice(duplicateIndex + 1, elementConnections.length))
        });
      });

      return new vis.DataSet(networkEdges);
    }

    function objectToArray(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    }

    function resizeExportArea() {
      exportArea.style.height = (1 + exportArea.scrollHeight) + "px";
    }




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
      { id: 1, label: 'Node 1', shape: 'box' },
      { id: 2, label: 'Node 2', shape: 'box' },
      { id: 3, label: 'Node 3', shape: 'box' },
      { id: 4, label: 'Node 4', shape: 'box' },
      { id: 5, label: 'Node 5', shape: 'box' }
    ]);

    var edges = new vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 4, to: 5 }
    ]);

    // var container = document.getElementById('mynetwork');

    var data = {
      nodes: nodes,
      edges: edges
    };
    // var options = {};
    var options = {
      // layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
      // locale: document.getElementById('locale').value,

      nodes: {
        font: {
          multi: true
        },
        shape: 'box',
        shadow: true
      },

      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: 'arrow'
          }
        },
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: 'none',
          roundness: 0.3
        }
      },





      physics: {
        enabled: false
      },
      manipulation: {
        addNode: function(data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Add Node";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          // document.getElementById('node-shape').value = data.shape;
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = clearPopUp.bind();
          document.getElementById('network-popUp').style.display = 'block';

        },
        editNode: function(data, callback) {
          // console.log(data, callback);
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Edit Node";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
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
        },
        editEdge: {
          editWithoutDrag: function(data, callback) {
            document.getElementById('edge-operation').innerHTML = "Edit Edge";
            editEdgeWithoutDrag(data, callback);
          }
        }
      }
    };

    function editEdgeWithoutDrag(data, callback) {
      // filling in the popup DOM elements
      document.getElementById('edge-label').value = data.label;
      // document.getElementById('edge-color').value = data.color;
      document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(this, data, callback);
      document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(this, callback);
      document.getElementById('edge-popUp').style.display = 'block';
    }

    function clearEdgePopUp() {
      document.getElementById('edge-saveButton').onclick = null;
      document.getElementById('edge-cancelButton').onclick = null;
      document.getElementById('edge-popUp').style.display = 'none';
    }

    function cancelEdgeEdit(callback) {
      clearEdgePopUp();
      callback(null);
    }

    function editEdgeType(data, edgeTypeChange) {
      var edgeTypeChange = $scope.edgeTypeChange;
      if (edgeTypeChange == "dashed") {
        return true;
      } else {
        return false;
      }
    };

    function saveEdgeData(data, callback) {
      if (typeof data.to === 'object')
        data.to = data.to.id
      if (typeof data.from === 'object')
        data.from = data.from.id
      data.label = document.getElementById('edge-label').value;
      data.color = $scope.edgeColorChange;
      data.dashes = editEdgeType(data, edgeTypeChange);
      clearEdgePopUp();
      callback(data);
    }

    var network = new vis.Network(container, data, options);


    // function destroy() {
    //   if (network !== null) {
    //     network.destroy();
    //     network = null;
    //   }
    // };

    // function draw() {
    //   destroy();
    // }

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
      data.shape = $scope.nodeShapeChange;
      data.shape = typeof data.shape === 'undefined' ? 'box' : data.shape;
      data.color = $scope.nodeColorChange;
      data.font = data.font ? data.font : {};
      data.font.size = $scope.fontSizeChange;
      data.font.color = $scope.fontColorChange;
      data.font.face = $scope.fontTypeChange;
      clearPopUp();
      callback(data);
    }
  };
})();
