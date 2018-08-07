function Main(){
    var color = 0x000000;
    var settings
    settings = new Settings();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
       90, // k�t patrzenia kamery (FOV - field of view)
        4 / 3, // proporcje widoku, powinny odpowiada� proporjom naszego ekranu przegl�darki
        0.1, // minimalna renderowana odleg�o��
        100000 // maxymalna renderowana odleg�o��
    );
    camera.position.x = 0;
    camera.position.y = 775;
    camera.position.z = 635;

    var clock = new THREE.Clock();

    var renderer = new THREE.WebGLRenderer({ antialias: false });


    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    var axis = new THREE.AxisHelper(1000);
    scene.add(axis)// 200 - wielkość
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()
    var stats = new Stats();
    var materials = new Materials()
    console.log(materials.getMaterials())
    startScreen = new StartScreen();
    document.body.appendChild(startScreen.getScreen());
    document.body.appendChild(startScreen.getLoadScreen());

    var camController
    var skybox = new Skybox()
    var skyMesh = skybox.getSkybox()
    scene.add(skyMesh)


    var helikopter = new Helicopter()

    var button1 = new Button("gfx/BH.png", "helicopter1")
    button1.setPosition(100, 100)
    $("#startScreen").append(button1.getButton())

    var button2 = new Button("gfx/BH.png", "helicopter2")
    button2.setPosition(300, 100)
    $("#startScreen").append(button2.getButton())
    //startScreen.appendChild(button1.getButton())
    $("#helicopter1").on("click", function () {
      $("#loadScreen").show()
      $("#startScreen").hide()
        console.time("ładowanie")
        helikopter.loadModel("models/model1/BHUH60.xml", function (modelData) {
            console.log("model jest załadowany")
            console.timeEnd("ładowanie")
            console.log(helikopter.getModel())
            scene.add(helikopter.getModel())
            //camera.lookAt(helikopter.getModel())
            camController = new CameraController(camera, helikopter.getModel());

            slider_left = new Slider(1, 0, 10, 60, window.innerHeight - 60, "left", "")
            document.body.appendChild(slider_left.getSlider());

            slider_right = new Slider(1, 0, 10, 60, window.innerHeight - 60, "right", "")
            document.body.appendChild(slider_right.getSlider());

            slider_bottom = new Slider(2, 0, 0.01, window.innerWidth, 60, "bottom", "")
            document.body.appendChild(slider_bottom.getSlider());

            $("#loadScreen").hide()
            //MenuScreen()
        })
    })
    $("#helicopter2").on("click", function () {
        $("#startScreen").hide()
        console.time("ładowanie")
        helikopter.loadModel("models/model1/BHUH60.xml", function (modelData) {
            console.log("model jest załadowany")
            console.timeEnd("ładowanie")
            console.log(helikopter.getModel())
            scene.add(helikopter.getModel())
            camController = new CameraController(camera, helikopter.getModel());

            slider_left = new Slider(1, 0, 10, 60, window.innerHeight - 60, "left", "")
            document.body.appendChild(slider_left.getSlider());

            slider_right = new Slider(1, 0, 10, 60, window.innerHeight - 60, "right", "")
            document.body.appendChild(slider_right.getSlider());

            slider_bottom = new Slider(2, 0, 0.01, window.innerWidth, 60, "bottom", "")
            document.body.appendChild(slider_bottom.getSlider());
            camera.lookAt(helikopter.getModel())


              $("#loadScreen").hide()
        })
    })




    function init() {
    	// scene.fog = new THREE.FogExp2(0xffffff,  0.0001);
        var width = innerWidth;
        var height = innerHeight;
        renderer.setClearColor(color);
        renderer.setSize(width, height);
        var teren = new Terrain(settings.TEREN_SIZE,
            settings.TEREN_HEIGHT,
            settings.TEREN_COLOR, settings.TERRAIN_DATA)
        scene_teren = teren.getTerrain()

        scene.add(scene_teren)
        function animateScene() {
            if (helikopter.getModel() != undefined) {
               helikopter.updateModel()
               slider_left.update()
               slider_right.update()
               slider_bottom.update()

               helikopter.moveForward(slider_left.getCurrent())
               helikopter.moveUp(slider_right.getCurrent())
               helikopter.rotateModel(slider_bottom.getCurrent())
               var helicopter_pos = helikopter.getModel().position
               camController.update(helicopter_pos, helikopter.getAngle(), 50)
            }
            else

            stats.begin();
            stats.end();
            requestAnimationFrame(animateScene);
            renderer.render(scene, camera);
        }
        animateScene()
    }
    init()

    document.getElementById("scene").appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    $("#generateNewTerrain").on("click", function () {
        scene.remove(scene_teren)
        var teren = new Terrain(
            settings.TEREN_SIZE,
            settings.TEREN_HEIGHT,
            settings.TEREN_COLOR)
        scene_teren = teren.getTerrain()
        scene.add(scene_teren);
    })
    $("#loadTerrain").on("click", function () {
        scene.remove(scene_teren)
        var data = JSON.parse($("#noiseResults").val())
        // console.log(data)
        var teren = new Terrain(
            settings.TEREN_SIZE,
            settings.TEREN_HEIGHT,
            settings.TEREN_COLOR, data)
        scene_teren = teren.getTerrain()
        scene.add(scene_teren);
    })
}
