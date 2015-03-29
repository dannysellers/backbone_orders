/**
 * Created by danny on 3/18/15.
 */
define([
    'app',
    'text!templates/home/homeTemplate.html'
], function (app, homeTemplate) {

    var HomeView = Backbone.View.extend({
        el: $(".page"),

        render: function () {
            this.$el.html(homeTemplate);
        }
    });

    return HomeView;
});