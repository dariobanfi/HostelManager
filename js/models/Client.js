define(['backbone'], function (Backbone) {
    var Client = Backbone.Model.extend({
        defaults: {
            name: 'DummyName',
            surname : 'DummySurname',
            nationality : 'DummyNationality',
            passport : 'DummyPassport'
        }
    });


    return Client;
});