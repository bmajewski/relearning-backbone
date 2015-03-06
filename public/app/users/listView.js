define(function (require) {

    'use strict';
    var Backbone = require('backbone');
    var mediator = require('mediator');
    var template = require('hbs!users/list');
    var app = require('app');

    var SingleView = require('users/singleView');
    require('bootstrap-modal');
    require('backbone.bootstrap-modal');

    require('datatables');
    require('datatables-bootstrap3');

    return Backbone.View.extend({
        initialize: function(){
            this.bindPageEvents();
        },
        el: '#content',

        events: {
            'click .js-editUser': 'editUser',
            'click .js-deleteUser': 'deleteUser'
        },

        render: function () {
            this.$el.html(template({users: this.collection.toJSON(), admin: app.getPermissions().isAdmin() }));
            this.$('table').DataTable({
                "aoColumns": [
                    null,
                    null,
                    null,
                    { "bSortable": false }
                ]
            });
            return this;
        },

        editUser: function(e) {
            var id = $(e.currentTarget).attr('data-id');
            var options = id ? {title: 'Edit User', model: this.collection.get(id)} : {title: 'Add User'};
            var modalView = new SingleView(options);
            this.modal = new Backbone.BootstrapModal({content: modalView}).open();
        },

        deleteUser: function(e){
            var self = this;
            var id = $(e.currentTarget).attr('data-id');
            var user = this.collection.get(id);
            user.destroy({wait: true}).done(function(){
                self.collection.remove(user);
                self.render();
            });
        },

        bindPageEvents: function(){
            mediator.on('users:userSaved', this.userSaved, this);
        },

        userSaved: function(user){
            this.modal.close();
            this.collection.add(user);
            this.render();
        }
    });

});