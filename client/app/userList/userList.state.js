/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.userList.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('user-list',{
                    url:'/user-list',
                    templateUrl:'app/userList/userList.html'
                })
        }])
})();
