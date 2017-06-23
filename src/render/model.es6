class Model {


    constructor(vaoId, vertexCount) {
        this.vaoId = vaoId;
        this.vertexCount = vertexCount;
    }

    getVaoId() {
        return this.vaoId;
    }
    getVertexCount() {
        return this.vertexCount;
    }
}

export default Model;