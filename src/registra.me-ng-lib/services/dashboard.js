(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeDashboard', ['rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL', '$q',
        function(rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL, $q) {
            var baseUrl = regmeApiBaseURL + 'dashboard';
            var params = {};
            var setCentralTelefonicaID = function(centralTelefonicaID) {
                params['central_telefonica_id'] = centralTelefonicaID;
            };
            var call = function(urlMethod, requiredParameters, success, error) {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.get(baseUrl + urlMethod, params).then(function(data) {
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
            var getBytes = function(success, error) {
                var deferred = $q.defer();
                var url = '/peso/audios';
                var requiredParameters = ['token'];
                call(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var getCallsByAnexo = function() {
                var deferred = $q.defer();
                var url = '/llamadas/por/anexo';
                var requiredParameters = ['token'];
                call(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var getCallsByDay = function() {
                var deferred = $q.defer();
                var url = '/llamadas/por/dia';
                var requiredParameters = ['token'];
                call(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var getCallsByGroupDay = function() {
                var deferred = $q.defer();
                var url = '/llamadas/por/grupo/dia';
                var requiredParameters = ['token'];
                call(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            return {
                getBytes: getBytes,
                getCallsByAnexo: getCallsByAnexo,
                getCallsByDay: getCallsByDay,
                getCallsByGroupDay: getCallsByGroupDay,
                setCentralTelefonicaID: setCentralTelefonicaID
            };
        }
    ]);
})(angular);