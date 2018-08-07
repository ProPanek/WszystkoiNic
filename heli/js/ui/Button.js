function Button(bgnImage, id){

    var bt = document.createElement("div");
    bt.id = id
	bt.style.width = "100px";
	bt.style.height = "100px";

    bt.style.backgroundImage = "url('"+bgnImage+"')";
    //bt.style.backgroundColor = "white"
	bt.style.position = "absolute"



	this.setPosition = function (x,y) {
     //tą funkcją ustalisz pozycję buttona
     bt.style.top = x +"px"
     bt.style.left = y +"px"    
	}

	this.getButton = function () {
	     return bt;
	}
}