class Matrix {
    constructor(a00 = 1, a01 = 0, a02 = 0, a03 = 0,
                a10 = 0, a11 = 1, a12 = 0, a13 = 0,
                a20 = 0, a21 = 0, a22 = 1, a23 = 0,
                a30 = 0, a31 = 0, a32 = 0, a33 = 1) {
        this.a00 = a00;
        this.a01 = a01;
        this.a02 = a02;
        this.a03 = a03;
        this.a10 = a10;
        this.a11 = a11;
        this.a12 = a12;
        this.a13 = a13;
        this.a20 = a20;
        this.a21 = a21;
        this.a22 = a22;
        this.a23 = a23;
        this.a30 = a30;
        this.a31 = a31;
        this.a32 = a32;
        this.a33 = a33;
    }

    mulMat(m) {
        return new Matrix(
            this.a00 * m.a00 + this.a01 * m.a10 + this.a02 * m.a20 + this.a03 * m.a30,
            this.a00 * m.a01 + this.a01 * m.a11 + this.a02 * m.a21 + this.a03 * m.a31,
            this.a00 * m.a02 + this.a01 * m.a12 + this.a02 * m.a22 + this.a03 * m.a32,
            this.a00 * m.a03 + this.a01 * m.a13 + this.a02 * m.a23 + this.a03 * m.a33,
            this.a10 * m.a00 + this.a11 * m.a10 + this.a12 * m.a20 + this.a13 * m.a30,
            this.a10 * m.a01 + this.a11 * m.a11 + this.a12 * m.a21 + this.a13 * m.a31,
            this.a10 * m.a02 + this.a11 * m.a12 + this.a12 * m.a22 + this.a13 * m.a32,
            this.a10 * m.a03 + this.a11 * m.a13 + this.a12 * m.a23 + this.a13 * m.a33,
            this.a20 * m.a00 + this.a21 * m.a10 + this.a22 * m.a20 + this.a23 * m.a30,
            this.a20 * m.a01 + this.a21 * m.a11 + this.a22 * m.a21 + this.a23 * m.a31,
            this.a20 * m.a02 + this.a21 * m.a12 + this.a22 * m.a22 + this.a23 * m.a32,
            this.a20 * m.a03 + this.a21 * m.a13 + this.a22 * m.a23 + this.a23 * m.a33,
            this.a30 * m.a00 + this.a31 * m.a10 + this.a32 * m.a20 + this.a33 * m.a30,
            this.a30 * m.a01 + this.a31 * m.a11 + this.a32 * m.a21 + this.a33 * m.a31,
            this.a30 * m.a02 + this.a31 * m.a12 + this.a32 * m.a22 + this.a33 * m.a32,
            this.a30 * m.a03 + this.a31 * m.a13 + this.a32 * m.a23 + this.a33 * m.a33
        );
    }

