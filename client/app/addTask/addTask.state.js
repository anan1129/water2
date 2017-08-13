/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addTask.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('add-task',{
                    url:'/add-task',
                    templateUrl:'app/addTask/addTask.html'
                })
                .state('fore-add-task-manage',{
                    url:'/fore-add-task-manage',
                    templateUrl:'app/fore/foreAddTaskManage/foreAddTaskManage.html'
                })
        }])
})();
