define(['backbone'], function (Backbone) {
    var Room = Backbone.Model.extend({

        defaults: {
            number : -1,
            idAttribute: 'RoomX ',
            beds : 0,
            bathroom: false,
            air: false,

            size_x: 1,
            size_y:1



        },

        gethtml: function(){

            if(this.get('cols')== undefined && this.get('rows') == undefined){
                var room_representation = ['<li id="' + this.get('idAttribute') + '" style="font-size:x-small;">' + this.get('idAttribute') +
                    ' <br>Number: ' + this.get('number') +
                    '<br>Beds: ' + this.get('beds') + '<br>Bathroom: ' + this.get('bathroom') +
                    '<br>Air: ' + this.get('air') + '<br><a id="' + this.get('idAttribute')  +
                    'details" href="#" class="hide detailsmodal">Details</a></li>', this.get('size_x'), this.get('size_y')];

                return room_representation;
            }

            else{
                var room_representation = ['<li id="' + this.get('idAttribute') + '" style="font-size:x-small;">' + this.get('idAttribute') +
                    ' <br>Number: ' + this.get('number') +
                    '<br>Beds: ' + this.get('beds') + '<br>Bathroom: ' + this.get('bathroom') +
                    '<br>Air: ' + this.get('air'    ) + '<br><a id="' + this.get('idAttribute')  +
                    'details" href="#" class="hide detailsmodal">Details</a></li>', this.get('size_x'), this.get('size_y'), this.get('cols'), this.get('rows')];

                return room_representation;
            }


        }
    });

    return Room;
});