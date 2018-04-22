(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeAudioCall', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'obtener/llamada/audio';
            var requiredParameters = ['token', 'central_telefonica_id'];
            var requiredParametersToFileUrl = ['token', 'central_telefonica_id', 'llamada_audio_id'];
            var urlToFile = regmeApiBaseURL + 'descargar/llamada/audio';
            var requiredParametersLastAudioCall = ['token', 'central_telefonica_id'];
            var urlLastAudioCall = regmeApiBaseURL + 'obtener/llamada/audio/ultima';
            var params = {};
            var setToken = function(token) {
                params['token'] = token;
            };
            var setCentralTelefonicaID = function(centralTelefonicaID) {
                params['central_telefonica_id'] = centralTelefonicaID;
            };
            var setFechaInicio = function(fechaInicio) {
                params['fecha_inicio'] = fechaInicio;
            };
            var setFechaFin = function(fechaFin) {
                params['fecha_fin'] = fechaFin;
            };
            var setOrder = function(order) {
                params['order'] = order;
            };
            var setPage = function(page) {
                params['page'] = page;
            };
            var setLlamadaAudioID = function(llamadaAudioID) {
                params['llamada_audio_id'] = llamadaAudioID;
            };
            var call = function() {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.get(url, params).then(function(data) {
                        deferred.resolve(data);
                    }, function(err) {
                        deferred.reject(err);
                    });
                } else {
                    error({
                        status: 'error',
                        message: 'Parametros obligatorios faltantes.'
                    });
                }
                return deferred.promise;
            };
            var getUrlToFile = function() {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParametersToFileUrl, params)) {
                    rgmeRequest.buildUrl(urlToFile, params).then(function(data) {
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
                delete params['llamada_audio_id'];
                return deferred.promise;
            };
            var getLastAudioCall = function() {
              var deferred = $q.defer();
              params['token'] = $cookies.get('registrame-api-token');
              if (rgmeUtils.checkParams(requiredParametersLastAudioCall, params)) {
                console.log(urlLastAudioCall);
                rgmeRequest.get(urlLastAudioCall, params).then(function(data) {
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
              return deferred.promise;
            };
            return {
                call: call,
                setCentralTelefonicaID: setCentralTelefonicaID,
                setFechaInicio: setFechaInicio,
                setFechaFin: setFechaFin,
                setOrder: setOrder,
                setPage: setPage,
                setLlamadaAudioID: setLlamadaAudioID,
                getUrlToFile: getUrlToFile,
                getLastAudioCall: getLastAudioCall
            };
        }
    ]);
})(angular);
