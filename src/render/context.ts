import * as basicShader from '../shaders/basicShader';

interface IRenderUpdateCallback {
    () : void;
}

class DisplayManager {
    
    private canvas: HTMLCanvasElement;
    private gl: any;

    public createDisplay(canvasId : string) : WebGLRenderingContext {
        
        this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl = this.canvas.getContext('webgl2');
        return this.gl;


    }

    public updateDisplay(callback : IRenderUpdateCallback) : void {

        requestAnimationFrame(() => {
            callback();
            this.updateDisplay(callback);
        })

    }

    public closeDisplay() : void { }

    
}

export default DisplayManager;