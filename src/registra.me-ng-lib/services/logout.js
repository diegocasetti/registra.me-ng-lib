(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogout', ['rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function(rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'user/logout';
            var requiredParameters = ['token'];
            var params = {};
            var unsetCookie = function() {
                $cookies.remove('registrame-api-token');
            };
            var call = function(success, error) {
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.post(url, params, function(data) {
                        success(data);
                    }, error);
                } else {
                    error({
                        status: 'error',
                        message: 'Parametros obligatorios faltantes.'
                    });
                }
                unsetCookie();
                params = {};
            };
            return {
                call: call
            };
        }
    ]);
})(angular);