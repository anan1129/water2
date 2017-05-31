/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.addTask.controller', [])
        .controller('AddTaskCtrl', ['$scope', 'RestangularService', '$filter','$mdToast','FileUploader', AddTaskCtrl])
    ;

    function AddTaskCtrl($scope, RestangularService, $filter,$mdToast,FileUploader) {
        var users = [],resultData;

        initData();

        function initData(){
            $scope.formObj = {
                users:[],
                attachments:[]
            };
            $scope.filterUsers=[];
            users=[];
            getUsers();
        }

        function getUsers(){
            RestangularService.all('api/users').customGET().then(function(result){
               if(result.status==200){
                   resultData=result.data;
                   angular.forEach(result.data,function(val){
                       users.push(val.firstName);
                   })
               }
            });
        }

        $scope.save = function () {
            angular.forEach(uploader.queue,function(val){
                $scope.formObj.attachments.push({
                    filePath:'http://106.15.48.81'+val.filePath,
                    fileName:val.fileName
                })
            });
            console.log($scope.formObj);
            var data=$scope.formObj;
            angular.forEach($scope.filterUsers,function(val1){
               angular.forEach(resultData,function(val2){
                   if(val2.firstName==val1){
                        console.log(val1);
                       $scope.formObj.users.push({user:val2.login});
                       console.log($scope.formObj.users);
                   }
               })
            });
            // data.mangeuser=localStorage.mangeuser||'';
            // data.status="已上报";
            // data.source=""
            RestangularService.all('api/jobs').customPOST(data).then(function(result){
                console.log(result);
                if(result.status==201){
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加成功！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                    initData();
                    uploader.clearQueue();
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加失败！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                }
            })
        }

        $scope.$watch('formObj.keyword', function (n, o) {
            if (angular.equals(n, o)) return;
            if (!n) {
                $scope.filterUsers = [];
                return;
            }
            $scope.filterUsers = $filter('filter')(users, n);
            console.log(n, $scope.filterUsers);
        })

        // console.log(RestangularService.all('api/files'));

        // upload
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://106.15.48.81:8080/api/files'
        });

        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                // console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                // console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //     console.info('onWhenAddingFileFailed', item, filter, options);
        // };
        // uploader.onAfterAddingFile = function(fileItem) {
        //     console.info('onAfterAddingFile', fileItem);
        // };
        // uploader.onAfterAddingAll = function(addedFileItems) {
        //     console.info('onAfterAddingAll', addedFileItems);
        // };
        // uploader.onBeforeUploadItem = function(item) {
        //     console.info('onBeforeUploadItem', item);
        // };
        // uploader.onProgressItem = function(fileItem, progress) {
        //     console.info('onProgressItem', fileItem, progress);
        // };
        // uploader.onProgressAll = function(progress) {
        //     console.info('onProgressAll', progress);
        // };
        console.log(uploader);
        uploader.onSuccessItem = function(fileItem, response, status, headers) {

            console.log( response);
            console.log( fileItem._file.name);
            fileItem.filePath=response.filePath;
            fileItem.fileName=response.fileName;
            // $scope.formObj.attachments.push({filePath:response.filePath,fileName:response.fileName});

            // console.log( response);
            // console.log( headers);
        };
        // uploader.onErrorItem = function(fileItem, response, status, headers) {
        //     console.info('onErrorItem', fileItem, response, status, headers);
        // };
        // uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteAll = function() {
        //     console.info('onCompleteAll');
        // };
    }
})();
