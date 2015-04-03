/**
 * Created by danny on 3/19/15.
 */
define([
    'app',
    'text!templates/login/loginTemplate.html'
], function (app, loginTemplate) {

    var LoginView = Backbone.View.extend({
        el: $(".page"),

        initialize: function () {
            _.bindAll(this, 'render', 'onLoginAttempt', 'onPasswordKeyup');
        },

        events: {
            'click #loginButton': 'onLoginAttempt'
        },

        onLoginAttempt: function (evt) {
            if ( evt ) evt.preventDefault();

            var btn = $("#loginButton");
            btn.attr('disabled', true);
            btn.html("Authenticating...");
            var resElement = $("#login-response");
            app.session.login({
                username: $("#inputEmail").val(),
                password: $("#inputPassword").val()
            }, {
                success: function (res) {
                    if ( DEBUG ) console.log("Logged in successfully", res);
                },
                error: function (jqXHR, textStatus) {
                    if ( DEBUG ) console.log("Login error: ", textStatus);
                    btn.html('Sign In');
                    btn.attr('disabled', false);
                    resElement.html(textStatus.toString()).show();
                }
                // TODO: Error logging / notification
            });

            ////////////////
            //if ( evt ) evt.preventDefault();
            //
            //if ( this.$("#login-form").parsley('validate') ) {
            //    app.session.login({
            //        username: this.$("#inputEmail").val(),
            //        password: this.$("#inputPassword").val()
            //    }, {
            //        success: function (mod, res) {
            //            if ( DEBUG ) console.log("SUCCESS", mod, res);
            //        },
            //        error: function (err) {
            //            if ( DEBUG ) console.log("ERROR", err);
            //            // trigger invalid form signal
            //        }
            //    });
            //} else {
            //    // Invalid client-side validation
            //    if (DEBUG) console.log("Did not pass client-side validation")
            //}
        },

        onPasswordKeyup: function (evt) {
            // Allow enter press to trigger login
            var k = evt.keyCode || evt.which;

            if ( k == 13 && $("#inputPassword").val() === '' ) {
                // Prevent enter press when password field is empty
                evt.preventDefault();
            } else if ( k == 13 ) {
                evt.preventDefault();
                //this.onLoginAttempt();
                return false;
            }
        },

        render: function () {
            console.log("Rendering login view...");
            this.$el.html(loginTemplate);
            $("#login-response").hide();
        }
    });

    return LoginView;

});