/**
 * Created by danny on 3/19/15.
 */
define([
    'app',
    'models/session/SessionModel',
    'text!templates/login/loginTemplate.html'
], function (app, SessionModel, loginTemplate) {

    var LoginView = Backbone.View.extend({
        el: $(".page"),

        initialize: function () {
            _.bindAll(this, 'render', 'login', 'onPasswordKeyup');
        },

        events: {
            'click #loginButton': 'login'
        },

        login: function (evt) {
            if ( evt ) evt.preventDefault(); // Prevent the button from submitting the form
            $('.alert-error').hide(); // Hide all errors on a new submit
            console.log("Logging in...");

            var login = $("#inputEmail").val();
            var password = $("#inputPassword").val();

            app.session.login(login, password);

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
        }
    });

    return LoginView;

});