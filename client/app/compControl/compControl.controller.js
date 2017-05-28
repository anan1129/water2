/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.compControl.controller',[])
        .controller('CompControlCtrl',['$scope','$stateParams','GlobalData',CompControlCtrl])
    ;

    function CompControlCtrl($scope,$stateParams,GlobalData){
        $scope.name=$stateParams.name;
        $scope.dataObj={
            data:[
                {id:"HPJ_201705003",addr:'平凉渡口',status:'已处理',pic:'../assets/images/water/01-1.jpg',content:'水有轻微污染，水里有漂浮物',date:'2017-03-29'},
                {id:"HPJ_201705004",addr:'杨浦滨江',status:'已处理',pic:'../assets/images/water/01-2-2.jpg',content:'水有轻微污染，水里有漂浮物',date:'2017-03-28'},
                {id:"HPJ_201705005",addr:'翔殷路',status:'已处理',pic:'../assets/images/water/02-1.jpg',content:'水有轻微污染，水里有漂浮物',date:'2017-03-27'}
            ]
        }

    }
})();
