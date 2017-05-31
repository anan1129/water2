/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.newDetail.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('new-detail',{
                    url:'/new-detail/:id/:index',
                    templateUrl:'app/newDetail/newDetail.html'
                })
        }])
})();
