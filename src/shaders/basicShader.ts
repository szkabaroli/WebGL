export const vertexShader = 
`#version 300 es

precision mediump float;

in vec3 position;

in vec2 textureCoords;

uniform mat4 transformationMatrix;
uniform mat4 projectionMatrix;

out vec2 passedTextureCoords;

void main(){
    gl_Position = projectionMatrix * transformationMatrix * vec4(position, 1.0f);
    passedTextureCoords = textureCoords;
} 
`;

export const fragmentShader = 
`#version 300 es

precision mediump float;

in vec2 passedTextureCoords;

uniform sampler2D textureSampler;

out vec4 out_Color;

void main() {
    out_Color = texture(textureSampler, passedTextureCoords);
}`;

