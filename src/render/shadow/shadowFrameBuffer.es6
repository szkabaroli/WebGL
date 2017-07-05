class ShadowFrameBuffer {
    constructor(gl, width, height) {
        this.gl = gl;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.createFrameBuffer();
    }

    createFrameBuffer() {
        this.frame_buffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frame_buffer);

        var depth_render_buffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depth_render_buffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.WIDTH, this.HEIGHT);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depth_render_buffer);

        this.frame_texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.frame_texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.WIDTH, this.HEIGHT, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.frame_texture, 0);

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }


    //anather use//

    getShadowMap() {
        return this.frame_texture;
    }

    bindFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frame_buffer);
        this.gl.viewport(0, 0, this.WIDTH, this.HEIGHT);
    }

    unbindFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    }

}

export default ShadowFrameBuffer;