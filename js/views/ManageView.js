// This view is used for the management of the reservations

define(['jquery', 'underscore', 'backbone', 'components/grid', 'models/Client', 'models/Reservation', 'toastr', 'routers/router',
        'datepicker', 'bootstrap'],
    function ($, _, Backbone, gridster, Client, Reservation, toastr, Router) {
        var ManageView = Backbone.View.extend({
            template: _.template($('#manage-template').html()),
            view_date: new Date().setHours(0, 0, 0, 0),


            initialize: function (args) {


                // Setting the view date depending on the URL

                var viewing_date = args.viewing_date;
                if (viewing_date == 'today') {
                    viewing_date = new Date();
                    viewing_date.setHours(0, 0, 0, 0);

                }
                else {

                    var month = viewing_date.slice(0, 2);
                    var day = viewing_date.slice(2, 4);
                    var year = viewing_date.slice(4, 8);
                    var str = month + "/" + day + "/" + year;
                    viewing_date = new Date(Date.parse(str));

                }

                this.view_date = viewing_date;
            },


            render: function () {

                var variables = { hostelname: this.getHostelName(), date: this.getDate(), view_date: this.getViewDate() };

                this.$el.html(this.template(variables));

                return this;
            },

            renderGrid: function () {

                // Instantiating calendar widgets (here because DOM has already been loaded)
                $(function () {
                    $('#dp6').datepicker({
                        todayBtn: 'linked'
                    });

                    $('#datefield').datepicker(
                        {format: 'mm/dd/yyyy'}
                    );

                    // Changing the visualization based of the view date
                    $('#dp6').datepicker()
                        .on('changeDate', function (e) {
                            var date = new Date(Date.parse(e.date));
                            var day = date.getDate().toString();
                            var day = (day < 10 ? "0" + (day) : day).toString();
                            var month = date.getMonth();
                            var month = (month < 9 ? "0" + (month + 1) : month + 1).toString();
                            var year = date.getFullYear().toString();
                            var datestr = month + day + year;

                            Router.navigate('#/manage/' + datestr, {trigger: true});
                        });


                });

                var gridster_instance = gridster.getGridster();

                var places = this.model.getPlaces();

                // Using in memory model, straight after configuration process
                if (places.length > 0) {
                    for (i = 0; i < places.length; i++) {
                        gridster_instance.add_widget.apply(gridster_instance, places[i].gethtml());
                    }
                }
                // Loading config from localStorage data
                else if (places.length == 0) {
                    var hotel_config = JSON.parse(localStorage.getItem('model_json'));
                    this.model.set('name', hotel_config.name);
                    for (i = 0; i < hotel_config.rooms.length; i++) {
                        var room = hotel_config.rooms[i];
                        var model_room = this.model.addRoom({number: room.number, idAttribute: room.idAttribute, beds: room.beds, bathroom: room.bathroom, air: room.air,
                            size_x: room.size_x, size_y: room.size_y, cols: room.cols, rows: room.rows});
                    }

                    for (i = 0; i < hotel_config.campingplaces.length; i++) {
                        var place = hotel_config.campingplaces[i];
                        var model_place = this.model.addCampingplace({number: place.number, idAttribute: place.idAttribute, terrain: place.terrain, shadow: place.shadow, electricity: place.electricity,
                            size_x: place.size_x, size_y: place.size_y, cols: place.cols, rows: place.rows});
                    }

                    for (i = 0; i < hotel_config.bathrooms.length; i++) {
                        var place = hotel_config.bathrooms[i];
                        var model_place = this.model.addBathroom({wcs: place.wcs, showers: place.showers});
                    }
                }

                else {
                    // Poll here the REST api to create the configuration

                    toastr.warning('No hostel configuration found');
                }


                // Disabling grid

                gridster_instance.disable();
                gridster_instance.disable_resize();

                // Adding the ids in the assign select
                for (i = 0; i < this.model.get('rooms').length; i++) {
                    var id = this.model.get('rooms').at(i).get('idAttribute');
                    $("#assignto").append('<option value="' + id + '">' + id + '</option>');
                }

                for (i = 0; i < this.model.get('campingplaces').length; i++) {
                    var id = this.model.get('campingplaces').at(i).get('idAttribute');
                    $("#assignto").append('<option value="' + id + '">' + id + '</option>');


                }
                var viewdate = this.view_date;

                this.model.get('reservations').each(function (reservation) {

                    if (+reservation.get('date') == +viewdate) {
                        var id = '#' + reservation.get('place').get('idAttribute');
                        $(id).addClass('fullplace');
                        $(id + 'details').removeClass('hide');
                    }
                });

            },

            events: {
                'click #confirmovernight': 'confirmOvernight',
                'click a.detailsmodal': 'showClientModal'
            },


            // Toggles the modal with the client data
            showClientModal: function (event) {
                var id = event.target.id;
                id = id.slice(0, id.length - 7);
                event.preventDefault();
                $('#clientModal').modal('toggle');

                var client = this.model.getClientDetails(this.view_date, id);
                $('#modalname').text(client.get('name'));
                $('#modalsurname').text(client.get('surname'));
                $('#modalnationality').text(client.get('nationality'));
                $('#modalpassport').text(client.get('passport'));
            },

            confirmOvernight: function () {
                var name = $('#name').val();
                var surname = $('#surname').val();
                var nationality = $('#nationality').val();
                var passport = $('#passport').val();
                var numnights = $('#numnights').val();
                var assignto = $("#assignto option:selected").text();
                var selecteddate = $('#datefield').val();

                var client = new Client({name: name, surname: surname, nationality: nationality, passport: passport});
                var place = this.model.getPlace(assignto);

                for (var i = 0; i < numnights; i++) {
                    var date = new Date(Date.parse(selecteddate));
                    date.setHours(0, 0, 0, 0);
                    date.setDate(date.getDate() + i);
                    console.log('adding reserv for ' + date.toString());
                    var reservation = new Reservation({date: date, client: client, place: place});
                    var val = this.model.addReservation(reservation);

                    if (val) {
                        toastr.success("Reservation succesfully added");
                        if (+reservation.get('date') == +this.view_date) {
                            var id = '#' + reservation.get('place').get('idAttribute');
                            $(id).addClass('fullplace');
                            $(id + 'details').removeClass('hide');

                        }
                    }

                    else {
                        toastr.error('A reservation you\'re trying to add overlaps with an existing one');
                    }

                }

            },

            getDate: function () {
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth();
                var month = month < 10 ? "0" + (month + 1) : month + 1;
                var year = currentDate.getFullYear();

                return month + "/" + day + "/" + year;
            },


            getViewDate: function () {
                var currentDate = this.view_date
                var day = currentDate.getDate();
                var month = currentDate.getMonth();
                var month = month < 10 ? "0" + (month + 1) : month + 1;
                var year = currentDate.getFullYear();

                return month + "/" + day + "/" + year;
            },

            getHostelName: function () {
                if (this.model.get('name') == 'My Hostel') {
                    return localStorage.getItem('hostel_name')

                }
                else {
                    return this.model.get('name');
                }

            }



        });


        return ManageView;
    });