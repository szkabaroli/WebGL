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

class main {

    constructor() {

        //create display
        const mDisplayManager = new DisplayManager();
        this.gl = mDisplayManager.createDisplay('gl');

        //create loader and renderer
        const mLoader = new Loader(this.gl)
        const mBasicShader = new BasicShader(this.gl);
        const mRenderer = new Renderer(this.gl);
        

        //rectangle verticies
        var verticies = [
            -1,1,-1,	
            -1,-1,-1,	
            1,-1,-1,	
            1,1,-1,		
            
            -1,1,1,	
            -1,-1,1,	
            1,-1,1,	
            1,1,1,
            
            1,1,-1,	
            1,-1,-1,	
            1,-1,1,	
            1,1,1,
            
            -1,1,-1,	
            -1,-1,-1,	
            -1,-1,1,	
            -1,1,1,
            
            -1,1,1,
            -1,1,-1,
            1,1,-1,
            1,1,1,
            
            -1,-1,1,
            -1,-1,-1,
            1,-1,-1,
            1,-1,1
        ];
        
        var indicies = [
            3,1,0,	
            2,1,3,	

            4,5,7,//
            7,5,6,

            11,9,8,
            10,9,11,

            12,13,15,
            15,13,14,

            19,17,16,
            18,17,19,
            
            20,21,23,
            23,21,22
        ]

        var textCoords = [
            0,0,
            0,1,
            1,1,
            1,0,			
            0,0,
            0,1,
            1,1,
            1,0,			
            0,0,
            0,1,
            1,1,
            1,0,
            0,0,
            0,1,
            1,1,
            1,0,
            0,0,
            0,1,
            1,1,
            1,0,
            0,0,
            0,1,
            1,1,
            1,0
        ]
        var model = OBJLoader.loadOBJModel('res/cube.obj', mLoader);
        console.log({i : indicies, v : verticies, t : textCoords})
        console.log(model)

        setTimeout(()=> {
            var Model = mLoader.loadToVAO(model.v, model.t, model.i);
        var Texture = mLoader.loadTexture('res/white.jpg');
        var Cube = new TexturedModel(Model, Texture);
        var mCamera = new Camera();

        var mEntity = new Entity(Cube, new Vec3(0,0,0), new Vec3(0,0,0), 0.2);
        
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
            }
        }
        document.onkeyup = () => {
            code = 0;
        }

        
        mDisplayManager.updateDisplay(() => {
            mDisplayManager.resize();
            mEntity.increasePosition(new Vec3(0,0,0))
            mEntity.increaseRotation(new Vec3(0,0,0));
            mCamera.move(code);
            mRenderer.preRender();
            mBasicShader.start();
            mBasicShader.loadViewMatrix(mCamera);
            mRenderer.render(mEntity, mBasicShader);
            mBasicShader.stop();
        })
        
        }, 1000)

        
        //mLoader.cleanUp();
    }
}

new main;