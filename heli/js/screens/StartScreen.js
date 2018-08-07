function StartScreen(){
    var screen = document.createElement("div")
    screen.id = "startScreen"
	screen.style.position = "absolute"
	screen.style.top = "0px"
	screen.style.left = "0px"
	screen.style.width = window.innerWidth +"px"
	screen.style.height = window.innerHeight + "px"
	screen.style.backgroundColor = "grey"

  var load = document.createElement("div")
  load.innerHTML = "LOADING"
  load.id = "loadScreen"
  load.style.position = "absolute"
  load.style.top = "0px"
  load.style.left = "0px"
  load.style.width = window.innerWidth +"px"
  load.style.height = window.innerHeight + "px"
  load.style.backgroundColor = "grey"
  load.style.display = "none"




	this.getScreen = function () {
	     return screen;
	}
  this.getLoadScreen = function () {
	     return load;
	}
}
