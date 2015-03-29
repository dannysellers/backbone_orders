/**
 * Created by danny on 3/27/15.
 */
define([
    'app',
    'models/shipment/ShipmentModel'
], function(app, ShipmentModel) {

    var ShipmentCollection = Backbone.Collection.extend({
        model: ShipmentModel,

        initialize: function(models, options) {
            // this.add([shipment1, shipment2, ...]);
        }

    });

    return ShipmentCollection;

});