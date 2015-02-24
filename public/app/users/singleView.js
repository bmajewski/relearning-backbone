define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var mediator = require('mediator');
    var template = require('hbs!users/single');

    require('stickit');

    var User = require('users/model');

    return Backbone.View.extend({
        initialize: function (options) {
            this.title = options ? options.title : 'Please Set A Title';
            this.model = this.model || new User();
        },

        bindings: {
            '#name': 'name',
            '#email': 'email',
            '#password': 'password'
        },

        events: {
            'click .js-saveUser': 'saveUser'
        },

        render: function () {
            this.$el.html(template({title: this.title}));
            this.stickit();
            return this;
        },

        saveUser: function () {
            var self = this;
            this.model.save().done(function (response) {
                if (self.model.isNew()) {
                    self.model.set('_id', response._id);
                }
                mediator.trigger('users:userSaved', self.model);
            });
        }
    });

});