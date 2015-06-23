'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['Subscriber'];

    function controller(Subscriber) {
        var vm = this;
        vm.controllername = fullname;

        vm.register = function(valid) {
            vm.registerError = false;
            vm.registerSuccess = false;
            var email = vm.email;
            vm.email = null;
            Subscriber.create({
                    email: email
                })
                .$promise
                .then(function() {
                    vm.registerSuccess = true;
                })
                .catch(function() {
                    vm.registerError = true;
                    vm.email = email;
                })

            .finally(function() {
                vm.email = null;
            });
        };

        //vm.video = function(e) {
        //var videoElements = angular.element(e.srcElement);
        //videoElements[0].play();
        //}
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
