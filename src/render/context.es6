import * as basicShader from '../shaders/basicShader';

class DisplayManager {

    createDisplay(canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl = this.canvas.getContext('webgl2');
        return this.gl;


    }

    updateDisplay(callback) {

        requestAnimationFrame(() => {
            callback();
            this.updateDisplay(callback);
        })

    }
}

export default DisplayManager;