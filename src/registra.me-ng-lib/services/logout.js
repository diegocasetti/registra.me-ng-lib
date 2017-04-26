(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogout', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'user/logout';
            var requiredParameters = ['token'];
            var params = {};
            var unsetCookie = function() {
                $cookies.remove('registrame-api-token');
            };
            var call = function(success, error) {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.post(url, params).then(function(data) {
                        unsetCookie(data.token);
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
                params = {};
                return deferred.promise;
            };
            return {
                call: call
            };
        }
    ]);
})(angular);