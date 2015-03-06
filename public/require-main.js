requirejs.config({
    baseUrl: "app",

    paths: {
        "jquery": "../components/jquery/dist/jquery",
        "underscore": "../components/underscore/underscore",
        "backbone": "../components/backbone/backbone",
        "handlebars": "../components/handlebars/handlebars.amd",
        "text": "../components/requirejs-text/text",
        "hbs": "../components/require-handlebars-plugin/hbs",
        "datatables": "../components/datatables/media/js/jquery.dataTables",
        "datatables-bootstrap3": "../components/datatables-bootstrap3-plugin/media/js/datatables-bootstrap3",
        "bootstrap-modal": "../components/bootstrap/js/modal",
        "backbone.bootstrap-modal": "../components/backbone.bootstrap-modal/src/backbone.bootstrap-modal",
        "stickit" : "../components/backbone.stickit/backbone.stickit",
        "toastr" : "../components/toastr/toastr"
    }
});

require(['main', 'app']);