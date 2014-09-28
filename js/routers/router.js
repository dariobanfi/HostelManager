// Routes the URLs to the appropriate view

define(['jquery', 'underscore', 'backbone', 'components/appController'], function ($, _, Backbone,
                                                                                   AppController) {
    var router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'manage/:date': 'manage',
            'configure': 'configure'
        },
        initialize: function() {
            var routeName;
            for (var route in this.routes) {
                routeName = this.routes[route];
                this.route(route, routeName, $.proxy(AppController[routeName], AppController));
            } },
        start: function () {
            Backbone.history.start();
        } });
    return new router();
});