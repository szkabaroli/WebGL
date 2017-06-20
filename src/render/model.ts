export default class RawModel {
    
    private vaoId : number;
    private vertexCount : number;

    constructor(vaoId : number, vertexCount : number) {
        this.vaoId = vaoId;
        this.vertexCount = vertexCount;
    }

    public getVaoId() : any {
        return this.vaoId;
    }
    public getVertexCount() {
        return this.vertexCount;
    }
}