/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.login.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('login',{
                    url:'/login',
                    templateUrl:'app/login/login.html'
                })
        }])
})();
