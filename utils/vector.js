class Vector {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    dehomogen() {
        this.x /= this.w;
        this.y /= this.w;
        this.z /= this.w;
        this.w = 1;
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    norm() {
        return Math.sqrt(this.dot(this));
    }

    normalize() {
        let n = this.norm();
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }

    sub(v) {
        return new Vector(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z
        );
    }

    add(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        );
    }

    mul(s) {
        return new Vector(
            this.x * s,
            this.y * s,
            this.z * s
        );
    }

    matMulVec(v, m) {
        return new Vector(
            m.a00 * v.x + m.a01 * v.y + m.a02 * v.z + m.a03 * v.w,
            m.a10 * v.x + m.a11 * v.y + m.a12 * v.z + m.a13 * v.w,
            m.a20 * v.x + m.a21 * v.y + m.a22 * v.z + m.a23 * v.w,
            m.a30 * v.x + m.a31 * v.y + m.a32 * v.z + m.a33 * v.w
        );
    }

    toGL() {
        this.dehomogen();
        return [this.x, this.y, this.z];
    }
}