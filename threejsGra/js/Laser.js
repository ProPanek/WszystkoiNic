function Laser(){
	var v1 = new THREE.Vector3(0,0,0)
	var v2 = new THREE.Vector3(0,0,200)
	var particles = new THREE.Geometry()
	var particleMaterial = new THREE.PointsMaterial(
	{
	    color: 0xff3300,
	    size: 10, // ta wartośc zmieniamy suwakiem skali
	    // map: THREE.ImageUtils.loadTexture("http://admins.spec.pl.hostingasp.pl/Stefa%C5%84czyk_Dariusz/THREEJS/utils/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
	    blending: THREE.AdditiveBlending,
	    transparent: true,
	    depthWrite: false,
	    opacity: 0.6
	});
	var subV = new THREE.Vector3(
	    v2.x - v1.x,
	    v2.y - v1.y,
	    v2.z - v1.z
	)
	// return subV
	var stepV = subV.divideScalar(50)
	for(var i = 0;i<1000;i++ ){
	    var particle = new THREE.Vector3(
	        v1.x + stepV.x * i,
	        v1.y + stepV.y * i,
	        v1.z + stepV.z * i) 
	    particles.vertices.push(particle);
	}
	var particleSystem = new THREE.Points(particles, particleMaterial);
	// scene.add(particleSystem)
	this.getLaser = function (){
	    return particleSystem;
	}
}