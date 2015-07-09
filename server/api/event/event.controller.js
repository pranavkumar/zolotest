'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var fs = require('fs');
var content = JSON.parse(fs.readFileSync('./server/api/event/calendar_assignment.json',{encoding:'utf8'}));



// Get list of events
exports.index = function(req, res) {
  /*Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.json(200, events);
  })*/
    
    /*_.forEach(content,function(c){
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
    })*/


    return res.json(200,content);  
  
  

};

// Get a single event
exports.show = function(req, res) {
    var temp = req.params.id;
    var startDate = temp.split("-")[0];
    var startMonth = parseInt(temp.split("-")[1]-1);
    var startYear = temp.split("-")[2];

    console.log(startDate+" "+startMonth+" "+startYear);
    
  
  Event.find({startDate:startDate,startMonth:startMonth,startYear:startYear}, function (err, event) {
    
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.json(201, event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    var updated = _.merge(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}