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


// This is a collection that represents a set of my data
var Projects = Backbone.Collection.extend({
  model: Project
});

var AppView = Backbone.View.extend({
  // This sets up the main page
  el: $('#main'),
  initialize: function() {
    // Populate the application with my appView template
    var appViewTemplate = $('#appView-template').html();
    this.$el.html(appViewTemplate);
    // Cache commonly used selectors
    this.list = $('#project-list');
  },
  render: function() {
    // Create views for each Project in the Projects collection
    this.collection.each(function(project){
      // Generate the backbone view object and set the model
      // Each project gets its own view
      var view = new ProjectListView({model: project});

      // Using the cached object from initialize, append the new view to the list
      this.list.append(view.render().el);
    }, this);

    return this;
  }
});


var ProjectListView = Backbone.View.extend({
  // Setup and render the individual project
  tagName: 'li',
  events: {
    // Register a click event
    'click':'view'
  },
  initialize: function() {
    // Don't need to do anything here yet
  },
  render: function() {
    // Handlebars stuff below
    var source = $('#project-template').html(),
      template = Handlebars.compile(source),
      data = this.model.toJSON(),
      templateHTML = template(data);
      this.$el.html(templateHTML);

    return this;
  },
  // The click event triggers this method
  view: function() {
    // Navigate to the Project page, which goes back through the router
    app.navigate('project/' + this.model.get('slug'), true);
  }
});


var ProjectView = Backbone.View.extend({
  el: $('#main'),
  initialize: function () {

  },
  render: function () {
    // STEP 21: Handlebars stuff
    var source = $('#detailed-project-template').html(),
      template = Handlebars.compile(source),
      templatedHTML = template(this.model.toJSON());
    // STEP 22: Replace all the HTML on the #main div
    this.$el.html(templatedHTML);
    return this;
  }
});


//Router/Controller combination
var AppRouter = Backbone.Router.extend({
  //Setup Routes
  routes:{
    // url:method
    '':'index',
    'project/:slug':'getProject' //Router catches this URL change. Runs 'getProject()'
  },
  initialize: function() {
    // Intializing routes with data.
    // This gives me app.projects
     this.projects = new Projects([
        new Project({name: "Workout Builder", slug: "workoutBuilder",
                    github_url: "http://github.com/tjblonsk/workout_builder",
                    live_url: "http://nameless-everglades-2928.herokuapp.com/",
                    thumbnail_url: "http://www.makeathumbnail.com/thumbnails/image194025.png",
                    description: "My first application (individual) utilized 5 models, 3 controllers, relational databasing, YouTube API, and Twitter Bootstrap to create an application for creating and storing workouts referencing videos from YouTube."}),
        new Project({name: "Explorer", slug: "explorer",
                    github_url: "http://github.com/tjblonsk/explorer",
                    live_url: "http://powerful-journey-3230.herokuapp.com/",
                    thumbnail_url: "http://www.makeathumbnail.com/thumbnails/image194053.png",
                    description: "The second application (two-person team) utilized 3 models, 2 controllers, 4Square API, Yelp API, Leaflet API to build a mapping application in which users can explore and save favorited locations."
                    })
      ]);
  },
  index: function() {
    // When someone goes to the index. This happens
    // Create a new instance of the AppView, pass in all my projects
    var appView = new AppView({collection: this.projects});
    // Calls render on appView
    appView.render();
  },
  getProject: function(slug) {
    // Passed the 'slug' variable from the URL
    var project = this.projects.get(slug); // Searching for the matching project
    // Create a new instance of ProjectView, passing in the project
    var projectView = new ProjectView({model: project});
    // Render the projectView
    projectView.render();
  }
});


$(function() {
  // Create instance of Router
  app = new AppRouter();

  // Start History
  Backbone.history.start();

});