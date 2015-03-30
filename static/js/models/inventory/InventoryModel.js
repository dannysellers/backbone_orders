/**
 * Created by danny on 3/28/15.
 */
define([
    'app'
], function(app) {

    var InventoryModel = Backbone.Model.extend({

        defaults: {
            itemid: 0,
            status: 'Inducted',
            storage_fees: 0.00,
            incurring_fees: false,
            volume: 0.00
        }

    });

    return InventoryModel;

});