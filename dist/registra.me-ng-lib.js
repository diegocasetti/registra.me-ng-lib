(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('registra.meNgLib.config', [])
      .value('registra.meNgLib.config', {
          debug: true
      });

  // Modules
  angular.module('registra.meNgLib.directives', []);
  angular.module('registra.meNgLib.filters', []);
  angular.module('registra.meNgLib.services', []);
  angular.module('registra.meNgLib',
      [
          'registra.meNgLib.config',
          'registra.meNgLib.directives',
          'registra.meNgLib.filters',
          'registra.meNgLib.services',
          'ngResource',
          'ngCookies',
          'ngSanitize'
      ]);

})(angular);

(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeAudioCall', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/obtener/llamada/audio';
        var requiredParameters = ['token', 'central_telefonica_id'];
        var requiredParametersToFileUrl = ['token', 'central_telefonica_id', 'llamada_audio_id'];
        var urlToFile = 'api.registra.me/api-v1/client/descargar/llamada/audio';
        var protocol = 'https://';
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
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var call = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            console.log($cookies.get('registrame-api-token'));
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.get(protocol + url, params, success, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }
        };
        var getUrlToFile = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParametersToFileUrl, params)) {
                rgmeRequest.buildUrl(protocol + urlToFile, params, success);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            delete params['llamada_audio_id'];
        };
        return {
            call: call,
            setCentralTelefonicaID: setCentralTelefonicaID,
            setFechaInicio: setFechaInicio,
            setFechaFin: setFechaFin,
            setOrder: setOrder,
            setPage: setPage,
            setLlamadaAudioID: setLlamadaAudioID,
            setInsecureProtocol: setInsecureProtocol,
            getUrlToFile: getUrlToFile
        };
    }]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeCall', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/obtener/llamada';
        var requiredParameters = ['token', 'central_telefonica_id'];
        var protocol = 'https://';
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
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var call = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.get(protocol + url, params, success, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        return {
            call: call,
            setCentralTelefonicaID: setCentralTelefonicaID,
            setTelefono: setTelefono,
            setFechaInicio: setFechaInicio,
            setFechaFin: setFechaFin,
            setOrder: setOrder,
            setPage: setPage,
            setLlamadaID: setLlamadaID,
            setInsecureProtocol: setInsecureProtocol
        };
    }]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeDashboard', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var baseUrl = 'api.registra.me/api-v1/client/dashboard';
        var params = {};
        var protocol = 'https://';
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var setCentralTelefonicaID = function(centralTelefonicaID) {
            params['central_telefonica_id'] = centralTelefonicaID;
        };
        var call = function(urlMethod, requiredParameters, success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.get(protocol + baseUrl + urlMethod, params, success, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        var getBytes = function(success, error){
            var url = '/peso/audios';
            var requiredParameters = ['token'];
            call(url, requiredParameters, success, error);
        };
        return {
            getBytes: getBytes,
            setCentralTelefonicaID: setCentralTelefonicaID,
            setInsecureProtocol: setInsecureProtocol
        };
    }]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeLogin', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/user/login';
        var requiredParameters = ['secret', 'email', 'password'];
        var protocol = 'https://';
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
        var setInsecureProtocol = function() {
            protocol = 'http://';
        };
        var setTokenCookie = function(token){
            $cookies.put('registrame-api-token', token);
        };
        var isLogged = function(){
            if($cookies.get('registrame-api-token')){
                return true;
            }else{
                return false;
            }
        };
        var call = function(success, error) {
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.post(protocol + url, params, function(data){
                    setTokenCookie(data.token);
                    delete data.token;
                    success(data);
                }, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        return {
            setSecret: setSecret,
            setEmail: setEmail,
            setPassword: setPassword,
            setInsecureProtocol: setInsecureProtocol,
            isLogged: isLogged,
            call: call
        };
    }]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeRequest', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {
        var post = function(url, params, success, errorFunction) {
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var request = $http.post(encodeURI(url), $httpParamSerializerJQLike(params), config)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data, status, header, config) {
                errorFunction(data);
            });
        };
        var get = function(url, params, success, errorFunction) {
            var request = $http.get(encodeURI(url + '?' + $httpParamSerializerJQLike(params)))
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data, status, header, config) {
                errorFunction(data);
            });
        };
        var buildUrl = function(url, params, success) {
            success({
                status: 'ok',
                url: encodeURI(url + '?' + $httpParamSerializerJQLike(params))
            });
        };

        return {
            post: post,
            get: get,
            buildUrl: buildUrl
        };
    }]);
})(angular);
(function(angular) {
    angular.
    module('registra.meNgLib.services').
    factory('rgmeUser', ['rgmeRequest', 'rgmeUtils', '$cookies', function(rgmeRequest, rgmeUtils, $cookies) {
        var url = 'api.registra.me/api-v1/client/user';
        var requiredParameters = ['token'];
        var protocol = 'https://';
        var params = {};
        var call = function(success, error) {
            params['token'] = $cookies.get('registrame-api-token');
            if (rgmeUtils.checkParams(requiredParameters, params)) {
                rgmeRequest.get(protocol + url, params, success, error);
            } else {
                error({
                    status: 'error',
                    message: 'Parametros obligatorios faltantes.'
                });
            }

            params = {};
        };
        return {
            call: call
        };
    }]);
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