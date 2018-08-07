var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var server = http.createServer(function(request,response){

  switch(request.method){
      case "GET":
      console.log(request.url)
      if (request.url === "/index.html" || request.url === "/") {

          fs.readFile("static/index.html", function (error, data) {
                  response.writeHead(200, { 'Content-Type': 'text/html' });
                  response.write(data);
                  response.end();

              })
        }
      else if (request.url == "/style.css") {
             fs.readFile("/static/style.css", function (error, data) {
                     response.writeHead(200, { 'Content-Type': 'text/plain' });
                     response.write(data);
                     response.end();    
                     console.log("halo")
                 })        
             }
      else if (request.url == "/js/Game.js") {
         fs.readFile("static/js/Game.js", function (error, data) {
                 response.writeHead(200, { 'Content-Type': 'application/javascript' });
                 response.write(data);
                 response.end();    
             })        
         }
         else if (request.url == "/js/Ui.js") {
         fs.readFile("static/js/Ui.js", function (error, data) {
                 response.writeHead(200, { 'Content-Type': 'application/javascript' });
                 response.write(data);
                 response.end();    
             })        
         }
         else if (request.url == "/js/Net.js") {
         fs.readFile("static/js/Net.js", function (error, data) {
                 response.writeHead(200, { 'Content-Type': 'application/javascript' });
                 response.write(data);
                 response.end();    
             })        
         }
         else if (request.url == "/libs/three.js") {
         fs.readFile("static/libs/three.js", function (error, data) {
                 response.writeHead(200, { 'Content-Type': 'application/javascript' });
                 response.write(data);
                 response.end();    
             })        
         }
         else if (request.url == "/libs/orbit.js") {
         fs.readFile("static/libs/orbit.js", function (error, data) {
                 response.writeHead(200, { 'Content-Type': 'application/javascript' });
                 response.write(data);
                 response.end();    
             })        
         }

          else {
              response.writeHead(404, { 'Content-Type': 'text/html' });
              response.write("<h1>404 - brak takiej strony</h1>");
              response.end();

          }
    // tu wykonaj załadowanie statycznej strony z formularzem
          // patrz lekcja poprzednia
          break;
      case "POST":
      // servResp(request, response)
  // tu wykonaj funkcję "servResp", która pobierze dane przesłane
  // w formularzu i odpowie do przeglądarki
  // (uwaga - adres żądania się nie zmienia)


          break;

  }




console.log(request.method)



})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")

// function servResp(request, response) {
//   var allData=""
//   request.on("data", function (data) {
//             console.log("data: "+data)
//             allData += data;
//         })
//         request.on("end", function (data) {
//             var finish = qs.parse(allData)
//             console.log(allData)
// 	          console.log(finish.bt1)
//             response.end("odsyłam do przeglądarki" + JSON.stringify(finish));
//         })
// }
// var logger = require('tracer').colorConsole();
//
// logger.log('hello');
// logger.trace('hello');
// logger.debug('hello');
// logger.info('hello');
// logger.warn('hello');
// logger.error('hello');
//
