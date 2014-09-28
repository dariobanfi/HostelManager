define(['jquery', 'underscore', 'backbone', 'toastr', 'bootstrap'],
    function ($, _, Backbone, toastr) {
        var WelcomeView = Backbone.View.extend({
            template: _.template($('#welcome-template').html()),
            render: function () {
                this.$el.html(this.template());
                return this;
            },
            events: {
                'click #startbutton': 'checkFull'
            },

            // Checking if the hostelname is set and preventing
            // the link followup if not
            checkFull: function (event) {

                if ($('#hostelnametext').val() == '') {
                    event.preventDefault()
                    toastr.warning('You should set a hostel name!');
                }
                else {
                    this.model.set('name', $('#hostelnametext').val());
                    localStorage.setItem('hostel_name', $('#hostelnametext').val());
                }
            }
        });


        return WelcomeView;
    });