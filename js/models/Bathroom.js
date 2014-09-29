define(['backbone'], function (Backbone) {
    var Bathroom = Backbone.Model.extend({

        defaults: {
            showers : 0,
            wcs: 0
        },

        gethtml: function(){


            if(this.get('cols')== undefined && this.get('rows') == undefined){
                var bathroom_representation = ['<li style="font-size:x-small;">Bathroom<br>WCs: ' + this.get('wcs') +
                    '<br>Showers: ' + this.get('showers') + '</li>', this.get('size_x'), this.get('size_y')];

                return bathroom_representation;
            }

            else{

                console.log(this.get('cols'));
                var bathroom_representation = ['<li style="font-size:x-small;">Bathroom<br>WCs: ' + this.get('wcs') +
                    '<br>Showers: ' + this.get('showers') + '</li>', this.get('size_x'), this.get('size_y'), this.get('cols'), this.get('rows')];

                return bathroom_representation;
            }


        }
    });

    return Bathroom;
});