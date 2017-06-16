/**
 * Created by zhengan on 2017/6/3.
 */
(function(){
    "user strict";

    angular.module('water.header',[])
        .controller('HeaderCtrl',['$scope','$window','$state',HeaderCtrl])
    ;

    function HeaderCtrl($scope,$window,$state){
        $scope.goBack=goBack;

        function goBack(){
            // $window.history.go(-1);
            $state.go('home')
        }
    }
})();
