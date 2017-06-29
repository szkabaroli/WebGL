import Camera from './camera';
import {mat4, toRadian,toDegree, vec3} from 'vmath'

export class Utils {
    static toDeg(rad) {
        return rad * (180 / Math.PI);
    }
    static toRad(deg) {
        return deg * Math.PI / 180;
    }

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
        const aspectRatio = window.innerWidth / window.innerHeight;/*
        const yScale = (1 / Math.tan(this.toRad(FOV / 2))) * aspectRatio;
        const xScale = yScale / aspectRatio;
        const frustumLength = FAR_PLANE - NEAR_PLANE;

        let matrix = new Mat4();
        matrix.m00 = xScale;
        matrix.m05 = yScale;
        matrix.m10 = -((FAR_PLANE + NEAR_PLANE) / frustumLength);
        matrix.m11 = -1;
        matrix.m14 = -(2 * NEAR_PLANE * FAR_PLANE) / frustumLength;
        matrix.m15 = 0;
        return matrix;*/
        let matrix = mat4.create();
        mat4.identity(matrix);
        mat4.perspective(matrix, 45, aspectRatio, NEAR_PLANE, FAR_PLANE);
        console.log(matrix)
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