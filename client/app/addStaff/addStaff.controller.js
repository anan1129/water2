/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addStaff.controller',[])
        .controller('AddStaffCtrl',['$scope',AddStaffCtrl])
    ;

    function AddStaffCtrl($scope){
        $scope.title='add group';

        $scope.formObj={
            persons:['张三','李四']
        };
    }
})();
