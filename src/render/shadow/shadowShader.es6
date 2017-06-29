import ShaderProgram from '../shaderProgram';
import { vertexShader, fragmentShader } from '../../shaders/shadowShader';
import {Utils} from '../math';

class ShadowShader extends ShaderProgram {
    constructor(gl) {
        super(gl, vertexShader, fragmentShader);
    }

    bindAttributes() {
        super.bindAttribute(0, 'inPosition');
    }

    getUniformLocations() {
        this.mvpMatrixLocation = super.getUniformLocation('mvpMatrix');
    }

    loadMvpMatrix(entity, pvMatrix) {
        const modelMatrix = Utils.createModelMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());
        const mvpMatrix = pvMatrix.multiply(modelMatrix);
        super.loadMatrix(this.mvpMatrixLocation, mvpMatrix);
    }
}

export default ShadowShader;