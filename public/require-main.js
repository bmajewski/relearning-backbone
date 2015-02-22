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
        "datatables-bootstrap3": "../components/datatables-bootstrap3-plugin/media/js/datatables-bootstrap3"
    }
});

require(['main']);