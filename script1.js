/**
 * @author ChetanD
 */

var country = [];
var NoFollower = [];
var random1 = [];
var no = 100;
var map;
var markerSize = []; 
var infowindow = [];


//initialize my script
function init() {


         //create google map on page
          var stockholm = new google.maps.LatLng(25.32522, 5.07002);
		  var mapOptions = {
		    zoom: 2,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    maxZoom: 3,
		    disableDefaultUI: true,
		    center: stockholm,

		    scrollwheel: false,
           animation:google.maps.Animation.DROP,

		    scrollwheel: false

		  };


          var width = window.screen.width;
          var height = window.screen.height;
          
          $("#map_canvas").css({
          	
          	"width" : (width*0.75) + "px" ,
          	"height" : (height*0.75) + "px",
          	"margin" : "0px"
          });
          
          map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
          
          $("#start").bind("click",startlocating);
          
          
          
          loaddata();
		  	
}


/*
           * load data before starting any operation
           * storing co-ordinate according to country
           * 
     */
          
function loaddata() {

     	country["US"] = new Array();
     	country["US"][0] = "38.90";
     	country["US"][1] = "-77.04";
     	country["UK"] = new Array();
     	country["UK"][0] = "51.51";
     	country["UK"][1] = "-0.13";
     	country["JAPAN"] = new Array();
     	country["JAPAN"][0] = "35.67";
     	country["JAPAN"][1] = "139.78";
     	country["BRAZIL"] = new Array();
     	country["BRAZIL"][0] = "-15.78";
     	country["BRAZIL"][1] = "-47.93";
     	country["SAUDI ARABIA"] = new Array();
     	country["SAUDI ARABIA"][0] = "24.64";
     	country["SAUDI ARABIA"][1] = "46.77";
     	country["INDIA"] = new Array();
     	country["INDIA"][0] = "28.61";
     	country["INDIA"][1] = "77.23";
     	country["ARGENTINA"] = new Array();
     	country["ARGENTINA"][0] = "-34.58";
     	country["ARGENTINA"][1] = "-58.41";
     	country["RUSSIA"] = new Array();
     	country["RUSSIA"][0] = "55.75";
     	country["RUSSIA"][1] = "37.62";
     	
     	NoFollower["US"] = 30;
     	NoFollower["UK"] = 10;
     	NoFollower["JAPAN"] = 5;
     	NoFollower["BRAZIL"] = 3;
     	NoFollower["SAUDI ARABIA"] = 2;
     	NoFollower["INDIA"] = 25;
     	NoFollower["ARGENTINA"] = 17;
     	NoFollower["RUSSIA"] = 8;
     	
        random1.push("US");
        random1.push("UK");
        random1.push("JAPAN");
        random1.push("BRAZIL");
        random1.push("SAUDI ARABIA");
        random1.push("INDIA");
        random1.push("ARGENTINA");
        random1.push("RUSSIA");
     	
     	 
	
	
}


/**
 *  to give feel of real time this function fetch each follower from given country after each 100 ms
 */
function startlocating() {
	
	
	
	var locatait = setInterval (function(){
		
		var number = Math.floor(Math.random() * 8);
		
		var selectCountry = random1[number];
		
		loadMarker(selectCountry);
		
		if( NoFollower[selectCountry] > 0 ) {
			
			markThisPlace(selectCountry);
			no--;
			NoFollower[selectCountry]-- ;
		    
		} 
		
		if( no == 0 ) {
			
			clearInterval(locatait);
			
		}
		
		
	},100);
	
}



/**
 * 
 * @param {Object} selectcountry
 * 
 * load google map resources
 * create array of info window for all country (i.e. 8 country given in this example)
 * create array of mark up and size of marker icon image for all given country
 * bind infowindow to corresponding marker
 * 
 */
function loadMarker( selectcountry) {
	
	
	if( markerSize[selectcountry] == undefined) {
		
		infowindow[selectcountry] = new google.maps.InfoWindow({
		
				 			
        }); 
		markerSize[selectcountry]  = new Object();
		markerSize[selectcountry].width = 10 ;
		markerSize[selectcountry].height = 10 ;
		var place = country[selectcountry];
		var parliament = new google.maps.LatLng( place[0],place[1] );
 	    var marker = new google.maps.Marker({
	   		 map:map,
	    	position: parliament,
	    
	    });
	    markerSize[selectcountry].marker = marker;
	    console.log(markerSize[selectcountry].marker)
	    google.maps.event.addListener(marker, "mouseover", function() {
					infowindow[selectcountry].open(map, marker);
	    });
	    google.maps.event.addListener(marker, "mouseout", function() {
					infowindow[selectcountry].close();
	    })	  
		
		
	}
	
}


/**
 * 
 * @param {Object} selectCountry
 * this is use to change marker icon images depending on follower and real time infowindow's contet change
 * 
 */
function markThisPlace( selectCountry ) {


                  var height = markerSize[selectCountry].height;
				  var width = markerSize[selectCountry].width;
				  var marker = markerSize[selectCountry].marker;
	
	              console.log(marker);
	              markerSize[selectCountry].height += 2;
				  markerSize[selectCountry].width += 2;
				  var obj = infowindow[selectCountry];
				  obj.setContent("Followers:"+((height-10)/2+1));
				  
				   
                  if ( selectCountry.indexOf(" ") != -1 ) {
				  	
				  	selectCountry = selectCountry.replace(" ","");
				 
				  	
				  }

				  marker.setIcon(new google.maps.MarkerImage("./images/"+selectCountry+".png", null, null, null, new google.maps.Size(width + 2, height+2)));
 	
}


		
