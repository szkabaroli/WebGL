import RawModel from './model'

export default class Renderer {
    
    private gl : any

    constructor(gl : any) {
        this.gl = gl;
    }

    public preRender() : void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0, 0, 0, 100);
    }

    public render(model : RawModel) : void {
        this.gl.bindVertexArray(model.getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.drawElements(this.gl.TRIANGLES, model.getVertexCount(),this.gl.UNSIGNED_INT,0)
        this.gl.disableVertexAttribArray(0);
    }
}