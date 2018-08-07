/*
    klasa obsługująca komunikację Ajax - em z serwerem
*/

function Net() {    
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */

    this.sendData = function () {
        alert("wysyłam dane Ajaxem z klasy Net na serwer")
    }
    this.sendLogin = function (login) {
    	console.log(login)
    	// login.toString()
        // alert("zalogowano użytkownika: " + login)
        $.ajax({
			url: "http://localhost:3000",
			data: {
				akcja: "addUser",
				login: login
			},
			type: "POST",
			success: function (data) {
			//czytamy odesłane z serwera dane
			  var object = JSON.parse(data)
			     console.log(object)
			     if (object.akcja == "zalogowano") {
			     	$("#instructions").hide()
			     }
			  //    $("#count").html("Ilość rekordów: " + object.count)

			//tu wypisz sumę w div-ie na stronie
				alert(object.txt)
			},
			error: function (xhr, status, error) {
			  //console.log('Error: ' + error.message);
			},
      });	    
    }
    this.resetLogin = function () {
        $.ajax({
			url: "http://localhost:3000",
			data: {
				akcja: "resetUser"
			},
			type: "POST",
			success: function (data) {
			//czytamy odesłane z serwera dane
			  // var object = JSON.parse(data)
			     // console.log(object)
			     alert(data)
			},
			error: function (xhr, status, error) {
			  //console.log('Error: ' + error.message);
			},
      });	    
    }
}