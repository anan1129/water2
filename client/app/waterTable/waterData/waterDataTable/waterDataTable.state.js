/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterDataTable.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water-data-table',{
                    url:'/water-data-table/:id/:name',
                    templateUrl:'app/waterTable/waterData/waterDataTable/waterDataTable.html'
                })
        }])
})();
