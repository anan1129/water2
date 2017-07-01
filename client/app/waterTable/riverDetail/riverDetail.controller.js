/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.riverDetail.controller', [])
        .controller('RiverDetailCtrl', ['$scope', '$state', '$mdToast','RestangularService','$stateParams','$window', RiverDetailCtrl])
    ;

    function RiverDetailCtrl($scope, $state, $mdToast,RestangularService,$stateParams,$window) {
        var stateParams=$scope.stateParams=$stateParams;
        $scope.back=back;

        initData();

        function initData(){

        }


        function back(){
            console.log($window);
            $window.history.go('-1');
        }
    }
})();
