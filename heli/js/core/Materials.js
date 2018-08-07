function Materials() {
    var Materials = {

        material01: new THREE.MeshBasicMaterial({}),
        model01: "models/model1/BHUH60.xml",
        model02: "models/model2/myModel2.xml",
        model03: "models/model3/myModel3.xml",
        obrazki: [
         "gfx/BH.png",
         "gfx/obrazek2.png",
         "gfx/obrazek3.png",
        ],
        name_heli: [
        	"Black_hawk",
        	"heli1",
        	"heli2"
        ],
        cameraModes: [
        "gfx/back.png",
        "gfx/front.png",
        "gfx/left.png",
        "gfx/right.png",
        "gfx/top.png",
        "gfx/cockpit.png"
        ]


    }
    this.getMaterials = function () {
        return Materials
    }
}