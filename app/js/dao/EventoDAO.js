// factory
angular.module("catchaiApp.EventoDAO",['catchaiApp.EventoModel'])
.factory('EventoDAO', function($http,$q,ENV,EventoModel){ 
    return {
        obtenerConID: function(idevento){            
            console.info("EventoDAO: obtenerConID();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/obtenerEvento.php?idevento="+idevento;
            console.log(ruta);
            $http({
                method: 'GET',
                url: ruta,
                headers: {
                    //'x-access-token': token,
                    //'Content-Type': 'form-data',
                    //'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    //token:token
                },
            }).then(function enviarComplete(json) {
                console.info("EventoDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    var row = json.data.evento;
                    var model = new EventoModel(row.idEvento,row.idAdministrador,row.fecha,row.nombre,row.valid);
                    deferred.resolve({result:true,evento:model});
                } else {
                    console.error(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.info("EventoDAO.js: enviarError");
                console.error(data);
                /*
                console.log(status);
                console.log(headers);
                console.log(config);
                */
                deferred.reject({result:false,errores:"Hubo un error de conexión. Intenta más tarde"});
            });
            return deferred.promise;
        },
    };
});