class ShadowFrameBuffer {
    constructor(gl, width, height) {
        this.gl = gl;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.fbo;
        this.initFrameBuffer();
    }

    initFrameBuffer() {
        this.fbo = this.createFrameBuffer();
        this.shadowMap = this.createDepthBufferAttachment(this.WIDTH, this.HEIGHT);
        this.unbindFrameBuffer();
    }

    createFrameBuffer() {
        var fbo = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        return fbo;
    }

    createDepthBufferAttachment(width, height) {
        var renderBuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, renderBuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16 , this.WIDTH, this.HEIGHT);

        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, renderBuffer);

        var texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.WIDTH, this.HEIGHT, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        return texture;
    }


    //anather use//

    getShadowMap() {
        return this.shadowMap;
    }

    bindFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
        this.gl.viewport(0, 0, this.WIDTH, this.HEIGHT);
    }

    unbindFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    }

}

export default ShadowFrameBuffer;