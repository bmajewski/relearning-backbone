define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var app = require('app');
    var template = require('hbs!page/headerTemplate');

    return Backbone.View.extend({
        el: '#header',

        render: function () {
            var self = this;
            app.initialize().done(function () { // Gets nonauthenticated application info
                app.initializeUser().done(function () { // Ensure user is loaded if authenticated or blank user if not
                    self.$el.html(template(
                        {
                            applicationInfo: app.getApplicationInfo(),
                            user: app.getUser()
                        }));
                    return self;
                })
            })
        }
    });
});