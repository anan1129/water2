/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.controller',[])
        .controller('WaterCtrl',['$scope','$stateParams','GlobalData',WaterCtrl])
    ;

    function WaterCtrl($scope,$stateParams,GlobalData){
        $scope.name=$stateParams.name;
        $scope.dataObj;
        switch($scope.name){
            case '01-1':
            case '01-2-1':
            case '01-2-2':
            case '01-3':
                $scope.dataObj=GlobalData.rivers[0];
                break;
            case '02-1':
            case '02-2':
            case '02-3':
                $scope.dataObj=GlobalData.rivers[1];
                break;
            case '03-2':
            case '03-1':
                $scope.dataObj=GlobalData.rivers[2];
                break;
            case '04-1':
            case '04-2':
                $scope.dataObj=GlobalData.rivers[3];
                break;
            case '05-1':
                $scope.dataObj=GlobalData.rivers[4];
                break;
            case '06-1':
                $scope.dataObj=GlobalData.rivers[5];
                break;
            case '07-1':
            case '07-2':
                $scope.dataObj=GlobalData.rivers[6];
                break;
            case '08-1':
                $scope.dataObj=GlobalData.rivers[7];
                break;
            case '09-1':
                $scope.dataObj=GlobalData.rivers[8];
                break;
        }
    }
})();
