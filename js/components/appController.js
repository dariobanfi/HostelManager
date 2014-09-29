// Instantiates the views and manages application status

define(['jquery', 'underscore', 'backbone', 'models/Hostel'], function ($, _, Backbone, Hostel) {
    var AppController = {
        currentView: null,
        hostel: new Hostel(),

        home: function() {
            var self = this;
            require(['views/WelcomeView'], function(WelcomeView) {
                var view = new WelcomeView({model: AppController.hostel});
                self.renderView.call(self, view);
            });
        },

        configure: function () {
            var self = this;
            require(['views/ConfigureView'], function (ConfigureView) {
                localStorage.clear();
                var view = new ConfigureView({model: AppController.hostel});
                self.renderView.call(self, view);
            });
        },

        manage: function (viewing_date) {
            var self = this;
            require(['views/ManageView'], function (ManageView) {
                var view = new ManageView({ model: AppController.hostel, viewing_date: viewing_date  });
                self.renderView.call(self, view);
                view.renderGrid();
            });
        },

        renderView: function(view) {
            this.currentView && this.currentView.remove();
            $('#main').html(view.render().el);
            this.currentView = view;

        } }

    return AppController;
});