/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editInfo.controller',[])
        .controller('EditInfoCtrl',['$scope','$stateParams','$state','RestangularService','FileUploader',EditInfoCtrl])
    ;

    function EditInfoCtrl($scope,$stateParams,$state,RestangularService,FileUploader){
        console.log($stateParams);
        var users=[];
        $scope.infoTypes = ['新闻动态', '一河一档', '一河一策','河长日志'];
        $scope.fileOrigin="http://106.15.48.81:8080/api/file-show/path?filepath=";
        $scope.handleChange=handleChange;
        $scope.formObj={
            type:'',
        };
        initData();
        var host='http://106.15.48.81:8080';

        function handleChange(){
            var f=new FormData();
            var val=angular.element('#label-info-imageUrl')[0].files[0];
            f.append('file',val);
            loadFile(f);
        }

        function loadFile(f) {
            RestangularService.all('api/files').withHttpConfig({transformRequest: angular.identity}).customPOST(f,undefined,undefined,{'Content-Type':undefined}).then(function(res){
                if(res.status==201){
                    console.log(res.data);
                    $scope.formObj.imageUrl=host+'/api/file-show/path?filepath='+res.data.filePath;
                }
            })
        }

        function initData(){
            getNews();
            $scope.formObj={
                type:'',
            };
        }


        function getNews(){
            RestangularService.all('/api/news').customGET($stateParams.id).then(function(result){
                if(result.status==200){
                    $scope.formObj=result.data;
                    console.log($scope.formObj);
                }
            }).then(getNewsTypes).then(getRivers);
        }

        function getNewsTypes(){
            RestangularService.all('api/news-types').customGET().then(function(result){
                if(result.status==200){
                    $scope.newsTypes=result.data;
                }
            });
        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET().then(function(result){
                if(result.status==200){
                    $scope.rivers=result.data;
                }
            })
        }

        $scope.save=function(){
            console.log($scope.formObj.id);
            var data=$scope.formObj;
            console.log(data);

            RestangularService.all('api/news').customPOST(data).then(function(result){
                if(result.status==201){
                    $state.go('dynamic-info');
                }
            })
        }

        // angular.forEach(GlobalData.users,function(val){
        //     users.push(val.name);
        // });
        // upload
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://106.15.48.81:8080/api/files'
        });

        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                // console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
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
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.filePath=$scope.fileOrigin+response.path;
            console.log($scope.filePath);
            // $scope.formObj.imageUrl=$scope.filePath;
            console.log(fileItem);
            console.log(response);
            fileItem.filePath = response.filePath;
            fileItem.fileName = response.fileName;
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
