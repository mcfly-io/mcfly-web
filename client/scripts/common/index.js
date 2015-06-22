'use strict';
require('angular-ui-router');
require('lbServices');
var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'lbServices']);
    // inject:folders start
    require('./constants')(app);
    require('./controllers')(app);
    require('./directives')(app);
    // inject:folders end

    app.config(['LoopBackResourceProvider', fullname + '.loopbackConstant', function(LoopBackResourceProvider, loopbackConstant) {
        LoopBackResourceProvider.setUrlBase(loopbackConstant.baseUrl);
    }]);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('root', {
                    abstract: true,
                    url: '',
                    template: require('./views/root.html'),
                    controller: fullname + '.root',
                    controllerAs: 'root'
                })
                .state('home', {
                    parent: 'root',
                    url: '/home',
                    views: {
                        'content': {
                            template: require('./views/home.html'),
                            controller: fullname + '.home',
                            controllerAs: 'vm'
                        }
                    }

                });
        }
    ]);

    return app;
};
