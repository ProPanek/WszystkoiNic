/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {

    document.getElementById("selectCamera")
                    .addEventListener("change", function () {
                         var selects = document.getElementById("selectCamera");
                        var selectedValue = selects.options[selects.selectedIndex].value;
                        console.log(selectedValue)
                        game.setCamera(selectedValue);
                    })

    // document.getElementById("bt2")
    //             .addEventListener("click", function () {
    //                 alert("pobieram zmienną test z klasy Game: "+game.getTest());

    //             })

    // document.getElementById("bt3")
    //             .addEventListener("click", function () {
    //                 net.sendData();

    //             })
}