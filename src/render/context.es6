import * as basicShader from '../shaders/basicShader';

class DisplayManager {

    createDisplay(canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        this.gl = this.canvas.getContext('webgl2');
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);
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
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
}

export default DisplayManager;