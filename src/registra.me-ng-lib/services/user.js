(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeUser', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/user';
        var requiredParameters = ['token'];
        var protocol = 'https://';
        var params = {};
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
            call: call
        };
    }]);
})(angular);