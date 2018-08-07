function Level() {
	obj = levelData.getLevelData()
	// console.log(obj)
    var color = 0xFFE4E1;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
       90, // k�t patrzenia kamery (FOV - field of view)
        4 / 3, // proporcje widoku, powinny odpowiada� proporjom naszego ekranu przegl�darki
        0.1, // minimalna renderowana odleg�o��
        100000 // maxymalna renderowana odleg�o��
    );
    shadow = {
            cast: true
        }
    var clock = new THREE.Clock();
    
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = shadow.cast;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    var axis = new THREE.AxisHelper(1000);    // 200 - wielkość
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()
    var stats = new Stats();
    var fireGenerator = new Fire()

    var playerMixer, playerModel, player
    var weaponModel, weapon, weaponMixer
    var myLightContainer_array = []
    var camVect
    var camPos, gui
    var laser = new Laser()
    var get_laser = laser.getLaser()
        
   

    function statystyki(){
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );
    }
    var mapSize= parseInt(obj.size)
    // plane_material

    function makeLevel(){

        wall_material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide, 
                map: THREE.ImageUtils.loadTexture('mats/wall.jpg'),
                color: 0xffffff,
                shininess: 10
            });
        
        

         var wall_geometry = new THREE.BoxBufferGeometry(100, 100, 100, 1, 1, 1)
        for (var i = 0; i < obj.level.length; i++) {
        		if (obj.level[i].type == "wall") {
        			x = parseInt(obj.level[i].x)
        			y = parseInt(obj.level[i].y)
            		var wall_mesh = new THREE.Mesh(wall_geometry, wall_material)
            		wall_mesh.position.set(-450+x*100,50,-450+y*100)
                    wall_mesh.castShadow = true
                    wall_mesh.receiveShadow = true

            		scene.add(wall_mesh)
        		}
        		if (obj.level[i].type == "light") {
        			x = parseInt(obj.level[i].x)
        			y = parseInt(obj.level[i].y)
                    var myLightContainer = new MyLight(0xffffff, 1)
                    var myLight = myLightContainer.getLight()
                    myLight.position.set(-450+x*100,5,-450+y*100)
                    myLight.castShadow = true
                    var fire = fireGenerator.getFire(-450+x*100,5,-450+y*100)
                    fire.position.set(-450+x*100,25,-450+y*100)

                    // console.log(fire)

        			scene.add(fire)
                    myLightContainer_array.push(myLightContainer)
                    scene.add(myLight);
        		}
                if (obj.level[i].type == "player") {
                    var playerMaterial = new THREE.MeshPhongMaterial(
                     {
                         map: THREE.ImageUtils.loadTexture("models/skinverts2.png"),
                         morphTargets: true,
                         shininess: 10

                     });
                    var loader = new THREE.JSONLoader();
                    loader.load('models/tris.js', function (playerGeometry) {

                        playerModel = new THREE.Mesh(playerGeometry, playerMaterial)
                        playerModel.name = "player";
                        playerModel.rotation.y = 0; // ustaw obrót modelu
                        playerModel.position.set(-400+x*50,25,-400+y*50) // ustaw pozycje modelu
                        // playerModel.scale.set(1,1,1); // ustaw skalę modelu
                        playerModel.castShadow = shadow.cast // ustaw skalę modelu
                        camera.lookAt(playerModel.position);

                     // console.log(playerModel)
                        // console.log(playerGeometry.animations)
                        playerMixer = new THREE.AnimationMixer(playerModel);
                        // var box = new THREE.Box3().setFromObject(playerModel);
                        scene.add(playerModel);
                        playerMixer.stopAllAction()
                        playerMixer.clipAction("stand").reset();
                        playerMixer.clipAction("stand").play();



                    })
                    var weaponMaterial = new THREE.MeshPhongMaterial(
                     {
                         map: THREE.ImageUtils.loadTexture("models/weapon-pcx.png"),
                         morphTargets: true,
                         shininess: 10

                     });
                    loader.load('models/weapon.js', function (weaponGeometry) {

                        weaponModel = new THREE.Mesh(weaponGeometry, weaponMaterial)
                        weaponModel.name = "gun";
                        weaponModel.rotation.y = 0; // ustaw obrót modelu
                        weaponModel.position.set(-400+x*50,25,-400+y*50) // ustaw pozycje modelu
                        // playerModel.scale.set(1,1,1); // ustaw skalę modelu
                        weaponModel.castShadow = shadow.cast // ustaw skalę modelu
                        // camera.lookAt(weaponModel.position);

                     // console.log(playerModel)
                        // console.log(weaponGeometry.animations)
                        weaponMixer = new THREE.AnimationMixer(weaponModel);
                        // var box = new THREE.Box3().setFromObject(playerModel);
                        scene.add(weaponModel);
                        // console.log(weaponGeometry.animations)

                        weaponMixer.stopAllAction()
                        weaponMixer.clipAction("stand").reset();
                        weaponMixer.clipAction("stand").play();



                    })

                }
        }
        // console.log(playerModel)


    }

    ///////
    //GUI//
    ///////

   

    //objects
    function makeFloor(){
        var floor_plane = new THREE.PlaneBufferGeometry( 1024, 1024, 32 )
        var floor_texture = THREE.ImageUtils.loadTexture( 'mats/plain.jpg' );
        floor_texture.wrapS = floor_texture.wrapT = THREE.RepeatWrapping;
        floor_texture.repeat.set( 8, 8 );

        
                // var plane_material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/plain.jpg')} );
        var floor_material = new THREE.MeshPhongMaterial( {
            shininess: 10,
            side: THREE.DoubleSide,
            color: 0xffffff,
            map: floor_texture,
            combine: THREE.MixOperation,
        } )

        var floor_mesh = new THREE.Mesh(floor_plane, floor_material);
        floor_mesh.receiveShadow = true
        // plane_mesh.rotation.y = Math.PI/2
        floor_mesh.rotation.set(Math.PI/2,0,0)
        floor_mesh.position.set(0,0,0)

        // plane_mesh.position.set(0,-5,0)

        scene.add(floor_mesh);

    }
   
    function makeCeiling(){
        var ceiling_plane = new THREE.PlaneBufferGeometry( 1024, 1024, 32 )
        var ceiling_texture = THREE.ImageUtils.loadTexture( 'mats/plain.jpg' );
        ceiling_texture.wrapS = ceiling_texture.wrapT = THREE.RepeatWrapping;
        ceiling_texture.repeat.set( 8, 8 );
                // var plane_material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/plain.jpg')} );
        var ceiling_material = new THREE.MeshPhongMaterial( {
            side: THREE.DoubleSide,
             shininess: 10,
            color: 0xffffff,
            map: ceiling_texture,
            combine: THREE.MixOperation,
        } )

        var ceiling_mesh = new THREE.Mesh(ceiling_plane, ceiling_material);
        // plane_mesh.rotation.y = Math.PI/2
        ceiling_mesh.receiveShadow = true
        ceiling_mesh.rotation.set(Math.PI/2,0,0)
        ceiling_mesh.position.set(0,100,0)
        // scene.add(ceiling_mesh);
    }
    

    var AmbientLight = new THREE.AmbientLight( 0xffffff, 0.362 ); // soft white light
        scene.add( AmbientLight );


    
    //funkcja zwraca obiekt geometry, nie mesh
    

    // plane_mesh.position.set(0,-5,0)


    
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

        
   
    //obiekty 3d 
    // materiały
        
        // whiteWood_pionki = new THREE.MeshPhongMaterial({
        //     side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('mats/cremeWood.jpg')
        // });
        // material_szach_czarne = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: false , shininess: 10 });
    
    //skybox
    // function skyBox(){
    //     var materialArray = [];
    //     materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_pos_x.png' ) }));
    //     materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_neg_x.png' ) }));
    //     materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_pos_y.png' ) }));
    //     materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_neg_y.png' ) }));
    //     materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_neg_z.png' ) }));
    //     materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'skybox/pink_planet_pos_z.png' ) }));
    //     for (var i = 0; i < 6; i++)
    //     materialArray[i].side = THREE.BackSide;
    //     var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
    //     var skyboxGeom = new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1 );
    //     skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
    //     scene.add( skybox );
    // }

    //meshes

        // var szachownica_element = new THREE.BoxBufferGeometry(100, 10, 100, 1, 1, 1)
        // var szachownica_mesh = new THREE.Mesh(szachownica_element, whiteWood)

   
    //meshe

    /*
        zmienna publiczna, dostępna z innych klas/plików, nie używać
    */
    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej funkcji (klasie)
    */
        // console.log(playerModel)
        // setInterval(function(){
        //     for (var i = 0; i < myLightContainer_array.length; i++) {
        //         var rand = (Math.random() * (1.000 - 2.000) + 0.0100).toFixed(4)
        //         myLightContainer_array[i].changeIntensity(rand)
        //         // console.log(light_array[i].children[1].intensity)
        //     }
        // },100)
        gui = new dat.GUI({
            autoplace: false, 
            width: 750
        });
        gui.add( camera , 'fov', 0, 120 ).name('camera fov').onChange(function(){
            camera.updateProjectionMatrix();
        });

        var text = {
            number: 1
        }
        gui.add(text, 'number', 0, 10 ).name('light intensity').onChange(function(value){
            for (var i = 0; i < myLightContainer_array.length; i++) {
                myLightContainer_array[i].changeIntensity(value)
                // console.log(light_array[i].children[1].intensity)

            }
        });
        var Configuracion=function(){
                this.color = "#ffae23";
        }
        var conf = new Configuracion();

        var controlador = gui.addColor( conf, 'color');
        controlador.onChange( function( colorValue  ){
          //the return value by the chooser is like as: #ffff so
          //remove the # and replace by 0x
          colorValue=colorValue.replace( '#','0x' );
          colorValue = parseInt(colorValue)
          // myLightContainer.changeLightColor(0xffff00)

          for (var i = 0; i < myLightContainer_array.length; i++) {
            myLightContainer_array[i].changeLightColor(colorValue)

         }
        });
        vector = {
            x: 0,
            y: 0,
            z: 0
        }
        gui.add(vector, 'x', -100, 100 ).name('kamera za postacia x').onChange(function(value){
            vector.x = value
        });
         gui.add(vector, 'y', -100, 100 ).name('kamera za postacia y').onChange(function(value){
            vector.y = value
        });
          gui.add(vector, 'z', -360, 360 ).name('kamera za postacia z').onChange(function(value){
            vector.z = value
        });
          gui.add(shadow, 'cast').name('cast shadows').onChange(function(){
            // console.log(shadow.cast)
        });
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    function init() {
    	
    	console.log(get_laser)
    	scene.add(get_laser)
        var width = innerWidth;
        var height = innerHeight;

        renderer.setClearColor(color);
        renderer.setSize(width, height);


        //pozycje obiektów/kamery
        camera.position.x = 0;
        camera.position.y = 75;
        camera.position.z = 100;
        makeLevel()
        makeFloor()
        makeCeiling()
        statystyki()
        // scene.add(axis);
		
        function animateScene() {
        	fireGenerator.updateFire()
            requestAnimationFrame(animateScene);
            var delta = clock.getDelta();
            if (playerMixer) {playerMixer.update(delta) 
                weaponMixer.update(delta)}
            // if (weaponMixer) {}

            if(moveForward){
                playerModel.translateX(-2)
                weaponModel.translateX(-2)
            }
            if(rotateLeft){
                playerModel.rotation.y += 0.1
                weaponModel.rotation.y += 0.1
                // get_laser.rotation.y += 0.1
                // get_laser.rotation.y += Math.PI



            }
            if(rotateRight){
                playerModel.rotation.y -= 0.1
                weaponModel.rotation.y -= 0.1
                // get_laser.rotation.y -= 0.1
                // get_laser.rotation.y += Math.PI


            }

            if (playerModel != undefined && weaponModel != undefined) {
                camVect = new THREE.Vector3(63 + vector.x, 36 + vector.y, 0 + vector.z)
                // console.log(camVect)

                get_laser.position.x = playerModel.position.x
                get_laser.position.y = playerModel.position.y
                get_laser.position.z = playerModel.position.z
                get_laser.rotation.y = playerModel.rotation.y
                get_laser.rotation.y += Math.PI


                camPos = camVect.applyMatrix4(playerModel.matrixWorld);
                camera.position.x = camPos.x 
                camera.position.y = camPos.y 
                camera.position.z = camPos.z

                camera.lookAt(playerModel.position)
            }
            var verts = get_laser.geometry.vertices
           	console.log(verts)
           	for (var i = 0; i < verts.length; i++) {
           	    var particle = verts[i];
           	     // tu zmieniaj losowo pozycję x,y,z każdej z cząsteczek       
           	     particle.x = randomIntFromInterval(10,400)
           	     particle.y = randomIntFromInterval(20,30)
           	     particle.z = randomIntFromInterval(1,10)
           	        
           	}
           	get_laser.geometry.verticesNeedUpdate = true;
           	get_laser.material.size = 5
            //     for (var i = 0; i < mixertab.length; i++) {
            //         mixertab[i].update(delta)
            // };
            // console.log(skybox)
            stats.begin();
            stats.end();
            renderer.render(scene, camera);
        }
        animateScene()
        document.addEventListener("mousedown", onMouseDown, false);
        function onMouseDown(event) {
                mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouseVector, camera);
                var intersects = raycaster.intersectObjects(scene.children);
                if (intersects.length > 0) {
                    // console.log(intersects[0].object);
                    mesh = intersects[0].object
                    // camera.lookAt(mesh.position)
                    camera.updateProjectionMatrix();
                }
            }
        controls.update();

        // document.addEventListener("mouseup", camerapos, false);
        // function camerapos(){
        //     console.log("x: " +camera.position.x)
        //     console.log("y: " +camera.position.y)
        //     console.log("z: " +camera.position.z)
        // }

        document.getElementById("scene").appendChild(renderer.domElement);

        // alert("gra startuje, test = " + test)
    }

    init();
    var rotateLeft, rotateRight, moveForward
    document.addEventListener("keydown", onKeyDown, false); // naciśnięcie dowolnego klawisza
    document.addEventListener("keyup", onKeyUp, false); 
    function onKeyDown(event)    {
        var keyCode = event.which;
        // console.log(keyCode); // wyloguj kod klawisza
        switch (keyCode) {

            case 65: //A
                rotateLeft = true
                break;
            case 68: //D
                rotateRight = true
                break;
            case 87: //W
                moveForward = true
                playerMixer.clipAction("stand").stop();
                playerMixer.uncacheClip("stand");
                weaponMixer.clipAction("stand").stop();
                weaponMixer.uncacheClip("stand");
                // playerMixer.clampWhenFinished = true;
                playerMixer.clipAction("run").play();
                weaponMixer.clipAction("run").play();
                break;
                case 32:
                weaponMixer.clipAction("attack").play();
                playerMixer.clipAction("attak").play();
                break;
             // case 83:
            //     // mesh.position.z += 100
            //     // console.log(mesh.position);

            //     break;
        }

    }

    function onKeyUp(event)    {
        var keyCode = event.which;
        // console.log(keyCode); // wyloguj kod klawisza
        switch (keyCode) {
            case 65: //A
                rotateLeft = false
                break;
            case 68: //D
                rotateRight = false
                break;
            case 87: //W
                moveForward = false
                playerMixer.clipAction("run").stop();
                playerMixer.uncacheClip("run");
                weaponMixer.clipAction("run").stop();
                weaponMixer.uncacheClip("run");
                playerMixer.clipAction("stand").play();
                weaponMixer.clipAction("stand").play();
                break;
            case 32:
                weaponMixer.clipAction("attack").stop();
                weaponMixer.uncacheClip("attack");
                playerMixer.clipAction("attak").stop();
                playerMixer.uncacheClip("attak");
                break;
             // case 83:
            //     // mesh.position.z += 100
            //     // console.log(mesh.position);

            //     break;
        }

    }
    window.addEventListener( 'resize', onWindowResize, false );
                function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth , window.innerHeight );

    }

                    // var speed = 10;
                    var halfSize = 50;
                    var nearHalfSize = halfSize-5;

                             // }
    /*
        funkcje publiczne możliwe do wywołania z innych funkcji (klas)
    */


    // this.setCamera = function (val) {
        // string = val;
       
        // alert("ustawiam test w klasie Game na: " + test)
    // }

    // this.getTest = function () {
    //     return test;
    // }

}