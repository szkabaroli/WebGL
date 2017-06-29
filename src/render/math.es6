import Camera from './camera';

export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = w;
        this.w = w;
    }
}

export class Mat4 {
    
    constructor(m00 = 0, m01 = 0, m02 = 0, m03 = 0,
                m04 = 0, m05 = 0, m06 = 0, m07 = 0,
                m08 = 0, m09 = 0, m10 = 0, m11 = 0,
                m12 = 0, m13 = 0, m14 = 0, m15 = 0) 
    {
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m03 = m03;
        this.m04 = m04;
        this.m05 = m05;
        this.m06 = m06;
        this.m07 = m07;
        this.m08 = m08;
        this.m09 = m09;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m15 = m15;
    }

    identity() {
        this.m00 = 1;

        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m04 = 0;

        this.m05 = 1;

        this.m06 = 0;
        this.m07 = 0;
        this.m08 = 0;
        this.m09 = 0;

        this.m10 = 1;

        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;

        this.m15 = 1;
    }

    translate(v) {
        const x = v.x, y = v.y, z = v.z;

        this.m12 = this.m00 * x + this.m04 * y + this.m08 * z + this.m12;
        this.m13 = this.m01 * x + this.m05 * y + this.m09 * z + this.m13;
        this.m14 = this.m02 * x + this.m06 * y + this.m10 * z + this.m14;
        this.m15 = this.m03 * x + this.m07 * y + this.m11 * z + this.m15;
    }

    scale(v) {
        const x = v.x, y = v.y, z = v.z;

        this.m00 = this.m00 * x;
        this.m01 = this.m01 * x;
        this.m02 = this.m02 * x;
        this.m03 = this.m03 * x;
        this.m04 = this.m04 * y;
        this.m05 = this.m05 * y;
        this.m06 = this.m06 * y;
        this.m07 = this.m07 * y;
        this.m08 = this.m08 * z;
        this.m09 = this.m09 * z;
        this.m10 = this.m10 * z;
        this.m11 = this.m11 * z;
    }

    rotateX(rad) {
        let s = Math.sin(rad),
            c = Math.cos(rad),
            a10 = this.m04,
            a11 = this.m05,
            a12 = this.m06,
            a13 = this.m07,
            a20 = this.m08,
            a21 = this.m09,
            a22 = this.m10,
            a23 = this.m11;

        this.m04 = a10 * c + a20 * s;
        this.m05 = a11 * c + a21 * s;
        this.m06 = a12 * c + a22 * s;
        this.m07 = a13 * c + a23 * s;
        this.m08 = a20 * c - a10 * s;
        this.m09 = a21 * c - a11 * s;
        this.m10 = a22 * c - a12 * s;
        this.m11 = a23 * c - a13 * s;
    }

    rotateY(rad) {
        let s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = this.m00,
            a01 = this.m01,
            a02 = this.m02,
            a03 = this.m03,
            a20 = this.m08,
            a21 = this.m09,
            a22 = this.m10,
            a23 = this.m11;

        this.m00 = a00 * c - a20 * s;
        this.m01 = a01 * c - a21 * s;
        this.m02 = a02 * c - a22 * s;
        this.m03 = a03 * c - a23 * s;
        this.m08 = a00 * s + a20 * c;
        this.m09 = a01 * s + a21 * c;
        this.m10 = a02 * s + a22 * c;
        this.m11 = a03 * s + a23 * c;
    }

    rotateZ(rad) {
        let s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = this.m00,
            a01 = this.m01,
            a02 = this.m02,
            a03 = this.m03,
            a10 = this.m04,
            a11 = this.m05,
            a12 = this.m06,
            a13 = this.m07;

        this.m00 = a00 * c + a10 * s;
        this.m01 = a01 * c + a11 * s;
        this.m02 = a02 * c + a12 * s;
        this.m03 = a03 * c + a13 * s;
        this.m04 = a10 * c - a00 * s;
        this.m05 = a11 * c - a01 * s;
        this.m06 = a12 * c - a02 * s;
        this.m07 = a13 * c - a03 * s;
    }

    toArray() {
        return new Float32Array([
            this.m00,
            this.m01,
            this.m02,
            this.m03,
            this.m04,
            this.m05,
            this.m06,
            this.m07,
            this.m08,
            this.m09,
            this.m10,
            this.m11,
            this.m12,
            this.m13,
            this.m14,
            this.m15,
        ]);
    }

    multiply(matrix) {
        let a00 = matrix.m00, a01 = matrix.m01, a02 = matrix.m02, a03 = matrix.m03,
            a10 = matrix.m04, a11 = matrix.m05, a12 = matrix.m06, a13 = matrix.m07,
            a20 = matrix.m08, a21 = matrix.m09, a22 = matrix.m10, a23 = matrix.m11,
            a30 = matrix.m12, a31 = matrix.m13, a32 = matrix.m14, a33 = matrix.m15;

        // Cache only the current line of the second matrix
        let b0 = this.m00, b1 = this.m01, b2 = this.m02, b3 = this.m03;
        this.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this.m04; b1 = this.m05; b2 = this.m06; b3 = this.m07;
        this.m04 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m05 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m06 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m07 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this.m08; b1 = this.m09; b2 = this.m10; b3 = this.m11;
        this.m08 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m09 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m10 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m11 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = this.m12; b1 = this.m13; b2 = this.m14; b3 = this.m15;
        this.m12 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.m13 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.m14 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.m15 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    }
}

export class Utils {

    static toRad(deg) {
        return deg * Math.PI / 180;
    }

    static createModelMatrix(t,r,s) {
        var matrix = new Mat4();
        matrix.identity();
        matrix.translate(t);
        matrix.rotateX(this.toRad(r.x));
        matrix.rotateY(this.toRad(r.y));
        matrix.rotateZ(this.toRad(r.z));
        matrix.scale(new Vec3(s,s,s));
        return matrix;
    }

    static createProjectionMatrix(FOV , NEAR_PLANE , FAR_PLANE ) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const yScale = (1 / Math.tan(this.toRad(FOV / 2))) * aspectRatio;
        const xScale = yScale / aspectRatio;
        const frustumLength = FAR_PLANE - NEAR_PLANE;

        let matrix = new Mat4();
        matrix.m00 = xScale;
        matrix.m05 = yScale;
        matrix.m10 = -((FAR_PLANE + NEAR_PLANE) / frustumLength);
        matrix.m11 = -1;
        matrix.m14 = -(2 * NEAR_PLANE * FAR_PLANE) / frustumLength;
        matrix.m15 = 0;
        return matrix;
    }

    static createViewMatrix(camera) {
        console.log(camera)
        var matrix = new Mat4();
        matrix.identity();
        matrix.rotateX(this.toRad(camera.getRotation().x));
        matrix.rotateY(this.toRad(camera.getRotation().y));
        var cameraPos = camera.getPosition();
        var invert = new Vec3(-cameraPos.x, -cameraPos.y, -cameraPos.z);
        matrix.translate(invert);
        return matrix;
    }
}