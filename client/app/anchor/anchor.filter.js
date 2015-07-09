'use strict';

angular.module('zolotestApp')
  .filter('anchor', function () {
    return function (anchor_val,boundary_val) {
      if(anchor_val>=boundary_val && anchor_val<(boundary_val+1)){
      	console.log("pmpom");
      	return true;
      }else{
      	return false;
      }
    };
  });
