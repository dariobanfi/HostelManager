define(['backbone'], function (Backbone) {
    var Campingplace = Backbone.Model.extend({

        defaults: {
            number : -1,
            idAttribute: 'CampingX',
            terrain : '',
            shadow: false,
            electricity: false
        },

        gethtml: function(){

            if(this.get('cols')== undefined && this.get('rows') == undefined){
                var campingplace_representation = ['<li id="' + this.get('idAttribute') + '" style="font-size:x-small;">' + this.get('idAttribute') +
                    ' <br>Number: ' + this.get('number') +
                    '<br>Terrain: ' + this.get('terrain') + '<br>Shadow: ' + this.get('shadow') +
                    '<br>Electricity: ' + this.get('electricity') + '<br><a id="' + this.get('idAttribute')  +
                    'details" href="#" class="hide detailsmodal">Details</a></li>', this.get('size_x'), this.get('size_y')];

                return campingplace_representation;
            }

            else{
                var campingplace_representation = ['<li id="' + this.get('idAttribute') + '" style="font-size:x-small;">' + this.get('idAttribute') +
                    ' <br>Number: ' + this.get('number') +
                    '<br>Terrain: ' + this.get('terrain') + '<br>Shadow: ' + this.get('shadow') +
                    '<br>Electricity: ' + this.get('electricity') + '<br><a id="' + this.get('idAttribute')  +
                    'details" href="#" class="hide detailsmodal">Details</a></li>', this.get('size_x'), this.get('size_y'), this.get('cols'), this.get('rows')];

                return campingplace_representation;
            }


        }
    });

    return Campingplace;
});