/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterTable.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water-table',{
                    url:'/water-table',
                    templateUrl:'app/waterTable/waterTable.html'
                })
        }])
})();
