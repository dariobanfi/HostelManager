define(['backbone', 'models/Bathroom'], function (Backbone, Bathroom) {
    var Bathrooms = Backbone.Collection.extend({
        model: Bathroom
    });
    return Bathrooms;
});