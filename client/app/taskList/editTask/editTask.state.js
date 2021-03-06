/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editTask.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('edit-task',{
                    url:'/edit-task/:id/:riverName/:type/:title',
                    templateUrl:'app/taskList/editTask/editTask.html'
                })
                .state('fore-edit-task-manage',{
                    url:'/fore-edit-task-manage/:id/:riverName/:type/:title',
                    templateUrl:'app/fore/foreEditTaskManage/foreEditTaskManage.html'
                })
        }])
})();
