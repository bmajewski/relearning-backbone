define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var globals = require('globals');
    var mediator = require('mediator');
    var template = require('hbs!login/template');

    return Backbone.View.extend({
        el: '#content',

        events: {
            'click .js-login': 'login'
        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        login: function (e) {
            e.preventDefault();
            var formValues = {
                email: this.$('#email').val(),
                password: this.$('#password').val()
            };
            this.$('.alert').hide();
            console.log('login with ', formValues);
            $.ajax({
                url: globals.urls.AUTHENTICATE,
                type: 'POST',
                dataType: 'json',
                data: formValues,
                success: function(response){
                    if (response.success){
                        mediator.trigger('app:authenticated', response);
                    } else {
                        self.$('.alert-warning').text(response.message).show();
                    }
                }
            });
        }
    });

});