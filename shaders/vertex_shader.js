const vs = `
        precision mediump float;

        attribute vec4 aPosition;
        attribute vec4 aNormal;        
        attribute vec2 aTextureCoord;

        uniform mat4 uLookAtMat;
        uniform mat4 uMouseRotMat;
        uniform mat4 uProjectionMat;
        uniform mat4 uNormalMat;
        uniform vec3 uCamPos;
        uniform mat4 uMoveMat;
        uniform vec3 uLightPos;

        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vColor;
        varying vec3 vCamPos;
        varying vec3 vLightPos;
        
        varying vec2 vTextureCoord;

        void main(void) {
            mat4 modelViewMat = uLookAtMat * uMoveMat * uMouseRotMat;
            vPosition = (modelViewMat * aPosition).xyz;
            vCamPos = uCamPos;
            vLightPos = (uMoveMat * vec4(uLightPos, 1.0)).xyz;
            vNormal = (uNormalMat * uMouseRotMat * aNormal).xyz;
            vColor = aNormal.xyz;
            vTextureCoord = aTextureCoord;
            gl_Position = uProjectionMat * modelViewMat * aPosition;
        }
`;