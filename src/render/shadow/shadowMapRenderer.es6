import ShadowShader from './shadowShader';
import ShadowBox from './shadowBox';
import ShadowFrameBuffer from './shadowFrameBuffer';
import EntityRenderer from './shadowMapEntityRenderer';
import {Mat4, Vec3} from '../math';

class ShadowMapRenderer {
    constructor(gl, camera) {
        this.gl = gl;
        this.SHADOW_MAP_SIZE = 2048;
        this.lightViewMatrix = new Mat4();
        this.projectionMatrix = new Mat4();
        this.pvMatrix = new Mat4();
        this.offset = this.createOffset()

        this.shader = new ShadowShader(this.gl);
        this.shadowBox = new ShadowBox(this.lightViewMatrix, camera);
        this.shadowFBO = new ShadowFrameBuffer(this.gl, this.SHADOW_MAP_SIZE, this.SHADOW_MAP_SIZE);
        this.entityRenderer = new EntityRenderer(this.shader, this.pvMatrix);
    }
    render(entities, light) {
        this.shadowBox.update();
        let lightPosition = light.getPosition();
        let lightDirection = new Vec3(-lightPosition.x, -lightPosition.y, -lightPosition.z);
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

        this.pvMatrix.multiply(lightViewMatrix);

        this.shadowFBO.bindFrameBuffer();
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        this.shader.start();
    }

    updateLightViewMatrix(direction, center) {
        direction.normalize();
        center.negate();

        this.lightViewMatrix.identity();

        var pitch = Math.acos(new Vec2(direction.x, direction.z).length());
        lightViewMatrix.rotateX(pitch);

        var yaw = Utils.toDeg((Math.atan(direction.x / direction.z)));
        yaw = direction.z > 0 ? yaw - 180 : yaw;

        lightViewMatrix.rotateY(-Utils.toRad(yaw));
        lightViewMatrix.translate(center);
    }
    updateOrthoProjectionMatrix(width,height,length) {
        this.projectionMatrix.setIdentity();
        this.projectionMatrix.m00 = 2 / width;
        this.projectionMatrix.m05 = 2 / height;
        this.projectionMatrix.m10 = -2 / length;
        this.projectionMatrix.m15 = 1;
    }

    createOffset() {
        let offset = new Mat4();
        offset.translate(new Vec3(0.5, 0.5, 0.5));
        offset.scale(new Vec3(0.5, 0.5, 0.5));
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