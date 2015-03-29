/**
 * Created by danny on 3/18/15.
 */
define([
    'app',
    'text!templates/faq/faqTemplate.html'
], function (app, faqTemplate) {

    var FAQView = Backbone.View.extend({
        el: $(".page"),

        render: function () {
            this.$el.html(faqTemplate);
        }
    });

    return FAQView;
});