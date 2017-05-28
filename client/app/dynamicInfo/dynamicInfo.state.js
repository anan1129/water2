/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.dynamicInfo.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('dynamic-info',{
                    url:'/dynamic-info',
                    templateUrl:'app/dynamicInfo/dynamicInfo.html'
                })
        }])
})();
