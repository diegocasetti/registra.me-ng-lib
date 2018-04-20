(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeAnexo', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
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
            var getAnexos = function() {
                var deferred = $q.defer();
                var url = 'obtener/anexo';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            return {
                getAnexos: getAnexos,
                setCentralTelefonicaID: setCentralTelefonicaID
            };
        }
    ]);
})(angular);