import Entity from './entity'
import BasicShader from './basicshader';
import TexturedModel from './texturedModel';
import { Utils, Vec3, Mat4 } from './math';

export default class Renderer {
    
    private gl : any

    private static FOV : number = 70;
    private static NEAR_PLANE : number = 0.1;
    private static FAR_PLANE : number = 1000;

    private projectionMatrix : Mat4;

    constructor(gl : any) {
        this.gl = gl;
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