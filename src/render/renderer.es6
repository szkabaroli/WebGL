import Entity from './entity'
import BasicShader from './basicshader';
import TexturedModel from './texturedModel';
import { vec3 } from 'vmath';

export default class Renderer {

    constructor(gl, camera, light) {
        this.gl = gl;
        this.shader = new BasicShader(gl);

        this.light = light;
        this.camera = camera;
    }

    preRender() {
        this.gl.viewport(0,0,window.innerWidth, window.innerHeight)
        this.gl.clearColor(0.59, 0.84, 0.85, 255);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    render(entitiesMap) {
        this.shader.start();

        this.shader.loadViewMatrix(this.camera);
        this.shader.loadProjectionMatrix(90, 0.01, 1000);
        this.shader.loadLight(this.light);
        this.shader.loadFogColor(vec3.new(0.74,0.96,0.87));

        entitiesMap.forEach((entities, model)=>{
            this.prepareTexturedModel(model);
            entities.forEach((entity)=>{

                this.shader.loadModelMatrix(entity);

                this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
            });
            this.unbindTexturedModel();
        });

        this.shader.stop();
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

}