/**
 * Created by danny on 3/19/15.
 */
define([
    'app',
    'models/shipment/ShipmentModel',
    'models/inventory/InventoryModel',
    'models/extra/ExtraModel',
    'collections/shipments/ShipmentCollection'
], function (app, ShipmentModel, InventoryModel, ExtraModel, ShipmentCollection) {

    var UserModel = Backbone.Model.extend({

        defaults: {
            account: null,
            username: null,
            email: null,
            name: null,
            shipments: []
        },

        // Attrs should include:
        // URL ('/customers/' + self.acct)
        // getShipmentById(shipid)
        // generateShipInvoice(shipid)
        // generateBillingSummary(dateStart, dateEnd)

        initialize: function () {
            if ( DEBUG ) console.log("new UserModel initialized");
            _.bindAll(this, 'url', 'getInfo', 'parseUser')
        },

        url: function () {
            return app.API + '/customers/' + this.account.acct + '/';
        },

        parseUser: function (userData) {
            // Parse user data received, creating Shipment,
            // Inventory, and Extra (extra services/costs) objects
            var self = this;
            self.set({
                account: userData.customer,
                username: userData.username,
                email: userData.email,
                name: userData.customer.name
            });

            var shipmentList = [];
            var shipments = userData.customer.shipments;

            _.each(shipments, function(shipment) {

                var inventoryList = [];

                _.each(shipment.inventory, function(item) {
                    var modelInventory = new InventoryModel({
                        itemid: item.itemid,
                        status: item.status_text,
                        storage_fees: item.storage_fees,
                        incurring_fees: item.get_storage_fees != 0,
                        volume: item.volume
                    });

                    inventoryList.push(modelInventory);
                });

                var extraList = [];

                _.each(shipment.extras, function(extra) {
                    var modelExtra = new ExtraModel({
                        description: extra.description,
                        quantity: extra.quantity,
                        total_cost: extra.total_cost,
                        unit_cost: extra.unit_cost
                    });

                    extraList.push(modelExtra);
                });

                var modelShipment = new ShipmentModel({
                    shipid: shipment.shipid,
                    labortime: shipment.labor_time,
                    status: shipment.status_text,
                    storage_fees: shipment.storage_fees,
                    items: inventoryList,
                    extras: extraList
                });

                shipmentList.push(modelShipment);
            });

            var shipmentCollection = new ShipmentCollection(shipmentList);
            self.set({ shipments: shipmentCollection });
        },

        getInfo: function () {
            // Function to retrieve info about the account
            // To be called post-login
            if ( DEBUG ) console.log("User getInfo called");
            var self = this;
            var url = '/users/';
            $.ajax({
                url: url + app.session.attributes.user_id + '/',
                type: 'GET',
                success: function (res) {
                    if ( !res.error ) {
                        if ( DEBUG ) console.log("Got user info successfully");
                        self.parseUser(res);

                        // Once we've retrieved account info about the user,
                        // set logged_in to true so the navbar re-renders with
                        // the appropriate information
                        app.session.set({
                            logged_in: true
                        });
                    } else {
                        console.log("getInfo error: " + res.error);
                    }
                }
            });
        }

    });

    return UserModel;

});