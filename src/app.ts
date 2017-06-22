import DisplayManager from './render/context';
import Renderer from './render/renderer'
import Model from './render/model'
import Loader from './render/loader'
import BasicShader from './render/basicshader';
import TexturedModel from './render/texturedModel';
import Texture from './render/texture';

class main {
    
    private gl : WebGLRenderingContext; 

    constructor() {

        //create display
        var mDisplayManager : DisplayManager = new DisplayManager();
        this.gl = mDisplayManager.createDisplay('gl');

        //create loader and renderer
        var mRenderer : Renderer = new Renderer(this.gl)
        var mLoader : Loader = new Loader(this.gl)
        var mBasicShader : BasicShader = new BasicShader(this.gl);

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

        console.log(glMatrix.toRadian(10));
        
        
        var Model : Model = mLoader.loadToVAO(verticies, textCoords, indicies);
        var Texture : Texture = mLoader.loadTexture('res/grid.png');
        var Rect : TexturedModel = new TexturedModel(Model, Texture);

        //Main loop
        
        mDisplayManager.updateDisplay(() : void => {
            mRenderer.preRender();
            mBasicShader.start();
            mRenderer.render(Rect);
            mBasicShader.stop();
        })
        
        //mLoader.cleanUp();
    }
}

new main;