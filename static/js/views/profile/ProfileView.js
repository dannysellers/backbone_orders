/**
 * Created by danny on 3/27/15.
 */
define([
    'app',
    'text!templates/profile/profileTemplate.html'
], function (app, profileTemplate) {

    var ProfileView = Backbone.View.extend({
        el: $(".page"),
        template: _.template(profileTemplate),

        initialize: function () {
            _.bindAll(this, 'render', 'parseShipments');
        },

        render: function () {

            if ( app.session.user.attributes.account ) {
                var u = app.session.user.toJSON();
                var ushipments = u.shipments;
                var storedShipments = this.parseShipments(ushipments)[0];
                var pastShipments = this.parseShipments(ushipments)[1];

                this.$el.html(this.template({
                    user: u,
                    storedShipments: storedShipments,
                    pastShipments: pastShipments
                }));
            } else {
                Backbone.history.navigate("#/");
            }

            return this;
        },

        parseShipments: function(shipmentList) {
            var storedShipmentList = [];
            var pastShipmentList = [];

            _.each(shipmentList.toJSON(), function(shipment) {
                if (shipment.status != 'Shipped') {
                    storedShipmentList.push(shipment);
                } else {
                    pastShipmentList.push(shipment);
                }
            });

            return [storedShipmentList, pastShipmentList];
        }
    });

    return ProfileView;
});