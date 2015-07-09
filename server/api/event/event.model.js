'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  startTime: Number,
  startDate: Number,
  startMonth: Number,
  startYear: Number,
  endTime:Number,
  endDate:Number,
  endMonth:Number,
  endYear:Number,
  title:String,	
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Event', EventSchema);