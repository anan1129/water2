/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water',{
                    url:'/water',
                    templateUrl:'app/water/water.html'
                })
        }])
})();
