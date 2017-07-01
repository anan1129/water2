/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.riverDetail.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('river-detail',{
                    url:'/river-detail/:id/:riverName',
                    templateUrl:'app/waterTable/riverDetail/riverDetail.html'
                })
        }])
})();
