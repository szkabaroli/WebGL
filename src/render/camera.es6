
class Camera {

    constructor(position, rotation) {
        this.position = position;
        this.rotation = rotation;
        this.SPEED = 10;
    }

    move(code) {
        if(code == 87) {
            this.position.z -= (0.01 * this.SPEED);
        }
        if(code == 83) {
            this.position.z += (0.01 * this.SPEED);
        }
        if(code == 68) {
            this.position.x += (0.01 * this.SPEED);
        }
        if(code == 65) {
            this.position.x -= (0.01 * this.SPEED);
        }
        if(code == 69) {
            this.position.y += (0.01 * this.SPEED);
        }
        if(code == 81) {
            this.position.y -= (0.01 * this.SPEED);
        }
    }

    getPosition() {
        return this.position;
    }

    getRotation() {
        return this.rotation;
    }

    getPitch() {
        return this.rotation.x;
    }

    getYaw() {
        return this.rotation.y;
    }

    getRoll() {
        return this.rotation.z;
    } 
}

export default Camera;