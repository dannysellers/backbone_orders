/**
 * Created by danny on 3/18/15.
 */
define([
    'app',
    'text!templates/submitorder/submitOrderTemplate.html'
], function (app, submitOrderTemplate) {

    var SubmitOrderView = Backbone.View.extend({
        el: $(".page"),
        template: _.template(submitOrderTemplate),

        initialize: function () {
            _.bindAll(this, 'render', 'submitWorkOrder');
        },

        events: {
            "submit #submit-order-form": "submitWorkOrder"
        },

        render: function () {
            if ( DEBUG ) console.log("Submit order view");
            this.$el.html(this.template({
                user: app.session.user.toJSON()
            }));
            return this;
        },

        submitWorkOrder: function (evt) {
            if ( DEBUG ) console.log("Submitting work order for " + app.session.user.attributes.username);
            var form = evt.currentTarget;

            //var outputElement = $("#return-message");
            //outputElement.html('');
            //outputElement.removeClass('bg-danger bg-warning bg-success');
            // Remove all style attributes (only display: none) to make it show up on first run
            //outputElement.removeAttr('style');

            // Form elements
            var acct = $("#inputAccount").val().toLowerCase();
            var phone = $("#inputPhone").val().toLowerCase();
            var email = $("#inputEmail").val().toLowerCase();
            var quantity = $("#inputQuantity").val().toLowerCase();
            var description = $("#inputDescription").val();
            var tracking = $("#inputTracking").val();
            var geninspection = $("#gen-inspection")[0].checked;
            var photoinspection = $("#photo-inspection")[0].checked;
            var itemcount = $("#item-count")[0].checked;
            var barcodes = $("#barcodes")[0].checked;
            var boxing = $("#boxing")[0].checked;
            var consolidation = $("#consolidation")[0].checked;
            var palletization = $("#palletizing")[0].checked;
            var miscservices = $("#misc-services")[0].checked;
            var miscservicetext = $("#inputMisc").val();

            var params = {
                acct: acct,
                phone: phone,
                email: email,
                quantity: quantity,
                description: description,
                tracking: tracking,
                geninspection: geninspection,
                photoinspection: photoinspection,
                itemcount: itemcount,
                barcodes: barcodes,
                boxing: boxing,
                consolidation: consolidation,
                palletization: palletization,
                miscservices: miscservices,
                miscservicetext: miscservicetext
            };

            $.ajax({
                url: '/submitorder/' + app.session.user.attributes.account.acct + '/',
                type: 'POST',
                data: params,
                success: function (data, textStatus, jqXHR) {
                    if (DEBUG) console.log("Work order submitted successfully.");
                    // TODO: Add message system
                    Backbone.history.navigate("#/");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (DEBUG) console.log("Error submitting work order.");
                    if (DEBUG) console.log(errorThrown);
                    //outputElement.html(err.statusText);
                    //outputElement.html(err.statusCode().responseText)
                }
            });
            evt.preventDefault();
        }
    });

    return SubmitOrderView;
});