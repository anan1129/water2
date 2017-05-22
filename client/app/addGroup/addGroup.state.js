/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addGroup.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('add-group',{
                    url:'/add-group',
                    templateUrl:'app/addGroup/addGroup.html'
                })
        }])
})();
