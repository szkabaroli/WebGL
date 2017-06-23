export const vertexShader = 
`#version 300 es

precision highp float;

in vec3 position;

in vec2 textureCoords;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

out vec2 passedTextureCoords;

void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0f);
    passedTextureCoords = textureCoords;
} 
`;

export const fragmentShader = 
`#version 300 es

precision highp float;

in vec2 passedTextureCoords;

uniform sampler2D textureSampler;

out vec4 out_Color;

void main() {
    out_Color = texture(textureSampler, passedTextureCoords);
}`;

