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

class main {
    
    private gl : WebGLRenderingContext; 

    constructor() {

        //create display
        var mDisplayManager : DisplayManager = new DisplayManager();
        this.gl = mDisplayManager.createDisplay('gl');

        //create loader and renderer
        var mLoader : Loader = new Loader(this.gl)
        var mBasicShader : BasicShader = new BasicShader(this.gl);
        var mRenderer : Renderer = new Renderer(this.gl, mBasicShader);
        

        //rectangle verticies
        var verticies : number[] = [
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
        
        var indicies : number[] = [
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

        var textCoords : number[] = [
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
        
        
        var Model : Model = mLoader.loadToVAO(verticies, textCoords, indicies);
        var Texture : Texture = mLoader.loadTexture('res/ts.png');
        var Rect : TexturedModel = new TexturedModel(Model, Texture);
        var mCamera : Camera = new Camera();

        var mEntity : Entity = new Entity(Rect, new Vec3(0,0,-1), new Vec3(0,0,0), 0.2);
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

        
        
        mDisplayManager.updateDisplay(() : void => {
            mEntity.increasePosition(new Vec3(0,0,0))
            mEntity.increaseRotation(new Vec3(0,1,0));
            mCamera.move(code);
            mRenderer.preRender();
            mBasicShader.start();
            mBasicShader.loadViewMatrix(mCamera);
            mRenderer.render(mEntity, mBasicShader);
            mBasicShader.stop();
        })
        
        //mLoader.cleanUp();
    }
}

new main;