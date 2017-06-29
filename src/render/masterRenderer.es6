import BasicShader from './basicShader';
import Renderer from './renderer';
import {Vec3} from './math';
import ShadowMapRenderer from './shadow/shadowMapRenderer';

class MasterRenderer {
    constructor(gl, camera) {
        this.camera = camera;
        this.shader = new BasicShader(gl);
        this.renderer = new Renderer(gl, this.shader);
        this.entities = new Map();
        this.shadowMapRenderer = new ShadowMapRenderer(gl, camera);
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

    renderShadowMap(entities, light) {
        entities.forEach((entity)=>{
            this.processEntity(entity)
        })
        this.shadowMapRenderer.render(entities, light);
        this.entities.clear();

    }

    getShadowMap() {
        return this.shadowMapRenderer.getShadowMap();
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