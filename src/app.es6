import DisplayManager from './render/context';
import Renderer from './render/renderer'
import Model from './render/model'
import Loader from './render/loader'
import BasicShader from './render/basicshader';
import TexturedModel from './render/texturedModel';
import Texture from './render/texture';
import Entity from './render/entity';
import { Vec3 } from './render/math';
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
        const mRenderer = new MasterRenderer(this.gl);
        

        var model = OBJLoader.loadOBJModel('res/cube.obj');
        
        setTimeout(()=> {
        var Model = mLoader.loadToVAO(model.v, model.t, model.n, model.i);
        var Texture = mLoader.loadTexture('res/grid.png');
        var Cube = new TexturedModel(Model, Texture);
        var mCamera = new Camera(new Vec3(0,0,0), new Vec3(0,0,0));
        var mEntity = new Entity(Cube, new Vec3(0,0,-2), new Vec3(0,0,0), 1);
        var mLight = new Light(new Vec3(-1000,1000,1000), new Vec3(1,0.92,0.78));

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
            
            //mEntity.increasePosition(new Vec3(0,0,0))
            mEntity.increaseRotation(new Vec3(0,1,0));

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