/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editRiver.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('edit-river',{
                    url:'/edit-river',
                    templateUrl:'app/editRiver/editRiver.html'
                })
        }])
})();
