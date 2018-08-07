var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var server = http.createServer(function(request,response){

  switch(request.method){
      case "GET":
      resourcesLoad(request, response)
      case "POST":
      servResp(request, response)
  // tu wykonaj funkcję "servResp", która pobierze dane przesłane
  // w formularzu i odpowie do przeglądarki
  // (uwaga - adres żądania się nie zmienia)


          break;

  }
function resourcesLoad(req, res) {
    console.log("reqed address: " + req.url)
    var extension = req.url.split('.')[1];
    var dataType = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'ico': 'image/x-icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/jpeg',
        'svg': 'image/svg+xml',
        'mp3': 'audio/mpeg'
    };
    fs.readFile("static" + req.url, function (error, data) {
        if (error) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Brak takiej strony</h1>');
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': dataType[extension] });
            res.write(data);
            res.end();
        }
    });
}



// console.log(request.method)



})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")

var userList = []
var oldTab =[]
var newTab =[]
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function servResp(request, response) {

  var allData=""
     request.on("data", function (data) {
            // console.log("data: "+data)
            allData += data;
        })
        request.on("end", function (data) {
            var finish = qs.parse(allData)
            switch(finish.akcja){
              case "addUser":
                needle = finish.login;
                duplicate = contains.call(userList, needle); // true
                if (duplicate) {
                   objSend={
                    txt:"jest już taki użytkownik",
                  }
                  objSend = JSON.stringify(objSend)
                 response.end(objSend);
                }
                else if (userList.length >= 2) {
                  //do nothing
                   objSend={
                    txt:"jest więcej niż dwóch graczy",
                  }
                  objSend = JSON.stringify(objSend)
                 response.end(objSend);
                }
                else{
                userList.push(finish.login)
                objSend={
                    txt: "zalogowano użytkownika: " + finish.login,
                    login: finish.login,
                    akcja: "zalogowano"
                  }
                if (userList.length == 2) {
                   objSend={
                    txt: "zalogowano użytkownika: " + finish.login,
                    login: finish.login,
                    akcja: "zalogowano",
                    kamera: "druga"
                  }
                }
               
                  objSend = JSON.stringify(objSend)
                 response.end(objSend);
                }
                break;
              case "resetUser":
              userList = [];
              response.end("lista użytkowników zresetowana");
              break;

              case "checkForPlayer":
              // console.log(userList.length)
              
              if (userList.length == 2) {
                objSend={
                    txt: "znalazłem gracza, przygotowanie gry!",
                    akcja: "gameReady",
                    gracze: userList
                    // login: finish.login,
                    // akcja: "zalogowano"
                  }
                // objSend.txt = "znalazłem gracza, przygotowanie gry!"
                objSend = JSON.stringify(objSend)
                 response.end(objSend);
                // response.end("czekam...");

              }
              else if (userList.length == 1) {
                objSend={
                    txt: "czekam na drugiego gracza...",
                    gracze: userList
                    // akcja: "zalogowano"
                  }
                objSend = JSON.stringify(objSend)
                 response.end(objSend);
                // response.end("czekam...");

              }
              break;
              case "playerQuit":
                var index = userList.indexOf(finish.login)
                if (index > -1) {
                    userList.splice(index, 1);
                }
              break;
              case "sendArray":
                newTab = finish.array
                
                console.log(JSON.stringify(newTab))
                
                // setArray(finish.array)
              break;
               case "checkForPionki":
              
                // newTab = oldTab

                 objSend={
                  boolean: true,
                  tab: newTab
                }
                 objSend = JSON.stringify(objSend)
                  response.end(objSend);
                  
              break;
            }


           //  console.log(allData)
	          // console.log(userList)
           //  response.end("odsyłam do przeglądarki" + JSON.stringify(finish));
        })
}
// var logger = require('tracer').colorConsole();
//
// logger.log('hello');
// logger.trace('hello');
// logger.debug('hello');
// logger.info('hello');
// logger.warn('hello');
// logger.error('hello');
//
