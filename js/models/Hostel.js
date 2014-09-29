// This modal is the center of the application logic
// It holds all the data within itself, including place types and reservations

define(['backbone', 'models/Room', 'models/Campingplace', 'models/Bathroom', 'collections/Rooms',
        'collections/Campingplaces', 'collections/Bathrooms', 'collections/Reservations', 'components/grid'],
    function (Backbone, Room, Campingplace, Bathroom, Rooms, Campingplaces, Bathrooms, Reservations, gridster) {
        var Hostel = Backbone.Model.extend({
            defaults: {
                name: 'My Hostel',
                rooms: new Rooms(),
                campingplaces: new Campingplaces(),
                bathrooms: new Bathrooms,
                reservations: new Reservations()
            },

            addRoom: function (attrs) {
                var room = new Room(attrs);

                var gridster_instance = gridster.getGridster();
                gridster_instance.add_widget.apply(gridster_instance, room.gethtml());

                this.get('rooms').add(room);

                return room;
            },


            addCampingplace: function (attrs) {
                var place = new Campingplace(attrs);

                var gridster_instance = gridster.getGridster();
                gridster_instance.add_widget.apply(gridster_instance, place.gethtml());

                this.get('campingplaces').add(place);

                return place;
            },


            addBathroom: function (attrs) {
                var place = new Bathroom(attrs);

                var gridster_instance = gridster.getGridster();
                gridster_instance.add_widget.apply(gridster_instance, place.gethtml());

                this.get('bathrooms').add(place);

                return place;
            },

            // Returns the place Model depending on the given id
            getPlace: function (id) {

                if (id.slice(0, 4) === 'Room') {
                    for (i = 0; i < this.get('rooms').length; i++) {
                        if (this.get('rooms').at(i).get('idAttribute') === id) {
                            return this.get('rooms').at(i);
                        }
                    }
                }

                else {

                    for (i = 0; i < this.get('campingplaces').length; i++) {
                        if (this.get('campingplaces').at(i).get('idAttribute') === id) {
                            return this.get('campingplaces').at(i);
                        }
                    }
                }


                return null;
            },

            // Returns all the places within the hostel

            getPlaces: function () {
                var retVal = [];
                this.get('rooms').each(function (room) {
                    retVal.push(room);
                });
                this.get('campingplaces').each(function (campingplace) {
                    retVal.push(campingplace);
                });
                this.get('bathrooms').each(function (bathroom) {
                    retVal.push(bathroom);
                });

                return retVal;
            },

            addReservation: function (reservation) {
                var reservations = this.get('reservations');
                for (i = 0; i < reservations.length; i++) {
                    var cmp_res = reservations.at(i);
                    if (reservation.get('place') === cmp_res.get('place') && reservation.get('date').valueOf() === cmp_res.get('date').valueOf()) {
                        return false;
                    }
                }
                this.get('reservations').add(reservation);
                return true;

            },

            // Returns a client by looking up reservation for a given date and placeId
            getClientDetails: function (date, placeId) {
                var place = this.getPlace(placeId);
                for (i = 0; i < this.get('reservations').length; i++) {

                    if (this.get('reservations').at(i).get('place') === place && date.valueOf() === this.get('reservations').at(i).get('date').valueOf()) {
                        return this.get('reservations').at(i).get('client');
                    }
                }

                return "No Client found for this reservation";
            },

            clearData: function(){

                // clearning data to avoid misconfigurations
                console.log('clearing old config');
                this.get('rooms').reset();
                this.get('campingplaces').reset();
                this.get('bathrooms').reset();
                this.get('reservations').reset();
            },

            validate: function (attrs, options) {
                if (attrs.name.length == 0) {
                    return "You must add a hostel name!";
                }
            }
        });


        return Hostel;
    });