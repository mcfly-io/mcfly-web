'use strict';

module.exports = function(app) {
    // inject:start
    require('./home')(app);
    require('./root')(app);
    // inject:end
};