function Skybox(){
        var materialArray = [];
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'gfx/pink_planet_pos_x.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'gfx/pink_planet_neg_x.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'gfx/pink_planet_pos_y.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'gfx/pink_planet_neg_y.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'gfx/pink_planet_neg_z.png' ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'gfx/pink_planet_pos_z.png' ) }));
        for (var i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
        var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
        var skyboxGeom = new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1 );
        skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
        //scene.add( skybox );

        this.getSkybox = function (){
        return skybox;
    }
}