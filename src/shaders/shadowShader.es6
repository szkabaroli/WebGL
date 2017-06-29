export const vertexShader = 
`#version 300 es

precision mediump float;

in vec3 inPosition;
uniform mat4 mvpMatrix;

void main(void){
    gl_Position = mvpMatrix * vec4(inPosition, 1.0);
} 
`;

export const fragmentShader = 
`#version 300 es

precision mediump float;

out vec4 outColor;
uniform sampler2D modelTexture;

void main() {
    outColor = vec4(1.0);
}`;