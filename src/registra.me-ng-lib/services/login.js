(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogin', ['rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function(rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'user/login';
            var requiredParameters = ['secret', 'email', 'password'];
            var params = {};
            var setSecret = function(s) {
                params.secret = s;
            };
            var setEmail = function(e) {
                params.email = e;
            };
            var setPassword = function(p) {
                params.password = p;
            };
            var setTokenCookie = function(token) {
                $cookies.put('registrame-api-token', token);
            };
            var isLogged = function() {
                if ($cookies.get('registrame-api-token')) {
                    return true;
                } else {
                    return false;
                }
            };
            var call = function(success, error) {
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.post(url, params, function(data) {
                        setTokenCookie(data.token);
                        delete data.token;
                        success(data);
                    }, error);
                } else {
                    error({
                        status: 'error',
                        message: 'Parametros obligatorios faltantes.'
                    });
                }
                params = {};
            };
            return {
                setSecret: setSecret,
                setEmail: setEmail,
                setPassword: setPassword,
                isLogged: isLogged,
                call: call
            };
        }
    ]);
})(angular);