/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addStaff.controller',[])
        .controller('AddStaffCtrl',['$scope','GlobalData',AddStaffCtrl])
    ;

    function AddStaffCtrl($scope,GlobalData){
        $scope.title='add group';
        $scope.groups=GlobalData.groups;

        $scope.formObj={};

        $scope.save=function(){
            console.log($scope.formObj);
            GlobalData.users.push($scope.formObj);
            $scope.formObj={};
        }
    }
})();
