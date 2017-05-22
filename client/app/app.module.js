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

        // 3rd party feature modules
        ,'restangular'
        ,'md.data.table'
        , 'app.user'
    ]).run(function(Restangular){
        Restangular.setBaseUrl('http://localhost:8080/api');
    });

})();

