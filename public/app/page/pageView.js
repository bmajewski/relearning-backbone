define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var mediator = require('mediator');
    var template = require('hbs!page/pageTemplate');
    var HeaderView = require('page/headerView');


    return Backbone.View.extend({
        el: '#page',

        initialize: function () {
            this.contentView = null;
            this.bindPageEvents();
        },

        render: function () {
            this.$el.html(template());
            this.headerView = new HeaderView();
            this.headerView.render();
            return this;
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