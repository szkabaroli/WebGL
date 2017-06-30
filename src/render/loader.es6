import Model from './model'
import Texture from './texture'

export default class Loader {

    constructor(gl) {
        this.gl = gl;
    }

    loadToVAO(verticies, textCoords, normals, indicies) {
        var vaoID = this.createVAO();
        this.storeDataInAttributeList(0, 3, verticies);
        this.storeDataInAttributeList(1, 2, textCoords);
        this.storeDataInAttributeList(2, 3, normals);
        this.bindIndiciesBuffer(indicies);
        this.unbindVAO();
        return new Model(vaoID, indicies.length);
    }

    loadGUIToVAO(positions) {
        var vaoID = this.createVAO();
        this.storeDataInAttributeList(0, 2, positions);
        this.unbindVAO();
        return new Model(vaoID, positions.length/2);
    }

    loadTexture(fileName ) {
        var textureId = this.gl.createTexture();
        var image = new Image();
        image.src = fileName;
        image.onload = () => {
            this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
            this.gl.generateMipmap(this.gl.TEXTURE_2D, true);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        }
        return new Texture(textureId);
    }

    loadT(id) {
        return new Texture(id);
    }

    createVAO() {
        var vaoId = this.gl.createVertexArray();
        this.gl.bindVertexArray(vaoId);
        return vaoId;
    }
    

    storeDataInAttributeList(attributeNumber, size, data ) {
        var vboId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboId);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(attributeNumber, size, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    unbindVAO() {
        this.gl.bindVertexArray(null);
    }

    bindIndiciesBuffer(indicies) {
        var vboId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, vboId);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indicies), this.gl.STATIC_DRAW);
    }
}
