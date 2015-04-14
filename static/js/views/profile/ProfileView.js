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
            _.bindAll(this, 'render', 'parseShipments', 'numLength'); //, 'getInvoice');
        },

        //events: {
        //    "click a.ship-invoice": "getInvoice"
        //},

        render: function () {

            if ( app.session.user.attributes.account ) {
                var u = app.session.user.toJSON();
                var ushipments = u.shipments;
                var storedShipments = this.parseShipments(ushipments)[0];
                var pastShipments = this.parseShipments(ushipments)[1];

                this.$el.html(this.template({
                    user: u,
                    storedShipments: storedShipments,
                    pastShipments: pastShipments,
                    numLength: this.numLength
                }));
            } else {
                Backbone.history.navigate("#/");
            }

            return this;
        },

        parseShipments: function (shipmentList) {
            var storedShipmentList = [];
            var pastShipmentList = [];

            _.each(shipmentList.toJSON(), function (shipment) {
                if ( shipment.status != 'Shipped' ) {
                    storedShipmentList.push(shipment);
                } else {
                    pastShipmentList.push(shipment);
                }
            });

            return [storedShipmentList, pastShipmentList];
        },

        numLength: function (val, length) {
            // Return value truncated to a specified length after the decimal.
            if ( !val ) {
                return '0.00';
            } else {
                var _length = parseInt(length);
                var _string = val.toString().split('.');
                // Make sure there's a number after the decimal
                if ( _string.length == 1 ) {
                    _string.push('00');
                }
                // Truncate it if necessary
                if ( _string[1].length == 1 ) {
                    _string[1] = _string[1] + '0';
                } else if ( _string[1].length > 1 ) {
                    _string[1] = _string[1].slice(0, 2);
                }
                return _string[0] + '.' + _string[1].slice(0, _length);
            }
        }

        //getInvoice: function (evt) {
        //    //if (DEBUG) console.log(evt);
        //    var shipid = evt.currentTarget.id;
        //
        //    $.ajax({
        //        url: '/invoice/' + shipid + '/',
        //        type: 'GET',
        //        success: function (data, textStatus, jqXHR) {
        //            // TODO: Retrieve PDF (URL?) from API
        //            if ( DEBUG ) console.log("Invoice retrieved successfully");
        //        },
        //        error: function (jqXHR, textStatus, errorThrown) {
        //            if ( DEBUG ) console.log(jqXHR.responseJSON.detail);
        //            if ( DEBUG ) console.log(errorThrown);
        //        }
        //    })
        //}
    });

    return ProfileView;
});