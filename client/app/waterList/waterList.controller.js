/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterList.controller',[])
        .controller('WaterListCtrl',['$scope','$stateParams','RestangularService',WaterListCtrl])
    ;

    function WaterListCtrl($scope,$stateParams,RestangularService){
        $scope.rivers;

        initData();

        function initData(){
            getRivers();
        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET().then(function(result){
                if(result.status==200){
                    $scope.rivers=result.data;
                }
            })
        }
    }
})();
