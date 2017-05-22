/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addGroup.controller',[])
        .controller('AddGroupCtrl',['$scope',AddGroupCtrl])
    ;

    function AddGroupCtrl($scope){
        $scope.title='add group';

        $scope.formObj={
            persons:['张三','李四']
        };
    }
})();
