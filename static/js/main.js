/**
 * Created by danny on 3/18/15.
 */

require([
    // Load our app module and pass it to definition function
    'app',
    'router',
    'models/session/SessionModel'
], function (app, AppRouter, SessionModel) {

    // Use GET and POST only, to support all browsers
    //Backbone.emulateHTTP = true;

    // Create a new session model and scope it to the app global
    // This will be a singleton that other modules can access
    app.session = new SessionModel({});

    app.router = new AppRouter({});

    // Start routing.
    Backbone.history.start({ root: app.root });

    //Backbone.Model.prototype.toJSON = function () {
    //    // Fix to make Backbone's toJSON method recursive
    //    // From http://stackoverflow.com/a/17050871
    //    var json = _.clone(this.attributes);
    //    for ( var attr in json ) {
    //        if ( (json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection) ) {
    //            json[attr] = json[attr].toJSON();
    //        }
    //    }
    //    return json;
    //};
});