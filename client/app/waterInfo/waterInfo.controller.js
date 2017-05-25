/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterInfo.controller',[])
        .controller('WaterInfoCtrl',['$scope','GlobalData',WaterInfoCtrl])
    ;

    function WaterInfoCtrl($scope,GlobalData){
        $scope.title='water info';
        $scope.users=GlobalData.users;

        $scope.formObj={ };

        $scope.save=function(){
            console.log($scope.formObj);
        }
    }
})();
