'use strict';
var constantname = 'loopbackConstant';

module.exports = function(app) {
    app.constant(app.name + '.' + constantname, {
        baseUrl: 'https://mcflyio.herokuapp.com/api'
    });
};
