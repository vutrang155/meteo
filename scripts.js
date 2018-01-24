var getMeteo = function(){
  var xhr = null;

  if(window.XMLHttpRequest) // Firefox et autres
     xhr = new XMLHttpRequest();
  else if(window.ActiveXObject){ // Internet Explorer
     try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
  }
  else { // XMLHttpRequest non supporté par le navigateur
     alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
     xhr = false;
  }

  if(xhr != null && xhr != false){

    var city = document.getElementById('city').value;

    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+',fr&APPID=ee07e2bf337034f905cde0bdedae3db8';

    xhr.open('GET', url);
    xhr.send(null);

    xhr.onreadystatechange = function(){
      if ( xhr.readyState == 4 ) {

        let data = JSON.parse(xhr.responseText);

        if ( xhr.status == 404 ) {

          alert(data.message);

        } else if ( xhr.status == 200 ) {

          let weather = data.weather.main;
          let weatherDescription = data.weather.description;
          let icon = data.weather.icon;

          let temp = main.temp;
          let pressure = main.pressure;
          let humidity = main.humidity;
          let tempMin = main.temp_min;
          let tempMax = main.temp_max;

          let windSpeed = wind.speed;

          let getImage = function(id){

            //Retourner le chemin de l'image de l'icon par rapport à l'id

            return ret;

          };

          document.getElementById("weather").innerHTML = weather;
          document.getElementById("weatherDescription").innerHTML = weatherDescription;
          document.getElementById("icon").innerHTML = getImage();
          document.getElementById("temp").innerHTML = (parseInt((temp-32)/1.8).toString())+' °C';
          document.getElementById("humidity").innerHTML = humidity+' Pa';
          document.getElementById("tempMin").innerHTML = tempMin;
          document.getElementById("tempMax").innerHTML = tempMax;
          document.getElementById("windSpeed").innerHTML = windSpeed;

        }
      }
    };
  }
}
