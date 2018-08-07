function MyLight(color, intensity) {

    // kontener
    var container = new THREE.Object3D();
    var light = new THREE.PointLight( color, intensity, 800 );
    
    // init
    function init() {
        light_material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, 
            wireframe: true
        });
        var light_geometry = new THREE.BoxBufferGeometry(10, 10, 10, 1, 1, 1)
        var light_mesh = new THREE.Mesh(light_geometry, light_material);
        container.add(light_mesh)
        light.name = "light"
        light.castShadow = true;
        container.add(light)
    }

    init();

    this.getLight = function (){
        return container;
    }
    this.changeLightColor = function (color) {
        light.color.setHex(color)
    }
    this.changeIntensity = function (intensity_value) {
        light.intensity = intensity_value
    }

}
