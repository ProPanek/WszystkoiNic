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
}