var getMeteo = function(){
  let xhr = null;

  if(window.XMLHttpRequest) // Firefox et autres
     xhr = new XMLHttpRequest();
  else if(window.ActiveXObject){ // Internet Explorer
    try{
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  else { // XMLHttpRequest non supporté par le navigateur
     alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
     xhr = false;
  }

  if(xhr != null && xhr != false){ // On vérifie que xhr est bien supporté

    let city = document.getElementById('city').value; // Récupération de la ville entrée par l'utilisateur

    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+',fr&APPID=ee07e2bf337034f905cde0bdedae3db8'; // L'URL à partir de laquelle on va lancer la requete

    xhr.open('GET', url); // Envoi de la requête pour récupérer le JSON
    xhr.send(null);

    xhr.onreadystatechange = function(){
      if ( xhr.readyState == 4 ) {

        let data = JSON.parse(xhr.responseText); // Conversion de la reponse en texte en json

        if ( xhr.status == 404 ) { //Verification que la ville existe bien

          alert(data.message);

        } else if ( xhr.status == 200 ) {

          //Récupération de toutes les valeurs qui vous nous intéresser pour compléter la page

          let weather = data.weather[0].main;
          let name = data.name;
          let weatherDescription = data.weather[0].description;
          let icon = (data.weather[0].icon).toString();

          let temp = data.main.temp;
          let pressure = data.main.pressure;
          let humidity = data.main.humidity;
          let tempMin = data.main.temp_min;
          let tempMax = data.main.temp_max;

          let windSpeed = data.wind.speed;

          let getImage = function(id){ // Renvoie à partir d'un id la classe de l'image à utiliser

            let ret = "wi ";

            switch (id) {

              case "01d":
                ret += "wi-day-sunny";
                break;

              case "02d":
                ret += "wi-day-cloudy";
                break;

              case "03d":
                ret += "wi-cloud";
                break;

              case "04d":
                ret += "wi-cloudy";
                break;

              case "09d":
                ret += "wi-shower";
                break;

              case "10d":
                ret += "wi-day-rain";
                break;

              case "11d":
                ret += "wi-day-thunderstorm";
                break;

              case "13d":
                ret += "wi-day-snow";
                break;

              case "50d":
                ret += "wi-day-fog";
                break;

              case "01n":
                ret += "wi-night-clear";
                break;

              case "02n":
                ret += "wi-night-alt-cloudy";
                break;

              case "03n":
                ret += "wi-cloud";
                break;

              case "04n":
                ret += "wi-cloudy";
                break;

              case "09n":
                ret += "wi-night-alt-showers";
                break;

              case "10n":
                ret += "wi-night-alt-rain";
                break;

              case "11n":
                ret += "wi-night-lightning";
                break;

              case "13n":
                ret += "wi-night-alt-snow";
                break;

              case "50n":
                ret += "wi-night-fog";
                break;

              default:

                ret += "wi-day-cloudy";

            }

            return ret;

          }

          // On remplace les anciens éléments HTML par les nouveaux

          document.getElementById("weather").innerHTML = weather+' - '+weatherDescription+'&nbsp;';
          document.getElementById("name").innerHTML = name;
          let iconImg = document.createElement("i"); // On créé un élément de type italique (en réalité qui sera l'icone)
          document.getElementById("weather").appendChild(iconImg); // On l'ajoute dans cette balise
          document.getElementById("weather").childNodes[1].className = getImage(icon); // On modifie son className avec la bonne icone
          document.getElementById("temp").innerHTML = (parseInt(temp-273,15).toString())+' °C';
          document.getElementById("pressure").innerHTML = pressure+' Pa';
          document.getElementById("humidity").innerHTML = humidity+' %';
          document.getElementById("tempMin").innerHTML = (parseInt(tempMin-273,15).toString())+' °C';; // Conversion de Kelvin en °C
          document.getElementById("tempMax").innerHTML = (parseInt(tempMax-273,15).toString())+' °C';;
          document.getElementById("windSpeed").innerHTML = (parseInt(windSpeed*1.609).toString())+' km/h'; // Conversion de mph en km/h
        }
      }
    }
  }
}
