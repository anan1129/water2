/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.foreTaskFinishing.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('fore-task-finishing',{
                    url:'/fore-task-finishing',
                    templateUrl:'app/fore/foreTaskFinishing/foreTaskFinishing.html'
                })
        }])
})();
