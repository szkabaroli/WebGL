(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _context = require('./render/context');

var _context2 = _interopRequireDefault(_context);

var _renderer = require('./render/renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _model = require('./render/model');

var _model2 = _interopRequireDefault(_model);

var _loader = require('./render/loader');

var _loader2 = _interopRequireDefault(_loader);

var _basicshader = require('./render/basicshader');

var _basicshader2 = _interopRequireDefault(_basicshader);

var _texturedModel = require('./render/texturedModel');

var _texturedModel2 = _interopRequireDefault(_texturedModel);

var _texture = require('./render/texture');

var _texture2 = _interopRequireDefault(_texture);

var _entity = require('./render/entity');

var _entity2 = _interopRequireDefault(_entity);

var _math = require('./render/math');

var _camera = require('./render/camera');

var _camera2 = _interopRequireDefault(_camera);

var _OBJLoader = require('./render/OBJLoader');

var _OBJLoader2 = _interopRequireDefault(_OBJLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = function main() {
    _classCallCheck(this, main);

    //create display
    var mDisplayManager = new _context2.default();
    this.gl = mDisplayManager.createDisplay('gl');

    //create loader and renderer
    var mLoader = new _loader2.default(this.gl);
    var mBasicShader = new _basicshader2.default(this.gl);
    var mRenderer = new _renderer2.default(this.gl, mBasicShader);

    //rectangle verticies
    var verticies = [-1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1];

    var indicies = [3, 1, 0, 2, 1, 3, 4, 5, 7, //
    7, 5, 6, 11, 9, 8, 10, 9, 11, 12, 13, 15, 15, 13, 14, 19, 17, 16, 18, 17, 19, 20, 21, 23, 23, 21, 22];

    var textCoords = [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0];

    _OBJLoader2.default.loadOBJModel('res/test.txt', mLoader);

    var Model = mLoader.loadToVAO(verticies, textCoords, indicies);
    var Texture = mLoader.loadTexture('res/ts.png');
    var Rect = new _texturedModel2.default(Model, Texture);
    var mCamera = new _camera2.default();

    var mEntity = new _entity2.default(Rect, new _math.Vec3(0, 0, -1), new _math.Vec3(0, 0, 0), 0.2);
    var code = 0;

    document.onkeydown = function (e) {
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
        }
    };
    document.onkeyup = function () {
        code = 0;
    };

    mDisplayManager.updateDisplay(function () {
        mEntity.increasePosition(new _math.Vec3(0, 0, 0));
        mEntity.increaseRotation(new _math.Vec3(1, 1, 0));
        mCamera.move(code);
        mRenderer.preRender();
        mBasicShader.start();
        mBasicShader.loadViewMatrix(mCamera);
        mRenderer.render(mEntity, mBasicShader);
        mBasicShader.stop();
    });

    //mLoader.cleanUp();
};

new main();

},{"./render/OBJLoader":2,"./render/basicshader":3,"./render/camera":4,"./render/context":5,"./render/entity":6,"./render/loader":7,"./render/math":8,"./render/model":9,"./render/renderer":10,"./render/texture":12,"./render/texturedModel":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OBJLoader = function () {
    function OBJLoader() {
        _classCallCheck(this, OBJLoader);
    }

    _createClass(OBJLoader, null, [{
        key: 'loadOBJModel',
        value: function loadOBJModel(fileName, loader) {
            function onLoad() {
                var lines = this.responseText.split('\n');
                console.log(lines);
            }

            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", onLoad);
            xhr.open("GET", fileName);
            xhr.send();
        }
    }]);

    return OBJLoader;
}();

exports.default = OBJLoader;

},{"./loader":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _shaderprogram = require('./shaderprogram');

var _shaderprogram2 = _interopRequireDefault(_shaderprogram);

var _basicShader = require('../shaders/basicShader');

var _math = require('./math');

var _camera = require('./camera');

var _camera2 = _interopRequireDefault(_camera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicShader = function (_ShaderProgram) {
    _inherits(BasicShader, _ShaderProgram);

    function BasicShader(gl) {
        _classCallCheck(this, BasicShader);

        return _possibleConstructorReturn(this, (BasicShader.__proto__ || Object.getPrototypeOf(BasicShader)).call(this, gl, _basicShader.vertexShader, _basicShader.fragmentShader));
    }

    _createClass(BasicShader, [{
        key: 'bindAttributes',
        value: function bindAttributes() {
            _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'bindAttribute', this).call(this, 0, 'positions');
            _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'bindAttribute', this).call(this, 1, 'textureCoords');
        }
    }, {
        key: 'getUniformLocations',
        value: function getUniformLocations() {
            this.modelMatrixLoc = _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'getUniformLocation', this).call(this, 'modelMatrix');
            this.projectionMatrixLoc = _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'getUniformLocation', this).call(this, 'projectionMatrix');
            this.viewMatrixLoc = _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'getUniformLocation', this).call(this, 'viewMatrix');
        }
    }, {
        key: 'loadModelMatrix',
        value: function loadModelMatrix(modelMatrix) {
            _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'loadMatrix', this).call(this, this.modelMatrixLoc, modelMatrix);
        }
    }, {
        key: 'loadProjectionMatrix',
        value: function loadProjectionMatrix(projectionMatrix) {
            _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'loadMatrix', this).call(this, this.projectionMatrixLoc, projectionMatrix);
        }
    }, {
        key: 'loadViewMatrix',
        value: function loadViewMatrix(camera) {
            var viewMatrix = _math.Utils.createViewMatrix(camera);
            _get(BasicShader.prototype.__proto__ || Object.getPrototypeOf(BasicShader.prototype), 'loadMatrix', this).call(this, this.viewMatrixLoc, viewMatrix);
        }
    }]);

    return BasicShader;
}(_shaderprogram2.default);

