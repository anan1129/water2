/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.news.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('news',{
                    url:'/news',
                    templateUrl:'app/news/news.html'
                })
        }])
})();
