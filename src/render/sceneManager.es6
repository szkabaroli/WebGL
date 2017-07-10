import MasterRenderer from './masterRenderer';

class SceneManager {

    constructor(gl, loader) {
        this.gl = gl;
        this.loader = loader;
    }

    load(scene) {
        this.scene = scene;
        this.sceneLight = scene.light;
        this.sceneCamera = scene.camera;
        this.renderer = new MasterRenderer(this.gl, this.sceneCamera, this.sceneLight, this.loader);
        scene.entities.forEach((entity) => {
            this.renderer.processEntity(entity);
        });
    }

    unloadScene() {
        delete this.scene;
        delete this.sceneCamera;
        delete this.sceneLight;
        delete this.renderer;
    }

    render() {
        if(this.scene != undefined) {
            this.renderer.render();
        }
    }
}

export default SceneManager;