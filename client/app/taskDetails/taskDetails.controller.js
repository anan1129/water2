/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskDetails.controller',[])
        .controller('TaskDetailsCtrl',['$scope','$stateParams','RestangularService',TaskDetailsCtrl])
    ;

    function TaskDetailsCtrl($scope,$stateParams,RestangularService){
        $scope.stateParams=$stateParams;
        console.log($stateParams.users);
        initData();

        function initData(){
            getData();
        }

        function getData(){
            RestangularService.all('api/jobs').customGET($stateParams.id).then(function(result){
                if(result.status==200){
                    $scope.data=result.data;
                }
            })
        }
    }
})();
