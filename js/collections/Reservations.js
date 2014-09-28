define(['backbone', 'models/Reservation'], function (Backbone, Reservation) {
    var Reservations = Backbone.Collection.extend({
        model: Reservation
    });
    return Reservations;
});