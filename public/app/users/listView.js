define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var template = require('hbs!users/list');
    require('datatables');
    require('datatables-bootstrap3');

    return Backbone.View.extend({
        el: '#content',
        render: function(){
            this.$el.html(template({users: this.collection.toJSON()}));
            this.$('table').DataTable();
            return this;
        }
    });

});