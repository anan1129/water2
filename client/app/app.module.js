(function () {
    'use strict';

    angular.module('app', [
        // Core modules
        'app.core'

        // Custom Feature modules
        , 'app.chart'
        , 'app.ui'
        , 'app.ui.form'
        , 'app.ui.form.validation'
        , 'app.page'
        , 'app.table'
        , 'app.map'
        , 'app.water'
        , 'app.waterInfo'
        , 'app.addTask'
        , 'app.taskList'
        , 'app.addGroup'
        , 'app.addStaff'
        , 'app.taskDetails'
        , 'app.data.service'
        , 'app.dynamicInfo'
        , 'app.addInfo'
        , 'app.editInfo'
        , 'app.compControl'
        , 'app.editTask'
        , 'app.waterList'
        , 'app.home'
        , 'app.news'
        , 'app.editRiver'
        , 'app.newDetail'
        , 'app.login'

        // 3rd party feature modules
        , 'restangular'
        , 'md.data.table'
        , 'app.user'
    ])
        .service('RestangularService', ['Restangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setFullResponse(true).setBaseUrl('http://106.15.48.81:8080');
            });
        }])
        .run(['$rootScope',
            function ($rootScope) {
                // $rootScope.loginObj={
                //     admin:"admin"
                // }

                // Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
                //     // if (response.status === 403) {
                //     //     $state.go('denied');
                //     //     return false;
                //     // }
                //     // else if (response.status === 404) {
                //     //     var pageNotfoundConfirm = $mdDialog.alert()
                //     //     .content("页面不存在")
                //     //     .targetEvent()
                //     //     .title('消息提醒')
                //     //     .ok('确认');
                //     //     $mdDialog.show(pageNotfoundConfirm);
                //     //     return false;
                //     // }
                // });
                //
                //
                //
                // //进行登陆行为，清除之前的用户信息，加载菜单
                // function _login(userCode,token){
                //     var certificate = {
                //         username: null,
                //         password: null
                //     };
                //     if (token) {
                //         localStorage.removeItem('id_token');
                //         localStorage.removeItem('authorities');
                //     }
                //     certificate.username = userCode;
                //     // certificate.password = userCode;
                //     //2017-05-10密码加上三大七小
                //     certificate.password = userCode + '#EDC7ujm';
                //     Auth.Authentication.post(certificate).then(function (token) {
                //         localStorage.setItem('id_token', token.id_token);
                //         $rootScope.isAuthenticated = true;
                //         UserService.one(userCode).get().then(function (result) {
                //             localStorage.setItem('authorities', result.authorities);
                //             localStorage.setItem('currentLogin', result.login);
                //             localStorage.setItem('currentUser', result.firstName);
                //             sessionStorage.setItem('currentUser', result.firstName);
                //             sessionStorage.setItem('currentLogin', result.login);
                //             sessionStorage.setItem('hasGitlabAccount', result.gitlabAccount);
                //             // console.log(result);
                //             $rootScope.$broadcast('loginFinish');
                //
                //             // 获取菜单
                //             var authorities = result.authorities;
                //             var authoritiesArray = [];
                //             if (authorities) {
                //                 angular.forEach(authorities, function (value) {
                //                     authoritiesArray.push({"authorityName": value});
                //                 })
                //             }
                //
                //             SidebarService.getParentNode().post(authoritiesArray).then(function (result) {
                //                 if (result && result.length > 0) {
                //                     var menus = [];
                //                     angular.forEach(result, function (value, key) {
                //                         if (value.parentId == 0) {
                //                             menus.push(value);
                //                         }
                //                     });
                //
                //                     angular.forEach(menus, function (parent, key) {
                //                         parent.subMenu = [];
                //                         angular.forEach(result, function (node, id) {
                //                             if (node.parentId == parent.id) {
                //                                 parent.subMenu.push(node);
                //                             }
                //                         });
                //                     });
                //                     $rootScope.authorityFunction = menus;
                //                     // $state.go('loadbalance.user');
                //                     $state.go('runLook');
                //                 }
                //             });
                //         });
                //         CheckUserLoginService.checkUserLogin();
                //     });
                //
                // }
                // $rootScope.$on('$stateChangeStart',
                //     function (event, toState, toParams, fromState, fromParams, options) {
                //         // console.log(fromState.name+"->"+toState.name);
                //         // console.log(toState);
                //         //2017-04-13增加通过链接登陆 目标state为codeRepository.approve
                //         // if(toState == 'coderepository.approve'){
                //         //     CodeRepositoryAuthService.getKeyUser(toState.scriptId,toState.key).get().then(function(response){
                //         //         if(!response){
                //         //             //获取失败
                //         //             // return;
                //         //         }
                //         //         //获取成功
                //         //         var _userCode = response.userCode;
                //         //         _login(_userCode);
                //         //         return;
                //         //     },function(response){
                //         //         //获取失败
                //         //     });
                //         // }
                //         //暂时注释 因为暴露了链接任何人都可以点击链接审批了
                //         if(toState.name == 'login'){
                //             $rootScope.urlName = true;
                //             return;
                //         }else{
                //             $rootScope.urlName = false;
                //         }
                //         var token = localStorage.getItem('id_token');
                //         if (toParams.userCode) {
                //             _login(toParams.userCode,token);
                //         } else {
                //             if (toState.name !== 'runLook') {
                //                 if (token) {
                //                     // console.log(token);
                //                     var isTokenExpired = jwtHelper.isTokenExpired(token);
                //                     if (isTokenExpired) {
                //                         LayoutService.removeLocalStorage();
                //                         LayoutService.removeSessionStorage();
                //                         // $location.path('/login');
                //                         $window.location.href="http://itom.hq.cpic.com";
                //                     }
                //                 } else {
                //                     event.preventDefault();
                //                     // console.log(token);
                //                     //  $state.go('login');
                //                     // $location.path('/login');
                //                     $window.location.href="http://itom.hq.cpic.com";
                //
                //                 }
                //             }
                //         }
                //     })
            }])
    ;

})();

