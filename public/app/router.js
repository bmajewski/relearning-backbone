define(function (require) {

    'use strict';
    var mediator = require('mediator');
    var Backbone = require('backbone');
    var PageView = require('page/pageView');
    var globals = require('globals');


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
            window.localStorage.removeItem(globals.auth.TOKEN_KEY);
            window.localStorage.removeItem(globals.auth.USER_KEY);
            this.home();
        },

        login: function() {
            console.log('routing - login');
            require(['login/view'], function(View){
                mediator.trigger('page:displayView', new View());
            });
        },

        users: function() {
            console.log('routing - users');
            require(['users/collection', 'users/listView'], function(Collection, View) {
                var collection = new Collection();
                collection.fetch().done(function(){
                    mediator.trigger('page:displayView', new View({collection: collection}));
                });
            });
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