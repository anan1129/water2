/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.jobsExecute.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('jobs-execute',{
                    url:'/jobs-execute/:id',
                    templateUrl:'app/fore/jobsExecute/jobsExecute.html'
                })
        }])
})();