exports.default = BasicShader;

},{"../shaders/basicShader":14,"./camera":4,"./math":8,"./shaderprogram":11}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require('./math');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
    function Camera() {
        _classCallCheck(this, Camera);

        this.position = new _math.Vec3(0, 0, 0);
        this.rotation = new _math.Vec3(0, 0, 0);
    }

    _createClass(Camera, [{
        key: 'move',
        value: function move(code) {
            if (code == 87) {
                this.position.z -= 0.01;
            }
            if (code == 83) {
                this.position.z += 0.01;
            }
            if (code == 68) {
                this.position.x += 0.01;
            }
            if (code == 65) {
                this.position.x -= 0.01;
            }
            if (code == 69) {
                this.position.y += 0.01;
            }
            if (code == 81) {
                this.position.y -= 0.01;
            }
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return this.position;
        }
    }, {
        key: 'getRotation',
        value: function getRotation() {
            return this.rotation;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

},{"./math":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basicShader = require('../shaders/basicShader');

var basicShader = _interopRequireWildcard(_basicShader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DisplayManager = function () {
    function DisplayManager() {
        _classCallCheck(this, DisplayManager);
    }

    _createClass(DisplayManager, [{
        key: 'createDisplay',
        value: function createDisplay(canvasId) {

            this.canvas = document.getElementById(canvasId);
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.gl = this.canvas.getContext('webgl2');
            return this.gl;
        }
    }, {
        key: 'updateDisplay',
        value: function updateDisplay(callback) {
            var _this = this;

            requestAnimationFrame(function () {
                callback();
                _this.updateDisplay(callback);
            });
        }
    }]);

    return DisplayManager;
}();

exports.default = DisplayManager;

},{"../shaders/basicShader":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texturedModel = require('./texturedModel');

var _texturedModel2 = _interopRequireDefault(_texturedModel);

var _math = require('./math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(texturedModel, position, rotation, scale) {
        _classCallCheck(this, Entity);

        this.texturedModel = texturedModel;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    _createClass(Entity, [{
        key: 'increasePosition',
        value: function increasePosition(v) {
            this.position.x += v.x;
            this.position.y += v.y;
            this.position.z += v.z;
        }
    }, {
        key: 'increaseRotation',
        value: function increaseRotation(v) {
            this.rotation.x += v.x;
            this.rotation.y += v.y;
            this.rotation.z += v.z;
        }
    }, {
        key: 'getTexturedModel',
        value: function getTexturedModel() {
            return this.texturedModel;
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return this.position;
        }
    }, {
        key: 'getRotation',
        value: function getRotation() {
            return this.rotation;
        }
    }, {
        key: 'getScale',
        value: function getScale() {
            return this.scale;
        }
    }]);

    return Entity;
}();

exports.default = Entity;

},{"./math":8,"./texturedModel":13}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _texture = require('./texture');

var _texture2 = _interopRequireDefault(_texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
    function Loader(gl) {
        _classCallCheck(this, Loader);

        this.gl = gl;
    }

    _createClass(Loader, [{
        key: 'loadToVAO',
        value: function loadToVAO(verticies, textCoords, indicies) {
            var vaoID = this.createVAO();
            this.storeDataInAttributeList(0, 3, verticies);
            this.storeDataInAttributeList(1, 2, textCoords);
            this.bindIndiciesBuffer(indicies);
            this.unbindVAO();
            return new _model2.default(vaoID, indicies.length);
        }
    }, {
        key: 'loadTexture',
        value: function loadTexture(fileName) {
            var _this = this;

            var textureId = this.gl.createTexture();
            var image = new Image();
            image.src = fileName;
            image.onload = function () {
                _this.gl.bindTexture(_this.gl.TEXTURE_2D, textureId);
                _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, image);
                _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.LINEAR);
                _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.LINEAR);
                _this.gl.generateMipmap(_this.gl.TEXTURE_2D, false);
                _this.gl.bindTexture(_this.gl.TEXTURE_2D, null);
            };
            return new _texture2.default(textureId);
        }
    }, {
        key: 'createVAO',
        value: function createVAO() {
            var vaoId = this.gl.createVertexArray();
            this.gl.bindVertexArray(vaoId);
            return vaoId;
        }
    }, {
        key: 'storeDataInAttributeList',
        value: function storeDataInAttributeList(attributeNumber, size, data) {
            var vboId = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboId);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(attributeNumber, size, this.gl.FLOAT, false, 0, 0);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        }
    }, {
        key: 'unbindVAO',
        value: function unbindVAO() {
            this.gl.bindVertexArray(null);
        }
    }, {
        key: 'bindIndiciesBuffer',
        value: function bindIndiciesBuffer(indicies) {
            var vboId = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, vboId);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indicies), this.gl.STATIC_DRAW);
        }
    }]);

    return Loader;
}();

