import ShaderProgram from '../shaderProgram';
import { vertexShader, fragmentShader } from '../../shaders/shadowShader';
import Utils from '../utils';
import {mat4} from 'vmath';

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

    loadMvpMatrix(entity, projectionViewMatrix) {
        const modelMatrix = Utils.createModelMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());
        const mvpMatrix = mat4.create();
        mat4.multiply(mvpMatrix, projectionViewMatrix, modelMatrix);
        super.loadMatrix(this.mvpMatrixLocation, mvpMatrix);
    }
}

export default ShadowShader;