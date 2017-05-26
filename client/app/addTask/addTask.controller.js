/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addTask.controller',[])
        .controller('AddTaskCtrl',['$scope','GlobalData','$filter',AddTaskCtrl])
    ;

    function AddTaskCtrl($scope,GlobalData,$filter){
        console.log(GlobalData);
        var users=[];
        $scope.title='add group';

        $scope.formObj={
            users:[],
        };

        $scope.save=function(){
            $scope.formObj.status='已上报';
            console.log($scope.formObj);
            GlobalData.jobs.push($scope.formObj);
            $scope.formObj={
                user:[]
            }
        }

        angular.forEach(GlobalData.users,function(val){
            users.push(val.name);
        });

        $scope.$watch('formObj.keyword',function(n,o){
            if(angular.equals(n,o)) return;
            console.log(n);
            if(!$scope.formObj.keyword){
                $scope.formObj.users=[];
                return;
            }
            $scope.formObj.users=$filter('filter')(users,n);
        })
    }
})();
