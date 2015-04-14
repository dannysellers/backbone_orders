/**
 * Configuration for aliases and dependencies
 */

if ( typeof DEBUG === 'undefined' ) DEBUG = true;

require.config({
    baseUrl: 'static/js/',

    paths: {
        'jquery': 'libs/jquery/jquery-1.11.2',
        'jqcookie': 'libs/jquery.cookie/jquery.cookie',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'bootstrap': '../vendor/bootstrap/js/bootstrap',
        'text': 'text',
        //'parsley': 'libs/parsley/parsley',
        templates: '../../templates'
    },

    // non-AMD lib
    shim: {
        'bootstrap': { deps: ['jquery'], exports: 'Bootstrap' },
        'jqcookie': { deps: ['jquery'], exports: 'Cookie' }
        //'parsley': { deps: ['jquery'] }
    }
});

define('models/model_cookie',
    ['backbone', 'jqcookie'],
    function (Backbone) {
        // Override cookie/session-related methods to use jQuery cookie

        return Backbone.Model.extend({
            initialize: function () {
                this.fetch();
                this.on('change', this.save, this);
            },

            fetch: function () {
                if ( DEBUG ) console.log("===== FETCH FIRED LOADING LOCAL STORAGE ====");
                //this.set(JSON.parse(localStorage.getItem(this.id)));
                this.set(JSON.parse($.cookie(this.id)));
            },

            save: function (attributes) {
                if ( DEBUG ) console.log("===== CHANGE FIRED SAVING LOCAL STORAGE ====");
                //localStorage.setItem(this.id, JSON.stringify(this.toJSON()));
                $.cookie(
                    this.id,
                    JSON.stringify(this.toJSON()),
                    {
                        expires: 1, // Cookie expires after 1 day
                        path: app.root // Cookie is valid across entire site
                        //domain: "domain.com", // Singleton domain whitelist
                        //secure: true // Cookie transmission requires https
                    }
                );
            },

            destroy: function (options) {
                //localStorage.removeItem(this.id);
                $.removeCookie(this.id);
            },

            isEmpty: function () {
                return (_.size(this.attributes) <= 1); // just 'id'
            }
        })
    });

if ( DEBUG ) console.log("config.js passing off to main");

require(['main']); // Initialize the application with main
