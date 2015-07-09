'use strict';

angular.module('zolotestApp')
  .controller('DayCtrl', function ($scope,$stateParams,$http,$location) {
    $scope.message = 'Hello';

    var event_index = 0;

    $scope.days = [];

    $scope.hours=[];

    $scope.months_label = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


    $scope.events = [];

    var temp = $stateParams.val.split("-");

    $scope.now = {date: temp[0],
                  month: parseInt(temp[1]-1),
                  fullyear: parseInt(temp[2]),
                  year: null};


    $scope.daysinmonth = function(month,year){
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;    
   }

   $scope.days = $scope.daysinmonth($scope.now.month,$scope.now.year);




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

      
      

    }


    $scope.changeDate = function(flag){
      var changed_date,
          changed_month,
          changed_year;

      if(flag==true){
     
        if($scope.now.date<$scope.days.length){
          
          changed_date = parseInt($scope.now.date) + 1;
          changed_month = $scope.now.month;
          changed_year =  $scope.now.fullyear;
        }else{
          
          changed_date = 1;
          changed_month = parseInt($scope.now.month) + 1;
          changed_year =  $scope.now.fullyear;
        }
      
      }else{
        if($scope.now.date>1){
          changed_date = parseInt($scope.now.date) - 1;
          changed_month = $scope.now.month;
          changed_year =  $scope.now.fullyear; 
        }else{

          var lastmonthdays = $scope.daysinmonth($scope.now.month-1,$scope.now.year);

          changed_date = lastmonthdays.length;
          changed_month = parseInt($scope.now.month) - 1;
          changed_year =  $scope.now.fullyear;

           
        }
      }

      console.log(changed_date+" "+changed_month+" "+changed_year);  
      var link = "/day/"+changed_date+"-"+(parseInt(changed_month)+1)+"-"+changed_year;
      console.log(link);
      $location.url(link);
    }

    $scope.humanTime = function(timestamp){
      return moment.unix(timestamp/1000).format("HH:mm:ss");
    }

    $http.get('/api/events/'+$stateParams.val)
      .success(function(data,status,config,headers){
        
        //var t = JSON.parse(data.data);
        console.log(data);
        _.forEach(data,function(e){
          //console.log(moment.unix(e.startTime/1000).format("HH/mm/ss"));
          e.anchor = moment.unix(e.startTime/1000).format("HH");
          $scope.events.push(e);
        })
      });


    $scope.label=function(i){

      return i+" :00";

    };

    for(var i=0;i<24;i++){
      $scope.hours.push({label:$scope.label(i)});
    }
  
    setTimeout(function(){
      console.log($("#hour1").height());
    },3000);


    $scope.uniqid = function(){
      var id = "e"+event_index;
      event_index = event_index +1;
      return id;
    }



  });


