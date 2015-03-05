define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var mediator = require('mediator');
    var template = require('hbs!page/pageTemplate');
    var HeaderView = require('page/headerView');

    var app = require('app');

    return Backbone.View.extend({
        el: '#page',

        initialize: function () {
            this.contentView = null;
            this.bindPageEvents();
        },

        render: function () {
            var self = this;
            // Gets nonauthenticated application info
            app.initialize().done(function () {
                // Ensure user is loaded if authenticated or blank user if not
                app.initializeUser().done(function () {
                    self.$el.html(template());
                    self.headerView = new HeaderView({model: app.getUser()});
                    self.headerView.render();
                    return self;
                });
            });
        },

        bindPageEvents: function () {
            mediator.on('page:displayView', this.displayView, this);
        },

        displayView: function (view) {
            if (this.contentView !== null) {
                this.contentView.close();
                this.contentView = null;
            }

            this.contentView = view;
            if (this.contentView) {
                this.contentView.render();
            }
        }
    });

});