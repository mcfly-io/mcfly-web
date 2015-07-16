'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular');
require('angular-mocks');
var app = require('../')('app');
var controllername = 'home';
describe(app.name, function() {

    describe('Controllers', function() {

        describe(controllername, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.$httpBackend = $injector.get('$httpBackend');
                this.baseUrl = $injector.get(app.name + '.' + 'loopbackConstant').baseUrl;
                this.$controller = $injector.get('$controller');
                this.$scope = $injector.get('$rootScope').$new();
                this.controller = this.$controller(app.name + '.' + controllername + ' as vm', {
                    '$scope': this.$scope
                });
            }));

            it('should be defined', function() {
                expect(this.controller).toBeDefined();
            });

            it('should expose controllername', function() {
                expect(this.controller.controllername).toBe(app.name + '.' + controllername);
            });

            it('vm.register should set vm.registerSuccess and vm.registerError when successfull', function(done) {
                this.$httpBackend.expect('POST', this.baseUrl + '/Subscribers').respond(200, 'success');
                //expect(this.controller.registerSuccess).toBe(false);
                this.controller.register().then(function() {
                    expect(this.controller.registerSuccess).toBe(true);
                    expect(this.controller.registerError).toBe(false);
                    done();
                }.bind(this));
                this.$httpBackend.flush();
            });

            it('vm.register should set vm.registerSuccess and vm.registerError when fails', function(done) {
                this.$httpBackend.expect('POST', this.baseUrl + '/Subscribers').respond(500, 'error');
                //expect(this.controller.registerSuccess).toBe(false);
                this.controller.register().then(function() {
                    expect(this.controller.registerSuccess).toBe(false);
                    expect(this.controller.registerError).toBe(true);
                    done();
                }.bind(this));
                this.$httpBackend.flush();
            });
        });
    });
});
