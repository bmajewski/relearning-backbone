define(function (require) {

    'use strict';

    var globals = require('globals');
    var mediator = require('mediator');
    var Permissions = require('permissions');

    function _authenticated(response) {
        window.localStorage.setItem(globals.auth.TOKEN_KEY, response.token);
        window.localStorage.setItem(globals.auth.USER_KEY, response._id);
        _initializeUser();
        mediator.trigger('router:navigate', {route: 'home', options: {trigger: true}});
    }

    function _logout() {
        window.localStorage.removeItem(globals.auth.TOKEN_KEY);
        window.localStorage.removeItem(globals.auth.USER_KEY);
        _user = null;
        mediator.trigger('page:updateUserInfo');
        mediator.trigger('router:navigate', {route: 'home', options: {trigger: true}});
    }

    mediator.on('app:authenticated', _authenticated, this);
    mediator.on('app:logout', _logout);

    function _isAuthenticated() {
        return window.localStorage.getItem(globals.auth.TOKEN_KEY);
    }

    var User = require('users/model');
    var _user;
    var _applicationInfo;
    var _permissions;

    function _initialize() {
        var d = $.Deferred();
        if (_applicationInfo !== null) {
            d.resolve();
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

    function _initializeUser() {
        var d = $.Deferred();
        if (_isAuthenticated() && !_user) {
            _user = new User({_id: window.localStorage.getItem(globals.auth.USER_KEY)});
            _user.fetch().success(function () {
                mediator.trigger('page:updateUserInfo');
                _permissions = new Permissions(_user.get('permissions'));
                d.resolve();
            });
        } else {
            d.resolve();
        }
        return d.promise();
    }

    function _getApplicationInfo() {
        return _applicationInfo;
    }

    function _getUser() {
        return _user || new User();
    }

    function _getPermissions() {
        return _permissions;
    }
    return {
        isAuthenticated: _isAuthenticated,
        initialize: _initialize,
        initializeUser: _initializeUser,
        getApplicationInfo: _getApplicationInfo,
        getUser: _getUser,
        getPermissions: _getPermissions
    }
});