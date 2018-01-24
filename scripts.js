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

          alert(data.name);

        }
      }
    };
  }
}

getMeteo();
