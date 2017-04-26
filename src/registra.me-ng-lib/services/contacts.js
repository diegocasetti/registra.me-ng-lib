(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeContact', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var params = {};
            var setCentralTelefonicaID = function(centralTelefonicaID) {
                params['central_telefonica_id'] = centralTelefonicaID;
            };
            var setContactoID = function(contactoID) {
                params['contacto_id'] = contactoID;
            };
            var setNombre = function(nombre) {
                params['nombre'] = nombre;
            };
            var setComentario = function(comentario) {
                params['comentario'] = comentario;
            };
            var addPhone = function(numero, tipoTelefonoID) {
                if (typeof params['telefonos'] == "undefined") {
                    params['telefonos'] = new Array();
                }
                params['telefonos'].push({
                    'numero_telefono': numero,
                    'tipo_telefono_id': tipoTelefonoID
                });
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
            var getContact = function() {
                var deferred = $q.defer();
                var url = 'contacto/obtener';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var createContact = function() {
                var deferred = $q.defer();
                var url = 'contacto/crear';
                var requiredParameters = ['token', 'central_telefonica_id', 'nombre', 'comentario', 'telefonos'];
                callPost(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            var getPhoneTypes = function() {
                var deferred = $q.defer();
                var url = 'tipos/telefono/obtener';
                var requiredParameters = ['token', 'central_telefonica_id'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            return {
                setCentralTelefonicaID: setCentralTelefonicaID,
                setContactoID: setContactoID,
                setNombre: setNombre,
                setComentario: setComentario,
                addPhone: addPhone,
                getContact: getContact,
                createContact: createContact,
                getPhoneTypes: getPhoneTypes
            };
        }
    ]);
})(angular);