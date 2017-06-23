import DisplayManager from './render/context';
import Renderer from './render/renderer'
import Model from './render/model'
import Loader from './render/loader'
import BasicShader from './render/basicshader';
import TexturedModel from './render/texturedModel';
import Texture from './render/texture';
import Entity from './render/entity';
import { Vec3 } from './render/math';

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
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0,
        ];
        
        var indicies : number[] = [
            0, 1, 3, 
            3, 1, 2
        ]

        var textCoords : number[] = [
            0,0,
            0,1,
            1,1,
            1,0
        ]
        
        
        var Model : Model = mLoader.loadToVAO(verticies, textCoords, indicies);
        var Texture : Texture = mLoader.loadTexture('res/ts.png');
        var Rect : TexturedModel = new TexturedModel(Model, Texture);

        var mEntity : Entity = new Entity(Rect, new Vec3(0,0,-0.1), new Vec3(0,0,0), 0.01);

        //Main loop
        
        mDisplayManager.updateDisplay(() : void => {
            mEntity.increaseRotation(new Vec3(0.1, 1,1));
            mRenderer.preRender();
            mBasicShader.start();
            mRenderer.render(mEntity, mBasicShader);
            mBasicShader.stop();
        })
        
        //mLoader.cleanUp();
    }
}

new main;