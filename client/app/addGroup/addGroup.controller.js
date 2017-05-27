/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addGroup.controller',[])
        .controller('AddGroupCtrl',['$scope','GlobalData','$filter','RestangularService',AddGroupCtrl])
    ;

    function AddGroupCtrl($scope,GlobalData,$filter,RestangularService){
        var users=[];
        $scope.formObj={
            users:[]
        };

        angular.forEach(GlobalData.users,function(val){
            users.push(val.name);
        });

        $scope.save=function(){
            console.log(RestangularService);
            GlobalData.groups.push($scope.formObj);
            // RestangularService.all('api/groups').customGET().then(function(result){
            //
            // })

            $scope.formObj={
                users:[]
            }
        }

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
