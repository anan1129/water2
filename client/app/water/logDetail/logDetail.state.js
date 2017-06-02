/**
 * Created by zhengan on 2017/6/2.
 */
(function(){
    'use strict';

    angular.module('water.logDetail.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('log-detail',{
                    url:'/water/log-detail/:id',
                    templateUrl:'app/water/logDetail/logDetail.html'
                })
            ;
        }])
    ;
})();
