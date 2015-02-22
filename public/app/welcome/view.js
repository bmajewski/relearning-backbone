define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var template = require('hbs!welcome/template');

    return Backbone.View.extend({
        el: '#content',
        render: function() {
            this.$el.html(template());
        }
    });

});