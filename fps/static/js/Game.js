/*
    klasa Game
*/

function Game() {
    
    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */

    var test = 10;
    var fov = 90; //GLOBALS
    var color = 0x000000;
    

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        fov, // k�t patrzenia kamery (FOV - field of view)
        4 / 3, // proporcje widoku, powinny odpowiada� proporjom naszego ekranu przegl�darki
        0.1, // minimalna renderowana odleg�o��
        10000 // maxymalna renderowana odleg�o��
    );
    var renderer = new THREE.WebGLRenderer();
    // var controls = new THREE.OrbitControls(camera);
    var clock = new THREE.Clock();
    // var camControls = new THREE.FirstPersonControls(camera);
    var controls = new THREE.PointerLockControls( camera );
    var axis = new THREE.AxisHelper(1000);    // 200 - wielkość
    var raycaster = new THREE.Raycaster();
    // var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
     // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany będzie do określenie pozycji myszy na ekranie
    var listener = new THREE.AudioListener();
    var stats = new Stats();

    //świtała

    //obiekty 3d 
    var plansza = new THREE.PlaneGeometry(10000, 10000, 10, 10)
    var box1 = new THREE.BoxGeometry(500, 50, 200, 1, 1, 1)
    var box2 = new THREE.BoxGeometry(500, 50, 200, 1, 1, 1)
    var soundbox = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)

    // materiały
    var material_plansza = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide, wireframe: true });
    var material_box1 = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide, wireframe: false });
    var material_box2 = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide, wireframe: false });
    var material_soundbox = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide, wireframe: false });

    //meshe

    var plane_mesh = new THREE.Mesh(plansza, material_plansza);
    var box1_mesh = new THREE.Mesh(box1, material_box1);
    var box2_mesh = new THREE.Mesh(box2, material_box2);
    var soundbox_mesh = new THREE.Mesh(soundbox, material_soundbox);
    tab_objects  = new Array()
    tab_objects.push(box1_mesh)
    tab_objects.push(box2_mesh)

    console.log(tab_objects)


            
    /*
        zmienna publiczna, dostępna z innych klas/plików, nie używać
    */
    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej funkcji (klasie)
    */

    function init() {
        var blocker = document.getElementById( 'blocker' );
        var instructions = document.getElementById( 'instructions' );
        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if ( havePointerLock ) {

            var element = document.body;

            var pointerlockchange = function ( event ) {

                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

                    controlsEnabled = true;
                    controls.enabled = true;

                    blocker.style.display = 'none';

                } else {

                    controls.enabled = false;

                    blocker.style.display = '-webkit-box';
                    blocker.style.display = '-moz-box';
                    blocker.style.display = 'box';

                    instructions.style.display = '';

                }

            };

            var pointerlockerror = function ( event ) {

                instructions.style.display = '';

            };

            var pointerlockerror = function ( event ) {

                            instructions.style.display = '';

            };

            // Hook pointer lock state change events
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            instructions.addEventListener( 'click', function ( event ) {

                instructions.style.display = 'none';

                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                element.requestPointerLock();

            }, false );

            } else {

                instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

            }


        var controlsEnabled = false;

        var moveForward = false;
        var moveBackward = false;
        var moveLeft = false;
        var moveRight = false;
        var canJump = false;
        var speedUp = false;


        var prevTime = performance.now();
        var velocity = new THREE.Vector3();



        var width = innerWidth -15;
        var height = innerHeight;

        //ustawienia rendera
        renderer.setClearColor(color);
        renderer.setSize(width, height);
        renderer.shadowMapEnabled = true;

         // dzwięki
        // var sound = new THREE.PositionalAudio( listener );
        // var audioLoader = new THREE.AudioLoader();
        // audioLoader.load( 'audio/smash.ogg', function( buffer ) {
        //     sound.setBuffer( buffer );
        //     sound.setRefDistance( 50 );
        //     sound.play();
        // });
        //pozycje obiektów/kamery
        // camera.position.x = 100;
        // camera.position.y = 10;
        // camera.position.z = 10;
        // camera.position.x = 0;
        // camera.position.y = 275;
        // camera.position.z = 635;
        // camera.lookAt(new THREE.Vector3(0, 0, 0));
        // console.log(controls.g)
        scene.add(  controls.getObject())   //firstperson
        // console.log(camControls)
        //        camControls.lookSpeed = 0.4;
        //        camControls.movementSpeed = 40;
        //        camControls.noFly = true;
        //        camControls.lookVertical = true;
        //        camControls.constrainVertical = true;
        //        camControls.verticalMin = 1.0;
        //        camControls.verticalMax = 2.0;
        //        camControls.lon = -150;
        //        camControls.lat = 0;

        // camera.position.x = 0;
        // camera.position.y = 390;
        // camera.position.z = -970;

        // camera.lookAt(scene.position);
        camera.add( listener );

        //plane_mesh
        plane_mesh.rotateX(Math.PI / 2);

        //box1_mesh
        box1_mesh.name = "zielony";
        box1_mesh.position.x = 0;
        box1_mesh.position.y = 25;
        box1_mesh.position.z = 450;
        box1_mesh.castShadow = true

        
        //box2_mesh
        box1_mesh.name = "czerwony";
        box2_mesh.position.x = 0;
        box2_mesh.position.y = 25;
        box2_mesh.position.z = -450;
        box2_mesh.castShadow = true

        //soundbox
        soundbox_mesh.position.y = 500;


        //światło 

        //dodawanie do sceny
        scene.add(plane_mesh);
        scene.add(box1_mesh);
        scene.add(box2_mesh);
        scene.add(soundbox_mesh);
        scene.add(axis);
        // soundbox_mesh.add( sound );
        //stats
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );
        var speed =  document.getElementById("speed")
        function animateScene() {
            if ( controlsEnabled ) {
                                raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

                                raycaster.ray.origin.copy( controls.getObject().position );
                                raycaster.ray.origin.y -= 75;
                                raycaster.ray.origin.x += 0;
                                raycaster.ray.origin.z += 0;
                                console.log(raycaster.ray)


                                var intersections = raycaster.intersectObjects( tab_objects );
                                console.log(intersections)
                                var isOnObject = intersections.length > 0;

                                var time = performance.now();
                                var delta = ( time - prevTime ) / 1000;

                                velocity.x -= velocity.x * 10.0 * delta;
                                velocity.z -= velocity.z * 10.0 * delta;

                                velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

                                if (speedUp) {speed = 2000.0} else speed = 0.0
                                if ( moveForward ) velocity.z -= (1500.0 + speed) * delta;
                                if ( moveBackward ) velocity.z += (1500.0 + speed) * delta;

                                if ( moveLeft ) velocity.x -= (1500.0 + speed) * delta;
                                if ( moveRight ) velocity.x +=  (1500.0 + speed) * delta;

                                if ( isOnObject === true ) {
                                    velocity.y = Math.max( 0, velocity.y );
                                    velocity.z = Math.max( 0, velocity.z );
                                    velocity.x = Math.max( 0, velocity.x );

                                    canJump = true;
                                }
                                controls.getObject().translateX( velocity.x * delta );
                                controls.getObject().translateY( velocity.y * delta );
                                controls.getObject().translateZ( velocity.z * delta );

                                if ( controls.getObject().position.y < 75 ) {

                                    velocity.y = 0;
                                    controls.getObject().position.y = 75;

                                    canJump = true;

                                }

                                prevTime = time;

                            }
            setInterval(function(){
                speed.innerHTML = velocity.z
            },10) 
            var delta = clock.getDelta();
            // camControls.update(delta);
            // controls.update();
            stats.begin();

            // monitored code goes here

            stats.end();
            requestAnimationFrame(animateScene);
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
                    console.log(intersects[0].object);
                    mesh = intersects[0].object
                    // camera.lookAt(mesh.position)
                    camera.updateProjectionMatrix();
                }
            }
        // document.addEventListener("mouseup", camerapos, false);
        function camerapos(){
            console.log("x: " +camera.position.x)
            console.log("y: " +camera.position.y)
            console.log("z: " +camera.position.z)
        }

        document.getElementById("scene").appendChild(renderer.domElement);
        var onKeyDown = function ( event ) {
        			console.log(event.keyCode)
                    switch ( event.keyCode ) {
                    	case 16:
                            speedUp = true;

                    	break;
                        case 38: // up
                        case 87: // w
                            moveForward = true;
                            break;

                        case 37: // left
                        case 65: // a
                            moveLeft = true; 
                            break;

                        case 40: // down
                        case 83: // s
                            moveBackward = true;
                            break;

                        case 39: // right
                        case 68: // d
                            moveRight = true;
                            break;

                        case 32: // space
                            if ( canJump === true ) velocity.y += 800;
                            canJump = false;
                            break;

                    }

                };

                var onKeyUp = function ( event ) {

                    switch( event.keyCode ) {
                        case 16:
                            speedUp = false;
                        break
                        case 38: // up
                        case 87: // w
                            moveForward = false;
                            break;

                        case 37: // left
                        case 65: // a
                            moveLeft = false;
                            break;

                        case 40: // down
                        case 83: // s
                            moveBackward = false;
                            break;

                        case 39: // right
                        case 68: // d
                            moveRight = false;
                            break;

                    }

                };
                window.addEventListener( 'resize', onWindowResize, false );
                function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth , window.innerHeight );

            }
                document.addEventListener( 'keypressed', onKeyDown, false );

                document.addEventListener( 'keydown', onKeyDown, false );
                document.addEventListener( 'keyup', onKeyUp, false );

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
        // alert("gra startuje, test = " + test)
    }

    init();

    /*
        funkcje publiczne możliwe do wywołania z innych funkcji (klas)
    */


    this.setCamera = function (val) {
        string = val;
        switch(string) {
    case "gora":
        camera.position.x = 0;
        camera.position.y = 690;
        camera.position.z = 0;
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
        break;
    case "przod":
        camera.position.x = 0;
        camera.position.y = 275;
        camera.position.z = 635;
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        break;
    case "poziomo":
        camera.position.x = 0;
        camera.position.y = 25;
        camera.position.z = -635;
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
        
        break;
    case "tyl":
        camera.position.x = 0;
        camera.position.y = 275;
        camera.position.z = -635;
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();

        break;
   
}
        // alert("ustawiam test w klasie Game na: " + test)
    }

    this.getTest = function () {
        return test;
    }


}

