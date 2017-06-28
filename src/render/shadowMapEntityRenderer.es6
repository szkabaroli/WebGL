class ShadowMapEntityRenderer {
    constructor(gl, shader, pvMatrix) {
        this.gl = gl;
        this.shader = shader;
        this.pvMatrix = pvMatrix;
    }
    
    render(entitiesMap) {
        entitiesMap.forEach((entities, model)=>{
            this.bindModel(model)
            entities.forEach((entity)=>{
                this.perEntity(entity);
                this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
            });
            this.unbindModel();
        });
    }

    bindModel(model) {
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
    }

    unbindModel() {
        this.gl.disableVertexAttribArray(0);
        this.gl.bindVertexArray(null);
    }

    perEntity(entity) {
        this.shader.loadMvpMatrix(entity, pvMatrix);
    }
}