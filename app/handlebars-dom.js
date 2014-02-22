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

