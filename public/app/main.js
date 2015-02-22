define(function (require) {

    var Router = require('router');
    var mediator = require('mediator');

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


    var router = new Router();
    Backbone.history.start({pushState: false});

    if (Backbone.history.fragment === '') {
        mediator.trigger('router:navigate', {route: 'home', options: {trigger: true}});
    }
});