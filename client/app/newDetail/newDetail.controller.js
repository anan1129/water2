/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.newDetail.controller', [])
        .controller('NewDetailCtrl', ['$scope', '$state', '$mdToast','RestangularService','$stateParams', NewDetailCtrl])
    ;

    function NewDetailCtrl($scope, $state, $mdToast,RestangularService,$stateParams) {
        var stateParams=$scope.stateParams=$stateParams;
        console.log(stateParams);
        $scope.data;

        initData();

        function initData(){
            getData();
        }

        function getData(){
            RestangularService.all('api/news').customGET(stateParams.id).then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    $scope.data=result.data;
                }
            })
        }
    }
})();
