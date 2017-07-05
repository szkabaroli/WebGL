import ShadowShader from './shadowShader';
import ShadowBox from './shadowBox';
import ShadowFrameBuffer from './shadowFrameBuffer';
import EntityRenderer from './shadowMapEntityRenderer';
import {vec3, vec2, mat4, toDegree, toRadian} from 'vmath';

class ShadowMapRenderer {
    constructor(gl, camera) {
        this.gl = gl;
        this.SHADOW_MAP_SIZE = 2048;
        this.projectionMatrix = mat4.create();
        this.lightViewMatrix = mat4.create();
        this.projectionViewMatrix = mat4.create();
        this.offset = this.createOffset()

        this.shader = new ShadowShader(this.gl);
        this.shadowBox = new ShadowBox(this.lightViewMatrix, camera);
        this.shadowFBO = new ShadowFrameBuffer(this.gl, this.SHADOW_MAP_SIZE, this.SHADOW_MAP_SIZE);
        this.entityRenderer = new EntityRenderer(this.gl, this.shader, this.projectionViewMatrix);
    }
    render(entities, light) {
        this.shadowBox.update();
        let lightPosition = light.getPosition();
        let lightDirection = vec3.create();
        vec3.negate(lightDirection, lightPosition);
        this.prepare(lightDirection, this.shadowBox);
        this.entityRenderer.render(entities);
        this.finish();
    }

    finish() {
        this.shader.stop();
        this.shadowFBO.unbindFrameBuffer();
    }

    prepare(lightDirection,box) {
        
        this.updateOrthoProjectionMatrix(box.getWidth(), box.getHeight(), box.getLength());
        this.updateLightViewMatrix(lightDirection, box.getCenter());

        mat4.multiply(this.projectionViewMatrix, this.projectionMatrix, this.lightViewMatrix);

        this.shadowFBO.bindFrameBuffer();
        this.gl.clearColor(1, 0, 1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        //this.shader.start();
    }

    updateLightViewMatrix(direction, center) {
        vec3.normalize(direction, direction);
        vec3.negate(center, center);

        mat4.identity(this.lightViewMatrix);
        
        let pitch = Math.acos(vec2.length(vec2.new(direction.x, direction.z)));
        mat4.rotateX(this.lightViewMatrix, this.lightViewMatrix, pitch);
        
        let yaw = toDegree(Math.atan(direction.x / direction.z));
        yaw = direction.z > 0 ? yaw - 180 : yaw;
        
        mat4.rotateY(this.lightViewMatrix, this.lightViewMatrix, -toRadian(yaw));
        mat4.translate(this.lightViewMatrix, this.lightViewMatrix, center);
    }

    updateOrthoProjectionMatrix(width,height,length) {
        mat4.identity(this.projectionMatrix);
        this.projectionMatrix.m00 = 2 / width;
        this.projectionMatrix.m11 = 2 / height;
        this.projectionMatrix.m22 = -2 / length;
        this.projectionMatrix.m33 = 1;
    }

    createOffset() {
        let offset = mat4.create();
        mat4.translate(offset, offset, vec3.new(0.5, 0.5, 0.5));
        mat4.scale(offset, offset, vec3.new(0.5, 0.5, 0.5));
        return offset;
    }

    getShadowMap() {
        return this.shadowFBO.getShadowMap();
    }

    getLightSpaceTransform() {
        return this.lightViewMatrix;
    }
}

export default ShadowMapRenderer;