import RawModel from './model'

export default class Loader {
    
    private gl : any;
    private vaos : number[] = [];
    private vbos : number[] = [];


    constructor(gl: any) {
        this.gl = gl;
    }

    public loadToVAO(positions : number[]) : RawModel {
        var vaoID = this.createVAO();
        this.storeDataInAttributeList(0, positions);
        this.unbindVAO();
        return new RawModel(vaoID, positions.length/3);
    }

    private createVAO() : any {
        var vaoId = this.gl.createVertexArray();
        this.vaos.push(vaoId);
        this.gl.bindVertexArray(vaoId);
        return vaoId;
    }

    private storeDataInAttributeList(attributeNumber : number, data : ArrayBuffer) : void {
        var vboId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboId);
        this.vbos.push(vboId);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
        this.gl.vertexAttribIPointer(attributeNumber, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0);
    }

    private unbindVAO() : void {
        this.gl.bindVertexArray(0);
    }

    public cleanUp() : void {
        this.vaos.forEach((vao, index)=>{
            this.gl.deleteVertexArray(vao);
        })
        this.vbos.forEach((vbo, index)=>{
            this.gl.deleteBuffers(vbo);
        })
    }
}
