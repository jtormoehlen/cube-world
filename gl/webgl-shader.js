const shader = {};

shader.loadShader = function (gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('An error occurred compiling the shaders:\n' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
};

shader.initShader = function(gl, vertexShader, fragmentShader) {
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('Unable to initialize the shader program:\n' + gl.getProgramInfoLog(shaderProgram));
    }

    return shaderProgram;
};

shader.loadTexture = function (gl, src) {
    let texture = gl.createTexture();
    texture.image = new Image();

    texture.image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    texture.image.src = src;

    return texture;
};

shader.initProgram = function(gl, shaderProgram) {
    return {
        program: shaderProgram,
        attribLocations: {
            position: gl.getAttribLocation(shaderProgram, 'aPosition'),
            normal: gl.getAttribLocation(shaderProgram, 'aNormal'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord')
        },
        uniformLocations: {
            lookAtMatrix: gl.getUniformLocation(shaderProgram, 'uLookAtMat'),
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMat'),
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMat'),
            lightPosition: gl.getUniformLocation(shaderProgram, 'uLightPos'),
            lightColor: gl.getUniformLocation(shaderProgram, 'uLightCol'),
            materials: gl.getUniformLocation(shaderProgram, 'uMats'),
            cameraPosition: gl.getUniformLocation(shaderProgram, 'uCamPos'),
            shininess: gl.getUniformLocation(shaderProgram, 'uShine'),
            mouseRotationMatrix: gl.getUniformLocation(shaderProgram, 'uMouseRotMat'),
            moveMatrix: gl.getUniformLocation(shaderProgram, 'uMoveMat')
        }
    };
};

shader.attributes = function(gl, programInfo) {
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, obj_loader.normalBuffer);
        gl.vertexAttribPointer(
            programInfo.attribLocations.normal,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.normal);
    }
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, obj_loader.vertexBuffer);
        gl.vertexAttribPointer(
            programInfo.attribLocations.position,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(programInfo.attribLocations.position);
    }
    {
        const num = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, obj_loader.textureBuffer);
        gl.vertexAttribPointer(
            programInfo.attribLocations.textureCoord,
            num,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj_loader.indexBuffer);
};

shader.uniforms = function(gl, programInfo, uniforms) {
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.lookAtMatrix,
        false,
        uniforms.lookAtMat.toGL());
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        uniforms.projMat.toGL());
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        uniforms.normalMat.toGL());
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.mouseRotationMatrix,
        false,
        uniforms.mouseRotMat.toGL());
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.moveMatrix,
        false,
        uniforms.moveMat.toGL());
    gl.uniform3fv(programInfo.uniformLocations.lightPosition, uniforms.lightPos.toGL());
    gl.uniform3fv(programInfo.uniformLocations.lightColor, uniforms.lightCol.toGL());
    gl.uniform3fv(programInfo.uniformLocations.materials, uniforms.mats.toGL());
    gl.uniform3fv(programInfo.uniformLocations.cameraPosition, uniforms.center.toGL());
    gl.uniform1f(programInfo.uniformLocations.shininess, uniforms.shine);
};

shader.texturing = function(gl, programInfo, texture) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(programInfo.uniformLocations.uTexture, 0);
};