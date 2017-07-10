import Renderer from './renderer';
import ShadowMapRenderer from './shadow/shadowMapRenderer';
import GUIRenderer from './gui/guiRenderer';

class MasterRenderer {
    constructor(gl, camera, light, loader) {
        this.light = light;
        this.camera = camera;

        this.entities = new Map();
        this.guis = [];

        this.shadowMapRenderer = new ShadowMapRenderer(gl, camera);
        this.renderer = new Renderer(gl, camera, light);
        this.guiRenderer = new GUIRenderer(gl, loader);
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

    processGui(gui) {
        this.guis.push(gui);
    }

    getShadowMap() {
        return this.shadowMapRenderer.getShadowMap();
    }

    render() {
        //this.shadowMapRenderer.render(this.entities, this.light);
        this.renderer.preRender();
        this.renderer.render(this.entities);
        
       // this.guiRenderer.render(this.guis);

        //this.entities.clear();
        this.guis = [];
    }
}

export default MasterRenderer;