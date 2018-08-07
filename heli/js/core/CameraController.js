function CameraController(camera, helikopter) {


    this.update = function (position, angle, radius) {

        switch (CameraModes.CURRENT_MODE) {
            case "FRONT":
                camera.position.set(Math.sin(angle) * 300 + position.x, position.y + 100, Math.cos(angle) * (300) + position.z);
                camera.lookAt({ x: Math.sin(angle + Math.PI) * 400 + position.x, y: position.y, z: Math.cos(angle + Math.PI) * (400) + position.z });
                break;
            case "BACK":
                camera.position.set(Math.sin(angle + Math.PI) * 300 + position.x, position.y + 100, Math.cos(angle + Math.PI) * (300) + position.z);
                camera.lookAt({ x: Math.sin(angle) * 400 + position.x, y: position.y, z: Math.cos(angle) * (400) + position.z });
                break;
            case "LEFT":
                camera.position.set(-Math.sin(angle + Math.PI / 2) * 200 + position.x, position.y, -Math.cos(angle + Math.PI / 2) * (200) + position.z);
                camera.lookAt({ x: position.x, y: position.y, z: position.z });
                break;
            case "RIGHT":
                camera.position.set(Math.sin(angle + Math.PI / 2) * 200 + position.x, position.y, Math.cos(angle + Math.PI / 2) * (200) + position.z);
                camera.lookAt({ x: position.x, y: position.y, z: position.z });
                break;
            case "TOP":
                camera.position.set(-Math.sin(angle) * 1 + position.x, position.y + 200, -Math.cos(angle) * (1) + position.z);
                camera.lookAt({ x: position.x, y: position.y, z: position.z });
                break;
            case "COCKPIT":
                camera.position.set(Math.sin(angle) * 20 + position.x, position.y + 6, Math.cos(angle) * 20 + position.z);
                camera.lookAt({ x: Math.sin(angle) * 100 + position.x, y: position.y, z: Math.cos(angle) * 100 + position.z });
                break;
        }
    }

}