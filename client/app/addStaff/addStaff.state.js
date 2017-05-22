/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addStaff.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('add-staff',{
                    url:'/add-staff',
                    templateUrl:'app/addStaff/addStaff.html'
                })
        }])
})();
