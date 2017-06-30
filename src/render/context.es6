import * as basicShader from '../shaders/basicShader';

class DisplayManager {

    createDisplay(canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl = this.canvas.getContext('webgl2');
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        return this.gl;
    }

    updateDisplay(callback) {

        requestAnimationFrame(() => {
            callback();
            this.updateDisplay(callback);
        })

    }

    resize() {
        var displayWidth  = window.innerWidth;
        var displayHeight = window.innerHeight;
 
        if (this.canvas.width  != displayWidth ||
            this.canvas.height != displayHeight) {
 
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
  }
    }
}

export default DisplayManager;