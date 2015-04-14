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
            _.bindAll(this, 'url', 'updateSessionUser', 'postAuth', 'authenticated', 'login', 'logout');

            if ( DEBUG ) console.log("New Session initialized");

            // Singleton user object
            // Can be accessed with app.session.user
            this.user = new UserModel({});
        },

        url: function () {
            return '/auth';
        },

        updateSessionUser: function (UserData, method) {
            this.user.set(_.pick(UserData, _.keys(this.user.defaults)));
            //if ( DEBUG ) console.log("Updating session user");
            //if ( DEBUG ) console.log([UserData]);
            //$.cookie('auth_cookie', {
            //    auth_token: app.session.access_token,
            //    user_id: app.session.user_id
            //});
        },

        authenticated: function () {
            //return (app.session.user_id && app.session.access_token) ? true : false;
            return Boolean(this.get('access_token') && this.get('user_id'));
        },

        postAuth: function (opts, callback, args) {
            // Abstracted function to make a POST request to the auth
            // endpoint. Takes care of updating the user and session
            // after receiving an API response
            var self = this;
            var postData = _.omit(opts, 'method');
            //if ( DEBUG ) console.log(postData);
            $.ajax({
                url: this.url() + '/' + opts.method + '/',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(_.omit(opts, 'method')),
                success: function (res) {
                    if ( DEBUG ) console.log(["Login request details: ", res]);
                    if ( !res.error ) {
                        if ( _.indexOf(['login'], opts.method) !== -1 ) {
                            self.updateSessionUser(res.user, opts.method);
                            self.set({
                                user_id: res.user,
                                access_token: res.key
                            });
                            self.user.getInfo();
                            Backbone.history.navigate("profile", { trigger: true });
                        } else {
                            self.set({ logged_in: false, access_token: null, user_id: null });
                        }

                        if ( callback && 'success' in callback ) callback.success(res);
                    } else {
                        if ( callback && 'error' in callback ) callback.error(jqXHR, textStatus, errorThrown);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ( callback && 'error' in callback ) callback.error(jqXHR, textStatus, errorThrown);
                }
            }).complete(function (jqXHR, textStatus) {
                if ( callback && 'complete' in callback ) callback.complete(jqXHR, textStatus);
            });
        },

        login: function (opts, callback, args) {
            this.postAuth(_.extend(opts, { method: 'login' }), callback);
        },

        logout: function (opts, callback, args) {
            this.postAuth(_.extend(opts, { method: 'logout' }), callback);
        }
    });

    return SessionModel;
});