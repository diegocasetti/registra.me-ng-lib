(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeOperator', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var params = {};
            var setCentralTelefonicaID = function(centralTelefonicaID) {
                params['central_telefonica_id'] = centralTelefonicaID;
            };
            var setOperatorID = function(operadorID) {
                params['operador_telefonico_id'] = operadorID;
            };
            var setNombre = function(nombre) {
                params['nombre'] = nombre;
            };
            var setRut = function(rut) {
                params['rut'] = rut;
            };
            var setEmail = function(email) {
                params['email'] = email;
            };
            var setTelefono = function(telefono) {
                params['telefono'] = telefono;
            };
            var addAttachOperator = function(estacionID, operadorID) {
                if (typeof params['asignaciones'] == "undefined") {
                    params['asignaciones'] = new Array();
                }
                params['asignaciones'].push({
                    'estacion_operador_telefonico_id': estacionID,
                    'operador_telefonico_id': operadorID
                });
            };
            var callGet = function(urlMethod, requiredParameters, success, error) {
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
            var callPost = function(urlMethod, requiredParameters) {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if (rgmeUtils.checkParams(requiredParameters, params)) {
                    rgmeRequest.post(regmeApiBaseURL + urlMethod, params).then(function(data) {
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
            var getOperators = function(success, error) {
                var deferred = $q.defer();
                var url = 'operador/telefonico/obtener';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var attachOperator = function(success, error) {
                var deferred = $q.defer();
                var url = 'estacion/operador/telefonico/asignar';
                var requiredParameters = ['token', 'central_telefonica_id', 'asignaciones'];
                callPost(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });;
                return deferred.promise;
            };
            var createOperator = function() {
                var deferred = $q.defer();
                var url = 'operador/telefonico/crear';
                var requiredParameters = ['token', 'central_telefonica_id', 'nombre', 'rut'];
                callPost(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            return {
                getOperators: getOperators,
                setOperatorID: setOperatorID,
                setNombre: setNombre,
                setRut: setRut,
                setEmail: setEmail,
                setTelefono: setTelefono,
                addAttachOperator: addAttachOperator,
                setCentralTelefonicaID: setCentralTelefonicaID,
                attachOperator: attachOperator,
                createOperator: createOperator
            };
        }
    ]);
})(angular);