import Entity from './entity'
import BasicShader from './basicshader';
import TexturedModel from './texturedModel';
import { Utils, Vec3, Mat4 } from './math';

export default class Renderer {

    

    constructor(gl, shader) {
        this.gl = gl;
    }

    preRender() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.clearColor(0.05, 0.1, 0.2, 255);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        this.gl.viewport(0,0,window.innerWidth, window.innerHeight);
    }

    render(entity, shader) {
        
        const matrix = Utils.createProjectionMatrix(90, 0.001, 1000);
        shader.loadProjectionMatrix(matrix);
        var model = entity.getTexturedModel();
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.enableVertexAttribArray(2);
        
        var modelMatrix = Utils.createModelMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());
        shader.loadModelMatrix(modelMatrix);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
        this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.gl.disableVertexAttribArray(2);
        this.gl.bindVertexArray(null);
    }
}