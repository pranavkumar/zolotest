'use strict';

angular.module('zolotestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('day', {
        url: '/day/:val',
        templateUrl: 'app/day/day.html',
        controller: 'DayCtrl'
      });
  });