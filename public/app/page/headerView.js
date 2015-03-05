define(function (require) {

    'use strict';

    var app = require('app');
    var Backbone = require('backbone');
    var mediator = require('mediator');
    var template = require('hbs!page/headerTemplate');

    return Backbone.View.extend({
        el: '#header',

        initialize: function(){
            this.bindPageEvents();
        },

        render: function(){
            this.$el.html(template(this.model.toJSON()));
            return this;
        },

        bindPageEvents: function(){
            mediator.on('page:updateUserInfo', this.updateUserInfo, this);
        },

        updateUserInfo: function(){
            this.model = app.getUser();
            this.render();
        }
    });
});