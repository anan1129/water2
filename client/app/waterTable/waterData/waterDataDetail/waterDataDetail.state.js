/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterDataDetail.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water-data-detail-edit',{
                    url:'/water-data-detail/:id/:name/:rpid',
                    templateUrl:'app/waterTable/waterData/waterDataDetail/waterDataDetail.html'
                })
                .state('water-data-detail-look',{
                    url:'/water-data-detail/:id/:name',
                    templateUrl:'app/waterTable/waterData/waterDataDetail/waterDataDetail.html'
                })
        }])
})();
