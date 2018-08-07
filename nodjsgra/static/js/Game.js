/*
    klasa Game
*/

function Game() {
    // console.log(gracz1)
    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */

    var test = 10;
    // var fov = 90; //GLOBALS
  

    

  
    var color = 0xFFE4E1;
    

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
       90, // k�t patrzenia kamery (FOV - field of view)
        4 / 3, // proporcje widoku, powinny odpowiada� proporjom naszego ekranu przegl�darki
        0.1, // minimalna renderowana odleg�o��
        100000 // maxymalna renderowana odleg�o��
    );
    var clock = new THREE.Clock();
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    var axis = new THREE.AxisHelper(1000);    // 200 - wielkość
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()
    var stats = new Stats();
    var pionki_tab
    var pl_array
    var start


    var gui = new dat.GUI({
        autoplace: false, 
        width: 750
    });
    // gui.add( camera , 'fov', 0, 120 ).name('camera fov').onChange(function(){
    //     camera.updateProjectionMatrix();
    // });
    // gui.add(guis, 'bouncingSpeed',0,0.5);

    function statystyki(){
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );
    }
    clicked = false
     setInterval(function(){
        if(clicked){
            net.checkForPionki()
        }
            
            },100)
      // gui.add(text, 'displayOutline');
      // gui.add(text, 'explode');
    // var stars = new THREE.Geometry();
    // for (var i=0; i<1000; i++) {
    //   stars.vertices.push(new THREE.Vector3(
    //     1e3 * Math.random() - 5e2,
    //     1e3 * Math.random() - 5e2,
    //     -1e2
    //   ));
    // }
    // var star_stuff = new THREE.ParticleBasicMaterial();
    // var star_system = new THREE.ParticleSystem(stars, star_stuff);
    // star_system.rotation.x = Math.PI/2


    // scene.add(star_system);

    //swiatła
