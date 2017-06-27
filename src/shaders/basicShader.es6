export const vertexShader = 
`#version 300 es

precision highp float;

in vec3 position;
in vec2 textureCoords;
in vec3 normals;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform vec3 lightPosition;
uniform vec3 lightColor;

out vec2 passedTextureCoords;
out vec3 surfaceNormal;
out vec3 toLightVector;

void main(){
    vec4 worldPosition = modelMatrix * vec4(position, 1.0f);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
    passedTextureCoords = textureCoords;

    surfaceNormal = (modelMatrix * vec4(normals, 0.0)).xyz;
    toLightVector = lightPosition - worldPosition.xyz;
} 
`;

export const fragmentShader = 
`#version 300 es

precision highp float;

in vec2 passedTextureCoords;
in vec3 surfaceNormal;
in vec3 toLightVector;

uniform sampler2D textureSampler;
uniform vec3 lightColor;

out vec4 out_Color;

void main() {
    vec3 unitNormal = normalize(surfaceNormal);
    vec3 unitLightVector = normalize(toLightVector);
    float nDotl = dot(unitNormal, unitLightVector);
    float brightness = max(nDotl, 0.1);
    vec3 diffuse = brightness * lightColor;
    out_Color = vec4(diffuse, 1.0) * texture(textureSampler, passedTextureCoords);
}`;