/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.compControl.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('comp-control',{
                    url:'/comp-control',
                    templateUrl:'app/compControl/compControl.html'
                })
        }])
})();
