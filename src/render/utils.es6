import {mat4, toRadian, vec3} from 'vmath'

export default class Utils {

    static createModelMatrix(t,r,s) {
        var matrix = mat4.create();
        mat4.identity(matrix);
        mat4.translate(matrix, matrix, t);
        mat4.rotateX(matrix, matrix, toRadian(r.x));
        mat4.rotateY(matrix, matrix, toRadian(r.y));
        mat4.rotateZ(matrix, matrix, toRadian(r.z));
        mat4.scale(matrix, matrix, vec3.new(s,s,s));
        
        return matrix;
    }

    static createProjectionMatrix(FOV , NEAR_PLANE , FAR_PLANE ) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const yScale = (1 / Math.tan(toRadian(FOV / 2))) * aspectRatio;
        const xScale = yScale / aspectRatio;
        const frustumLength = FAR_PLANE - NEAR_PLANE;

        let matrix = mat4.create();
        mat4.set(matrix, 
        xScale,
        0,
        0,
        0,
        0,
        yScale,
        0,
        0,
        0,
        0,
        -((FAR_PLANE + NEAR_PLANE) / frustumLength),
        -1,
        0,
        0,
        -(2 * NEAR_PLANE * FAR_PLANE) / frustumLength,
        0
        )
        return matrix;
    }

    static createViewMatrix(camera) {
        let matrix = mat4.create();
        mat4.identity(matrix);
        mat4.rotateX(matrix, matrix, toRadian(camera.getRotation().x));
        mat4.rotateY(matrix, matrix, toRadian(camera.getRotation().y));
        let cameraPos = camera.getPosition();
        let invert = vec3.new(-cameraPos.x, -cameraPos.y, -cameraPos.z);
        mat4.translate(matrix, matrix, invert);
        return matrix;
    }
}