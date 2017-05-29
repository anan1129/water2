/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.home.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('home',{
                    url:'/home',
                    templateUrl:'app/home/home.html'
                })
        }])
})();
