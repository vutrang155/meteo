var getMeteo = function(){
  let xhr = null;

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

    let city = document.getElementById('city').value;

    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+',fr&APPID=ee07e2bf337034f905cde0bdedae3db8';

    xhr.open('GET', url);
    xhr.send(null);

    xhr.onreadystatechange = function(){
      if ( xhr.readyState == 4 ) {

        let data = JSON.parse(xhr.responseText);

        if ( xhr.status == 404 ) {

          alert(data.message);

        } else if ( xhr.status == 200 ) {

          let weather = data.weather[0].main;
          let name = data.name;
          let weatherDescription = data.weather[0].description;
          let icon = data.weather[0].icon;

          let temp = data.main.temp;
          let pressure = data.main.pressure;
          let humidity = data.main.humidity;
          let tempMin = data.main.temp_min;
          let tempMax = data.main.temp_max;

          let windSpeed = data.wind.speed;

          let getImage = function(id){

            //Retourner le chemin de l'image de l'icon par rapport à l'id

            let ret = "wi ";

            let fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            let code = fileSystem.OpenTextFile("codeIcon.txt", 1 , false);
            let arrayCode = (code.ReadAll()).split('!');

            for(let e in code){

              let tab = e.split(':');

              if(tab[0].equals(id)){

                ret += tab[1];
                break;
              }

            }

            code.Close();

            return ret;

          };

          document.getElementById("weather").innerHTML = weather+' - '+weatherDescription+'&nbsp;';
          document.getElementById("name").innerHTML = name;
          console.log(document.getElementById("weather").childNodes);
          let iconImg = document.createElement("i");
          document.getElementById("weather").appendChild(iconImg);
          document.getElementById("weather").childNodes[1].className = getImage(icon);
          document.getElementById("temp").innerHTML = (parseInt(temp-273,15).toString())+' °C';
          document.getElementById("pressure").innerHTML = pressure+' Pa';
          document.getElementById("humidity").innerHTML = humidity+' %';
          document.getElementById("tempMin").innerHTML = (parseInt(tempMin-273,15).toString())+' °C';;
          document.getElementById("tempMax").innerHTML = (parseInt(tempMax-273,15).toString())+' °C';;
          document.getElementById("windSpeed").innerHTML = (parseInt(windSpeed*1.609).toString())+' km/h';

        }
      }
    };
  }
}
