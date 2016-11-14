(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeAudioCall', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/obtener/llamada/audio';
        var requiredParameters = ['token', 'central_telefonica_id'];
        var requiredParametersToFileUrl = ['token', 'central_telefonica_id', 'llamada_audio_id'];
        var urlToFile = 'api.registra.me/api-v1/client/descargar/llamada/audio';
        var protocol = 'https://';
        var params = {};
        var setToken = function(token) {
            params['token'] = token;
        };
        var setCentralTelefonicaID = function(centralTelefonicaID) {
            params['central_telefonica_id'] = centralTelefonicaID;
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
        var setLlamadaAudioID = function(llamadaAudioID) {
            params['llamada_audio_id'] = llamadaAudioID;
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
        };
        var getUrlToFile = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParametersToFileUrl, params)) {
                rgmeRequest.buildUrl(protocol + urlToFile, params, success);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            delete params['llamada_audio_id'];
        };
        return {
            call: call,
            setCentralTelefonicaID: setCentralTelefonicaID,
            setFechaInicio: setFechaInicio,
            setFechaFin: setFechaFin,
            setOrder: setOrder,
            setPage: setPage,
            setLlamadaAudioID: setLlamadaAudioID,
            setInsecureProtocol: setInsecureProtocol,
            getUrlToFile: getUrlToFile
        };
    }]);
})(angular);