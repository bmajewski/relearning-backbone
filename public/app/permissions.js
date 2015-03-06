define(function (require) {

    'use strict';

    var _ = require('underscore');

    return function(permissions){
        this.isAdmin = function(){
            return _.contains(permissions, 'admin');
        };
    }

});