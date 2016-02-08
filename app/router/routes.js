// Router.configure({
//     layoutTemplate: 'main' // this is the main template
// });

// Router.configure({
//     layoutTemplate: 'main',
//     yieldTemplates: {
//         myNav: {to: 'Navbar'},
//         myFooter: {to: 'Footer'},
//     }
// });
//
// AccountsTemplates.configure({
//     defaultLayout: 'main',
// });

// Landing page routes ---------------------------------------------------------
Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.route('/about');
Router.route('/HowItWorks');

// Emergence routes ------------------------------------------------------------
Router.route('/emergence/doi/:doi*', function() {
    this.render('DOI', {data: {doi: this.params.doi}})
    Session.set('DOI', this.params.doi);
});

Router.route('/emergence/hash/:hashkey*', function() {
  this.render('EmergenceVector')
  Session.set('vectkey', this.params.hashkey);
  Session.set('vect', Vector.findOne({_id:this.params.hashkey}));
})

Router.route('/emergence/:type/:slug*', function() {
  this.render('EmergenceVector')
  let vect = Vector.findOne({type:this.params.type, slug:this.params.slug});
  Session.set('vectkey', (vect)?vect._id:undefined);
  Session.set('vect', vect);
});


Router.route('/emergence/search/:key*', function() {
  HTTP.get("https://api.crossref.org/works?query="+this.params.key, (err, res) => {
    if (err) console.log('ERROR:',err);
    console.log("https://api.crossref.org/works?query="+this.params.key,err, res);
    this.render('Search', {data: {keys: this.params.key, search:res.data.message.items}})
  })
});

Router.route("/emergence", {
  name:"emergence",
  template:"emergence_main",
});
