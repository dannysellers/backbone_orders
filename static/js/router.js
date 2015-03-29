/**
 * Created by danny on 3/18/15.
 */
define([
    'app',

    'models/session/SessionModel',
    'models/user/UserModel',

    'views/home/HomeView',
    'views/about/AboutView',
    'views/submitorder/SubmitOrderView',
    'views/faq/FAQView',
    'views/contactus/ContactUsView',
    'views/login/LoginView',
    'views/profile/ProfileView',
    'views/navbar/NavbarView'
], function (app, SessionModel, UserModel, HomeView, AboutView, SubmitOrderView, FAQView, ContactUsView, LoginView, ProfileView, NavbarView) {

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        // This 'prefilter' directs all generated Ajax requests to a
        // specific non-localhost URL
        // options.url = 'http://52.10.84.228/api' + options.url;
        options.url = 'http://127.0.0.1:8000/api' + options.url;
        //options.headers = { 'X-Auth-Token': app.session.access_token };
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
            // URL routes
            'about': 'showAbout',
            'submitorder': 'showSubmitOrder',
            'faq': 'showFAQ',
            'contact': 'showContactUs',
            'login': 'showLogin',
            'profile': 'showProfile',

            // Default (homepage)
            "*actions": 'defaultAction'
        },

        show: function (view, options) {

            // Establish the requested view into scope
            this.currentView = view;

            // Flag for views that need authentication
            if ( typeof options !== 'undefined' && options.requiresAuth ) {
                var self = this;
                if ( DEBUG ) console.log("Page requires authentication");
                if ( app.session.authenticated() ) {
                    if ( DEBUG ) console.log("User is authenticated");
                    self.currentView.render();
                } else {
                    if ( DEBUG ) console.log("User is not authenticated!");
                    self.navigate('/', { trigger: true, replace: true });
                }
            } else {
                if ( DEBUG ) console.log("Page does not require authentication");
                this.currentView.render();
            }
        },

        //$(document).delegate("ul.navbar.navbar-nav li a", "click", function (evt) {
        //    var loc = location.href.split("#/")[1];
        //
        //    // Sets the current page to be highlighted in the navbar
        //    // TODO: Use location.href vs. document.baseURI vs. document.URL?
        //    var liElements = document.getElementsByClassName('nav navbar-nav')[0].children;
        //    for (var i = 0; i < liElements.length; i++) {
        //        var a = liElements[i].children[0].href.split('/')[3];
        //        if (loc == a) {
        //            liElements[i].className = 'active';
        //        }
        //    }
        //});

        initialize: function () {
            if ( DEBUG ) console.log("initializing router");

            _.bindAll(this, 'show');

            this.on('route:showAbout', function () {
                var aboutView = new AboutView();
                this.show(aboutView);
            });

            this.on('route:showFAQ', function () {
                var faqView = new FAQView();
                this.show(faqView);
            });

            this.on('route:showContactUs', function () {
                var contactUsView = new ContactUsView();
                this.show(contactUsView);
            });

            this.on('route:showLogin', function () {
                var loginView = new LoginView();
                this.show(loginView);
            });

            this.on('route:defaultAction', function () {
                // No matching route found, display home page
                var homeView = new HomeView();
                this.show(homeView);
            });

            // Restricted access views

            this.on('route:showProfile', function () {
                var profileView = new ProfileView();
                this.show(profileView, { requiresAuth: true });
            });

            this.on('route:showSubmitOrder', function () {
                var submitOrderView = new SubmitOrderView();
                this.show(submitOrderView, { requiresAuth: true });
            });

            // Unlike the above, we don't call render on this view as it will handle
            // the render call internally after it loads data. Further more we load it
            // outside of an on-route function to have it loaded no matter which page is
            // loaded initially.
            var navbarView = new NavbarView();
            navbarView.render();
        }
    });

    return AppRouter;
});