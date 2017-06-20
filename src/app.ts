import DisplayManager from './render/context';
import Renderer from './render/renderer'
import RawModel from './render/model'
import Loader from './render/loader'

class main {
    
    private gl : WebGLRenderingContext; 

    constructor() {

        //create display
        var mDisplayManager : DisplayManager = new DisplayManager();
        this.gl = mDisplayManager.createDisplay('gl');

        //create loader and renderer
        var mLoader : Loader = new Loader(this.gl)
        var mRenderer : Renderer = new Renderer(this.gl)

        //rectangle verticies
        var verticies : number[] = [
            -0.5, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            
            0.5, -0.5, 0,
            0.5, 0.5, 0,
            -0.5, 0.5, 0,
        ]

        var Rect : RawModel = mLoader.loadToVAO(verticies);

        //Main loop
        while(true) {
            mDisplayManager.updateDisplay(() : void => {
                mRenderer.init();
                mRenderer.render(Rect);
            })
        }
        //mLoader.cleanUp();
    }
}

new main;