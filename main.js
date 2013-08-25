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


//Router/Controller combination
var AppRouter = Backbone.Router.extend({
  //Setup Routes
  routes:{
    // url:method
    '':'index',
    'project/:slug':'getProject' //Router catches this URL change. Runs 'getProject()'
  },
  initialize: function() {
    // STEP 4: intialize routes with data.
    // This gives me app.projects
     this.projects = new Projects([
        new Project({name: "Workout Builder", slug: "first-project",
                    github_url: "http://github.com/tjblonsk/workout_builder",
                    live_url: "http://nameless-everglades-2928.herokuapp.com/",
                    thumbnail_url: "http://www.makeathumbnail.com/thumbnails/image194025.png",
                    description: "My first application (individual) utilized 5 models, 3 controllers, relational databasing, YouTube API, and Twitter Bootstrap to create an application for creating and storing workouts referencing videos from YouTube."}),
        new Project({name: "Explorer", slug: "second-project",
                    github_url: "http://github.com/tjblonsk/explorer",
                    live_url: "http://powerful-journey-3230.herokuapp.com/",
                    description: "The second application (two-person team)   utilized 3 models, 2 controllers, 4Square API, Yelp API, Leaflet API to build a mapping application in which users can explore and save favorited locations."
                    })
      ]);
  },
  index: function() {
    // STEP 7: When someone goes to the index. This happens
    // Create a new instance of our AppView, pass in all our projects
    var appView = new AppView({collection: this.projects});
    // STEP 9: Calls render on appView
    appView.render();
  },
  getProject: function(slug) {
    // STEP 18: We are passed the 'slug' variable from the URL
    var project = this.projects.get(slug); // STEP 19: Searching for the matching project
    // STEP 20 : Create a new instance of ProjectView, passing in the project
    var projectView = new ProjectView({model: project});
    // STEP 21: Render the projectView
    projectView.render();
  }
});