/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskDetails.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('task-details',{
                    url:'/task-details/:name/:status/:users/:id/:content/:jobBack',
                    templateUrl:'app/taskDetails/taskDetails.html'
                })
                .state('fore-task-details-manage',{
                    url:'/fore-task-details-manage/:name/:status/:users/:id/:content/:jobBack',
                    templateUrl:'app/fore/foreTaskDetailsManage/foreTaskDetailsManage.html'
                })
        }])
})();
