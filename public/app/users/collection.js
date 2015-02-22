define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var Model = require('users/model');

    return Backbone.Collection.extend({
        model: Model,
        url: '/api/users'
    });
});