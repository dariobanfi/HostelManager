// This view is used for the configuration part
define(['jquery', 'underscore', 'backbone', 'models/Hostel', 'components/grid', 'bootstrap'],
    function ($, _, Backbone, Hostel, gridster) {
        var ConfigureView = Backbone.View.extend({
            template: _.template($('#configure-template').html()),



            // Event listeners bound to local functions
            events: {
                'click #saveconfig': 'saveConfig',
                'click #addroom': 'addPlace',
                'click #addbathroom': 'addPlace',
                'click #addcampingplace': 'addPlace',
                'click #confirmroom': 'confirmPlace',
                'click #confirmbathroom': 'confirmPlace',
                'click #confirmcampingplace': 'confirmPlace',
                'click #resetgrid': 'resetGrid'

            },

            // Renders the template with the given data (hostelName)
            render: function () {

                var variables = { hostelname: this.getHostelName() };

                this.$el.html(this.template(variables));
                return this;
            },


            saveConfig: function () {


                localStorage.removeItem('model_json')

                console.log(JSON.stringify(this.model));


                var gridster_instance = gridster.getGridster();

                var serialized = gridster_instance.serialize();



                // This step is necessary to store in the model the room position and size
                // which could have been changed by the user interaction
                var srooms = 0;
                var sbathrooms = 0;
                var scampingplaces = 0;


                for (i = 0; i < serialized.length; i++) {

                    var ser = serialized[i];

                    if (ser.id == '') {
                        this.model.get('bathrooms').at(sbathrooms).set('size_x', ser.size_x);
                        this.model.get('bathrooms').at(sbathrooms).set('size_y', ser.size_y);
                        this.model.get('bathrooms').at(sbathrooms).set('cols', ser.col);
                        this.model.get('bathrooms').at(sbathrooms).set('rows', ser.row);
                        sbathrooms++;
                    }
                    else if (ser.id.slice(0, 4) === 'Room') {
                        this.model.get('rooms').at(srooms).set('size_x', ser.size_x);
                        this.model.get('rooms').at(srooms).set('size_y', ser.size_y);
                        this.model.get('rooms').at(srooms).set('cols', ser.col);
                        this.model.get('rooms').at(srooms).set('rows', ser.row);
                        srooms++;
                    }
                    else if (ser.id.slice(0, 7) === 'Camping') {
                        this.model.get('campingplaces').at(scampingplaces).set('size_x', ser.size_x);
                        this.model.get('campingplaces').at(scampingplaces).set('size_y', ser.size_y);
                        this.model.get('campingplaces').at(scampingplaces).set('cols', ser.col);
                        this.model.get('campingplaces').at(scampingplaces).set('rows', ser.row);
                        scampingplaces++;
                    }
                    else {
                        console.log("Error!");
                    }
                }


                // Converting the model to json and storing it to localStorage
                var model_json = JSON.stringify(this.model);

                console.log(model_json);
                localStorage.setItem('model_json', model_json);


            },

            addPlace: function (event) {
                var buttonstr = event.target.id;
                if (buttonstr == 'addroom') {
                    $('#bathroomcard').addClass('hide');
                    $('#campingplacecard').addClass('hide');
                    $('#roomcard').removeClass('hide');
                }
                else if (buttonstr == 'addcampingplace') {
                    $('#roomcard').addClass('hide');
                    $('#bathroomcard').addClass('hide');
                    $('#campingplacecard').removeClass('hide');
                }
                else if (buttonstr == 'addbathroom') {
                    $('#roomcard').addClass('hide');
                    $('#campingplacecard').addClass('hide');
                    $('#bathroomcard').removeClass('hide');
                }
                else {
                    console.log('error');
                }

            },


            // Cleans up the grid
            resetGrid: function () {
                var gridster_instance = gridster.getGridster();

                gridster_instance.remove_all_widgets();
            },

            confirmPlace: function (event) {
                var buttonstr = event.target.id;
                if (buttonstr == 'confirmroom') {
                    var num = parseInt($('#number').val());
                    var beds = parseInt($('#beds').val());
                    var bath = $('input[name=bathroomincluded]:checked', '#configureform').val();
                    var air = $('input[name=airconditioning]:checked', '#configureform').val();
                    $('#number').val(num + 1);
                    this.model.addRoom({number: num, idAttribute: 'Room' + num, beds: 2, bathroom: bath, air: air});

                }
                else if (buttonstr == 'confirmcampingplace') {

                    var number = parseInt($('#campingplacenumber').val());
                    var terrain = $("#terrain option:selected").text();
                    var shadow = $('input[name=shadow]:checked', '#configureform1').val();
                    var electricity = $('input[name=electricity]:checked', '#configureform1').val();
                    $('#campingplacenumber').val(number + 1);
                    this.model.addCampingplace({number: number, idAttribute: 'Camping' + number, terrain: terrain, shadow: shadow, electricity: electricity});

                }
                else if (buttonstr == 'confirmbathroom') {
                    var showers = parseInt($('#showers').val());
                    var wcs = parseInt($('#wcs').val());
                    this.model.addBathroom({wcs: wcs, showers: showers});

                }
                else {
                    console.log('error');
                }
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

        return ConfigureView;
    });