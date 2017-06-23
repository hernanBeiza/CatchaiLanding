angular.module('catchaiApp.ImagenModel', [])
.factory('ImagenModel', ['$http', function($http) {  
    function ImagenModel(idimagen,idevento,descripcion,ruta,valid) {
        //console.log("ImagenModel: ImagenModel();");
        console.log(idimagen,idevento,descripcion,ruta,valid);
        this.idevento = idimagen;
        this.idevento = idevento;
        this.descripcion = descripcion;
        this.ruta = ruta;
        this.valid = valid;
    };
    ImagenModel.prototype = {
        setData: function(clienteData) {
            //console.log("ClienteModel: setData();");
            angular.extend(this, clienteData);
        },
        setRuta: function(ruta) {
            this.ruta = ruta;
        },
        getRuta: function(){
            return this.ruta;
        },
    };
    return ImagenModel;
}]);