(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeRequest', ['$q', '$http', '$httpParamSerializerJQLike', '$cookies', function($q, $http, $httpParamSerializerJQLike, $cookies) {
        var sessionErrorFunct = null;
        var post = function(url, params) {
            var deferred = $q.defer();
            if (sessionErrorFunct != null) {
                var config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                };
                var request = $http.post(encodeURI(url), $httpParamSerializerJQLike(params), config).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, header, config) {
                    validateSessionError(data);
                    deferred.reject(data);
                });
            } else {
                deferred.reject({
                    status: 'error',
                    message: 'Función de error de sesiones no definida.'
                });
            }
            return deferred.promise;
        };
        var get = function(url, params) {
            var deferred = $q.defer();
            if (sessionErrorFunct != null) {
                var request = $http.get(encodeURI(url + '?' + $httpParamSerializerJQLike(params))).success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, header, config) {
                    validateSessionError(data);
                    deferred.reject(data);
                });
            } else {
                deferred.reject({
                    status: 'error',
                    message: 'Función de error de sesiones no definida.'
                });
            }
            return deferred.promise;
        };
        var buildUrl = function(url, params) {
            var deferred = $q.defer();
            deferred.resolve({
                status: 'ok',
                url: encodeURI(url + '?' + $httpParamSerializerJQLike(params))
            });
            return deferred.promise;
        };
        var setSessionErrorFunction = function(f) {
            var deferred = $q.defer();
            sessionErrorFunct = f;
            deferred.resolve();
            return deferred.promise;
        };
        var validateSessionError = function(data) {
            if (angular.isDefined(data.type)) {
                if (data.type == 'session') {
                    if (sessionErrorFunct != null) {
                        sessionErrorFunct();
                    }
                    $cookies.remove('registrame-api-token');
                }
            }
        }
        return {
            post: post,
            get: get,
            buildUrl: buildUrl,
            setSessionErrorFunction: setSessionErrorFunction
        };
    }]);
})(angular);