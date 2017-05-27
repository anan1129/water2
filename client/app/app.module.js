(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'

        // Custom Feature modules
        ,'app.chart'
        ,'app.ui'
        ,'app.ui.form'
        ,'app.ui.form.validation'
        ,'app.page'
        ,'app.table'
        ,'app.map'
        ,'app.water'
        ,'app.waterInfo'
        ,'app.addTask'
        ,'app.taskList'
        ,'app.addGroup'
        ,'app.addStaff'
        ,'app.taskDetails'
        ,'app.data.service'

        // 3rd party feature modules
        ,'restangular'
        ,'md.data.table'
        , 'app.user'
    ])
        .service('RestangularService',function(Restangular){
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setFullResponse(true).setBaseUrl('');
            });
        })
    ;

})();

