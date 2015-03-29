/**
 * Created by danny on 3/19/15.
 */
define([
    'app',
    'models/user/UserModel'
], function (app, UserModel) {

    var SessionModel = Backbone.Model.extend({

        defaults: {
            logged_in: false,
            access_token: null,
            user_id: null
        },

        initialize: function () {
            _.bindAll(this, 'updateSessionUser', 'authenticated', 'login', 'logout', 'load');

            if ( DEBUG ) console.log("new Session initialized");

            // Singleton user object
            // Can be accessed with app.session.user
            this.user = new UserModel({});
            //return this.load();
        },

        updateSessionUser: function (UserData, method) {
            var self = this;
            this.user.set(_.pick(UserData, _.keys(this.user.defaults)));
            if ( DEBUG ) console.log("Updating session user");
            if ( DEBUG ) console.log([UserData]);
            this.set({
                auth_token: UserData.key,
                user_id: UserData.user
            });
            //$.cookie('auth_cookie', {
            //    auth_token: app.session.access_token,
            //    user_id: app.session.user_id
            //});
            if ( method == "login" ) {
                // TODO: Have visual indication of logging in versus getting account details
                this.user.getInfo();
            } else if ( method == "logout" ) {
                self.set({
                    user_id: null,
                    logged_in: false,
                    access_token: null
                });
                //self.destroy('auth_cookie')
            }
        },

        authenticated: function () {
            //return (app.session.user_id && app.session.access_token) ? true : false;
            return Boolean(this.get('auth_token') && this.get('user_id'));
        },

        load: function () {
            var self = this;
            return this.set({
                access_token: self.get('auth_token'),
                user_id: self.get('user_id')
            });
        },

        login: function (login, password, options) {
            // Make an AJAX call to the login API
            // Once authenticated, call this.save() with the auth_token
            // options is a param to enable attaching onAuthenticated or onNotAuthenticated callbacks
            var self = this;
            var url = '/auth/login/';
            if ( DEBUG ) console.log("Logging in...");
            var params = {
                username: login,
                password: password
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: params,
                success: function (res) {
                    console.log(["Login request details: ", res]);

                    if ( !res.error ) {
                        self.set({
                            user_id: res.user,
                            // Don't set logged_in as true immediately because
                            // we still need to get information about the user.
                            // app.session.user.getInfo() sets logged_in after
                            // retrieval.
                            access_token: res.key
                        });
                        self.updateSessionUser(res, 'login');
                        Backbone.history.navigate("#/profile");
                    } else {
                        self.set({ logged_in: false });
                        $(".alert-error").text(data.error.text).show();
                    }
                }
            })
        },

        logout: function () {
            // Call the logout API to destroy the current session token and cookie
            // Then, update the session and user objects
            var url = '/auth/logout/';
            var self = this;
            if ( DEBUG ) console.log("Logging out");
            $.ajax({
                url: url,
                type: 'POST',
                success: function (res) {
                    if ( !res.error ) {
                        if ( DEBUG ) console.log("Logged out successfully");
                        self.updateSessionUser(self.user.defaults, 'logout');
                        Backbone.history.navigate("#/");
                    } else {
                        console.log("Logout error: " + res.error);
                    }
                }
            });
        }
    });

    return SessionModel;
});