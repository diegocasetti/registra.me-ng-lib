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