exports.default = Loader;

},{"./model":9,"./texture":12}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Utils = exports.Mat4 = exports.Vec3 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camera = require('./camera');

var _camera2 = _interopRequireDefault(_camera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec3 = exports.Vec3 = function Vec3() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vec3);

    this.x = x;
    this.y = y;
    this.z = z;
};

var Mat4 = exports.Mat4 = function () {
    function Mat4() {
        var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var m03 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var m04 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var m05 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var m06 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        var m07 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
        var m08 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
        var m09 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
        var m10 = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
        var m11 = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
        var m12 = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
        var m13 = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
        var m14 = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
        var m15 = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;

        _classCallCheck(this, Mat4);

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

    _createClass(Mat4, [{
        key: 'identity',
        value: function identity() {
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
        }
    }, {
        key: 'translate',
        value: function translate(v) {
            var x = v.x,
                y = v.y,
                z = v.z;

            this.m12 = this.m00 * x + this.m04 * y + this.m08 * z + this.m12;
            this.m13 = this.m01 * x + this.m05 * y + this.m09 * z + this.m13;
            this.m14 = this.m02 * x + this.m06 * y + this.m10 * z + this.m14;
            this.m15 = this.m03 * x + this.m07 * y + this.m11 * z + this.m15;
        }
    }, {
        key: 'scale',
        value: function scale(v) {
            var x = v.x,
                y = v.y,
                z = v.z;

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
        }
    }, {
        key: 'rotateX',
        value: function rotateX(rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a10 = this.m04,
                a11 = this.m05,
                a12 = this.m06,
                a13 = this.m07,
                a20 = this.m08,
                a21 = this.m09,
                a22 = this.m10,
                a23 = this.m11;

            this.m04 = a10 * c + a20 * s;
            this.m05 = a11 * c + a21 * s;
            this.m06 = a12 * c + a22 * s;
            this.m07 = a13 * c + a23 * s;
            this.m08 = a20 * c - a10 * s;
            this.m09 = a21 * c - a11 * s;
            this.m10 = a22 * c - a12 * s;
            this.m11 = a23 * c - a13 * s;
        }
    }, {
        key: 'rotateY',
        value: function rotateY(rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = this.m00,
                a01 = this.m01,
                a02 = this.m02,
                a03 = this.m03,
                a20 = this.m08,
                a21 = this.m09,
                a22 = this.m10,
                a23 = this.m11;

            this.m00 = a00 * c - a20 * s;
            this.m01 = a01 * c - a21 * s;
            this.m02 = a02 * c - a22 * s;
            this.m03 = a03 * c - a23 * s;
            this.m08 = a00 * s + a20 * c;
            this.m09 = a01 * s + a21 * c;
            this.m10 = a02 * s + a22 * c;
            this.m11 = a03 * s + a23 * c;
        }
    }, {
        key: 'rotateZ',
        value: function rotateZ(rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = this.m00,
                a01 = this.m01,
                a02 = this.m02,
                a03 = this.m03,
                a10 = this.m04,
                a11 = this.m05,
                a12 = this.m06,
                a13 = this.m07;

            this.m00 = a00 * c + a10 * s;
            this.m01 = a01 * c + a11 * s;
            this.m02 = a02 * c + a12 * s;
            this.m03 = a03 * c + a13 * s;
            this.m04 = a10 * c - a00 * s;
            this.m05 = a11 * c - a01 * s;
            this.m06 = a12 * c - a02 * s;
            this.m07 = a13 * c - a03 * s;
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return new Float32Array([this.m00, this.m01, this.m02, this.m03, this.m04, this.m05, this.m06, this.m07, this.m08, this.m09, this.m10, this.m11, this.m12, this.m13, this.m14, this.m15]);
        }
    }]);

    return Mat4;
}();

var Utils = exports.Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'toRad',
        value: function toRad(deg) {
            return deg * Math.PI / 180;
        }
    }, {
        key: 'createModelMatrix',
        value: function createModelMatrix(t, r, s) {
            var matrix = new Mat4();
            matrix.identity();
            matrix.translate(t);
            matrix.rotateX(this.toRad(r.x));
            matrix.rotateY(this.toRad(r.y));
            matrix.rotateZ(this.toRad(r.z));
            matrix.scale(new Vec3(s, s, s));
            return matrix;
        }
    }, {
        key: 'createProjectionMatrix',
        value: function createProjectionMatrix(FOV, NEAR_PLANE, FAR_PLANE) {
            var aspectRatio = window.innerWidth / window.innerHeight;
            var yScale = 1 / Math.tan(this.toRad(FOV / 2)) * aspectRatio;
            var xScale = yScale / aspectRatio;
            var frustumLength = FAR_PLANE - NEAR_PLANE;

            var matrix = new Mat4();
            matrix.m00 = xScale;
            matrix.m05 = yScale;
            matrix.m10 = -((FAR_PLANE + NEAR_PLANE) / frustumLength);
            matrix.m11 = -1;
            matrix.m14 = -(2 * NEAR_PLANE * FAR_PLANE) / frustumLength;
            matrix.m15 = 0;
            return matrix;
        }
    }, {
        key: 'createViewMatrix',
        value: function createViewMatrix(camera) {
            var matrix = new Mat4();
            matrix.identity();
            matrix.rotateX(this.toRad(camera.getRotation().x));
            matrix.rotateY(this.toRad(camera.getRotation().x));
            var cameraPos = camera.getPosition();
            var invert = new Vec3(-cameraPos.x, -cameraPos.y, -cameraPos.z);
            matrix.translate(invert);
            return matrix;
        }
    }]);

    return Utils;
}();

},{"./camera":4}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model(vaoId, vertexCount) {
        _classCallCheck(this, Model);

        this.vaoId = vaoId;
        this.vertexCount = vertexCount;
    }

    _createClass(Model, [{
        key: "getVaoId",
        value: function getVaoId() {
            return this.vaoId;
        }
    }, {
        key: "getVertexCount",
        value: function getVertexCount() {
            return this.vertexCount;
        }
    }]);

    return Model;
}();

