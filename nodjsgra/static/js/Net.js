/*
    klasa obsługująca komunikację Ajax - em z serwerem
*/

function Net() {    
	var gracz1 = ""
	var gracz2 = ""
	var your_login
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */
    this.yourLogin = function () {
        return your_login
    }
    this.sendData = function () {
        alert("wysyłam dane Ajaxem z klasy Net na serwer")
    }
    this.sendLogin = function (login) {
    	console.log(login)
    	your_login = login
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
			     
			     if (object.kamera == "druga") {
			     	game.setCamera()
			     }
			  //    $("#count").html("Ilość rekordów: " + object.count)

			//tu wypisz sumę w div-ie na stronie

				// alert(object.txt)
				$("#alert").css("visibility", "visible")
				$("#alert").html(object.txt)
				setTimeout(function(){
					$("#alert").css("visibility", "hidden")
				},3000)
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
    this.playerQuit = function (nickname) {
    	if (gracz1 == your_login) {
    		gracz1 = ""
    	}
    	if (gracz2 == your_login) {
    		gracz2 = ""
    	}
        $.ajax({
			url: "http://localhost:3000",
			data: {
				akcja: "playerQuit",
				login: nickname
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
    this.startGame = function () {
        var player_array = []
        player_array.push(gracz2)
        player_array.push(gracz1)
        return player_array
    }
    this.sendArray = function (array) {
				console.log("wysylam!")
    	
    	var array = JSON.stringify(array)
         $.ajax({
			url: "http://localhost:3000",
			data: {
				akcja: "sendArray",
				array: array
			},
			type: "POST",
			success: function (data) {
			//czytamy odesłane z serwera dane
			  // var object = JSON.parse(data)
			     // console.log(object)
			     // alert(data)
			},
			error: function (xhr, status, error) {
			  //console.log('Error: ' + error.message);
			},
      });
    }
    this.checkForPlayer = function () {
    	setInterval(function(){
    		$.ajax({
			url: "http://localhost:3000",
			data: {
				akcja: "checkForPlayer"
			},
			type: "POST",
			success: function (data) {

			//czytamy odesłane z serwera dane
			  // var object = JSON.parse(data)
			     var object = JSON.parse(data)
			     // console.log(object)
			     
			     if (object.gracze.length <= 1) {
			     	$("#suspens").show()

			     }
			     else{
			     	$("#suspens").hide()

			     }
			     if (object.gracze[0] != undefined) {
			     	gracz1 = object.gracze[0]; 
			     }
			      if (object.gracze[1] != undefined) {
			     	gracz2 = object.gracze[1]; 
			     	if (object.akcja == "gameReady") {
			     		net.checkForPionki()
			     	$("#instructions").hide()
			     }
			     }
			    $("#alert").css("visibility", "visible")
				$("#alert").html(object.txt +" aktualnie zalogowani: " +gracz1 + ", " +gracz2)
			},
			error: function (xhr, status, error) {
			  //console.log('Error: ' + error.message);
			},
      });
    	},500)
    }

    this.checkForPionki = function () {
    	// setInterval(function(){
    		$.ajax({
			url: "http://localhost:3000",
			data: {
				akcja: "checkForPionki"
			},
			type: "POST",
			success: function (data) {

			//czytamy odesłane z serwera dane
			  // var object = JSON.parse(data)
			     var object = JSON.parse(data)
			     var bool
			     	//tablica klienta
			     	 pionki_tab_array = game.getTab()
				     pionki_tab_string = JSON.stringify(pionki_tab_array


				     	)
				     //tablica serwera
				     serwer_tab_string = object.tab
				     serwer_tab_array = JSON.parse(object.tab)

				     console.log(pionki_tab_string)
				     console.log(serwer_tab_string)
				     if (pionki_tab_string === serwer_tab_string) {
				     	//do ntohing
				      	// bool = false
				     	console.log("takie same")
				     }
				   
				      else{
				      	console.log("nie takie same")
				      	var mesh_array = game.sendMeshes()
				      	console.log(mesh_array)
				      	for (var i = 0; i < mesh_array[0].length; i++) {
				      		// mesh_array[0][i]
				      		// mesh_array[1][i]
				      		mesh_array[2].remove(mesh_array[0][i])
                			 mesh_array[2].remove(mesh_array[1][i])

				      	}

				     	game.setTab(serwer_tab_array)
				      	// client_tab_array = serwer_tab_array
				     	
				     }
			     	
			},
			error: function (xhr, status, error) {
			  //console.log('Error: ' + error.message);
			},
      });
    	// },2000)
    }
}