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
        , 'app.foreTaskList'
        , 'app.foreTaskFinishing'
        , 'app.jobsExecute'
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
        , 'app.newDetail'
        , 'app.login'
        , 'app.waterTable'
        , 'app.userList'
        , 'app.groupList'
        , 'app.editGroup'

        // 3rd party feature modules
        , 'restangular'
        , 'md.data.table'
        , 'app.user'
        , 'ui.bootstrap'
    ])
        .service('RestangularService', ['Restangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setFullResponse(true).setBaseUrl('http://106.15.48.81:8080');
            });
        }])
        .run(['$rootScope','$window','$state','$location',
            function ($rootScope,$window,$state,$location) {
                $rootScope.isPC=isPCFun();
                $rootScope.host='http://106.15.48.81:8080';
                $rootScope.account={};

                function isPCFun(){
                    var userAgentInfo = navigator.userAgent;
                    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                    var flag=true;
                    for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
                    }
                    return flag;
                }
                $rootScope.$on('$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams, options){
                    if($rootScope.isPC){
                        if(toState.name!='login'){
                            if(!$window.sessionStorage.id_token){
                                $location.path('/login');
                            }
                        }
                    }
                    // console.log(fromState.name);
                    // console.log(toState.name);
                    // if(toState.name!='login'&&toState.name!='home'){
                    //     if(!$window.sessionStorage.id_token){
                    //         $location.path('/login');
                    //     }
                    // }
                })
            }])
    ;

})();

