const input_handler = {};

input_handler.sliderInput = function(ins) {

};

input_handler.mouseDownInput = function(event) {
    this.down = true;
    this.x0 = event.clientX - 300;
    this.y0 = 300 - event.clientY;
};

input_handler.mouseMoveInput = function(event) {
    if (this.down) {
        let x1 = event.clientX - 300;
        let y1 = 300 - event.clientY;
        if (this.x0 !== x1 || this.y0 !== y1) {
            let v0 = new Vector(this.x0, this.y0, 300);
            v0.normalize();
            let v1 = new Vector(x1, y1, 300);
            v1.normalize();
            if (v0.sub(v1).norm() > 0.001) {
                let n = v0.cross(v1);
                let alpha = Math.asin(n.norm());
                n.normalize();
                let sin = Math.sin(alpha);
                let cos = Math.cos(alpha);
                this.mouseRotMat = new Matrix(
                    (1 - cos) * n.x * n.x + cos, (1 - cos) * n.x * n.y - sin * n.z, (1 - cos) * n.x * n.z + sin * n.y, 0,
                    (1 - cos) * n.y * n.x + sin * n.z, (1 - cos) * n.y * n.y + cos, (1 - cos) * n.y * n.z - sin * n.x, 0,
                    (1 - cos) * n.z * n.x - sin * n.y, (1 - cos) * n.z * n.y + sin * n.x, (1 - cos) * n.z * n.z + cos, 0,
                    0, 0, 0, 1
                ).mulMat(this.mouseRotMat);
            }
            this.x0 = x1;
            this.y0 = y1;
        }
    }
};

input_handler.mouseUpInput = function(event) {
    this.down = false;
};

input_handler.mouseWheelInput = function(event) {
    const delta = Math.sign(event.deltaY);

    if (delta < 0) {
        this.dz = this.dz + 1;
    } else {
        this.dz = this.dz - 1;
    }
};

input_handler.fileInput = function(event) {
    // first file selected by user
    let input = event.target;
    let file = input.files[0];

    // files types allowed
    let allowed_types = [ 'text/plain' ];
    if(allowed_types.indexOf(file.type) == -1) {
        alert('Error : Incorrect file type');
        return;
    }

    // Max 2 MB allowed
    let max_size_allowed = 2*1024*1024
    if(file.size > max_size_allowed) {
        alert('Error : Exceeded size 2MB');
        return;
    }

    let reader = new FileReader();

    // file reading finished successfully
    reader.addEventListener('load', function(e) {
        let text = e.target.result;

        init(text);
    });

    // file reading failed
    reader.addEventListener('error', function() {
        alert('Error : Failed to read file');
    });

    // read as text file
    reader.readAsText(file);
};