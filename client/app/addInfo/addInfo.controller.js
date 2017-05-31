/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.addInfo.controller', [])
        .controller('AddInfoCtrl', ['$scope', '$filter', 'FileUploader', 'RestangularService','$mdToast', AddInfoCtrl])
    ;

    function AddInfoCtrl($scope, $filter, FileUploader, RestangularService,$mdToast) {
        var users = [];
        $scope.infoTypes = ['新闻动态', '一河一档', '一河一策'];
        $scope.title = 'add group';

        $scope.formObj = {
            attachments: []
        };
        initData();

        function initData() {
            $scope.formObj = {
                attachments: [],
            };
            getInfoTypes();
            getRivers();
            if (uploader) uploader.clearQueue();
            $scope.addTypes = false;
        }

        function getInfoTypes() {
            RestangularService.all('api/news-types').customGET().then(function (result) {
                if (result.status == 200) {
                    console.log(result);
                    $scope.newsTypes = result.data;
                }
            })
        }

        function getRivers() {
            RestangularService.all('api/rivers').customGET().then(function (result) {
                if (result.status == 200) {
                    $scope.rivers = result.data;
                }
            })
        }

        $scope.save = function () {
            angular.forEach(uploader.queue, function (val) {
                $scope.formObj.attachments.push({
                    filePath: 'http://106.15.48.81' + val.filePath,
                    fileName: val.fileName
                })
            });
            var data = $scope.formObj;
            if (angular.isArray(data.newsType2)) data.newsType2 = data.newsType2.join(',');
            RestangularService.all('api/news').customPOST(data).then(function (result) {
                if (result.status == 201) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加成功！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                    initData();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加失败！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                }
            })
        }

        $scope.addNewsType2 = function (e, newsType) {
            if (e.keyCode == 13) {
                $scope.addType = true;
                console.log(newsType);
            }
        }


        // $scope.$watch('formObj.keyword',function(n,o){
        //     if(angular.equals(n,o)) return;
        //     console.log(n);
        //     if(!$scope.formObj.keyword){
        //         $scope.formObj.users=[];
        //         return;
        //     }
        //     $scope.formObj.users=$filter('filter')(users,n);
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

            console.log(response);
            console.log(fileItem._file.name);
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
