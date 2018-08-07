/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {
    var login_log

    // document.getElementById("selectCamera")
    //                 .addEventListener("change", function () {
    //                      var selects = document.getElementById("selectCamera");
    //                     var selectedValue = selects.options[selects.selectedIndex].value;
    //                     console.log(selectedValue)
    //                     game.setCamera(selectedValue);
    //                 })
    window.addEventListener("beforeunload", function (e) {
        net.playerQuit(login_log)
                       //Webkit, Safari, Chrome
    });

    document.getElementById("send_login")
                    .addEventListener("click", function () {
                         var login = document.getElementById("login");
                         sendLogin = login.value.toString()
                         login_log = sendLogin
                         net.sendLogin(sendLogin)
                         net.checkForPlayer()
                    })
    document.getElementById("reset_login")
                    .addEventListener("click", function () {
                         net.resetLogin()
                    })

    var gui = new DAT.GUI({
        height : 5 * 32 - 1
    });
    // document.getElementById("bt2")
    //             .addEventListener("click", function () {
    //                 alert("pobieram zmienną test z klasy Game: "+game.getTest());

    //             })

    // document.getElementById("bt3")
    //             .addEventListener("click", function () {
    //                 net.sendData();

    //             })
}