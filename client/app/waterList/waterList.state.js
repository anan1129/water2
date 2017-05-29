/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterList.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water-list',{
                    url:'/water-list',
                    templateUrl:'app/waterList/waterList.html'
                })
        }])
})();
