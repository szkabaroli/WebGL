import { vertexShader, fragmentShader } from '../shaders/basicShader';
import { Mat4, Vec3 } from './math';
class ShaderProgram{

    constructor(gl, vertexShader, fragmentShader) {
        this.gl = gl;
        this.vertexShaderId = this.loadShader(vertexShader, this.gl.VERTEX_SHADER);
        this.fragmentShaderId = this.loadShader(fragmentShader, this.gl.FRAGMENT_SHADER);
        this.programId = this.gl.createProgram();
        this.gl.attachShader(this.programId, this.fragmentShaderId);
        this.gl.attachShader(this.programId, this.vertexShaderId);
        this.bindAttributes();
        this.gl.linkProgram(this.programId);
        this.gl.validateProgram(this.programId);
        this.getUniformLocations();
    }

    start() {
        this.gl.useProgram(this.programId)
    }

    stop(){
        this.gl.useProgram(null)
    }

    bindAttributes() {/*child*/}
    getUniformLocations() {/*child*/}

    loadFloat(location , value) {
        this.gl.uniform1f(location, value);
    }

    loadBool(location, value) {
        var load = 0;
        if(value) {
            load = 1;
        }
        this.gl.uniform1i(location, load);
    }

    loadVector(location, vector) {
        this.gl.uniform3f(location, vector.x, vector.y, vector.z);
    }

    loadMatrix(location, matrix) {
        this.gl.uniformMatrix4fv(location, false, matrix.toArray()); 
    }

    getUniformLocation(unifomrName) {
        return this.gl.getUniformLocation(this.programId, unifomrName);
    }

    bindAttribute(attribute, attrName) {
        this.gl.bindAttribLocation(this.programId, attribute, attrName);
    }

    loadShader(shaderSource, type) {
        var shaderId = this.gl.createShader(type);
        this.gl.shaderSource(shaderId, shaderSource);
        this.gl.compileShader(shaderId);
        if (!this.gl.getShaderParameter(shaderId, this.gl.COMPILE_STATUS)) {
            console.log('ERROR compiling shader!', this.gl.getShaderInfoLog(shaderId));
            return;
        } 
        return shaderId;
    }
}

export default ShaderProgram;