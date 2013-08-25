var Project = Backbone.Model.extend({
  // This is a model of the data that describes its behavior
  idAttribute: 'slug',
  defaults: {
    name: "Default Project",
    slug: 'default-project',
    github_url: "http://github.com/tjblonsk/portfolio",
    live_url: "http://tjblonsk.com",
    thumbnail_url: "http://github.com/tjblonsk/portfolio/preview.png",
    description: "Default description"
  }
});