/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.groupList.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('gorup-list',{
                    url:'/group-list',
                    templateUrl:'app/groupList/groupList.html'
                })
        }])
})();
