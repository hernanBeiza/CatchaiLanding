angular.module('catchaiApp.EventoModel', [])
.factory('EventoModel', ['$http', function($http) {  
    function EventoModel(idevento,idadministrador,fecha,nombre,valid) {
        //console.log("EventoModel: EventoModel();");
        //console.log(idevento,idadministrador,fecha,nombre,valid);
        this.idevento = idevento;
        this.idadministrador = idadministrador;
        this.fecha = fecha;
        this.nombre = nombre;
        this.valid = valid;
    };
    EventoModel.prototype = {
        setData: function(eventoData) {
            //console.log("EventoModel: setData();");
            angular.extend(this, eventoData);
        },
    };
    return EventoModel;
}]);