/**
 * Created by danny on 3/29/15.
 */
define([
    'app'
], function(app) {

    var ExtraModel = Backbone.Model.extend({

        defaults: {
            description: '',
            quantity: 0,
            total_cost: 0.00,
            unit_cost: 0.00
        }

    });

    return ExtraModel;

});