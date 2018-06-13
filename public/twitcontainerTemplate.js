(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twitcontainer'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.twit,depth0,{"name":"twit","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.posttwit,depth0,{"name":"posttwit","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<main class=\"twit-container\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</main>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showpost : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
})();