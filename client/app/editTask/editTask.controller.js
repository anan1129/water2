/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editTask.controller',[])
        .controller('EditTaskCtrl',['$scope','$stateParams',EditTaskCtrl])
    ;

    function EditTaskCtrl($scope,$stateParams){
        $scope.stateParams=$stateParams;
        console.log($stateParams);
    }
})();
