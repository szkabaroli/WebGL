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
import MasterRenderer from './render/masterRenderer'; 
import {toRadian} from 'vmath'


        //create display
        const mDisplayManager = new DisplayManager();
        var gl = mDisplayManager.createDisplay('gl');
        //create loader and renderer
        const mLoader = new Loader(gl)
        const mCamera = new Camera(vec3.new(0,0,0), vec3.new(30,0,0));
        var mLight = new Light(vec3.new(-50,50,50), vec3.new(1,1,1));
        const mRenderer = new MasterRenderer(gl, mCamera, mLight, mLoader);

        var model = OBJLoader.loadOBJModel('res/tower01.obj');
        
        setTimeout(()=> {


        var TowerModel = mLoader.loadToVAO(model.v, model.t, model.n, model.i);
        var ElvishColors = mLoader.loadTexture('res/col.png');
        var Tower = new TexturedModel(TowerModel, ElvishColors);

        var eTower = new Entity(Tower, vec3.new(0,0,-2), vec3.new(0,90,0), 1);

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
        
        //let mGui = new GUITexture(mLoader.loadT(mRenderer.getShadowMap()), vec2.new(0.0, 0.5), vec2.new(0.5, 0.5));

        mDisplayManager.updateDisplay(() => {

            mCamera.move(code);
            mDisplayManager.resize();
            
            //mEntity2.increasePosition(vec3.new(0,0,-0.01))
            //mEntity.increaseRotation(vec3.new(0,1,0));

            mRenderer.processEntity(eTower);

            //mRenderer.processGui(mGui);

            mRenderer.render(mLight, mCamera);
        })
    }, 1000)