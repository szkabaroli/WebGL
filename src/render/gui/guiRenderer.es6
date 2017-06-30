import Utils from '../utils';
import GUIShader from './guiShader';

class GUIRenderer {
    constructor(gl, loader) {
        this.gl = gl;
        this.shader = new GUIShader(gl);

        let positions = [-1,1,-1,-1,1,1,1,-1];
        this.quad = loader.loadGUIToVAO(positions);
    }

    render(guis) {
        
        this.bindGUIModel();
        this.shader.start();

        guis.forEach((gui) => {
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, gui.getTexture().getTextureId());

            let modelMatrix = Utils.createModelMatrix2D(gui.getPosition(), gui.getScale());
            this.shader.loadModelMatrix(modelMatrix);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.quad.getVertexCount());
        });

        this.shader.stop();
        this.unbindGUIModel();
    }

    bindGUIModel() {
        this.gl.bindVertexArray(this.quad.getVaoId());
        this.gl.enableVertexAttribArray(0);
    }

    unbindGUIModel() {
        this.gl.disableVertexAttribArray(0);
        this.gl.bindVertexArray(null);
    }
}

export default GUIRenderer;