    inverse() {
        // determinants of 2x2 submatrices
        let dt01 = this.a00 * this.a11 - this.a01 * this.a10;
        let dt02 = this.a00 * this.a12 - this.a02 * this.a10;
        let dt03 = this.a00 * this.a13 - this.a03 * this.a10;
        let dt12 = this.a01 * this.a12 - this.a02 * this.a11;
        let dt13 = this.a01 * this.a13 - this.a03 * this.a11;
        let dt23 = this.a02 * this.a13 - this.a03 * this.a12;
        let db01 = this.a20 * this.a31 - this.a21 * this.a30;
        let db02 = this.a20 * this.a32 - this.a22 * this.a30;
        let db03 = this.a20 * this.a33 - this.a23 * this.a30;
        let db12 = this.a21 * this.a32 - this.a22 * this.a31;
        let db13 = this.a21 * this.a33 - this.a23 * this.a31;
        let db23 = this.a22 * this.a33 - this.a23 * this.a32;

        // determinant
        let d = dt01 * db23 - dt02 * db13 + dt03 * db12 + dt12 * db03 - dt13 * db02 + dt23 * db01;
        if (!d) {
            return null;
        }

        // M^(-1) = 1 / det(M) * adj(M)
        d = 1.0 / d;
        return new Matrix(
            d * (this.a11 * db23 - this.a12 * db13 + this.a13 * db12),
            d * (this.a02 * db13 - this.a01 * db23 - this.a03 * db12),
            d * (this.a31 * dt23 - this.a32 * dt13 + this.a33 * dt12),
            d * (this.a22 * dt13 - this.a21 * dt23 - this.a23 * dt12),
            d * (this.a12 * db03 - this.a10 * db23 - this.a13 * db02),
            d * (this.a00 * db23 - this.a02 * db03 + this.a03 * db02),
            d * (this.a32 * dt03 - this.a30 * dt23 - this.a33 * dt02),
            d * (this.a20 * dt23 - this.a22 * dt03 + this.a23 * dt02),
            d * (this.a10 * db13 - this.a11 * db03 + this.a13 * db01),
            d * (this.a01 * db03 - this.a00 * db13 - this.a03 * db01),
            d * (this.a30 * dt13 - this.a31 * dt03 + this.a33 * dt01),
            d * (this.a21 * dt03 - this.a20 * dt13 - this.a23 * dt01),
            d * (this.a11 * db02 - this.a10 * db12 - this.a12 * db01),
            d * (this.a00 * db12 - this.a01 * db02 + this.a02 * db01),
            d * (this.a31 * dt02 - this.a30 * dt12 - this.a32 * dt01),
            d * (this.a20 * dt12 - this.a21 * dt02 + this.a22 * dt01),
        );
    }

    transpose() {
        return new Matrix(
            this.a00, this.a10, this.a20, this.a30,
            this.a01, this.a11, this.a21, this.a31,
            this.a02, this.a12, this.a22, this.a32,
            this.a03, this.a13, this.a23, this.a33
        );
    }

    transMat(dx, dy, dz) {
        return new Matrix(
            1, 0, 0, dx,
            0, 1, 0, dy,
            0, 0, 1, dz,
            0, 0, 0, 1
        );
    }

    rotXMat(angle) {
        return new Matrix(
            1, 0, 0, 0,
            0, Math.cos(angle), -Math.sin(angle), 0,
            0, Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        );
    }

    rotYMat(angle) {
        return new Matrix(
            Math.cos(angle), 0, Math.sin(angle), 0,
            0, 1, 0, 0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0, 0, 0, 0
        );
    }

    rotZMat(angle) {
        return new Matrix(
            Math.cos(angle), -Math.sin(angle), 0, 0,
            Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    projectionMat(near, far, fov_x, fov_y) {
        /* n=-1; f=-10; t=1; b=-1; r=-1; l=1; h=2; w=2 */
        const t_proj = near * Math.tan(fov_x);
        const b_proj = -near * Math.tan(fov_x);
        const l_proj = -near * Math.tan(fov_y);
        const r_proj = near * Math.tan(fov_y);
        const h_proj = t_proj - b_proj;
        const w_proj = r_proj - l_proj;
        return new Matrix(
            (2 * near) / w_proj, 0, (r_proj + l_proj) / (w_proj), 0,
            0, (2 * near) / h_proj, (t_proj + b_proj) / (h_proj), 0,
            0, 0, (-far - near) / (far - near), (-2 * far * near) / (far - near),
            0, 0, -1, 0
        );
    }

    lookAtMat(c, dir, up) {
        const r = (dir.cross(up)).normalize();
        return new Matrix(
            r.x, r.y, r.z, -r.dot(c),
            up.x, up.y, up.z, -up.dot(c),
            -dir.x, -dir.y, -dir.z, dir.dot(c),
            0, 0, 0, 1
        );
    }

    toGL() {
        return [
            this.a00, this.a10, this.a20, this.a30,
            this.a01, this.a11, this.a21, this.a31,
            this.a02, this.a12, this.a22, this.a32,
            this.a03, this.a13, this.a23, this.a33
        ];
    }
}