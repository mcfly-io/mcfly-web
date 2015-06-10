'use strict';

var namespace = 'main';
window._ = require('lodash');
var angular = require('angular');

var app = angular.module(namespace, [
    // inject:modules start
    require('./common')(namespace).name
    // inject:modules end
]);

var runDeps = ['$rootScope'];
var run = function($rootScope) {
    $rootScope.loaded = true;
};

run.$inject = runDeps;
app.run(run);
module.exports = app;
