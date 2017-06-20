import RawModel from './model'

export default class Renderer {
    
    private gl : any

    constructor(gl : any) {
        this.gl = gl;
    }

    public init() : void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0, 255, 0, 255);
    }

    public render(model : RawModel) : void {
        this.gl.bindVertexArray(model.getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, model.getVertexCount())
        this.gl.disableVertexAttribArray(0);
    }
}