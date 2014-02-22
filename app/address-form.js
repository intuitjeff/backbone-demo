/*
Copyright 2014 Jeff Stanton
License: MIT License.
See /LICENSE.md for details.

A simple demo of how to Backbone
*/

define(["backbone","handlebars-dom","jquery"], function(Backbone, HandlebarsDOM, $)
{
  var AddressForm = {};

  //obviously oversimplified but whatever
  AddressForm.Model = Backbone.Model.extend({
    defaults: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: ""
    }
  });

  AddressForm.View = Backbone.View.extend({
    tagName: "div",
    className: "addressForm",
    initialize: function()
    {
      this.render();
    },
    render: function()
    {
      var html = HandlebarsDOM("addressForm", this.model.toJSON());
      this.$el.html(html);
      //save some references for later
      this.saveButton = this.$("button.save");
      //by convention
      return this;
    },
    //allows us to deletage-bind DOM events
    events: {
      "input input.addr-street1": "checkNotEmpty",
      "input input.addr-city": "checkNotEmpty",
      "input input.addr-state": "checkNotEmpty",
      "input input.addr-zip": "checkNotEmpty",
      "click .save": "saveClicked"
    },

    checkNotEmpty: function(evt)
    {
      //events bound with Backbone view .events have <this> = the View
      //which is not quite the way jQuery events work (for jQuery, <this> = the DOM element)
      var val = evt.target.value;
      $(evt.target).toggleClass("error", !val);
    },

    saveClicked: function(evt)
    {
      this.saveButton.prop("disabled", true);
      this.$("input").prop("disabled", true);
    }

  });

  return AddressForm;

})