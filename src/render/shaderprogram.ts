import { vertexShader, fragmentShader } from '../shaders/basicShader';
import { Mat4, Vec3 } from './math';
abstract class ShaderProgram{
    
    private gl : any;
    private vertexShaderId : number;
    private fragmentShaderId : number;
    private programId : number

    constructor(gl: any, vertexShader : string, fragmentShader : string) {
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

    

    public start() : void {
        this.gl.useProgram(this.programId)
    }

    public stop() : void {
        this.gl.useProgram(null)
    }

    protected bindAttributes() : void {/*child*/}
    protected getUniformLocations() : void {/*child*/}

    protected loadFloat(location : number, value : number) : void {
        this.gl.uniform1f(location, value);
    }

    protected loadBool(location : number, value : boolean) : void {
        var load : number = 0;
        if(value) {
            load = 1;
        }
        this.gl.uniform1i(location, load);
    }

    protected loadVector(location : number, vector : Vec3) : void {
        this.gl.uniform3f(location, vector.x, vector.y, vector.z);
    }

    protected loadMatrix(location : number, matrix : Mat4) : void {
        this.gl.uniformMatrix4fv(location, false, matrix.toArray()); 
    }

    protected getUniformLocation(unifomrName : string) : any {
        return this.gl.getUniformLocation(this.programId, unifomrName);
    }

    protected bindAttribute(attribute : number, attrName : string) : void {
        this.gl.bindAttribLocation(this.programId, attribute, attrName);
    }

    private loadShader(shaderSource : string, type : number) : number {
        var shaderId : number = this.gl.createShader(type);
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