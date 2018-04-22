(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeCall', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var params = {};
            var setCentralTelefonicaID = function(centralTelefonicaID) {
                params['central_telefonica_id'] = centralTelefonicaID;
            };
            var setTelefono = function(telefono) {
                params['telefono'] = telefono;
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
            var setLlamadaID = function(llamadaID) {
                params['llamada_id'] = llamadaID;
            };
            var setAnexoID = function(anexoID) {
                params['anexo_id'] = anexoID;
            };
            var setTipoLlamadaID = function(tipoLlamadaID) {
                params['tipo_llamada_id'] = tipoLlamadaID;
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
            var getCalls = function() {
                var deferred = $q.defer();
                var url = 'obtener/llamada';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var getCallType = function() {
                var deferred = $q.defer();
                var url = 'obtener/llamada/tipo';
                var requiredParameters = ['token'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var downloadExcel = function() {
                var deferred = $q.defer();
                var url = 'reporte/mensual/excel';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var getLastCall = function() {
              var deferred = $q.defer();
              var url = 'obtener/llamada/ultima';
              var requiredParameters = ['token', 'central_telefonica_id'];
              callGet(url, requiredParameters).then(function(data) {
                deferred.resolve(data);
              }, function(err) {
                deferred.reject(err);
              });
              return deferred.promise;
            };
            return {
                getCalls: getCalls,
                downloadExcel: downloadExcel,
                getCallType: getCallType,
                setCentralTelefonicaID: setCentralTelefonicaID,
                setTelefono: setTelefono,
                setFechaInicio: setFechaInicio,
                setFechaFin: setFechaFin,
                setOrder: setOrder,
                setPage: setPage,
                setLlamadaID: setLlamadaID,
                setAnexoID: setAnexoID,
                setTipoLlamadaID: setTipoLlamadaID,
                getLastCall: getLastCall
            };
        }
    ]);
})(angular);
