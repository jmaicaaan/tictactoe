import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import boardComponent from './board.component';

let boardModule = angular.module('board', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('board', {
      url: '/',
      component: 'board'
    });
})

.component('board', boardComponent)

.name;

export default boardModule;
