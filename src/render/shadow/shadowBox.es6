import {Utils, Vec3, Vec4, Mat4} from '../math';

class ShadowBox {
    constructor(lightViewMAtrix, camera) {
        this.OFFSET = 10;
        this.UP = new Vec4(0,1,0,0);
        this.FOWARD = new Vec4(0,0,-1,0);
        this.SHADWO_DISTANCE = 200;
        this.NEAR_PLANE = 0.001;
        this.FOV = 90;
        this.lightViewMAtrix;
        this.camera = camera;
    }

    update() {

        let rotation = this.calculateCameraRotationMatrix();
        rotation = rotation.transform(this.FORWARD);
        let forwardVector = new Vec3(rotation.x, rotation.y, rotation.z);
 
        let centerFar = new Vec3(forwardVector.x, forwardVector.y, forwardVector.z);
        centerFar.scale(this.SHADOW_DISTANCE);
        centerFar.add(this.camera.getPosition());

        let centerNear = new Vec3(forwardVector.x, forwardVector.y, forwardVector.z);
        centerNear.scale(this.NEAR_PLANE);
        centerNear.add(this.camera.getPosition());
 
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
        let cen = new Vec4(x, y, z, 1);
        let invertedLight = new Mat4();
        invertedLight.invert(this.lightViewMatrix);
        invertedLight.transform(cen);
        return new Vec3(invertedLight.x, invertedLight.y, invertedLight.z);
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
        let r = rotation.transform(this.UP);
        let upVector = new Vec3(r.x, r.y, r.z);

        let rightVector = forwardVector.cross(upVector);

        let downVector = new Vec3(-upVector.x, -upVector.y, -upVector.z);

        let leftVector = new Vec3(-rightVector.x, -rightVector.y, -rightVector.z);

        let topFar = centerFar;
        let bottomFar = centerFar;
        let topNear = centerNear;
        let bottomNear = centerFar;

        let farTop = centerFar.add(new Vec3(upVector.x * this.farHeight, upVector.y * this.farHeight, upVector.z * this.farHeight));

        let farBottom = centerFar.add(new Vec3(downVector.x * this.farHeight, downVector.y * this.farHeight, downVector.z * this.farHeight));

        let nearTop = centerNear.add(new Vec3(upVector.x * this.nearHeight, upVector.y * this.nearHeight, upVector.z * this.nearHeight));

        let nearBottom = centerNear.add(new Vec3(downVector.x * this.nearHeight, downVector.y * this.nearHeight, downVector.z * this.nearHeight));

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
        let rotation = new Mat4();
        rotation.rotateY(Utils.toRad(-this.camera.getRotation().x));
        rotation.rotateX(Utils.toRad(-this.camera.getRotation().y));
        return rotation;
    }

    calculateLightSpaceFrustumCorner(startPoint, direction, width) {
        let point = startPoint.add(new Vec3(direction.x * width, direction.y * width, direction.z * width));
        let point4 = new Vec4(point.x, point.y, point.z, 1);
        point4 = this.lightViewMatrix.transform(point4);
        return point4;
    }

    calculateWidthsAndHeights() {
        this.farWidth = this.SHADOW_DISTANCE * Math.tan(Math.toRadians(this.FOV));
        this.nearWidth = this.NEAR_PLANE * Math.tan(Utils.toRad(this.FOV));
        this.farHeight = farWidth / this.getAspectRatio();
        this.nearHeight = nearWidth / this.getAspectRatio();
    }

    getAspectRatio() {
        return window.innerWidth / window.innerHeight;
    }
}

export default ShadowBox;