import Entity from './entity'
import BasicShader from './basicshader';
import TexturedModel from './texturedModel';
import { Utils, Vec3, Mat4 } from './math';

export default class Renderer {
    
    private gl : any

    private FOV : number = 70;
    private NEAR_PLANE : number = 0;
    private FAR_PLANE : number = 1000;

    private projectionMatrix : Mat4;

    constructor(gl : any, shader : BasicShader) {
        this.gl = gl;
        const matrix : Mat4 = Utils.createProjectionMatrix(this.FOV, this.NEAR_PLANE, this.FAR_PLANE);
        shader.start();
        shader.loadProjectionMatrix(matrix);
        shader.stop();
    }

    public preRender() : void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0, 0, 0, 100);
    }

    public render(entity : Entity, shader : BasicShader) : void {
        var model : TexturedModel = entity.getTexturedModel();
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        
        var transformMatrix : Mat4 = 
        Utils.createTransformMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());

        shader.loadTransformMatrix(transformMatrix);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
        this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.gl.bindVertexArray(null);
    }
}