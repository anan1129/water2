/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('water.managerLog.controller',[])
        .controller('ManagerLogCtrl',['$scope','$stateParams','RestangularService','$state',ManagerLogCtrl])
    ;

    function ManagerLogCtrl($scope,$stateParams,RestangularService,$state){
        $scope.title="manager log";
        var stateParams=$scope.stateParams;
        $scope.logDetail=logDetail;

        RestangularService.all('api/news-show-top?newsType=河长日志&riverId='+stateParams.id).customGET().then(function(result){
            if(result.status==200){
                console.log(result.data);
                $scope.data=result.data;
            }
        })

        function logDetail(id){
            $state.go('log-detail',{id:id});
        }
    }
})();