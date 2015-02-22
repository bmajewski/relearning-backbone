define(function (require) {

    'use strict';
    var mediator = require('mediator');
    var Backbone = require('backbone');
    var PageView = require('page/pageView');


    return Backbone.Router.extend({
        initialize: function () {
            this.pageView = new PageView();
            this.pageView.render();
            this.bindApplicationEvents();
        },

        routes: {
            '': 'home',
            'home': 'home'
        },

        home: function () {
            console.log('routing - home');
            require(['welcome/view'], function (View) {
                mediator.trigger('page:displayView', new View());
            });
        },

        bindApplicationEvents: function () {
            mediator.on('router:navigate', this._navigate, this);
        },

        _navigate: function (context) {
            console.log('routing - trigger to ', context.route);
            this.navigate(context.route, context.options);
        }
    });

});