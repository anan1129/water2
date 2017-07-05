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
        $scope.title;

        console.log($state.current.name);
        switch($state.current.name){
            case 'fore-task-list':
                $scope.title='任务单';
                break;
            case 'fore-task-finishing':
                $scope.title='任务处置';
                break;
            default:
                $scope.title='';
        }

        function goBack(){
            $window.history.go(-1);
            // $state.go('home')
        }
    }
})();
