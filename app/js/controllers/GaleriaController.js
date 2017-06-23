'use strict';

angular.module('catchaiApp.GaleriaController', ['ngRoute'])

.controller('GaleriaController', ['$scope', '$routeParams','GaleriaDAO','$ngBootbox',

  function($scope, $routeParams, GaleriaDAO, $ngBootbox){

	$scope.init = function(){
		console.log("GaleriaController.js: init();");

		$scope.cargar(1);
	};

	$scope.cargar = function(pagina){
		$scope.model.cargando = true;		
		$scope.model.pagina = pagina;

	  	GaleriaDAO.obtenerConPagina($scope.model.idevento,$scope.model.pagina).then(function(data){
	  		console.log(data);
			$scope.model.cargando = false;

	  		if(data.result){
	  			$scope.model.imagenes = data.imagenes;

	  		} else {
		        $ngBootbox.alert(data.errores).then(function() { });
	  		}
	  	},function(data){
	  		console.error(data);
			$scope.model.cargando = false;
	  	});


	}

  }

]);