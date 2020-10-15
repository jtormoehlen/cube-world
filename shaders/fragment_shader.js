const fs = `
        precision mediump float;
        
        uniform vec3 uLightPos;
        uniform vec3 uLightCol;
        uniform vec3 uMats;
        uniform float uShine;   
        uniform sampler2D uTexture;

        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vColor;
        varying vec3 vCamPos;
        varying vec3 vLightPos;
        
        varying vec2 vTextureCoord;

        void main(void) {
            vec3 nn = normalize(vNormal);
            vec3 ln = normalize(vLightPos - vPosition);
            //vec3 rn = normalize(reflect(ln, nn));
            vec3 rn = normalize(2.0 * nn * dot(nn, ln) - ln);
            vec3 vn = normalize(vCamPos - vPosition);
            
            float fDiffuse = max(dot(ln, nn), 0.0);
            float fSpecular = 0.0; 
            if (fDiffuse > 0.0) {
                fSpecular =  max(dot(vn, rn), 0.0);
            }
            
            vec4 toonCol = vec4(0.0, 0.0, 0.0, 1.0);
            if (fDiffuse > 0.95) {
                toonCol = vec4(0.8, 0.8, 0.8, 1.0);
            }
            else if (fDiffuse > 0.5) {
                toonCol = vec4(0.5, 0.5, 0.5, 1.0);
            }
            else if (fDiffuse > 0.25) {
                toonCol = vec4(0.3, 0.3, 0.3, 1.0);
            }

            // texture2D(uTexture, vTextureCoord).stpq;

            vec3 ambient = uMats.r * uLightCol * texture2D(uTexture, vTextureCoord).stp;
            vec3 diffuse = fDiffuse * uMats.g * uLightCol * texture2D(uTexture, vTextureCoord).stp;
            vec3 specular = pow(fSpecular, uShine) * uMats.b * uLightCol;           
            
            vec3 phong = specular + diffuse + ambient;
            vec3 color = vec3(abs(vColor.r), abs(vColor.g), abs(vColor.b));
            //vec3 color = vec3(1.0, 1.0, 1.0);
            
            gl_FragColor = vec4(phong * color, 1.0);
            //gl_FragColor = toonCol * vec4(color, 1.0);
        }
`;