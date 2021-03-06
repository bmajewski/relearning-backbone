define(function (require) {

    var globals = require('globals');
    var Router = require('router');
    var mediator = require('mediator');
    var toastr = require('toastr');

    _.extend(Backbone.View.prototype, {
        // Handle cleanup of view.
        close: function () {
            if (this.beforeClose) {
                // Perform any cleanup specific to this view.
                this.beforeClose();
            }

            if (this.model) {
                // Remove all callbacks for this view's model.
                this.model.off(null, null, this);
                this.model = null;
            }

            // Something else might be named 'collection' so also check for the
            // existence of `off`
            if (this.collection && this.collection.off) {
                // Remove all callbacks for this view's collection.
                this.collection.off(null, null, this);
                this.collection = null;
            }

            // Remove all delegated events.
            this.undelegateEvents();
            this.off(null, null, this);

            // Remove all markup.
            this.$el.empty();
        }
    });

    $.ajaxSetup({
        statusCode: {
            401: function (context) {
                mediator.trigger('router:navigate', {route: 'login', options: {trigger: true}});
            },

            403: function(context){
                console.log('message', context.responseJSON.message);
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr["error"](context.responseJSON.message);
            }
        },
        beforeSend: function (xhr) {
            var token = window.localStorage.getItem(globals.auth.TOKEN_KEY);
            xhr.setRequestHeader('x-access-token', token);
        }
    });



    var router = new Router();
    Backbone.history.start({pushState: false});

    if (Backbone.history.fragment === '') {
        mediator.trigger('router:navigate', {route: 'home', options: {trigger: true}});
    }
});