exports.default = Model;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _basicshader = require('./basicshader');

var _basicshader2 = _interopRequireDefault(_basicshader);

var _texturedModel = require('./texturedModel');

var _texturedModel2 = _interopRequireDefault(_texturedModel);

var _math = require('./math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
    function Renderer(gl, shader) {
        _classCallCheck(this, Renderer);

        this.gl = gl;
        var matrix = _math.Utils.createProjectionMatrix(90, 0, 1000);
        shader.start();
        shader.loadProjectionMatrix(matrix);
        shader.stop();
    }

    _createClass(Renderer, [{
        key: 'preRender',
        value: function preRender() {
            this.gl.enable(this.gl.CULL_FACE);
            this.gl.clearColor(0, 0, 0, 255);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }
    }, {
        key: 'render',
        value: function render(entity, shader) {

            var model = entity.getTexturedModel();
            this.gl.bindVertexArray(model.getModel().getVaoId());
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);

            var modelMatrix = _math.Utils.createModelMatrix(entity.getPosition(), entity.getRotation(), entity.getScale());

            shader.loadModelMatrix(modelMatrix);

            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, model.getTexture().getTextureId());
            this.gl.drawElements(this.gl.TRIANGLES, model.getModel().getVertexCount(), this.gl.UNSIGNED_INT, 0);
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
            this.gl.bindVertexArray(null);
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;

},{"./basicshader":3,"./entity":6,"./math":8,"./texturedModel":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basicShader = require('../shaders/basicShader');

var _math = require('./math');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShaderProgram = function () {
    function ShaderProgram(gl, vertexShader, fragmentShader) {
        _classCallCheck(this, ShaderProgram);

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

    _createClass(ShaderProgram, [{
        key: 'start',
        value: function start() {
            this.gl.useProgram(this.programId);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.gl.useProgram(null);
        }
    }, {
        key: 'bindAttributes',
        value: function bindAttributes() {/*child*/}
    }, {
        key: 'getUniformLocations',
        value: function getUniformLocations() {/*child*/}
    }, {
        key: 'loadFloat',
        value: function loadFloat(location, value) {
            this.gl.uniform1f(location, value);
        }
    }, {
        key: 'loadBool',
        value: function loadBool(location, value) {
            var load = 0;
            if (value) {
                load = 1;
            }
            this.gl.uniform1i(location, load);
        }
    }, {
        key: 'loadVector',
        value: function loadVector(location, vector) {
            this.gl.uniform3f(location, vector.x, vector.y, vector.z);
        }
    }, {
        key: 'loadMatrix',
        value: function loadMatrix(location, matrix) {
            this.gl.uniformMatrix4fv(location, false, matrix.toArray());
        }
    }, {
        key: 'getUniformLocation',
        value: function getUniformLocation(unifomrName) {
            return this.gl.getUniformLocation(this.programId, unifomrName);
        }
    }, {
        key: 'bindAttribute',
        value: function bindAttribute(attribute, attrName) {
            this.gl.bindAttribLocation(this.programId, attribute, attrName);
        }
    }, {
        key: 'loadShader',
        value: function loadShader(shaderSource, type) {
            var shaderId = this.gl.createShader(type);
            this.gl.shaderSource(shaderId, shaderSource);
            this.gl.compileShader(shaderId);
            if (!this.gl.getShaderParameter(shaderId, this.gl.COMPILE_STATUS)) {
                console.log('ERROR compiling shader!', this.gl.getShaderInfoLog(shaderId));
                return;
            }
            return shaderId;
        }
    }]);

    return ShaderProgram;
}();

exports.default = ShaderProgram;

},{"../shaders/basicShader":14,"./math":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function () {
    function Texture(textureId) {
        _classCallCheck(this, Texture);

        this.textureId = textureId;
    }

    _createClass(Texture, [{
        key: "getTextureId",
        value: function getTextureId() {
            return this.textureId;
        }
    }]);

    return Texture;
}();

exports.default = Texture;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _texture = require('./texture');

var _texture2 = _interopRequireDefault(_texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TexturedModel = function () {
    function TexturedModel(model, texture) {
        _classCallCheck(this, TexturedModel);

        this.model = model;
        this.texture = texture;
    }

    _createClass(TexturedModel, [{
        key: 'getModel',
        value: function getModel() {
            return this.model;
        }
    }, {
        key: 'getTexture',
        value: function getTexture() {
            return this.texture;
        }
    }]);

    return TexturedModel;
}();

exports.default = TexturedModel;

},{"./model":9,"./texture":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var vertexShader = exports.vertexShader = "#version 300 es\n\nprecision highp float;\n\nin vec3 position;\n\nin vec2 textureCoords;\n\nuniform mat4 modelMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\n\nout vec2 passedTextureCoords;\n\nvoid main(){\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0f);\n    passedTextureCoords = textureCoords;\n} \n";

var fragmentShader = exports.fragmentShader = "#version 300 es\n\nprecision highp float;\n\nin vec2 passedTextureCoords;\n\nuniform sampler2D textureSampler;\n\nout vec4 out_Color;\n\nvoid main() {\n    out_Color = texture(textureSampler, passedTextureCoords);\n}";

},{}]},{},[1]);
