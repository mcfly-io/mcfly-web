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
            return Subscriber.create({
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
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
