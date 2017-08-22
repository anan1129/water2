/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.state',[])
        .config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('water',{
                    url:'/water/:id',
                    templateUrl:'app/water/water.html'
                })
                .state('waterImages',{
                    url:'/waterImages/:images',
                    templateUrl:'app/water/images/images.html'
                })
                .state('waterVideos',{
                    url:'/waterVideos/:videos',
                    templateUrl:'app/water/videos/videos.html'
                })
        }])
})();
