$(document).ready(function() {
    $(".btn").click(function() {
        let city = $('#city').val();
        let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=ee07e2bf337034f905cde0bdedae3db8'; // L'URL à partir de laquelle on va lancer la requete
    
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data){
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

          $("#weather").html( weather+' - '+weatherDescription+'&nbsp;');
          $("#name").html( name);
          let iconImg = document.createElement("i"); // On créé un élément de type italique (en réalité qui sera l'icone)
          $("#weather").append(iconImg); // On l'ajoute dans cette balise
          $("#weather").find('i').addClass(getImage(icon)); // On modifie son className avec la bonne icone
          $("#temp").html( (parseInt(temp-273,15).toString())+' °C');
          $("#pressure").html( pressure+' Pa');
          $("#humidity").html( humidity+' %');
          $("#tempMin").html( (parseInt(tempMin-273,15).toString())+' °C'); // Conversion de Kelvin en °C
          $("#tempMax").html( (parseInt(tempMax-273,15).toString())+' °C');
          $("#windSpeed").html( (parseInt(windSpeed*1.609).toString())+' km/h'); // Conversion de mph en km/h

          $('#result').css('opacity', '1'); // Fait apparaitre le div
            },
            error: function(xhr, textStatus, errorThrown){
                alert('Error : City not found !');
             }
        });
    });
})