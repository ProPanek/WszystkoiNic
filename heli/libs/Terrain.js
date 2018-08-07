/*
generowanie terenu - przerobione funkcje z dokumentacji threejs
opis parametrów - w pliku
*/

//konstruktor

function Terrain(szerokosc_terenu, wysokosc_terenu, kolor_terenu, data_terenu) {
   
    /*
        gestość oraz wysokość siatki terenu
    */

    var worldWidth = szerokosc_terenu
    var worldDepth = wysokosc_terenu
    //console.log(worldWidth, worldDepth)

    /*
        geometria terenu o wymiarach 5000 x 5000
    */

    var terrainGeometry = new THREE.PlaneBufferGeometry(5000, 5000, worldWidth - 1, worldDepth - 1);
    terrainGeometry.rotateX(-Math.PI / 2);

    /*
        dane liczbowe potrzebne do generowania terenu
    */
    if (data_terenu != undefined) {
        var data = data_terenu
    }
    else {
        var data = generateHeight(worldWidth, worldDepth);
    }

    //console.log(data)
    // var data_json = JSON.stringify(data)
    var json = JSON.stringify(data, null, 4)
    document.getElementById('noiseResults').value = json;
    //$("#noiseResults").
    /*
        ustalenie pozycji vertexów geometrii
        według powyższych danych
        h -> mnożnik pofalowania terenu
    */

    var h = 10
    var vertices = terrainGeometry.attributes.position.array;
    for (var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
        vertices[j + 1] = data[i] * h;
    }

    /*
        textura - kolor terenu 
        parametr map - włącza wygenerowaną proceduralnie teksturę
        można zamiast niej użyć jak zwykle pliku png, jpg
    */

    var texture = new THREE.CanvasTexture(generateTexture(data, worldWidth, worldDepth));
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    var mesh = new THREE.Mesh(terrainGeometry, new THREE.MeshBasicMaterial(
            {
                color: 0xffff00,
               // wireframe: true,
               // map: THREE.ImageUtils.loadTexture("url")
                map: texture
            }));


    /*
        funkcja generujaca dane liczbowe mapy wysokości
        czyli pozycje vertexów zwracanej geometrii
        ~~ -> szybki Math.floor()
    */

    function generateHeight(width, height) {
        var size = width * height, data = new Uint8Array(size),
        perlin = ImprovedNoise(), quality = 1, z = Math.random() * 100;
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < size; i++) {
                var x = i % width, y = ~~(i / width);
                data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);
            }
            quality *= 5;
        }
        return data;
    }
    
    /*
        główna funkcja losująca
    */

    function ImprovedNoise() {

        var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10,
             23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87,
             174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
             133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
             89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5,
             202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119,
             248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
             178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249,
             14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
             93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

        for (var i = 0; i < 256 ; i++) {

            p[256 + i] = p[i];

        }

        function fade(t) {

            return t * t * t * (t * (t * 6 - 15) + 10);

        }

        function lerp(t, a, b) {

            return a + t * (b - a);

        }

        function grad(hash, x, y, z) {

            var h = hash & 15;
            var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);

        }

        return {

            noise: function (x, y, z) {

                var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);

                var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;

                x -= floorX;
                y -= floorY;
                z -= floorZ;

                var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;

                var u = fade(x), v = fade(y), w = fade(z);

                var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

                return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
                                grad(p[BA], xMinus1, y, z)),
                            lerp(u, grad(p[AB], x, yMinus1, z),
                                grad(p[BB], xMinus1, yMinus1, z))),
                        lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
                                grad(p[BA + 1], xMinus1, y, z - 1)),
                            lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
                                grad(p[BB + 1], xMinus1, yMinus1, zMinus1))));

            }
        }
    };

    /*
        funkcja generująca teksturę
    */

    function generateTexture(data, width, height) {
        var canvas, canvasScaled, context, image, imageData,
        level, diff, vector3, sun, shade;
        vector3 = new THREE.Vector3(0, 0, 0);
        sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);
        image = context.getImageData(0, 0, canvas.width, canvas.height);
        imageData = image.data;
        for (var i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
            vector3.x = data[j - 2] - data[j + 2];
            vector3.y = 2;
            vector3.z = data[j - width * 2] - data[j + width * 2];
            vector3.normalize();
            shade = vector3.dot(sun);
            imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
            imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
            imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007);
        }
        context.putImageData(image, 0, 0);
        // skala 4x
        canvasScaled = document.createElement('canvas');
        canvasScaled.width = width * 4;
        canvasScaled.height = height * 4;
        context = canvasScaled.getContext('2d');
        context.scale(4, 4);
        context.drawImage(canvas, 0, 0);
        image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
        imageData = image.data;
        for (var i = 0, l = imageData.length; i < l; i += 4) {
            var v = ~~(Math.random() * 5);
            imageData[i] += v;
            imageData[i + 1] += v;
            imageData[i + 2] += v;
        }
        context.putImageData(image, 0, 0);
        return canvasScaled;
    }

    /*
        return mesha terenu
    */

    this.getTerrain = function () {
        return mesh
    }


}