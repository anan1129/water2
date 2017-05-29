/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editInfo.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('edit-info',{
                    url:'/edit-info/:id',
                    templateUrl:'app/editInfo/editInfo.html'
                })
        }])
})();
