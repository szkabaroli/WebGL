import { vec4, vec3, vec2, mat4, toRadian } from 'vmath';

class ShadowBox {
    constructor(lightViewMatrix, camera) {
        this.OFFSET = 10;
        this.UP = vec3.create(0,1,0);
        this.FORWARD = vec3.create(0,0,-1);
        this.SHADOW_DISTANCE = 200;
        this.NEAR_PLANE = 0.001;
        this.FOV = 90;
        this.lightViewMatrix = lightViewMatrix;
        this.camera = camera;

        this.farHeight;
        this.farWidth;
        this.nearHeight;
        this.nearWidth;
    }

    update() {
        let rotation = this.calculateCameraRotationMatrix();
        let forwardVector = vec3.create();
        vec3.transformMat4(forwardVector, this.FORWARD, rotation);
 
        let toFar = vec3.create();
        vec3.copy(toFar, forwardVector);
        vec3.scale(toFar, toFar, this.SHADOW_DISTANCE);

        let toNear = vec3.create();
        vec3.copy(toFar, forwardVector);
        vec3.scale(toNear, toNear, this.NEAR_PLANE);

        let centerNear = vec3.create();
        vec3.add(centerNear, toNear, this.camera.getPosition(), null);
        let centerFar = vec3.create()
        vec3.add(centerFar, toFar, this.camera.getPosition());
 
        let points = this.calculateFrustumVertices(rotation, forwardVector, centerNear,centerFar);
 
        let first = true;

        points.every((point) => {
            if (first) {
                this.minX = point.x;
                this.maxX = point.x;
                this.minY = point.y;
                this.maxY = point.y;
                this.minZ = point.z;
                this.maxZ = point.z;
                first = false;
                return;
            }
            if (point.x > this.maxX) {
                this.maxX = point.x;
            } else if (point.x < this.minX) {
                this.minX = point.x;
            }
            if (point.y > this.maxY) {
                this.maxY = point.y;
            } else if (point.y < this.minY) {
                this.minY = point.y;
            }
            if (point.z > this.maxZ) {
                this.maxZ = point.z;
            } else if (point.z < this.minZ) {
                this.minZ = point.z;
            }
        })
        this.maxZ += this.OFFSET;
    }

    getCenter() {
        let x = (this.minX + this.maxX) / 2;
        let y = (this.minY + this.maxY) / 2;
        let z = (this.minZ + this.maxZ) / 2;

        let center = vec3.new(x, y, z);

        let invertedLight = mat4.create();
        mat4.invert(invertedLight, this.lightViewMatrix);

        vec3.transformMat4(center, center, invertedLight);
        return center;
    }

    getWidth() {
        return this.maxX - this.minX;
    }

    getHeight() {
         return this.maxY - this.minY;
    }

    getLength() {
        return this.maxZ - this.minZ;
    }

    calculateFrustumVertices(rotation, forwardVector, centerNear, centerFar) {
        let upVector = vec3.create();
        vec3.transformMat4(upVector, this.UP, rotation);

        let rightVector = vec3.create();
        vec3.cross(rightVector, forwardVector, upVector);

        let downVector = vec3.create();
        vec3.negate(downVector, upVector);

        let leftVector = vec3.create();
        vec3.negate(leftVector, rightVector);

        let farTop = vec3.create();
        vec3.add(farTop, centerFar, vec3.new(upVector.x * this.farHeight, upVector.y * this.farHeight, upVector.z * this.farHeight));

        let farBottom = vec3.create();
        vec3.add(farBottom, centerFar, vec3.new(downVector.x * this.farHeight, downVector.y * this.farHeight, downVector.z * this.farHeight));

        let nearTop = vec3.create();
        vec3.add(nearTop, centerFar, vec3.new(upVector.x * this.nearHeight, upVector.y * this.nearHeight, upVector.z * this.nearHeight));

        let nearBottom = vec3.create();
        vec3.add(nearBottom, centerFar, vec3.new(downVector.x * this.nearHeight, downVector.y * this.nearHeight, downVector.z * this.nearHeight));

        let points = [];

        points[0] = this.calculateLightSpaceFrustumCorner(farTop, rightVector, this.farWidth);
        points[1] = this.calculateLightSpaceFrustumCorner(farTop, leftVector, this.farWidth);
        points[2] = this.calculateLightSpaceFrustumCorner(farBottom, rightVector, this.farWidth);
        points[3] = this.calculateLightSpaceFrustumCorner(farBottom, leftVector, this.farWidth);
        points[4] = this.calculateLightSpaceFrustumCorner(nearTop, rightVector, this.nearWidth);
        points[5] = this.calculateLightSpaceFrustumCorner(nearTop, leftVector, this.nearWidth);
        points[6] = this.calculateLightSpaceFrustumCorner(nearBottom, rightVector, this.nearWidth);
        points[7] = this.calculateLightSpaceFrustumCorner(nearBottom, leftVector, this.nearWidth);

        return points;
    }

    calculateCameraRotationMatrix() {
        let rotation = mat4.create();
        mat4.rotateY(rotation, rotation, this.camera.getYaw());
        mat4.rotateX(rotation, rotation, this.camera.getPitch());
        return rotation;
    }

    calculateLightSpaceFrustumCorner(startPoint, direction, width) {
        let point = vec3.new();
        vec3.add(point, startPoint, vec3.new(direction.x * width, direction.y * width, direction.z * width));
        
        let point4 = vec4.new(point.x, point.y, point.z, 1);
        vec4.transformMat4(point4, point4, this.lightViewMatrix);
        return point4
    }

    calculateWidthsAndHeights() {
        let FOVInRad = toRadian(this.FOV);
        let aspectRatio = this.getAspectRatio();

        this.farWidth = this.SHADOW_DISTANCE * Math.tan(FOVInRad);
        this.nearWidth = this.NEAR_PLANE * Math.tan(FOVInRad);
        this.farHeight = farWidth / aspectRatio;
        this.nearHeight = nearWidth / aspectRatio;
    }

    getAspectRatio() {
        return window.innerWidth / window.innerHeight;
    }
}

export default ShadowBox;