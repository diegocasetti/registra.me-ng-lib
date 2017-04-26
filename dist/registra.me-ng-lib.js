(function(angular) {
    // Create all modules and define dependencies to make sure they exist
    // and are loaded in the correct order to satisfy dependency injection
    // before all nested files are concatenated by Gulp
    // Config
    angular.module('registra.meNgLib.config', []).value('registra.meNgLib.config', {
        debug: true
    });
    // Modules
    angular.module('registra.meNgLib.directives', []);
    angular.module('registra.meNgLib.filters', []);
    angular.module('registra.meNgLib.services', []).value('regmeApiBaseURL', 'https://api.registra.me/api-v1/client/');
    angular.module('registra.meNgLib', ['registra.meNgLib.config', 'registra.meNgLib.directives', 'registra.meNgLib.filters', 'registra.meNgLib.services', 'ngResource', 'ngCookies', 'ngSanitize']);
})(angular);
var scripts = document.getElementsByTagName("script")
var currentScriptPath = scripts[scripts.length - 1].src;
console.log(currentScriptPath.replace('options.js', 'options.html'));
(function(angular) {
    angular.
    module('registra.meNgLib.directives').config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://**'
        ]);
    }).controller('rgmeOptionsController', ['$scope', 'rgmeStation', function($scope, rgmeStation) {
        $scope.hola = 'HOLAHOLA!';
        console.log(rgmeStation);
    }]).directive('rgmeOptions', [
        function() {
            return {
                restrict: 'E',
                templateUrl: currentScriptPath.replace('options.js', 'options.html')
            };
        }
    ]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeAudioCall', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'obtener/llamada/audio';
            var requiredParameters = ['token', 'central_telefonica_id'];
            var requiredParametersToFileUrl = ['token', 'central_telefonica_id', 'llamada_audio_id'];
            var urlToFile = regmeApiBaseURL + 'descargar/llamada/audio';
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
            return {
                call: call,
                setCentralTelefonicaID: setCentralTelefonicaID,
                setFechaInicio: setFechaInicio,
                setFechaFin: setFechaFin,
                setOrder: setOrder,
                setPage: setPage,
                setLlamadaAudioID: setLlamadaAudioID,
                getUrlToFile: getUrlToFile
            };
        }
    ]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeCall', ['$q', 'rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL',
        function($q, rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL) {
            var url = regmeApiBaseURL + 'obtener/llamada';
            var requiredParameters = ['token', 'central_telefonica_id'];
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
                    deferred.reject({
                        status: 'error',
                        message: 'Parametros obligatorios faltantes.'
                    });
                }
                params = {};
                return deferred.promise;
            };
            return {
                call: call,
                setCentralTelefonicaID: setCentralTelefonicaID,
                setTelefono: setTelefono,
                setFechaInicio: setFechaInicio,
                setFechaFin: setFechaFin,
                setOrder: setOrder,
                setPage: setPage,
                setLlamadaID: setLlamadaID
            };
        }
    ]);
})(angular);
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
            return {
                getBytes: getBytes,
                getCallsByAnexo: getCallsByAnexo,
                getCallsByDay: getCallsByDay,
                setCentralTelefonicaID: setCentralTelefonicaID
            };
        }
    ]);
})(angular);
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
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeUser', ['rgmeRequest', 'rgmeUtils', '$cookies', 'regmeApiBaseURL', '$q',
        function(rgmeRequest, rgmeUtils, $cookies, regmeApiBaseURL, $q) {
            var requiredParameters = ['token'];
            var params = {};
            var callGet = function(urlMethod, requiredParameters) {
                var deferred = $q.defer();
                params['token'] = $cookies.get('registrame-api-token');
                if(rgmeUtils.checkParams(requiredParameters, params)) {
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
            var getUser = function() {
                var deferred = $q.defer();
                var url = 'user';
                var requiredParameters = ['token'];
                callGet(url, requiredParameters).then(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            return {
                getUser: getUser
            };
        }
    ]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeUtils', [function() {
        var checkParams = function(requiredParameters, params) {
            for (var k = 0; k < requiredParameters.length; k++) {
                if (params[requiredParameters[k]] === undefined) {
                    return false;
                }
            }
            return true;
        };
        return {
            checkParams: checkParams
        };
    }]);
})(angular);