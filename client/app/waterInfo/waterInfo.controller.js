/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterInfo.controller',[])
        .controller('WaterInfoCtrl',['$scope',WaterInfoCtrl])
    ;

    function WaterInfoCtrl($scope){
        $scope.title='water info';

        $scope.formObj={};
    }
})();
