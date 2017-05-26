/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addInfo.controller',[])
        .controller('AddInfoCtrl',['$scope','GlobalData','$filter',AddInfoCtrl])
    ;

    function AddInfoCtrl($scope,GlobalData,$filter){
        console.log(GlobalData);
        var users=[];
        $scope.title='add group';

        $scope.formObj={
            types:['新闻动态','通知','公告','一河一档','一河一策'],
        };

        $scope.save=function(){
            $scope.formObj.status='已上报';
            console.log($scope.formObj);
            GlobalData.jobs.push($scope.formObj);
            $scope.formObj={
                user:[]
            }
        }

        angular.forEach(GlobalData.users,function(val){
            users.push(val.name);
        });

        $scope.$watch('formObj.keyword',function(n,o){
            if(angular.equals(n,o)) return;
            console.log(n);
            if(!$scope.formObj.keyword){
                $scope.formObj.users=[];
                return;
            }
            $scope.formObj.users=$filter('filter')(users,n);
        })
    }
})();
