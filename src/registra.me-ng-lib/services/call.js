(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeCall', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/obtener/llamada';
        var requiredParameters = ['token', 'central_telefonica_id'];
        var protocol = 'https://';
        var params = {};
        var setCentralTelefonicaID = function(centralTelefonicaID) {
            params['central_telefonica_id'] = centralTelefonicaID;
        };
        var setTelefono = function(telefono) {
            params['telefono'] = telefono;
        };
        var setFechaInicio = function(fechaInicio) {
            params['fecha_inicio'] = fechaInicio;
        };
        var setFechaFin = function(fechaFin) {
            params['fecha_fin'] = fechaFin;
        };
        var setOrder = function(order) {
            params['order'] = order;
        };
        var setPage = function(page) {
            params['page'] = page;
        };
        var setLlamadaID = function(llamadaID) {
            params['llamada_id'] = llamadaID;
        };
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var call = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.get(protocol + url, params, success, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        return {
            call: call,
            setCentralTelefonicaID: setCentralTelefonicaID,
            setTelefono: setTelefono,
            setFechaInicio: setFechaInicio,
            setFechaFin: setFechaFin,
            setOrder: setOrder,
            setPage: setPage,
            setLlamadaID: setLlamadaID,
            setInsecureProtocol: setInsecureProtocol
        };
    }]);
})(angular);