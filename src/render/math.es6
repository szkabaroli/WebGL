import Camera from './camera';

export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    scale(scale) {
        let x = this.x * scale;
		let y = this.y * scale;
		let z = this.z * scale;
        return new Vec3(x,y,z);
    }

    add(right) {
        let x = this.x + right.x;
        let y = this.y + right.y;
        let z = this.z + right.z;
        return new Vec3(x, y, z);
    }

    cross(right) {
        let x = this.y * right.z - this.z * right.y;
        let y = this.x * right.z - this.z * right.x;
        let z = this.x * right.y - this.y * right.x;
        return new Vec3(x, y, z);
    }
    negate() {
        this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
    }
    normalize(a) {
        let x = a.x,
            y = a.y,
            z = a.z;

        let len = x * x + y * y + z * z;

        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
        }
    }
}

export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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

    transform(right) {
        const x = this.m00 * right.x + this.m10 * this.y + left.m20 * this.z + left.m30 * this.w;
		const y = this.m01 * right.x + this.m11 * this.y + left.m21 * this.z + left.m31 * this.w;
		const z = this.m02 * right.x + this.m12 * this.y + left.m22 * this.z + left.m32 * this.w;
		const w = this.m03 * right.x + this.m13 * this.y + left.m23 * this.z + left.m33 * this.w;
        return new Vec4(x, y, z, w);
    }

    invert(a) {
        let a00 = a.m00, a01 = a.m01, a02 = a.m02, a03 = a.m03,
            a10 = a.m04, a11 = a.m05, a12 = a.m06, a13 = a.m07,
            a20 = a.m08, a21 = a.m09, a22 = a.m10, a23 = a.m11,
            a30 = a.m12, a31 = a.m13, a32 = a.m14, a33 = a.m15;

        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        
        if (!det) {
            return;
        }

        det = 1.0 / det;

        this.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        this.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        this.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        this.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        this.m04 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        this.m05 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        this.m06 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        this.m07 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        this.m08 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        this.m09 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        this.m10 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        this.m11 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        this.m12 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        this.m13 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        this.m14 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        this.m15 = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        }
    }

export class Utils {
    static toDeg(rad) {
        return rad * (180 / Math.PI);
    }
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