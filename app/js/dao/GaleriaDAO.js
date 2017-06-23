// factory
angular.module("catchaiApp.GaleriaDAO",['catchaiApp.ImagenModel'])
.factory('GaleriaDAO', function($http,$q,ENV,ImagenModel){ 
    return {
        obtenerConPagina: function(idevento,pagina){            
            console.info("GaleriaDAO: obtenerConPagina();");
            var deferred = $q.defer();
            var ruta = ENV.APIEndPoint+"/obtenerImagenes.php?idevento="+idevento+"&pagina="+pagina+"&valid=1";
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
                console.info("GaleriaDAO.js: enviarComplete");
                console.info(json.data);
                if(json.data.result){
                    var imagenes = [];
                    for(var i=0; i<json.data.imagenes.length; i++) {
                        var row = json.data.imagenes[i];
                        var model = new ImagenModel(row.idImagen,row.idEvento,row.descripcion,row.ruta,row.valid);
                        imagenes.push(model);
                    }
                    if(imagenes.length>0){
                        deferred.resolve({result:true,imagenes:imagenes,paginas:json.data.paginas});                            
                    } else {
                        deferred.reject({result:false,imagenes:null,errores:json.data.errores});
                    }
                } else {
                    console.error(json.data.errores);          
                    deferred.reject({result:false,errores:json.data.errores});
                }
            }, function enviarError(data){
                console.info("GaleriaDAO.js: enviarError");
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
        obtenerConID: function(token,idimagen){
            console.log("GaleriaDAO: obtenerConID();");
        },
    };
});