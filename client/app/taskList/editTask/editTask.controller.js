/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.editTask.controller', [])
        .controller('EditTaskCtrl', ['$scope', '$stateParams', '$mdToast','RestangularService','$state','FileUploader', EditTaskCtrl])
    ;

    function EditTaskCtrl($scope, $stateParams, $mdToast,RestangularService,$state,FileUploader) {
        var stateParams=$scope.stateParams=$stateParams;
        console.log(stateParams);
        $scope.getSubGroups=getSubGroups;
        $scope.save=save;
        $scope.formObj={
            attachments:[]
        };

        initData();
        function initData(){
            $scope.groups=[];
            $scope.pidArr=[];
            // getData(stateParams.id);
            getJob(stateParams.id);
            getGroups();
        }


        // function getData(id){
        //     RestangularService.all('api/readily-jobs').customGET(id).then(function(result){
        //         if(result.status==200){
        //             $scope.data=result.data;
        //         }
        //     })
        // }

        function getGroups(){
            RestangularService.all('api/groups-level/1').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups.push(result.data);
                    // getSubGroups(result.data[0].id,0);
                }
            });
        }

        function getUsers(id){
            RestangularService.all('api/users/byGroup/'+id+'?size=10000').customGET(id).then(function(result){
                if(result.status==200){
                    $scope.users=result.data;
                }
            })
        }

        function getSubGroups(id,index){
            id=angular.fromJson(id).id;
            if(id){
                RestangularService.all('api/groups-childs').customGET(id).then(function(result){
                    if(result.status==200){
                        if(result.data.length>0){
                            $scope.groups=$scope.groups.slice(0,index+1);
                            $scope.groups[index+1]=result.data;
                        }else{
                            $scope.groups.length=index+1;
                            $scope.pidArr.length=index+1;
                            getUsers(id);
                        }
                    }
                });
            }
        }

        function getJob(id){
            RestangularService.all('api/readily-jobs').customGET(id).then(function(result){
                if(result.status==200){
                    $scope.formObj=result.data;
                    $scope.formObj.attachments=[];
                }
            })
        }

        function save(){
            // $scope.user=angular.fromJson($scope.user);
            // var data=$scope.formObj;
            // data.users.push({user:$scope.user.login});
            angular.forEach(uploader.queue,function(val){
                $scope.formObj.attachments.push({
                    filePath:val.filePath,
                    fileName:val.fileName
                })
            });
            var pid=angular.fromJson($scope.pidArr[$scope.pidArr.length-1]);
            var data={
                name:$scope.formObj.title,
                sourceId:stateParams.id,
                source:stateParams.type,
                groupId:pid.id,
                groupName:pid.name,
                status:'已下发',
                content:$scope.formObj.content,
                attachments:$scope.formObj.attachments
            }

            console.log(data);

            RestangularService.all('api/jobs-issued').customPOST(data).then(function(result){
                if(result.status==201){
                    console.log(result.data);
                    if($scope.isPC){
                        $state.go('task-list');
                    }else{
                        $state.go('fore-task-list-manage');
                    }

                }
            })
        }

        // loader
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
