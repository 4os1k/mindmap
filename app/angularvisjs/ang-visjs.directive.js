(function() {
  "use strict";

  angular
    .module('visModule')
    .directive('visDirective', visDirective)

  visDirective.$inject = [];

  function visDirective() {
    // StartDirective
    
    var directive = {
      templateUrl: 'angularvisjs/canvas.html',
      controller: 'visController',
      say: saySmth()
    };
    // FinishDirective
    return directive;

    function saySmth() {
      console.log("Directive In Town");
    }
  };
}());
