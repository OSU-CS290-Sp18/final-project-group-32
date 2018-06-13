(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twitscripts'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script src=\"/twitTemplate.js\" defer></script>\r\n<script src=\"/twitcontainerTemplate.js\" defer></script>\r\n<script src=\"/index.js\" charset=\"utf-8\" defer></script>\r\n";
},"useData":true});
})();