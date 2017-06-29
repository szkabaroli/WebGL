import DisplayManager from './render/context';
import Model from './render/model';
import Loader from './render/loader';
import TexturedModel from './render/texturedModel';
import Texture from './render/texture';
import Entity from './render/entity';
import { vec3 } from 'vmath';
import Camera from './render/camera';
import OBJLoader from './render/OBJLoader';
import Light from './render/light'; 
import MasterRenderer from './render/masterRenderer'; 

class main {

    constructor() {
        //create display
        const mDisplayManager = new DisplayManager();
        this.gl = mDisplayManager.createDisplay('gl');

        //create loader and renderer
        const mLoader = new Loader(this.gl)
        const mCamera = new Camera(vec3.new(0,0,0), vec3.new(0,0,0));
        var mLight = new Light(vec3.new(-1000,1000,1000), vec3.new(1,1,1));
        const mRenderer = new MasterRenderer(this.gl, mCamera, mLight);

        var model = OBJLoader.loadOBJModel('res/cube.obj');
        
        setTimeout(()=> {
        var Model = mLoader.loadToVAO(model.v, model.t, model.n, model.i);
        var Texture = mLoader.loadTexture('res/grid.png');
        var Cube = new TexturedModel(Model, Texture);
        var mEntity = new Entity(Cube, vec3.new(0,0,-2), vec3.new(0,0,0), 2);

        var code = 0;
        document.onkeydown = (e) => {
            if(e.keyCode == 87) {
                code = 87;
            } else if(e.keyCode == 83) {
                code = 83;
            } else if(e.keyCode == 68) {
                code = 68;
            } else if(e.keyCode == 65) {
                code = 65;
            } else if(e.keyCode == 81) {
                code = 81;
            } else if(e.keyCode == 81) {
                code = 81;
            } else if(e.keyCode == 69) {
                code = 69;
            } else if(e.keyCode == 39) {
                code = 39;
            } else if(e.keyCode == 37) {
                code = 37;
            }
        }
        document.onkeyup = () => {
            code = 0;
        }

        var fpsCounter = document.getElementById('counter');
        var lastLoop = new Date;

        mDisplayManager.updateDisplay(() => {
            var thisLoop = new Date;
            mCamera.move(code);
            mDisplayManager.resize();
            
            //mEntity.increasePosition(vec3.new(0,0,0))
            mEntity.increaseRotation(vec3.new(0,1,0));

            mRenderer.processEntity(mEntity);
            mRenderer.render(mLight, mCamera);

            var fps = 1000 / (thisLoop - lastLoop);
            fpsCounter.innerHTML = Math.round(fps);
            
            lastLoop = thisLoop;
        })
        
        }, 1000)
        //mLoader.cleanUp();
    }
}

new main;