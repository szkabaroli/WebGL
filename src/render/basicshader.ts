import ShaderProgram from './shaderprogram';
import { vertexShader, fragmentShader } from '../shaders/basicShader';
import { Mat4 } from './math';

class BasicShader extends ShaderProgram{

    private transformMatrixLoc : number;

    constructor(gl : any) {
        super(gl, vertexShader, fragmentShader);
    }

    protected bindAttributes() : void{
        super.bindAttribute(0, 'positions');
        super.bindAttribute(1, 'textureCoords');
    }
    protected getUniformLocations() {
        this.transformMatrixLoc = super.getUniformLocation('transformationMatrix');

    }

    public loadTransformMatrix(matrix : Mat4) {
        super.loadMatrix(this.transformMatrixLoc, matrix);
    }
}

export default BasicShader;