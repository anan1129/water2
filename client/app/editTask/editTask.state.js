/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editTask.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('edit-task',{
                    // url:'/edit-task/:name/:status/:users/:id/:content/:jobBack',
                    url:'/edit-task/:name/:status/:users/:id/:content/:jobBack',
                    templateUrl:'app/editTask/editTask.html'
                })
        }])
})();