function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}
        var light = new THREE.SpotLight( 0xF0D700, 1.068, 1000, 1.10);
        console.log(light)
      
        light.position.set( 0, 400, 650 );

        light.shadow.mapSize.width = 4126;  // default
        light.shadow.mapSize.height = 4126; // default
        light.shadow.camera.near = 0.5;       // default
        light.shadow.camera.far = 1500      // default
        light.target = scene;

        light.castShadow = true;            // default false
        scene.add( light );
        var AmbientLight = new THREE.AmbientLight( 0xffffff, 0.362 ); // soft white light
        scene.add( AmbientLight );
        // gui.add( light , 'intensity', 0, 120 ).name('SpotLight intensity').step(0.001)
        // gui.add( AmbientLight , 'intensity', 0, 120 ).name('AmbientLight intensity').step(0.001)
        // gui.addColor( light, 'color').name('SpotLight color')
        // gui.addColor( AmbientLight, 'color').name('AmbientLight color')
        var helper2 = new THREE.CameraHelper( light.shadow.camera );
        // scene.add(helper2)
   
    //obiekty 3d 
    var skybox
    // materiały
    var blackWood, whiteWood, blackWood_pionki, whiteWood_pionki , material_szach_biale, material_szach_czarne
    function setMaterials(){
        blackWood = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/blackWood.jpg')
        });
        whiteWood = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/whiteWood.jpg')
        });
        blackWood_pionki = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/brownWood.jpg')
        });
        whiteWood_pionki = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/cremeWood.jpg')
        });
        material_szach_biale = new THREE.MeshPhongMaterial({color: 0x000000, side: THREE.DoubleSide, wireframe: false , shininess: 10  });
        material_szach_czarne = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: false , shininess: 10 });
    }
    
    //skybox
    function skyBox(){
        var materialArray = [];
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_pos_x.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_neg_x.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_pos_y.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_neg_y.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_neg_z.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_pos_z.png' ) }));
        for (var i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
        var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
        var skyboxGeom = new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1 );
        skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
        scene.add( skybox );
    }

    //meshes

    function initStol(){
        var szachownica = [
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1]
        ];

        var szachownica_element = new THREE.BoxBufferGeometry(100, 10, 100, 1, 1, 1)
        for (var i = 0; i < szachownica.length ; i++) {
            for (var j = 0; j < szachownica.length ; j++) {
                if (szachownica[i][j]==0) {
                    var szachownica_mesh = new THREE.Mesh(szachownica_element, whiteWood)
                    szachownica_mesh.receiveShadow = true;
                }
                else if(szachownica[i][j]==1){
                    var szachownica_mesh = new THREE.Mesh(szachownica_element, blackWood)
                    szachownica_mesh.receiveShadow = true;
                    szachownica_mesh.name = "czarne";
                    szachownica_mesh.userData = { x:-350 + i * 100, y:1, z:-350+ j * 100,  x_pole: i, y_pole: j};

                }
                szachownica_mesh.position.set(-350 + i * 100, 1, -350+ j * 100);
                    scene.add(szachownica_mesh);
            }
        }
    }
    var array_pionki_pl1 = []
    var array_pionki_pl2 = []
    function initPionki() {
        pionki_tab = [
            [1, 0, 0, 0, 0, 0, 2, 0],
            [0, 1, 0, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, 0, 2, 0],
            [0, 1, 0, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, 0, 2, 0],
            [0, 1, 0, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, 0, 2, 0],
            [0, 1, 0, 0, 0, 0, 0, 2]
        ];
         setInterval(function(){
            var pionki_string = JSON.stringify(pionki_tab)
            $("#pionki").html(pionki_string)
        },1000)
        var pionki_element = new THREE.CylinderBufferGeometry(50, 50, 40, 32)
        for (var i = 0; i < pionki_tab.length; i++) {
            for (var j = 0; j < pionki_tab.length; j++) {
                if (pionki_tab[i][j] == 1) {
                    var pionki_Mesh = new THREE.Mesh(pionki_element, whiteWood_pionki.clone());
                    pionki_Mesh.name = "pionek"
                    pionki_Mesh.userData = {color:"white", x:i, y:j}
                    pionki_Mesh.castShadow = true;
                    pionki_Mesh.position.set(-350 +i * 100, 20, -350 + j * 100);
                    array_pionki_pl1.push(pionki_Mesh)

                    scene.add(pionki_Mesh);
                }
                else if (pionki_tab[i][j] == 2) {
                    var pionki_Mesh = new THREE.Mesh(pionki_element, blackWood_pionki.clone());
                    pionki_Mesh.name = "pionek"
                    pionki_Mesh.userData = {color:"black", x:i, y:j}
                    pionki_Mesh.castShadow = true;
                    pionki_Mesh.position.set(-350 +i * 100, 20, -350 + j * 100);
                    array_pionki_pl2.push(pionki_Mesh)
                    scene.add(pionki_Mesh);
                }
                mesh = pionki_Mesh
            }
        }
    }
    setInterval(function(){
        pl_array = net.startGame()
        console.log(pl_array)
        if (pl_array[0] != "" && pl_array[1] != "") {
        for (var i = 0; i < array_pionki_pl1.length; i++) {
            // console.log(array_pionki_pl1[i])
            array_pionki_pl1[i].name = pl_array[0]
        }
        for (var i = 0; i < array_pionki_pl2.length; i++) {
            // console.log(array_pionki_pl2[i])
            array_pionki_pl2[i].name = pl_array[1]
        }
        start = true;
    }
    },3000)

    this.getTab = function(){
        return pionki_tab
    }
                    
    //meshe

    /*
        zmienna publiczna, dostępna z innych klas/plików, nie używać
    */
    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej funkcji (klasie)
    */
    function selectCamera(){
            text = {
                type: ""
            }
        //     gui.add(text, 'type', [ 'gora', 'przod', 'poziomo', 'tyl' ] ).name("ustaw kamere").onChange(function(value){
        //         switch(value) {
        // case "gora":
        //     camera.position.x = 0;
        //     camera.position.y = 690;
        //     camera.position.z = 0;
        //     camera.lookAt(scene.position);
        //     camera.updateProjectionMatrix();
        //     break;
        // case "przod":
        //     camera.position.x = 0;
        //     camera.position.y = 275;
        //     camera.position.z = 635;
        //     // light.position.set( 0, 300, 550 );
        //     camera.lookAt(scene.position);
        //     camera.updateProjectionMatrix();

        //     break;
        // case "poziomo":
        //     camera.position.x = 0;
        //     camera.position.y = 25;
        //     camera.position.z = -635;
        //     camera.lookAt(scene.position);
        //     camera.updateProjectionMatrix();
            
        //     break;
        // case "tyl":
        //     camera.position.x = 0;
        //     camera.position.y = 275;
        //     camera.position.z = -635;
        //     // light.position.set( 0, 300, -550 );
        //     camera.lookAt(scene.position);
        //     camera.updateProjectionMatrix();

        //     break;
       
        // }
        //     });
            
    }
    this.setTab = function(array){
        pionki_tab = []
        array_pionki_pl1 = []
        array_pionki_pl2 = []
        pionki_tab = array
        var pionki_element = new THREE.CylinderBufferGeometry(50, 50, 40, 32)
        for (var i = 0; i < pionki_tab.length; i++) {
            for (var j = 0; j < pionki_tab.length; j++) {
                if (pionki_tab[i][j] == 1) {
                    var pionki_Mesh = new THREE.Mesh(pionki_element, whiteWood_pionki.clone());
                    pionki_Mesh.name = "pionek"
                    pionki_Mesh.userData = {color:"white", x:i, y:j}
                    pionki_Mesh.castShadow = true;
                    pionki_Mesh.position.set(-350 +i * 100, 20, -350 + j * 100);
                    array_pionki_pl1.push(pionki_Mesh)

                    scene.add(pionki_Mesh);
                }
                else if (pionki_tab[i][j] == 2) {
                    var pionki_Mesh = new THREE.Mesh(pionki_element, blackWood_pionki.clone());
                    pionki_Mesh.name = "pionek"
                    pionki_Mesh.userData = {color:"black", x:i, y:j}
                    pionki_Mesh.castShadow = true;
                    pionki_Mesh.position.set(-350 +i * 100, 20, -350 + j * 100);
                    array_pionki_pl2.push(pionki_Mesh)
                    scene.add(pionki_Mesh);
                }
                mesh = pionki_Mesh
            }
        }
    }
    this.sendMeshes = function(){
                   var meshes = []
             meshes.push(array_pionki_pl1)
             meshes.push(array_pionki_pl2)
             meshes.push(scene)
             return meshes
     }
    function init() {
        var width = innerWidth;
        var height = innerHeight;

        renderer.setClearColor(color);
        renderer.setSize(width, height);


        //pozycje obiektów/kamery
        camera.position.x = 0;
        camera.position.y = 275;
        camera.position.z = 635;
       
        selectCamera()
        setMaterials()
        initStol()
        initPionki()
        skyBox()
        statystyki()
        // scene.add(axis);

        camera.lookAt(scene.position);
        var t = 0;
        var rotate = false
        function animateScene() {
            t -= 0.0001;  
            // console.log(skybox)
            // mesh.rotation.y += 0.01
            skybox.rotation.y -= 0.0001
            light.position.x = 500*Math.sin(t) + 0;
            light.position.z = 500*Math.cos(t) + 0; // These to strings make it work
            stats.begin();
            stats.end();
            requestAnimationFrame(animateScene);
            renderer.render(scene, camera);
        }
        animateScene()
        document.addEventListener("mousedown", onMouseDown, false);
        var pionek
        function onMouseDown(event) {
            var elo = net.yourLogin()
        console.log(elo)

                mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouseVector, camera);
                var intersects = raycaster.intersectObjects(scene.children);
                if (intersects.length > 0 && intersects[0].object.name == "czarne" || intersects[0].object.name == net.yourLogin() ) {
                    if (intersects[0].object.name == net.yourLogin()) {
                        pionek = intersects[0].object
                        pionek.material.color.setHex( 0x00ff00 );
                        console.log(pionek.userData.color)
                        console.log(pionek.userData.x)
                        console.log(pionek.userData.y)
                        // console.log(pionek)

                    }
                    if (intersects[0].object.name == "czarne") {
                        var czarne = intersects[0].object.userData
                        pionek.position.set(czarne.x,czarne.y+20,czarne.z)
                        
                        if(pionek.userData.color == "white"){
                            pionki_tab[pionek.userData.x][pionek.userData.y] = 0
                            pionki_tab[czarne.x_pole][czarne.y_pole] = 1
                            pionek.material = whiteWood_pionki.clone()
                            // net.sendArray(pionki_tab)


                        }
                        if(pionek.userData.color == "black"){
                            pionki_tab[pionek.userData.x][pionek.userData.y] = 0
                            pionki_tab[czarne.x_pole][czarne.y_pole] = 2
                            pionek.material = blackWood_pionki.clone()
                            // net.sendArray(pionki_tab)

                        }
                        pionek.userData.x = czarne.x_pole
                        pionek.userData.y = czarne.y_pole
                        clicked = true
                            net.sendArray(pionki_tab)
                        console.log(czarne)
                    }
                    // && intersects[0].object.name == "pionek"
                    // console.log(intersects[0].object);
                    // console.log(intersects[0].position);

                    mesh = intersects[0].object
                    // camera.lookAt(mesh.position)
                    camera.updateProjectionMatrix();
                }
            }
        controls.update();
            if (pl_array != undefined) {
            console.log(pl_array)

            }


           
           
        // function camerapos(){
        //     console.log("x: " +camera.position.x)
        //     console.log("y: " +camera.position.y)
        //     console.log("z: " +camera.position.z)
        // }

        document.getElementById("scene").appendChild(renderer.domElement);

        // alert("gra startuje, test = " + test)
    }

    init();
    // document.addEventListener("keydown", onKeyDown, false); // naciśnięcie dowolnego klawisza

    // function onKeyDown(event)    {

    //     var keyCode = event.which;

    //     console.log(keyCode); // wyloguj kod klawisza

    //     switch (keyCode) {

    //         case 65:
    //             mesh.position.x -= 100
    //             console.log(mesh.position);
    //             break;
    //         case 68:
    //             mesh.position.x += 100
    //             console.log(mesh.position);

    //             break;
    //         case 83:
    //             mesh.position.z += 100
    //             console.log(mesh.position);

    //             break;
    //         case 87:
    //             mesh.position.z -= 100
    //             console.log(mesh.position);

    //             break;
    //     }

    // }
    window.addEventListener( 'resize', onWindowResize, false );
                function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth , window.innerHeight );

    }
    /*
        funkcje publiczne możliwe do wywołania z innych funkcji (klas)
    */


    // this.setCamera = function (val) {
        // string = val;
       
        // alert("ustawiam test w klasie Game na: " + test)
    // }

    this.getTest = function () {
        return test;
    }
    this.setCamera = function(){
        camera.position.x = 0;
        camera.position.y = 275;
        camera.position.z = -635;
            // light.position.set( 0, 300, 550 );
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
    }

}

