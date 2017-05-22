/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.controller',[])
        .controller('WaterCtrl',['$scope',WaterCtrl])
    ;

    function WaterCtrl($scope){
        $scope.title='weater';
    }
})();
