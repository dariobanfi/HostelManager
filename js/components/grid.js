// Gridster instance bound to the div with id #gridster

define(['jquery', 'jquery.gridster'], function ($, Gridster) {

    return {

        getGridster: function(){
            gridster_instance = $(".gridster ul").gridster({
                widget_base_dimensions: [70, 70],
                widget_margins: [5, 5],
                helper: 'clone',
                resize: {
                    enabled: true
                },

                // What to save when serializing the gridster data
                serialize_params: function($w, wgd) {
                    return {
                        id: wgd.el[0].id,
                        col: wgd.col,
                        row: wgd.row,
                        size_x: wgd.size_x,
                        size_y: wgd.size_y,
                        htmlContent: $($w).html()
                    };
                }
            }).data('gridster');

            return gridster_instance;
        }
    }

});
