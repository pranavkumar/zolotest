'use strict';

angular.module('zolotestApp')
  .controller('MainCtrl', function ($scope, $http, socket,$location) {
    $scope.awesomeThings = [];


    $scope.days_label = ["Su","Mo","Tu","We","Th","Fr","Sa"];

    $scope.months_label = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    $scope.today = new Date();

    $scope.now = {date: $scope.today.getDate(),
                  month: $scope.today.getMonth(),
                  fullyear: $scope.today.getFullYear(),
                  year: $scope.today.getYear()};

    $scope.days = [];


    console.log(new Date().getFullYear());

    $scope.changeYear = function(flag){
      if(flag==true){
        $scope.now.fullyear = parseInt($scope.now.fullyear)+1;
      }else{
        $scope.now.fullyear = parseInt($scope.now.fullyear)-1;
      }
      $scope.tiledays($scope.now.month,$scope.now.fullyear);

    }

    $scope.changeMonth=function(flag){
      if(flag==true){
        if($scope.now.month<11){
          $scope.now.month = $scope.now.month +1;
        }else{
          $scope.now.month = 0;
          $scope.now.fullyear = $scope.now.fullyear +1; 
        }
        
      }else{
        if($scope.now.month>0){
          $scope.now.month = $scope.now.month -1;
        }else{
          $scope.now.month = 11;
          $scope.now.fullyear = $scope.now.fullyear - 1; 
        }
        
      }

      
      $scope.tiledays($scope.now.month,$scope.now.fullyear);


    }

    $scope.navDay = function(day){
      var day = day.day;
      if(day!==null){
        var link = day.getDate()+"-"+(day.getMonth()+1)+"-"+day.getFullYear();
        console.log(link);
        $location.url('/day/'+link);
      }
    }
    
    
    $scope.daysinmonth = function(month,year){
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;    
   }
   

    $scope.tiledays = function (month,year){

      var temp = $scope.daysinmonth(month,year);
      var temp_arr = [];
      var eff_arr = [];
      var offset = 0;

      for(var k=0;k<temp.length;k++){
       temp_arr.push(temp[k].getDay());
      }

      //console.log(temp.length);

      for(var i =0 ; i<42;i++){
       if(i<temp_arr[0]){
         //console.log("month didnt begin"+i);
         eff_arr.push({day:null,index:i});
         offset = i;
         
       }else{
         if(i<(temp_arr.length+offset+1)){
         //console.log("month just begin"+i);
         eff_arr.push({day:temp[i-offset-1],index:i});

         }
         else{
           //console.log("karamba");
           eff_arr.push({day:null,index:i})
         }
       }
       

      }

       console.log(eff_arr);
       $scope.days = eff_arr;

    }


    $scope.tiledays($scope.now.month,2015);












    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
