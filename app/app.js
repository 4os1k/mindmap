(function() {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('app', [
      'visModule',
      'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $stateProvider

        .state('view1', {
        url: "/view1",
        templateUrl: "view1/view1.html",
        controller: "AppController"
      })

      .state('view2', {
        url: "/view2",
        templateUrl: "view2/view2.html",
        controller: "AppController"
      })

      .state('canvas', {
        url: "/mindmap",
        templateUrl: "angularvisjs/canvas.html",
        controller: "visController"
      });

      $urlRouterProvider.otherwise("/");

    }]);
}());
