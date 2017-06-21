import Model from './model'

export default class Loader {
    
    private gl : any;

    constructor(gl: any) {
        this.gl = gl;
    }

    public loadToVAO(verticies : number[], indicies : number[]) : Model {
        var vaoID : number = this.createVAO();
        this.storeDataInAttributeList(0, verticies);
        this.bindIndiciesBuffer(indicies);
        this.unbindVAO();
        return new Model(vaoID, indicies.length);
    }

    public loadTexture(fileName : string) : any {
        var textureId = this.gl.createTexture();
        var image = new Image();
        image.src = fileName;
        image.onload = () => {
            this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
            this.gl.texImage2D(this.gl.TEXTURE_2D, this.gl.RGBA, )
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            return textureId;
        }
    }

    private createVAO() : any {
        var vaoId : number = this.gl.createVertexArray();
        this.gl.bindVertexArray(vaoId);
        return vaoId;
    }
    

    private storeDataInAttributeList(attributeNumber : number, data : number[]) : void {
        var vboId : number = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboId);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(attributeNumber, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    private unbindVAO() : void {
        this.gl.bindVertexArray(null);
    }

    private bindIndiciesBuffer(indicies : number[]) {
        var vboId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, vboId);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indicies), this.gl.STATIC_DRAW);
    }
}
