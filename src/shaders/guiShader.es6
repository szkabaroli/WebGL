export const vertexShader = 
`#version 300 es

precision mediump float;

in vec2 position;

out vec2 textureCoords;

uniform mat4 modelMatrix;

void main(void){

	gl_Position = modelMatrix * vec4(position, 0.0, 1.0);
	textureCoords = vec2((position.x+1.0)/2.0, 1.0 - (position.y+1.0)/2.0);
}`;

export const fragmentShader = 
`#version 300 es

precision mediump float;

in vec2 textureCoords;

out vec4 out_Color;

uniform sampler2D guiTexture;

void main(void){

	out_Color = texture(guiTexture,textureCoords);

}`;