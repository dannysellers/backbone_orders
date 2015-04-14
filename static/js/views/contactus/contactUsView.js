/**
 * Created by danny on 3/18/15.
 */
define([
    'app',
    'text!templates/contactus/contactUsTemplate.html'
], function (app, contactUsTemplate) {

    var ContactUsView = Backbone.View.extend({
        el: $(".page"),

        initialize: function () {
            _.bindAll(this, 'render', 'submitContactForm');
        },

        events: {
            "submit #contact-form": "submitContactForm"
        },

        render: function () {
            this.$el.html(contactUsTemplate);
        },

        submitContactForm: function (evt) {
            evt.preventDefault();
            if ( DEBUG ) console.log("Submitting Contact Us form");
            var form = evt.currentTarget;
            var btn = $("#submitButton");
            var eleResponse = $("#response");

            btn.attr('disabled', true);
            btn.html("Submitting...");

            // Form elements
            var phone = $("#inputContactPhone").val();
            var email = $("#inputContactEmail").val();
            var message = $("#inputContactMessage").val();

            if ( !phone && !email ) {
                // Enforce including at least their phone or their email
                evt.preventDefault();
                eleResponse.html("Please enter either your phone or your email address.");
                btn.attr('disabled', false);
                btn.html("Submit");
                return false
            }

            var params = {
                phone: phone,
                email: email,
                message: message
            };

            $.ajax({
                url: '/contact/',
                type: 'POST',
                data: params,
                success: function (data, textStatus, jqXHR) {
                    if ( DEBUG ) console.log("Form submitted successfully.");
                    eleResponse.html(jqXHR.responseJSON.message);
                    btn.attr('disabled', false);
                    btn.html("Submit")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ( DEBUG ) console.log("Error submitting Contact Us form.");
                    if ( errorThrown.message ) {
                        eleResponse.html("Error submitting form: " + errorThrown.message);
                    } else {
                        eleResponse.html("Error submitting form: " + errorThrown);
                    }
                    if ( DEBUG ) console.log(errorThrown);
                    btn.attr('disabled', false);
                    btn.html("Submit")
                }
            });
        }
    });

    return ContactUsView;
});