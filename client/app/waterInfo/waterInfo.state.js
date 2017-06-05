/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterInfo.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water-info',{
                    url:'/water-info',
                    templateUrl:'app/waterInfo/waterInfo.html'
                })
                .state('edit-river',{
                    url:'/edit-river/:id',
                    templateUrl:'app/waterInfo/waterInfo.html'
                })
            ;
        }])
})();
