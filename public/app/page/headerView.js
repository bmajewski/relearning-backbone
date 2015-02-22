define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var template = require('hbs!page/headerTemplate');

    return Backbone.View.extend({
        el: '#header',

        render: function(){
            this.$el.html(template());
            return this;
        }
    });
});