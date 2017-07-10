import DisplayManager from './render/context';
import Model from './render/model';
import Loader from './render/loader';
import TexturedModel from './render/texturedModel';
import GUITexture from './render/gui/guiTexture';
import Texture from './render/texture';
import Entity from './render/entity';
import {
    vec3,
    vec2
} from 'vmath';
import Camera from './render/camera';
import OBJLoader from './render/OBJLoader';
import Light from './render/light';
import SceneManager from './render/sceneManager';
import Scene from './render/scene';
import {
    toRadian
} from 'vmath';


//create display
const mDisplayManager = new DisplayManager();
var gl = mDisplayManager.createDisplay('gl');

const mLoader = new Loader(gl)
const mCamera = new Camera(vec3.new(0, 0, 0), vec3.new(30, 0, 0));
const mLight = new Light(vec3.new(-50, 50, 50), vec3.new(1, 1, 1));
OBJLoader.loadOBJModel(mLoader, 'res/tower01.obj').then((TowerModel) => {
    const mSceneManager = new SceneManager(gl, mLoader);


    var ElvishColors = mLoader.loadTexture('res/col.png');
    var Tower = new TexturedModel(TowerModel, ElvishColors);

    var eTower = new Entity(Tower, vec3.new(0, 0, -2), vec3.new(0, 90, 0), 1);
    mSceneManager.load(new Scene([eTower], mLight, mCamera));

    var code = 0;

    document.onkeydown = (e) => {
        if (e.keyCode == 87) {
            code = 87;
        } else if (e.keyCode == 83) {
            code = 83;
        } else if (e.keyCode == 68) {
            code = 68;
        } else if (e.keyCode == 65) {
            code = 65;
        } else if (e.keyCode == 81) {
            code = 81;
        } else if (e.keyCode == 81) {
            code = 81;
        } else if (e.keyCode == 69) {
            code = 69;
        } else if (e.keyCode == 39) {
            code = 39;
        } else if (e.keyCode == 37) {
            code = 37;
        }
    }
    document.onkeyup = () => {
        code = 0;
    }

    mDisplayManager.updateDisplay(() => {
        mCamera.move(code);
        mDisplayManager.resize();
        mSceneManager.render();
    })


}, (err)=>{console.log(err)})