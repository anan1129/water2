/**
 * Created by zhengan on 2017/6/2.
 */
(function(){
    'use strict';

    angular.module('water.logDetail.controller',[])
        .controller('LogDetailCtrl',['$scope','$stateParams','RestangularService',LogDetailCtrl])
    ;

    function LogDetailCtrl($scope,$stateParams,RestangularService){
       var stateParams=$scope.stateParams=$stateParams;
        $scope.data;

        getData();

        function getData(){
            RestangularService.all('api/news').customGET(stateParams.id).then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    $scope.data=result.data;
                }
            });
        }
    }
})();
