/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.jobsExecute.controller', [])
        .controller('JobsExecuteCtrl', ['$scope', '$state', '$mdToast','RestangularService','$filter','$stateParams', '$window',JobsExecuteCtrl])
    ;

    function JobsExecuteCtrl($scope, $state, $mdToast,RestangularService,$filter,$stateParams,$window) {
        var stateParams=$scope.stateParams=$stateParams;
        $scope.title='任务反馈';
        $scope.save=save;
        $scope.download=download;
        $scope.files='';
        $scope.handleChange=handleChange;
        $scope.images=[];
        $scope.imgs=[];
        $scope.listObj = {
            data:[]
        };
        initData();

        function initData(){
           getJobs();
        }

        function getJobs(){
            RestangularService.all('api/jobs').customGET(stateParams.id).then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.data=result.data;
                }
            });
        }

        function save(job){
            console.log(job);
            var data={
                id:job.id,
                executes:[
                    {
                        user:$window.sessionStorage.username,
                        content:$scope.content,
                        images:$scope.images
                    }
                ],
                status:job.source=='投诉'?'已评价':'已处理',
            }
            console.log(data);

            RestangularService.all('api/jobs-execute').customPOST(data).then(function(res){
                console.log(res);
                if(res.status==201){
                    $window.history.go(-1);
                }
            })
        }

        function download(filePath){
            var url=$rootScope.host+'/api/file-download?filepath='+filePath;
            $window.open(url);
        }

        function handleChange(){
            var f=new FormData();
            var data=angular.element('input[type=file]')[0].files[0];
            f.append('file',data);
            console.log(data);

            loadFile(f);
        }

        function loadFile(f) {
            RestangularService.all('api/files').withHttpConfig({transformRequest: angular.identity}).customPOST(f,undefined,undefined,{'Content-Type':undefined}).then(function(res){
                if(res.status==201){
                    $scope.images.push({
                        'fileName':res.data.fileName,
                        'filePath':res.data.filePath,
                        'suffixName':res.data.suffixName
                    })
                }
            })
        }
    }
})();
