export class Vec3 {

    public x : number;
    public y : number;
    public z : number;

    constructor(x : number, y : number, z : number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Mat4 {

    private m00 : number;
    private m01 : number;
    private m02 : number;
    private m03 : number;
    private m04 : number;
    private m05 : number;
    private m06 : number;
    private m07 : number;
    private m08 : number;
    private m09 : number;
    private m10 : number;
    private m11 : number;
    private m12 : number;
    private m13 : number;
    private m14 : number;
    private m15 : number;
    
    constructor(m00 : number = 0, m01 : number = 0, m02 : number = 0, m03 : number = 0,
                m04 : number = 0, m05 : number = 0, m06 : number = 0, m07 : number = 0,
                m08 : number = 0, m09 : number = 0, m10 : number = 0, m11 : number = 0,
                m12 : number = 0, m13 : number = 0, m14 : number = 0, m15 : number = 0) 
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

    public identity() {
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

    public translate(v : Vec3) : void {
        const x = v.x, y = v.y, z = v.z;

        this.m12 = this.m00 * x + this.m04 * y + this.m08 * z + this.m12;
        this.m13 = this.m01 * x + this.m05 * y + this.m09 * z + this.m13;
        this.m14 = this.m02 * x + this.m06 * y + this.m10 * z + this.m14;
        this.m15 = this.m03 * x + this.m07 * y + this.m11 * z + this.m15;
    }

    public scale(v : Vec3) : void {
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

    public rotateX(rad : number) : void {
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

    public rotateY(rad : number) : void {
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

    public rotateZ(rad : number) : void {
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

    public toArray() : Float32Array {
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
}

export class Utils {

    public static toRad(deg : number) : number{
        return deg * Math.PI / 180;
    }

    public static createTransformMatrix(t : Vec3, r : Vec3, s : number) : Mat4 {
        var matrix = new Mat4();
        matrix.identity();
        matrix.translate(t);
        matrix.rotateX(this.toRad(r.x));
        matrix.rotateY(this.toRad(r.y));
        matrix.rotateZ(this.toRad(r.z));
        matrix.scale(new Vec3(s,s,s));
        return matrix;
    }
}