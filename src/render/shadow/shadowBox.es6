class ShadowBox {
    constructor(lightViewMAtrix, camera) {
        this.OFFSET = 10;
        this.UP = new Vec4(0,1,0,0);
        this.FOWARD = new Vec4(0,0,-1,0);
        this.SHADWO_DISTANCE = 500;
        this.lightViewMAtrix;
        this.camera = camera;
    }

    update() {
        var rotation = this.calculateCameraRotationMatrix();
        var forwardVector = new Vec3(rotation.transform(rotation, this.FORWARD, null));
 
        var toFar = new Vector3f(forwardVector);
        toFar.scale(this.SHADOW_DISTANCE);
        var toNear = new Vector3f(forwardVector);
        toNear.scale(0.001);
        var centerNear = Vector3f.add(toNear, cam.getPosition(), null);
        var centerFar = Vector3f.add(toFar, cam.getPosition(), null);
 
        var points = calculateFrustumVertices(rotation, forwardVector, centerNear,centerFar);
 
        var first = true;
        points.every((point) =>{
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
            if (point.x > maxX) {
                this.maxX = point.x;
            } else if (point.x < minX) {
                this.minX = point.x;
            }
            if (point.y > maxY) {
                this.maxY = point.y;
            } else if (point.y < minY) {
                minY = point.y;
            }
            if (point.z > maxZ) {
                maxZ = point.z;
            } else if (point.z < minZ) {
                minZ = point.z;
            }
        })
        maxZ += OFFSET;
    }
}

export default ShadowBox;