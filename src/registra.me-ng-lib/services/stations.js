(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeStation', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var params = {};
            var setCentralTelefonicaID = function(centralTelefonicaID) {
                params['central_telefonica_id'] = centralTelefonicaID;
            };
            var callGet = function(urlMethod, requiredParameters) {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.get(regmeApiBaseURL + urlMethod, params).then(function(data) {
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
            var getStations = function() {
                var deferred = $q.defer();
                var url = 'estacion/operador/telefonico/obtener';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            return {
                getStations: getStations,
                setCentralTelefonicaID: setCentralTelefonicaID
            };
        }
    ]);
})(angular);