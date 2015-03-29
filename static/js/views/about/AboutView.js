/**
 * Created by danny on 3/18/15.
 */
define([
    'app',
    'text!templates/about/aboutTemplate.html'
], function (app, aboutTemplate) {

    var AboutView = Backbone.View.extend({
        el: $(".page"),

        render: function () {
            this.$el.html(aboutTemplate);
        }
    });

    return AboutView;
});