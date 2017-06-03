(function () {
    'use strict';

    angular.module('app', [
        // Core modules
        'app.core'

        // Custom Feature modules
        , 'app.chart'
        , 'app.ui'
        , 'app.ui.form'
        , 'app.ui.form.validation'
        , 'app.page'
        , 'app.table'
        , 'app.map'
        , 'app.water'
        , 'app.waterInfo'
        , 'app.addTask'
        , 'app.taskList'
        , 'app.addGroup'
        , 'app.addStaff'
        , 'app.taskDetails'
        , 'app.data.service'
        , 'app.dynamicInfo'
        , 'app.addInfo'
        , 'app.editInfo'
        , 'app.compControl'
        , 'app.editTask'
        , 'app.waterList'
        , 'app.home'
        , 'app.news'
        , 'app.editRiver'
        , 'app.newDetail'
        , 'app.login'

        // 3rd party feature modules
        , 'restangular'
        , 'md.data.table'
        , 'app.user'
    ])
        .service('RestangularService', ['Restangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setFullResponse(true).setBaseUrl('http://106.15.48.81:8080');
            });
        }])
        .run(['$rootScope','$window','$state','$location',
            function ($rootScope,$window,$state,$location) {
                $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams, options){
                    console.log(fromState.name);
                    console.log(toState.name);
                    if(toState.name!='login'){
                        if(!$window.sessionStorage.id_token){
                            $location.path('/login');
                        }
                    }
                })
            }])
    ;

})();

