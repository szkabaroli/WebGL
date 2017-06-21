import DisplayManager from './render/context';
import Renderer from './render/renderer'
import Model from './render/model'
import Loader from './render/loader'
import BasicShader from './render/basicshader';

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
        
        var Rect : Model = mLoader.loadToVAO(verticies, indicies);

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