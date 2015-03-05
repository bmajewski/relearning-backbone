define(function (require) {

    'use strict';
    var mediator = require('mediator');
    var Backbone = require('backbone');
    var PageView = require('page/pageView');
    var globals = require('globals');
    var app = require('app');


    return Backbone.Router.extend({
        initialize: function () {
            this.pageView = new PageView();
            this.pageView.render();
            this.bindApplicationEvents();
        },

        routes: {
            '': 'home',
            'home': 'home',
            'users': 'users',
            'login': 'login',
            'logout': 'logout'
        },

        logout: function() {
            mediator.trigger('app:logout');
        },

        login: function() {
            console.log('routing - login');
            require(['login/view'], function(View){
                mediator.trigger('page:displayView', new View());
            });
        },

        users: function() {
            console.log('routing - users');
            if (app.isAuthenticated() ){
                require(['users/collection', 'users/listView'], function(Collection, View) {
                    var collection = new Collection();
                    collection.fetch().done(function(){
                        mediator.trigger('page:displayView', new View({collection: collection}));
                    });
                });
            } else {
                this.login();
            }
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