/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Event = require('../api/event/event.model');
var _ = require('lodash');

var fs = require('fs');

var content = JSON.parse(fs.readFileSync('./server/api/event/calendar_assignment.json'));


Event.find({},function(err,data){
  if(data.length==0 || data==null){
    _.forEach(content,function(c){
      var temp_start = new Date(c.startTime);
      var temp_end = new Date(c.endTime);

      var payload = {startTime:temp_start.getTime(),
                    startDate: temp_start.getDate(),
                    startMonth: temp_start.getMonth(),
                    startYear: temp_start.getFullYear(),
                    endTime: temp_end.getTime(),
                    endDate: temp_end.getDate(),
                    endMonth: temp_end.getMonth(),
                    endYear: temp_end.getFullYear(),
                    title: c.title};
      console.log(payload);
      Event.create(payload,function(err,event){
        if(err){
          console.log(err);
        }
      });
    });

  }
});


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});