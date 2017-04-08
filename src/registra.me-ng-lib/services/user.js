(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeUser', ['rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function(rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'user';
            var requiredParameters = ['token'];
            var params = {};
            var call = function(success, error) {
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.get(url, params, success, error);
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
        }
    ]);
})(angular);