import { Vec3 } from './math';

class Camera {

    private position : Vec3;
    private rotation : Vec3;

    constructor() {
        this.position = new Vec3(0,0,0);
        this.rotation = new Vec3(0,0,0)
    }

    public move(code : number) {
        if(code == 87) {
            this.position.z -= 0.01;
        }
        if(code == 83) {
            this.position.z += 0.01;
        }
        if(code == 68) {
            this.position.x += 0.01;
        }
        if(code == 65) {
            this.position.x -= 0.01;
        }
        if(code == 69) {
            this.position.y += 0.01;
        }
        if(code == 81) {
            this.position.y -= 0.01;
        }
    }

    public getPosition() : Vec3 {
        return this.position;
    }

    public getRotation() : Vec3 {
        return this.rotation;
    }
}

export default Camera;