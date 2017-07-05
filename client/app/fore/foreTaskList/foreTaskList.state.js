/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.foreTaskList.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('fore-task-list',{
                    url:'/fore-task-list',
                    templateUrl:'app/fore/foreTaskList/foreTaskList.html'
                })
        }])
})();
