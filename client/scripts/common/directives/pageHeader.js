'use strict';
/*eslint consistent-this:[2,  "pageHeaderCtrl"] */
var directivename = 'pageHeader';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var pageHeaderCtrl = this;
        pageHeaderCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            controller: controller,
            controllerAs: 'pageHeaderCtrl',
            bindToController: true,
            template: require('./pageHeader.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
