(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogin', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
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
            var call = function() {
                var deferred = $q.defer();
                if (isLogged()) {
                    deferred.resolve({
                        status: 'ok'
                    });
                } else {
                    if (rgmeUtils.checkParams(requiredParameters, params)) {
                        rgmeRequest.post(url, params).then(function(data) {
                            setTokenCookie(data.token);
                            delete data.token;
                            deferred.resolve(data);
                        }, function(err) {
                            deferred.reject(err);
                        });
                    } else {
                        deferred.reject({
                            status: 'error',
                            message: 'Parametros obligatorios faltantes.'
                        });
                    }
                }
                params = {};
                return deferred.promise;
            };
            var setSessionErrorFunction = function(f){
                var deferred = $q.defer();
                rgmeRequest.setSessionErrorFunction(f);
                deferred.resolve();
                return deferred.promise;
            }
            return {
                setSecret: setSecret,
                setEmail: setEmail,
                setPassword: setPassword,
                isLogged: isLogged,
                call: call,
                setSessionErrorFunction: setSessionErrorFunction
            };
        }
    ]);
})(angular);