import DisplayManager from './render/context';
import Model from './render/model';
import Loader from './render/loader';
import TexturedModel from './render/texturedModel';
import GUITexture from './render/gui/guiTexture';
import Texture from './render/texture';
import Entity from './render/entity';
import { vec3, vec2 } from 'vmath';
import Camera from './render/camera';
import OBJLoader from './render/OBJLoader';
import Light from './render/light';
import SceneManager from './render/sceneManager';
import Scene from './render/scene';

class ModelViewer {
    constructor(canvas) {
        this.mDisplayManager = new DisplayManager();
        this.gl = this.mDisplayManager.createDisplay(canvas);
        this.mLoader = new Loader(this.gl)
        this.mCamera = new Camera(vec3.new(0, 1, 0), vec3.new(20, 0, 0));
        this.mLight = new Light(vec3.new(10, 500, 500), vec3.new(1, 1, 1));
        this.mSceneManager = new SceneManager(this.gl, this.mLoader);
    }

    init(model, texture) {
        OBJLoader.loadOBJModel(this.mLoader, model).then((Model) => {
            this.Model = Model
            this.Texture = this.mLoader.loadTexture(texture);
            this.TexturedModel = new TexturedModel(this.Model, this.Texture);
            this.Entity = new Entity(this.TexturedModel, vec3.new(0, 0, -2), vec3.new(0, 0, 0), 1);
            this.mSceneManager.load(new Scene([this.Entity], this.mLight, this.mCamera));
            this.render();
        });
        
    }

    render() {
        
        this.mDisplayManager.updateDisplay(() => {
            this.mDisplayManager.resize();
            this.Entity.increaseRotation(vec3.new(0,1,0))
            this.mSceneManager.render();
        })
    }
}

export default ModelViewer;
