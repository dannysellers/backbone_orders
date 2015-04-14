/**
 * Created by danny on 3/18/15.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    if ( DEBUG ) console.log("app.js invoked");

    var App = {
        root: '/',          // The root path to run the app through
        //URL: '/~danny/gh/',  // Base application URL
        URL: '/',
        API: '/api'         // Base API URL (used by models and collections)
    };

    $.ajaxSetup({
        // Force ajax call on all browsers
        cache: false,
        // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
        statusCode: {
            401: function () {
                // Redirect the to the login page.
                window.location.replace('#/login');
            },
            403: function () {
                // 403 -- Access denied
                window.location.replace('#/');
            }
        }
    });

    // Global event aggregator
    App.eventAggregator = _.extend({}, Backbone.Events);

    return App;
});
