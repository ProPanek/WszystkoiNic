function Helicopter() {
    var settings = new Settings()
    var daeModel
    var wirnik
    var angle = 0

    var model_speed = 0
    var model_height = 0
    this.loadModel = function (url, callback) {
        
        var loader = new THREE.ColladaLoader();

         loader.load(url, function (collada) {

                daeModel = collada.scene;
                daeModel.scale.set(30, 30, 30)
                daeModel.position.set(0, 1000, 0)

                wirnik_g = daeModel.getObjectByName("wirnik_glowny", true)  // o tym mowa w punkcie 3    
                wirnik_b = daeModel.getObjectByName("wirnik_boczny", true)  // o tym mowa w punkcie 3     

                console.log(wirnik)
                //po załadowaniu jest możliwy dostęp do składników / meshów modelu:

                daeModel.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        // ...    
                        var texture = THREE.ImageUtils.loadTexture('models/model1/tex/fuselage.jpg')
                        child.material = new THREE.MeshBasicMaterial({ map: texture})
                    }
                });

                // callback czyli zwrócenie danych modelu na zewnątrz pliku 

                callback(daeModel)

            })
    }

    this.getModel = function () {
        return daeModel
    }

    this.updateModel = function () {
        // ruch wirnika   
        wirnik_g.rotateZ(settings.szybkoscWirnika)
        wirnik_b.rotateX(settings.szybkoscWirnika)

    }
    this.getAngle = function () {
        return angle
    }
    this.moveForward = function (speed) {
        model_speed = speed

        daeModel.position.x += Math.sin(angle) * speed
        daeModel.position.z += Math.cos(angle) * speed
    }
    this.moveUp = function (speed) {
        daeModel.position.y += speed
    }
    this.rotateModel = function (speed) {
        angle -= speed
        daeModel.rotateY(-speed)
        
    }
}
