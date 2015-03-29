/**
 * Created by danny on 3/18/15.
 */
define([
    'app',
    'text!templates/contactus/contactUsTemplate.html'
], function (app, contactUsTemplate) {

    var ContactUsView = Backbone.View.extend({
        el: $(".page"),

        render: function () {
            this.$el.html(contactUsTemplate);
        }
    });

    return ContactUsView;
});