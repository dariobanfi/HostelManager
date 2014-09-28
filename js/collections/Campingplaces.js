define(['backbone', 'models/Campingplace'], function (Backbone, Campingplace) {
    var Campingplaces = Backbone.Collection.extend({
        model: Campingplace
    });
    return Campingplaces;
});