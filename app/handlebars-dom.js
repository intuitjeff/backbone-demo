/*
Copyright 2014 Jeff Stanton
License: MIT License.
See /LICENSE.md for details.

A simple tool for loading Handlebars from the DOM, based
upon the ID of the DOM element.


Put your templates in a <script> tag in your page, and then use
this to load them and execute as Handlebars templates with the given context:

 <script type="text/x-handlebars-template" id="fooTemplate">
 The text in here is {{adjective}}
 </script>

 require(["handlebars-dom"], function(hbdom)
 {
   console.log(hbdom("fooTemplate", {adjective:"AWESOME!"}));
   // -> "The text in here is AWESOME!"
 });
 */

define(["handlebars"], function(Handlebars)
{
  var cache = {};

  //if context is omitted, the templating function will be returned
  //if context is provided, the templating function will be called and its result will be returned
  return function(templateId, context)
  {
    if (!cache.hasOwnProperty(templateId))
    {
      var elt = document.getElementById(templateId);
      var rawTemplate = "";
      if (elt)
        rawTemplate = elt.innerHTML || "";
        cache[templateId] = Handlebars.default.compile(rawTemplate);
    }
    //if no context return function
    var fn = cache[templateId];
    if (typeof context === "undefined")
      return fn;
    else
      return fn(context);
  }
});

