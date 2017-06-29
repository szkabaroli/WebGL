import BasicShader from './basicShader';
import Renderer from './renderer';
import { vec3 } from 'vmath';
import ShadowMapRenderer from './shadow/shadowMapRenderer';

class MasterRenderer {
    constructor(gl, camera, light) {
        this.light = light;
        this.camera = camera;
        this.shader = new BasicShader(gl);
        this.renderer = new Renderer(gl, this.shader);
        this.entities = new Map();
        //this.shadowMapRenderer = new ShadowMapRenderer(gl, camera);
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

    render() {
        this.renderModels()
    }

    renderModels() {
        this.renderer.preRender();
        this.shader.start();

        this.shader.loadViewMatrix(this.camera);
        this.shader.loadProjectionMatrix(90, 0.001, 1000);
        this.shader.loadLight(this.light);
        this.shader.loadFogColor(vec3.new(0.74,0.96,0.87));
        
        this.renderer.render(this.entities);
        this.shader.stop();
        this.entities.clear();
    }
}

export default MasterRenderer;