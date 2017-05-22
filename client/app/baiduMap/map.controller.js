/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.map.controller',[])
        .controller('MapCtrl',['$scope',MapCtrl])
    ;

    function MapCtrl($scope){
        $scope.title='baidu mpay';
    }
})();
