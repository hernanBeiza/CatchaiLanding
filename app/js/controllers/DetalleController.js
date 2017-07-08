'use strict';

angular.module('catchaiApp.DetalleController', ['ngRoute'])

.controller('DetalleController', ['$scope', '$routeParams','GaleriaDAO','EventoDAO','$ngBootbox',

  function($scope, $routeParams, GaleriaDAO, EventoDAO, $ngBootbox){

	$scope.init = function(){
		console.log("DetalleController.js: init();");
	};

  }

]);