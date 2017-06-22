import TexturedModel from './texturedModel';
import { Vec3 } from './math';

class Entity {
    
    private texturedModel : TexturedModel;
    private position : Vec3;
    private rotation : Vec3;
    private scale : number;
    
    constructor(texturedModel : TexturedModel, position : Vec3, rotation : Vec3, scale : number) {
        this.texturedModel = texturedModel;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    public increasePosition(v : Vec3) {
        this.position.x += v.x;
        this.position.y += v.y;
        this.position.z += v.z;
    }

    public increaseRotation(v : Vec3) {
        this.rotation.x += v.x;
        this.rotation.y += v.y;
        this.rotation.z += v.z;
    }

    public getTexturedModel() {
        return this.texturedModel;
    }

    public getPosition() {
        return this.position;
    }

    public getRotation() {
        return this.rotation;
    }

    public getScale() {
        return this.scale;
    }
}

export default Entity;