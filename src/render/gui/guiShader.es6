import ShaderProgram from '../shaderProgram';
import { vertexShader, fragmentShader } from '../../shaders/guiShader';

class GUIShader extends ShaderProgram {
    constructor(gl) {
        super(gl, vertexShader, fragmentShader);
    }

    bindAttributes() {
        super.bindAttribute(0, 'position');
    }

    getUniformLocations() {
        this.modelMatrixLoc = super.getUniformLocation('modelMatrix');
    }

    loadModelMatrix(matrix) {
        super.loadMatrix(this.modelMatrixLoc, matrix)
    } 

}

export default GUIShader;