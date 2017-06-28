import BasicShader from './basicShader';
import Renderer from './renderer';
import {Vec3} from './math';

class MasterRenderer {
    constructor(gl) {
        this.shader = new BasicShader(gl);
        this.renderer = new Renderer(gl, this.shader);
        this.entities = new Map();
    }

    processEntity(entity) {
        const model = entity.getTexturedModel();
        if(this.entities.has(model)) {
            var entities = this.entities.get(model).push(entity);
        } else {
            var entities = [entity];
            this.entities.set(model, entities)
        }
    }

    render(light, camera) {
        this.renderer.preRender();
        this.shader.start();

        this.shader.loadViewMatrix(camera);
        this.shader.loadProjectionMatrix(90, 0.001, 1000);
        this.shader.loadLight(light);
        this.shader.loadFogColor(new Vec3(0.74,0.96,0.87));
        
        this.renderer.render(this.entities);
        this.shader.stop();
        this.entities.clear();
    }
}

export default MasterRenderer;