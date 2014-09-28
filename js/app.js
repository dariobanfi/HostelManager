//Require.js module bootstrapping

requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        models: '../models',
        collections: '../collections',
        views: '../views',
        routers: '../routers',
        components: '../components',
        'datepicker': 'bootstrap-datepicker',
        'toastr': 'toastr'

    }, shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'datepicker' : {
            deps: ["jquery", "bootstrap"],
            exports: 'datepicker'
        },
        'toastr' : {
            deps: ["jquery"],
            exports: 'toastr'
        }

    } });

require(['routers/router'], function (router) {
    $(document).ready(function (){
        router.start();
    });
});