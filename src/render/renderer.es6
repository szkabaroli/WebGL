import Entity from './entity'
import BasicShader from './basicshader';
import TexturedModel from './texturedModel';
import { Utils, Vec3, Mat4 } from './math';

export default class Renderer {

    

    constructor(gl, shader) {
        this.shader = shader;
        this.gl = gl;
    }

    preRender() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.clearColor(0.59, 0.84, 0.85, 255);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        this.gl.viewport(0,0,window.innerWidth, window.innerHeight);
    }

    render(entitiesMap) {
        entitiesMap.forEach((entities, model)=>{
            this.prepareTexturedModel(model);
            entities.forEach((entity)=>{
                this.perEntity(entity);
                this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
            });
            this.unbindTexturedModel();
        });
    }

    prepareTexturedModel(model) {
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.enableVertexAttribArray(2);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
    }

    unbindTexturedModel() {
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.gl.disableVertexAttribArray(2);
        this.gl.bindVertexArray(null);
    }

    perEntity(entity) {
        this.shader.loadModelMatrix(entity);
    }
}