function Fire() {

	var container_tab = new Array()
	function getRandomInt(min, max,interval) {
                if (typeof(interval)==='undefined') interval = 1;
                var r = Math.floor(Math.random()*(max-min+interval)/interval);
                return r*interval+min;
            }
	 function generate(x,y,z){
   				 var container = new THREE.Object3D();
                var material = new THREE.MeshBasicMaterial({
                    color: 0xff6600,
                    transparent: true,
                    opacity: 0,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
                });
                    var geometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);

                for (var i = 0; i < 50; i++) {
                    var random_x = getRandomInt(1, 5)
                    var random_y = getRandomInt(1, 5)
                    var random_z = getRandomInt(1, 5)


                    var particle = new THREE.Mesh(geometry, material.clone())
                    particle.scale.set(random_x, random_y, random_z)
                    container.add(particle)
                    particle.position.set(x,y,z)
                    // scene.add(particle)
                }
                container_tab.push(container)
                return container
            }
            generate()
            function update(){
            	// console.log(container_tab[0].children[0])
            	for (var j = 0; j < container_tab.length; j++) {
            		    for (var i = 0; i < container_tab[j].children.length; i++) {
                    var speed = getRandomInt(0, 1,0.1)
                    container_tab[j].children[i].position.y += speed
                    container_tab[j].children[i].opacity -= 0.5
                    if ( container_tab[j].children[i].position.y >25) {
                        var x = getRandomInt(0, 10)
                        var z = getRandomInt(0, 10)
                        container_tab[j].children[i].position.set(x,0,z)
                        container_tab[j].children[i].opacity = 1
                    }
                }
            	}
            
            }

            this.updateFire = function (){
                update();
            }
            this.getFire = function (x,y,z){
                 return generate(x,y,z)
            }
            this.generateFire = function (){
                generate()
            }
}