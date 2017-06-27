import { Vec3 } from './math';

class Camera {

    constructor(position, rotation) {
        this.position = position;
        this.rotation = rotation;
    }

    move(code) {
        if(code == 87) {
            this.position.z -= 0.02;
        }
        if(code == 83) {
            this.position.z += 0.02;
        }
        if(code == 68) {
            this.position.x += 0.02;
        }
        if(code == 65) {
            this.position.x -= 0.02;
        }
        if(code == 69) {
            this.position.y += 0.02;
        }
        if(code == 81) {
            this.position.y -= 0.02;
        }
    }

    getPosition() {
        return this.position;
    }

    getRotation() {
        return this.rotation;
    }
}

export default Camera;