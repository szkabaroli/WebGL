import Entity from './entity'
import BasicShader from './basicshader';
import TexturedModel from './texturedModel';
import { Utils, Vec3, Mat4 } from './math';

export default class Renderer {

    

    constructor(gl, shader) {
        this.gl = gl;
        const matrix = Utils.createProjectionMatrix(90, 0, 1000);
        shader.start();
        shader.loadProjectionMatrix(matrix);
        shader.stop();
    }

    preRender() {
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.clearColor(0, 0, 0, 255);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }

    render(entity, shader) {
        
        var model = entity.getTexturedModel();
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        
        var modelMatrix = Utils.createModelMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());

        shader.loadModelMatrix(modelMatrix);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
        this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.gl.bindVertexArray(null);
    }
}