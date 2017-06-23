import TexturedModel from './texturedModel';
import { Vec3 } from './math';

class Entity {
    
    constructor(texturedModel, position, rotation, scale) {
        this.texturedModel = texturedModel;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    increasePosition(v) {
        this.position.x += v.x;
        this.position.y += v.y;
        this.position.z += v.z;
    }

    increaseRotation(v) {
        this.rotation.x += v.x;
        this.rotation.y += v.y;
        this.rotation.z += v.z;
    }

    getTexturedModel() {
        return this.texturedModel;
    }

    getPosition() {
        return this.position;
    }

    getRotation() {
        return this.rotation;
    }

    getScale() {
        return this.scale;
    }
}

export default Entity;