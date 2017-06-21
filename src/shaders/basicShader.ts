export const vertexShader = 
`#version 300 es
precision mediump float;
in vec3 position;

out vec3 color;

void main(){
    gl_Position = vec4(position, 1.0f);
    color = vec3(position.x+0.5f, 1.0f, position.y+0.5f);
} 
`;

export const fragmentShader = 
`#version 300 es
precision mediump float;
in vec3 color;

out vec4 out_Color;

void main() {
    out_Color = vec4(color, 1.0f);
}`;

