import ShaderProgram from './shaderprogram';
import { vertexShader, fragmentShader } from '../shaders/basicShader';
import { Mat4, Utils} from './math';
import Camera from './camera';

class BasicShader extends ShaderProgram{

    private modelMatrixLoc : number;
    private projectionMatrixLoc : number;
    private viewMatrixLoc : number;

    constructor(gl : any) {
        super(gl, vertexShader, fragmentShader);
    }

    protected bindAttributes() : void {
        super.bindAttribute(0, 'positions');
        super.bindAttribute(1, 'textureCoords');
    }
    protected getUniformLocations() : void {
        this.modelMatrixLoc = super.getUniformLocation('modelMatrix');
        this.projectionMatrixLoc = super.getUniformLocation('projectionMatrix');
        this.viewMatrixLoc = super.getUniformLocation('viewMatrix');
    }

    public loadModelMatrix(modelMatrix : Mat4) : void {
        super.loadMatrix(this.modelMatrixLoc, modelMatrix);
    }

    public loadProjectionMatrix(projectionMatrix : Mat4) : void {
        super.loadMatrix(this.projectionMatrixLoc, projectionMatrix);
    }
    public loadViewMatrix(camera : Camera) : void {
        var viewMatrix = Utils.createViewMatrix(camera);
        super.loadMatrix(this.viewMatrixLoc, viewMatrix);
    }
}

export default BasicShader;