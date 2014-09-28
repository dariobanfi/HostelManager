define(['backbone', 'models/Room'], function (Backbone, Room) {
    var Reservation = Backbone.Model.extend({

        defaults: {
            date : null,
            client : null,
            place : null

        }

    });

    return Reservation;
});