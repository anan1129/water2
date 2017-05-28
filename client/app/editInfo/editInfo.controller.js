/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editInfo.controller',[])
        .controller('EditInfoCtrl',['$scope','GlobalData','$state',EditInfoCtrl])
    ;

    function EditInfoCtrl($scope,GlobalData,$state){
        console.log(GlobalData);
        var users=[];

        $scope.formObj={
            types:['新闻动态','通知','公告','一河一档','一河一策'],
        };

        $scope.save=function(){
            $state.go('dynamic-info');
        }

        angular.forEach(GlobalData.users,function(val){
            users.push(val.name);
        });

    }
})();
