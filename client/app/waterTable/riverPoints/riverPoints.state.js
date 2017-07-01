/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.riverPoints.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('river-points',{
                    url:'/river-points/:id/:riverName',
                    templateUrl:'app/waterTable/riverPoints/riverPoints.html'
                })
        }])
})();
