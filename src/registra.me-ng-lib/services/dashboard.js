(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeDashboard', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var baseUrl = 'api.registra.me/api-v1/client/dashboard';
        var params = {};
        var protocol = 'https://';
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var setCentralTelefonicaID = function(centralTelefonicaID) {
            params['central_telefonica_id'] = centralTelefonicaID;
        };
        var call = function(urlMethod, requiredParameters, success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.get(protocol + baseUrl + urlMethod, params, success, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        var getBytes = function(success, error){
            var url = '/peso/audios';
            var requiredParameters = ['token'];
            call(url, requiredParameters, success, error);
        };
        var getCallsByAnexo = function(success, error){
            var url = '/llamadas/por/anexo';
            var requiredParameters = ['token'];
            call(url, requiredParameters, success, error);
        };
        var getCallsByDay = function(success, error){
            var url = '/llamadas/por/dia';
            var requiredParameters = ['token'];
            call(url, requiredParameters, success, error);
        };
        return {
            getBytes: getBytes,
            getCallsByAnexo: getCallsByAnexo,
            getCallsByDay: getCallsByDay,
            setCentralTelefonicaID: setCentralTelefonicaID,
            setInsecureProtocol: setInsecureProtocol
        };
    }]);
})(angular);