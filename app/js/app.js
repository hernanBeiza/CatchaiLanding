'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('catchaiApp', [
	'ngRoute',
	'constantes',
  'catchaiApp.ImagenModel','catchaiApp.EventoModel',
  'catchaiApp.GaleriaController','catchaiApp.DetalleController',
  'catchaiApp.GaleriaDAO','catchaiApp.EventoDAO',
	'ngBootbox','ui.bootstrap'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');

  $routeProvider.
  when('/index/:idevento', {
    templateUrl: 'views/galeriaView.html',
    //controller: 'IndexController'
  }).
  otherwise({redirectTo: '/index/1'});

}]).run(function($rootScope,ENV){

  console.log("app.js: run");
  console.log(ENV);

  $rootScope.model = {}
  //Ver como obtener el idevento
  $rootScope.model.idevento = 1;

});