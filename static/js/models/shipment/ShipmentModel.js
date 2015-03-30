/**
 * Created by danny on 3/27/15.
 */
define([
    'app'
], function(app) {

    var ShipmentModel = Backbone.Model.extend({

        defaults: {
            shipid: 0,
            labortime: 0,
            status: "Inducted",
            storage_fees: 0.00,
            items: [],
            extras: []
        }

    });

    return ShipmentModel;

});