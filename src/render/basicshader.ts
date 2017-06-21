import ShaderProgram from './shaderprogram';
import { vertexShader, fragmentShader } from '../shaders/basicShader';

class BasicShader extends ShaderProgram{
    constructor(gl : any) {
        super(gl, vertexShader, fragmentShader);
    }
    protected bindAttributes() : void{
        super.bindAttribute(0, 'positions')
    }
}

export default BasicShader;