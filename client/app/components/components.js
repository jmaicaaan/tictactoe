import angular from 'angular';
import Home from './home/home';
import Board from './board/board';

let componentModule = angular.module('app.components', [
  Home,
  Board
])

.name;

export default componentModule;
