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

    bindFrameBuffer() {
        this.gl.bindTexture(this.gl.TEXTURE_2D, 0);
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.fbo);
        this.gl.viewport(0, 0, this.WIDTH, this.HEIGHT);
    }

    unbindFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, null);
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    }

    createFrameBuffer() {
        let frameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, frameBuffer);
        this.gl.drawBuffers([this.gl.NONE]);
        return frameBuffer;
    }

    createDepthBufferAttachment(width, height) {
        let texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D, texture, 0);
        return texture;
    }

    getShadowMap() {
        return this.shadowMap;
    }

}

export default ShadowFrameBuffer;