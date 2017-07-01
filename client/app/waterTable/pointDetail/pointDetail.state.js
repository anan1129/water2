/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.pointDetail.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('point-detail',{
                    url:'/point-detail/:id/:name/:riverName/:riverId',
                    templateUrl:'app/waterTable/pointDetail/pointDetail.html'
                })
        }])
})();
