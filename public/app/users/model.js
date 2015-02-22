define(function (require) {

    'use strict';
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/users'
    });

});