/**
 * Created by danny on 3/19/15.
 */
define([
    'app',
    'text!templates/navbar/navbarTemplate.html',
    'bootstrap' // Passes bootstrap js to the template (for collapsed menu)
], function (app, navbarTemplate) {

    var NavbarView = Backbone.View.extend({
        el: $("#navbar-container"),
        template: _.template(navbarTemplate),

        initialize: function () {
            _.bindAll(this, 'render', 'onLogoutClick', 'onLoginStatusChange');

            // Listen for session logged_in state changes and re-render
            app.session.on("change:logged_in", this.onLoginStatusChange);
        },

        events: {
            "click #logout" : "onLogoutClick"
        },

        onLoginStatusChange: function (evt) {
            this.render();
            if ( app.session.get("logged_in") ) console.log(app.session.user.attributes.username + " logged in");
        },

        onLogoutClick: function (evt) {
            evt.preventDefault();
            // No callbacks needed because of session event listening
            app.session.logout({});
        },

        render: function () {
            if ( DEBUG ) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({
                logged_in: app.session.get("logged_in"),
                user: app.session.user.toJSON()
            }));
            return this;
        }

    });

    return NavbarView;

});