/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addInfo.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('add-info',{
                    url:'/add-info',
                    templateUrl:'app/addInfo/addInfo.html'
                })
        }])
})();
