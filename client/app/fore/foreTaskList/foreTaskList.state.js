/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskList.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('task-list',{
                    url:'/task-list',
                    templateUrl:'app/taskList/taskList.html'
                })
        }])
})();
