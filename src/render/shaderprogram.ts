import { vertexShader, fragmentShader } from '../shaders/basicShader';
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
    }

    public start() {
        this.gl.useProgram(this.programId)
    }

    public stop() {
        this.gl.useProgram(null)
    }

    protected bindAttributes() : void {/*child*/}

    protected bindAttribute(attribute : number, attrName : string) {
        this.gl.bindAttribLocation(this.programId, attribute, attrName);
    }

    private loadShader(shaderSource : string, type : number) : any {
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