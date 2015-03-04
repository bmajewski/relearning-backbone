define(function (require) {

    'use strict';

    var globals = require('globals');
    var mediator = require('mediator');



    function _authenticated(response) {
        window.localStorage.setItem(globals.auth.TOKEN_KEY, response.token);
        window.localStorage.setItem(globals.auth.USER_KEY, response._id);
        mediator.trigger('router:navigate', {route: 'home', options: {trigger: true}});
    }

    function _logout(){
        window.localStorage.removeItem(globals.auth.TOKEN_KEY);
        window.localStorage.removeItem(globals.auth.USER_KEY);
        _applicationInfo = null;
        _user = new User();
        mediator.trigger('router:navigate', {route: 'home', options: {trigger: true}});
    }
    
    mediator.on('app:authenticated', _authenticated, this);
    mediator.on('app:logout', _logout);


    function _isAuthenticated(){
        return window.localStorage.getItem(globals.auth.TOKEN_KEY);
    }

    var User = require('users/model');
    var _applicationInfo = null;
    var _user = new User();

    function _initialize(){
        var d = $.Deferred();
        if ( _applicationInfo !== null ){
            return d.resolve();
        } else {
            $.ajax({
                url: globals.urls.APP_INFO,
                success: function (data) {
                    _applicationInfo = data;
                    d.resolve();
                }
            });
        }

        return d.promise();
    }

    function _initializeUser(){
        var d = $.Deferred();
        if (typeof _user.get('_id') !== 'undefined'){
            return d.resolve();
        } else {
            _user.set('_id', window.localStorage.getItem(globals.auth.USER_KEY));
            _user.fetch().success( function(data){
                console.log('data', data);
                _user = new User(data);
                console.log('user', _user);
                return d.resolve();
            });
        }
        return d.promise();
    }

    function _getApplicationInfo(){
        return _applicationInfo;
    }

    function _getUser(){
        return _user;
    }

    return {
        isAuthenticated: _isAuthenticated,
        initialize: _initialize,
        initializeUser: _initializeUser,
        getApplicationInfo: _getApplicationInfo,
        getUser: _getUser
    }

});