    function print(pnr)
	{
		var request=new XMLHttpRequest();

		request.open('GET','https://api.railwayapi.com/v2/pnr-status/pnr/'+pnr+'/apikey/APIKEY/');

		var json;      // Object Assigner
		var string="";  // String that is going to set all the code to the main tag.

		request.onload=function()
		{
			json=JSON.parse(request.responseText);
			string="";

			// TOP CARD

			if(json.response_code!=200) // If everything wasn't fine.
			{
				document.getElementById('main').innerHTML="<div class='padding: 20px;'>The PNR seems to have a problem. Kindly Try Again.</div>";
			}
			else
			{
				string+="<div class='top'><div class='left'>Trip From "+json.from_station.name+" To "+json.to_station.name+"<br><span style='font-size: 15px;'>PNR : "+json.pnr.toString()+"</span></div><div class='right' align='right'><i class=\"fas fa-train fa-2x\"></i></div></div>";

				// Train Number and Name

				string+="<div class='pnrcard'><div style='padding-top: 20px;padding-left: 20px; font-size: 15px;'>"+json.train.number+" - "+json.train.name+"</div>";
				
				// Starting Station

				string+="<div class='left' align='center'><h2><strong>"+json.from_station.code+"</strong></h2><span style='font-size: 18px'>"+json.from_station.name+"</span><br><br><span style='font-size: 14px; color: #545454;'>DOJ : "+json.doj+"</span></div>";
				
				// Middle Arrow

				string+="<div class='middle'><i class=\"fas fa-arrow-right fa-lg\" style='color: #434343;'></i></div>";

				// Destination Station

				string+="<div class='right' align='center'><h2><strong>"+json.to_station.code+"</strong></h2><span style='font-size: 18px'>"+json.to_station.name+"</span><br><br><span style='font-size: 14px; color: #545454;'>Journey Class : "+json.journey_class.code+"</span></div>";

				// Booking Table

				string+="<div class='reservationtable'>";
				string+="<div class='rescontainer'>";
				string+="<div class='left' align='center'><strong>No.</strong></div><div class='middle' align='center'><strong>Booking Status</strong></div><div class='right' align='center'><strong>Current Status</strong></div></div>";
				
				//Printing the reservation status of each passenger

				for(var i=0;i<json.total_passengers;i++)
				{
					string+="<div class='rescontainer'>";
					string+="<div class='left' align='center'>"+json.passengers[i].no+"</div><div class='middle' align='center'>";

					// Coloring Booking Code based on Status of Ticket

					if(json.passengers[i].booking_status.includes('CNF'))
					{
						string+="<span style='color: green'>"+json.passengers[i].booking_status+"</span>";
					}
					else if(json.passengers[i].booking_status.includes('RAC'))
					{
						string+="<span style='color: orange'>"+json.passengers[i].booking_status+"</span>";
					}
					else
					{
						string+="<span style='color: red'>"+json.passengers[i].booking_status+"</span>";
					}

					string+="</div>";

					// Current Status of Ticket

					string+="<div class='right' align='center'>";

					if(json.passengers[i].current_status.includes('CNF'))
					{
						string+="<span style='color: green'>"+json.passengers[i].current_status+"</span>";
					}
					else if(json.passengers[i].current_status.includes('RAC'))
					{
						string+="<span style='color: orange'>"+json.passengers[i].current_status+"</span>";
					}
					else
					{
						string+="<span style='color: red'>"+json.passengers[i].current_status+"</span>";
					}
					string+="</div></div>";
				}

				string+="<br>Chart Prepared : ";

				if(json.chart_prepared==false)
				{
					string+="No";
				}
				else
				{
					string+="Yes";
				}

				string+="</div></div>";

				document.getElementById('main').innerHTML=string;

				if(json.response_code == 200)
				{
					// THE LATITUDES AND LOGITUDES OF EACH STATION TO BE SENT TO THE CALL BACK FUNCTION.
					var pos1={lat: json.from_station.lat, lng : json.from_station.lng};
					var pos2={lat: json.to_station.lat, lng : json.to_station.lng};
					
					document.getElementById('map').style.display="block";
					initMap(pos1,pos2);
				}
			}
		}

		request.send();
	}

function initMap(position1,position2) {              // Map Setting Function
        var myLatLng = {lat: 20.5937, lng: 78.9629}; // Latitudes and longitudes of India

        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 6
        });

        // Creating markers for each station that is available.
        var marker1=new google.maps.Marker({
        	map: map,
        	position: position1,
        });

        var marker2=new google.maps.Marker({
        	map: map,
        	position: position2,
        });
}
