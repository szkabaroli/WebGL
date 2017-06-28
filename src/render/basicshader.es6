import ShaderProgram from './shaderProgram';
import { vertexShader, fragmentShader } from '../shaders/basicShader';
import { Mat4, Utils} from './math';
import Camera from './camera';

class BasicShader extends ShaderProgram{

    constructor(gl) {
        super(gl, vertexShader, fragmentShader);
    }

    bindAttributes() {
        super.bindAttribute(0, 'positions');
        super.bindAttribute(1, 'textureCoords');
        super.bindAttribute(2, 'normals');
    }

    getUniformLocations() {
        this.modelMatrixLoc = super.getUniformLocation('modelMatrix');
        this.projectionMatrixLoc = super.getUniformLocation('projectionMatrix');
        this.viewMatrixLoc = super.getUniformLocation('viewMatrix');
        this.lightPositionLoc = super.getUniformLocation('lightPosition');
        this.lightColorLoc = super.getUniformLocation('lightColor');
        this.fogColorLoc = super.getUniformLocation('fogColor');
    }

    loadLight(light) {
        super.loadVector(this.lightColorLoc, light.getColor());
        super.loadVector(this.lightPositionLoc, light.getPosition());
    }

    loadFogColor(color) {
        super.loadVector(this.fogColorLoc, color);
    }

    loadModelMatrix(entity){
        const modelMatrix = Utils.createModelMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());
        super.loadMatrix(this.modelMatrixLoc, modelMatrix);
    }

    loadProjectionMatrix(FOV, NEAR_PLANE, FAR_PLANE) {
        const projectionMatrix = Utils.createProjectionMatrix(FOV, NEAR_PLANE, FAR_PLANE);
        super.loadMatrix(this.projectionMatrixLoc, projectionMatrix);
    }
    loadViewMatrix(camera) {
        var viewMatrix = Utils.createViewMatrix(camera);
        super.loadMatrix(this.viewMatrixLoc, viewMatrix);
    }
}

export default BasicShader;