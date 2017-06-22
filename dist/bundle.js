(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./render/context");
var renderer_1 = require("./render/renderer");
var loader_1 = require("./render/loader");
var basicshader_1 = require("./render/basicshader");
var texturedModel_1 = require("./render/texturedModel");
var entity_1 = require("./render/entity");
var math_1 = require("./render/math");
var main = (function () {
    function main() {
        //create display
        var mDisplayManager = new context_1.default();
        this.gl = mDisplayManager.createDisplay('gl');
        //create loader and renderer
        var mRenderer = new renderer_1.default(this.gl);
        var mLoader = new loader_1.default(this.gl);
        var mBasicShader = new basicshader_1.default(this.gl);
        //rectangle verticies
        var verticies = [
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0,
        ];
        var indicies = [
            0, 1, 3,
            3, 1, 2
        ];
        var textCoords = [
            0, 0,
            0, 1,
            1, 1,
            1, 0
        ];
        var Model = mLoader.loadToVAO(verticies, textCoords, indicies);
        var Texture = mLoader.loadTexture('res/ts.png');
        var Rect = new texturedModel_1.default(Model, Texture);
        var mEntity = new entity_1.default(Rect, new math_1.Vec3(-1, 0, 0), new math_1.Vec3(0, 0, 0), 0.2);
        //Main loop
        mDisplayManager.updateDisplay(function () {
            mEntity.increasePosition(new math_1.Vec3(0.002, 0, 0));
            mEntity.increaseRotation(new math_1.Vec3(1, 1, 0));
            mRenderer.preRender();
            mBasicShader.start();
            mRenderer.render(mEntity, mBasicShader);
            mBasicShader.stop();
        });
        //mLoader.cleanUp();
    }
    return main;
}());
new main;

},{"./render/basicshader":2,"./render/context":3,"./render/entity":4,"./render/loader":5,"./render/math":6,"./render/renderer":8,"./render/texturedModel":11}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shaderprogram_1 = require("./shaderprogram");
var basicShader_1 = require("../shaders/basicShader");
var BasicShader = (function (_super) {
    __extends(BasicShader, _super);
    function BasicShader(gl) {
        return _super.call(this, gl, basicShader_1.vertexShader, basicShader_1.fragmentShader) || this;
    }
    BasicShader.prototype.bindAttributes = function () {
        _super.prototype.bindAttribute.call(this, 0, 'positions');
        _super.prototype.bindAttribute.call(this, 1, 'textureCoords');
    };
    BasicShader.prototype.getUniformLocations = function () {
        this.transformMatrixLoc = _super.prototype.getUniformLocation.call(this, 'transformationMatrix');
        this.projectionMatrixLoc = _super.prototype.getUniformLocation.call(this, 'projectionMatrix');
    };
    BasicShader.prototype.loadTransformMatrix = function (matrix) {
        _super.prototype.loadMatrix.call(this, this.transformMatrixLoc, matrix);
    };
    BasicShader.prototype.loadProjectionMatrix = function (matrix) {
        _super.prototype.loadMatrix.call(this, this.projectionMatrixLoc, matrix);
    };
    return BasicShader;
}(shaderprogram_1.default));
exports.default = BasicShader;

},{"../shaders/basicShader":12,"./shaderprogram":9}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DisplayManager = (function () {
    function DisplayManager() {
    }
    DisplayManager.prototype.createDisplay = function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl = this.canvas.getContext('webgl2');
        return this.gl;
    };
    DisplayManager.prototype.updateDisplay = function (callback) {
        var _this = this;
        requestAnimationFrame(function () {
            callback();
            _this.updateDisplay(callback);
        });
    };
    DisplayManager.prototype.closeDisplay = function () { };
    return DisplayManager;
}());
exports.default = DisplayManager;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = (function () {
    function Entity(texturedModel, position, rotation, scale) {
        this.texturedModel = texturedModel;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    Entity.prototype.increasePosition = function (v) {
        this.position.x += v.x;
        this.position.y += v.y;
        this.position.z += v.z;
    };
    Entity.prototype.increaseRotation = function (v) {
        this.rotation.x += v.x;
        this.rotation.y += v.y;
        this.rotation.z += v.z;
    };
    Entity.prototype.getTexturedModel = function () {
        return this.texturedModel;
    };
    Entity.prototype.getPosition = function () {
        return this.position;
    };
    Entity.prototype.getRotation = function () {
        return this.rotation;
    };
    Entity.prototype.getScale = function () {
        return this.scale;
    };
    return Entity;
}());
exports.default = Entity;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var texture_1 = require("./texture");
var Loader = (function () {
    function Loader(gl) {
        this.gl = gl;
    }
    Loader.prototype.loadToVAO = function (verticies, textCoords, indicies) {
        var vaoID = this.createVAO();
        this.storeDataInAttributeList(0, 3, verticies);
        this.storeDataInAttributeList(1, 2, textCoords);
        this.bindIndiciesBuffer(indicies);
        this.unbindVAO();
        return new model_1.default(vaoID, indicies.length);
    };
    Loader.prototype.loadTexture = function (fileName) {
        var _this = this;
        var textureId = this.gl.createTexture();
        var image = new Image();
        image.src = fileName;
        image.onload = function () {
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, textureId);
            _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, image);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.LINEAR);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.LINEAR);
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, null);
        };
        return new texture_1.default(textureId);
    };
    Loader.prototype.createVAO = function () {
        var vaoId = this.gl.createVertexArray();
        this.gl.bindVertexArray(vaoId);
        return vaoId;
    };
    Loader.prototype.storeDataInAttributeList = function (attributeNumber, size, data) {
        var vboId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboId);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(attributeNumber, size, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    };
    Loader.prototype.unbindVAO = function () {
        this.gl.bindVertexArray(null);
    };
    Loader.prototype.bindIndiciesBuffer = function (indicies) {
        var vboId = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, vboId);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indicies), this.gl.STATIC_DRAW);
    };
    return Loader;
}());
exports.default = Loader;

},{"./model":7,"./texture":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec3 = (function () {
    function Vec3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Vec3;
}());
exports.Vec3 = Vec3;
var Mat4 = (function () {
    function Mat4(m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15) {
        if (m00 === void 0) { m00 = 0; }
        if (m01 === void 0) { m01 = 0; }
        if (m02 === void 0) { m02 = 0; }
        if (m03 === void 0) { m03 = 0; }
        if (m04 === void 0) { m04 = 0; }
        if (m05 === void 0) { m05 = 0; }
        if (m06 === void 0) { m06 = 0; }
        if (m07 === void 0) { m07 = 0; }
        if (m08 === void 0) { m08 = 0; }
        if (m09 === void 0) { m09 = 0; }
        if (m10 === void 0) { m10 = 0; }
        if (m11 === void 0) { m11 = 0; }
        if (m12 === void 0) { m12 = 0; }
        if (m13 === void 0) { m13 = 0; }
        if (m14 === void 0) { m14 = 0; }
        if (m15 === void 0) { m15 = 0; }
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m03 = m03;
        this.m04 = m04;
        this.m05 = m05;
        this.m06 = m06;
        this.m07 = m07;
        this.m08 = m08;
        this.m09 = m09;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m15 = m15;
    }
    Mat4.prototype.identity = function () {
        this.m00 = 1;
        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m04 = 0;
        this.m05 = 1;
        this.m06 = 0;
        this.m07 = 0;
        this.m08 = 0;
        this.m09 = 0;
        this.m10 = 1;
        this.m11 = 0;
        this.m12 = 0;
        this.m13 = 0;
        this.m14 = 0;
        this.m15 = 1;
    };
    Mat4.prototype.translate = function (v) {
        var x = v.x, y = v.y, z = v.z;
        this.m12 = this.m00 * x + this.m04 * y + this.m08 * z + this.m12;
        this.m13 = this.m01 * x + this.m05 * y + this.m09 * z + this.m13;
        this.m14 = this.m02 * x + this.m06 * y + this.m10 * z + this.m14;
        this.m15 = this.m03 * x + this.m07 * y + this.m11 * z + this.m15;
    };
    Mat4.prototype.scale = function (v) {
        var x = v.x, y = v.y, z = v.z;
        this.m00 = this.m00 * x;
        this.m01 = this.m01 * x;
        this.m02 = this.m02 * x;
        this.m03 = this.m03 * x;
        this.m04 = this.m04 * y;
        this.m05 = this.m05 * y;
        this.m06 = this.m06 * y;
        this.m07 = this.m07 * y;
        this.m08 = this.m08 * z;
        this.m09 = this.m09 * z;
        this.m10 = this.m10 * z;
        this.m11 = this.m11 * z;
    };
    Mat4.prototype.rotateX = function (rad) {
        var s = Math.sin(rad), c = Math.cos(rad), a10 = this.m04, a11 = this.m05, a12 = this.m06, a13 = this.m07, a20 = this.m08, a21 = this.m09, a22 = this.m10, a23 = this.m11;
        this.m04 = a10 * c + a20 * s;
        this.m05 = a11 * c + a21 * s;
        this.m06 = a12 * c + a22 * s;
        this.m07 = a13 * c + a23 * s;
        this.m08 = a20 * c - a10 * s;
        this.m09 = a21 * c - a11 * s;
        this.m10 = a22 * c - a12 * s;
        this.m11 = a23 * c - a13 * s;
    };
    Mat4.prototype.rotateY = function (rad) {
        var s = Math.sin(rad), c = Math.cos(rad), a00 = this.m00, a01 = this.m01, a02 = this.m02, a03 = this.m03, a20 = this.m08, a21 = this.m09, a22 = this.m10, a23 = this.m11;
        this.m00 = a00 * c - a20 * s;
        this.m01 = a01 * c - a21 * s;
        this.m02 = a02 * c - a22 * s;
        this.m03 = a03 * c - a23 * s;
        this.m08 = a00 * s + a20 * c;
        this.m09 = a01 * s + a21 * c;
        this.m10 = a02 * s + a22 * c;
        this.m11 = a03 * s + a23 * c;
    };
    Mat4.prototype.rotateZ = function (rad) {
        var s = Math.sin(rad), c = Math.cos(rad), a00 = this.m00, a01 = this.m01, a02 = this.m02, a03 = this.m03, a10 = this.m04, a11 = this.m05, a12 = this.m06, a13 = this.m07;
        this.m00 = a00 * c + a10 * s;
        this.m01 = a01 * c + a11 * s;
        this.m02 = a02 * c + a12 * s;
        this.m03 = a03 * c + a13 * s;
        this.m04 = a10 * c - a00 * s;
        this.m05 = a11 * c - a01 * s;
        this.m06 = a12 * c - a02 * s;
        this.m07 = a13 * c - a03 * s;
    };
    Mat4.prototype.toArray = function () {
        return new Float32Array([
            this.m00,
            this.m01,
            this.m02,
            this.m03,
            this.m04,
            this.m05,
            this.m06,
            this.m07,
            this.m08,
            this.m09,
            this.m10,
            this.m11,
            this.m12,
            this.m13,
            this.m14,
            this.m15,
        ]);
    };
    return Mat4;
}());
exports.Mat4 = Mat4;
var Utils = (function () {
    function Utils() {
    }
    Utils.toRad = function (deg) {
        return deg * Math.PI / 180;
    };
    Utils.createTransformMatrix = function (t, r, s) {
        var matrix = new Mat4();
        matrix.identity();
        matrix.translate(t);
        matrix.rotateX(this.toRad(r.x));
        matrix.rotateY(this.toRad(r.y));
        matrix.rotateZ(this.toRad(r.z));
        matrix.scale(new Vec3(s, s, s));
        return matrix;
    };
    Utils.createProjectionMatrix = function (FOV, NEAR_PLANE, FAR_PLANE) {
        var aspectRatio = window.innerWidth / window.innerHeight;
        var yScale = (1 / Math.tan(this.toRad(FOV / 2))) * aspectRatio;
        var xScale = yScale / aspectRatio;
        var frustumLength = FAR_PLANE - NEAR_PLANE;
        var matrix = new Mat4();
        return;
    };
    return Utils;
}());
exports.Utils = Utils;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model(vaoId, vertexCount) {
        this.vaoId = vaoId;
        this.vertexCount = vertexCount;
    }
    Model.prototype.getVaoId = function () {
        return this.vaoId;
    };
    Model.prototype.getVertexCount = function () {
        return this.vertexCount;
    };
    return Model;
}());
exports.default = Model;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./math");
var Renderer = (function () {
    function Renderer(gl) {
        this.gl = gl;
    }
    Renderer.prototype.preRender = function () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0, 0, 0, 100);
    };
    Renderer.prototype.render = function (entity, shader) {
        var model = entity.getTexturedModel();
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        var transformMatrix = math_1.Utils.createTransformMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());
        shader.loadTransformMatrix(transformMatrix);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
        this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.gl.bindVertexArray(null);
    };
    return Renderer;
}());
Renderer.FOV = 70;
Renderer.NEAR_PLANE = 0.1;
Renderer.FAR_PLANE = 1000;
exports.default = Renderer;

},{"./math":6}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderProgram = (function () {
    function ShaderProgram(gl, vertexShader, fragmentShader) {
        this.gl = gl;
        this.vertexShaderId = this.loadShader(vertexShader, this.gl.VERTEX_SHADER);
        this.fragmentShaderId = this.loadShader(fragmentShader, this.gl.FRAGMENT_SHADER);
        this.programId = this.gl.createProgram();
        this.gl.attachShader(this.programId, this.fragmentShaderId);
        this.gl.attachShader(this.programId, this.vertexShaderId);
        this.bindAttributes();
        this.gl.linkProgram(this.programId);
        this.gl.validateProgram(this.programId);
        this.getUniformLocations();
    }
    ShaderProgram.prototype.start = function () {
        this.gl.useProgram(this.programId);
    };
    ShaderProgram.prototype.stop = function () {
        this.gl.useProgram(null);
    };
    ShaderProgram.prototype.bindAttributes = function () { };
    ShaderProgram.prototype.getUniformLocations = function () { };
    ShaderProgram.prototype.loadFloat = function (location, value) {
        this.gl.uniform1f(location, value);
    };
    ShaderProgram.prototype.loadBool = function (location, value) {
        var load = 0;
        if (value) {
            load = 1;
        }
        this.gl.uniform1i(location, load);
    };
    ShaderProgram.prototype.loadVector = function (location, vector) {
        this.gl.uniform3f(location, vector.x, vector.y, vector.z);
    };
    ShaderProgram.prototype.loadMatrix = function (location, matrix) {
        this.gl.uniformMatrix4fv(location, false, matrix.toArray());
    };
    ShaderProgram.prototype.getUniformLocation = function (unifomrName) {
        return this.gl.getUniformLocation(this.programId, unifomrName);
    };
    ShaderProgram.prototype.bindAttribute = function (attribute, attrName) {
        this.gl.bindAttribLocation(this.programId, attribute, attrName);
    };
    ShaderProgram.prototype.loadShader = function (shaderSource, type) {
        var shaderId = this.gl.createShader(type);
        this.gl.shaderSource(shaderId, shaderSource);
        this.gl.compileShader(shaderId);
        if (!this.gl.getShaderParameter(shaderId, this.gl.COMPILE_STATUS)) {
            console.log('ERROR compiling shader!', this.gl.getShaderInfoLog(shaderId));
            return;
        }
        return shaderId;
    };
    return ShaderProgram;
}());
exports.default = ShaderProgram;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Texture = (function () {
    function Texture(textureId) {
        this.textureId = textureId;
    }
    Texture.prototype.getTextureId = function () {
        return this.textureId;
    };
    return Texture;
}());
exports.default = Texture;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TexturedModel = (function () {
    function TexturedModel(model, texture) {
        this.model = model;
        this.texture = texture;
    }
    TexturedModel.prototype.getModel = function () {
        return this.model;
    };
    TexturedModel.prototype.getTexture = function () {
        return this.texture;
    };
    return TexturedModel;
}());
exports.default = TexturedModel;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexShader = "#version 300 es\n\nprecision mediump float;\n\nin vec3 position;\n\nin vec2 textureCoords;\n\nuniform mat4 transformationMatrix;\nuniform mat4 projectionMatrix;\n\nout vec2 passedTextureCoords;\n\nvoid main(){\n    gl_Position = transformationMatrix * vec4(position, 1.0f);\n    passedTextureCoords = textureCoords;\n} \n";
exports.fragmentShader = "#version 300 es\n\nprecision mediump float;\n\nin vec2 passedTextureCoords;\n\nuniform sampler2D textureSampler;\n\nout vec4 out_Color;\n\nvoid main() {\n    out_Color = texture(textureSampler, passedTextureCoords);\n}";

},{}]},{},[1]);
