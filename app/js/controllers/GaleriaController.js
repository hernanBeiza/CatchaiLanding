'use strict';

angular.module('catchaiApp.GaleriaController', ['ngRoute'])

.controller('GaleriaController', ['$scope', '$routeParams','GaleriaDAO','EventoDAO','$ngBootbox',

  function($scope, $routeParams, GaleriaDAO, EventoDAO, $ngBootbox){

	$scope.init = function(){
		console.log("GaleriaController.js: init();");
		var idevento = $routeParams.idevento;
		console.log(idevento);
		$scope.model.mensaje = null;
		if(idevento){
			$scope.obtenerDetalle(idevento);	
		} else {
	        $ngBootbox.alert("¿Te equivocaste de dirección?").then(function() { });
		}
	};

	$scope.obtenerDetalle = function(idevento){
		console.log("GaleriaController: obtenerDetalle();",idevento);
		$scope.model.cargando = true;
	  	EventoDAO.obtenerConID(idevento).then(function(data){
	  		console.log(data);
			$scope.model.cargando = false;

	  		if(data.result){
	  			$scope.model.evento = data.evento;
	  			$scope.cargarGIFS(1);
	  		} else {
		        $ngBootbox.alert(data.errores).then(function() { });
	  		}
	  	},function(data){
	  		console.error(data);
			$scope.model.cargando = false;
			$scope.model.errores = "El evento que buscabas ya no existe";
	  	});

	}


	$scope.cargarGIFS = function(pagina){
		$scope.model.cargando = true;		
		$scope.model.pagina = pagina;
	  	GaleriaDAO.obtenerConPagina($scope.model.evento.idevento,$scope.model.pagina).then(function(data){
	  		//console.log(data);	  		
			$scope.model.cargando = false;
	  		if(data.result){
	  			$scope.model.imagenes = data.imagenes;
	  			$scope.model.paginas = data.paginas;
	  		} else {
		        $ngBootbox.alert(data.errores).then(function() { });
	  		}
	  	},function(data){
	  		console.error(data);
			$scope.model.cargando = false;
			$scope.model.errores = "Aún no hay gifs de este evento. Vuelve pronto =)";
	  	});
	}

	$scope.abrirDetalle = function(gif){
		console.log(gif);
		$scope.model.gif = gif;

		var options = {
		        templateUrl: 'views/detalleView.html',
		        scope: $scope,
		        title: '¡Catcha este gif!',
	            /*
		        buttons: {
		            warning: {
		                label: "Cerrar",
		                className: "btn-default",
		                callback: function() { 

		                }
		            },
		            success: {
		                label: "Ok",
		                className: "btn-success",
		                callback: function() {

		                }
		            }
		        }
	            */
		    };
		
		$ngBootbox.customDialog(options);
	}

  }

]);