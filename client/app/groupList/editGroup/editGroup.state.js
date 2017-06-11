/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editGroup.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('edit-group',{
                    url:'/edit-group/:id',
                    templateUrl:'app/groupList/editGroup/editGroup.html'
                })
        }])
})();
