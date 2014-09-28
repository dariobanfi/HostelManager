define(['backbone', 'models/Room'], function (Backbone, Room) {
    var Rooms = Backbone.Collection.extend({
        model: Room
    });
    return Rooms;
});