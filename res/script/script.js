var req = new XMLHttpRequest;

function toCelsius(f) {
    return f - 273.15;
}

function converterTimestamp(UNIX_timestamp){
	var date = new Date(UNIX_timestamp*1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return(hours + ':' + minutes.substr(-2));
}

function initialize(lat, lon) {
	var mapProp = {center: new google.maps.LatLng(lat, lon), zoom: 11, mapTypeId: google.maps.MapTypeId.HYBRID};
	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function buscar(){
	var cidade = document.getElementById("nc-field").value;
	document.getElementById("gif").style.display = "block";

	req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&appid=8a647d241d321d29784d0425ec44e1d2');
	req.send(null);
}

function carregarInformacoes() {
	var resp = req.responseText;
	var resp_obj = JSON.parse(resp);

	document.getElementById("nomeCidade").innerHTML = resp_obj['name'] + ', ' + resp_obj['sys']['country'];
	document.getElementById("tempValor").innerHTML = toCelsius(resp_obj['main']['temp']).toFixed(2) + ' ºC';
	document.getElementById("tempImg").src = "http://openweathermap.org/img/w/" + resp_obj['weather']['0']['icon'] + ".png";

	tabela = document.getElementById("tabela");
	tabela.rows[0].cells[1].innerHTML = toCelsius(resp_obj['main']['temp_max']).toFixed(2) + ' ºC';
	tabela.rows[1].cells[1].innerHTML = toCelsius(resp_obj['main']['temp_min']).toFixed(2) + ' ºC';
	tabela.rows[2].cells[1].innerHTML = converterTimestamp(resp_obj['sys']['sunrise']);
	tabela.rows[3].cells[1].innerHTML = converterTimestamp(resp_obj['sys']['sunset']);
	var lat = tabela.rows[4].cells[1].innerHTML = resp_obj['coord']['lat'];
	var lon =tabela.rows[5].cells[1].innerHTML = resp_obj['coord']['lon'];

	google.maps.event.addDomListener(window, 'load', initialize(lat, lon));

	var form = document.getElementById("formulario");
	form.style.marginTop = "40px";
	form.style.backgroundColor = "rgba(225, 225, 225, 0)";	
	form.style.height = "auto";
	document.getElementById("gif").style.display = "none";
	document.getElementById("artigo").style.opacity = "1";
}

req.onloadend = carregarInformacoes;
