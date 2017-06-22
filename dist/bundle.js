(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./render/context");
var renderer_1 = require("./render/renderer");
var loader_1 = require("./render/loader");
var basicshader_1 = require("./render/basicshader");
var texturedModel_1 = require("./render/texturedModel");
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
        console.log(glMatrix.toRadian(10));
        var Model = mLoader.loadToVAO(verticies, textCoords, indicies);
        var Texture = mLoader.loadTexture('res/grid.png');
        var Rect = new texturedModel_1.default(Model, Texture);
        //Main loop
        mDisplayManager.updateDisplay(function () {
            mRenderer.preRender();
            mBasicShader.start();
            mRenderer.render(Rect);
            mBasicShader.stop();
        });
        //mLoader.cleanUp();
    }
    return main;
}());
new main;

},{"./render/basicshader":2,"./render/context":3,"./render/loader":4,"./render/renderer":6,"./render/texturedModel":9}],2:[function(require,module,exports){
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
    return BasicShader;
}(shaderprogram_1.default));
exports.default = BasicShader;

},{"../shaders/basicShader":10,"./shaderprogram":7}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DisplayManager = (function () {
    function DisplayManager() {
    }
    DisplayManager.prototype.createDisplay = function (canvasId) {
        this.canvas = document.getElementById(canvasId);
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

},{"./model":5,"./texture":8}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = (function () {
    function Renderer(gl) {
        this.gl = gl;
    }
    Renderer.prototype.preRender = function () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0, 0, 0, 100);
    };
    Renderer.prototype.render = function (model) {
        this.gl.bindVertexArray(model.getModel().getVaoId());
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
        this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.gl.bindVertexArray(null);
    };
    return Renderer;
}());
exports.default = Renderer;

},{}],7:[function(require,module,exports){
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
    }
    ShaderProgram.prototype.start = function () {
        this.gl.useProgram(this.programId);
    };
    ShaderProgram.prototype.stop = function () {
        this.gl.useProgram(null);
    };
    ShaderProgram.prototype.bindAttributes = function () { };
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexShader = "#version 300 es\n\nprecision mediump float;\n\nin vec3 position;\n\nin vec2 textureCoords;\n\nout vec2 passedTextureCoords;\n\nvoid main(){\n    gl_Position = vec4(position, 1.0f);\n    passedTextureCoords = textureCoords;\n} \n";
exports.fragmentShader = "#version 300 es\n\nprecision mediump float;\n\nin vec2 passedTextureCoords;\n\nuniform sampler2D textureSampler;\n\nout vec4 out_Color;\n\nvoid main() {\n    out_Color = texture(textureSampler, passedTextureCoords);\n}";

},{}]},{},[1]);
