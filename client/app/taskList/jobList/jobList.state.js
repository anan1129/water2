/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.jobList.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('job-list',{
                    url:'/job-list',
                    templateUrl:'app/taskList/jobList/jobList.html'
                })
        }])
})();