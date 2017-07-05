export const vertexShader = 
`#version 300 es

precision mediump float;

in vec3 position;
in vec2 textureCoords;
in vec3 normals;


uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform vec3 lightPosition;

out vec2 passedTextureCoords;
out vec3 surfaceNormal;
out vec3 toLightVector;
out float visiblity;

const float density = 0.05;
const float gradient =5.0;

void main(void){
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 positionRelativeToCam = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * positionRelativeToCam;
    passedTextureCoords = textureCoords;

    surfaceNormal = (modelMatrix * vec4(normals, 0.0)).xyz;
    toLightVector = lightPosition - worldPosition.xyz;

    float distance = length(positionRelativeToCam.xyz);
    visiblity = exp(-pow((distance*density), gradient));
    visiblity = clamp(visiblity, 0.0, 1.0);
} 
`;

export const fragmentShader = 
`#version 300 es

precision mediump float;

in vec2 passedTextureCoords;
in vec3 surfaceNormal;
in vec3 toLightVector;
in float visiblity;

uniform sampler2D textureSampler;
uniform vec3 lightColor;
uniform vec3 fogColor;

out vec4 out_Color;

void main() {
    vec3 unitNormal = normalize(surfaceNormal);
    vec3 unitLightVector = normalize(toLightVector);
    float nDotl = dot(unitNormal, unitLightVector);
    float brightness = max(nDotl, 0.4);
    vec3 diffuse = brightness * lightColor;
    out_Color = vec4(diffuse, 1.0) * texture(textureSampler, passedTextureCoords);
    out_Color = mix(vec4(fogColor, 1.0), out_Color, visiblity);
}`;