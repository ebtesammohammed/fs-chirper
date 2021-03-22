/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/config/index.ts":
/*!************************************!*\
  !*** ./src/server/config/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\nvar envFound = dotenv.config();\nif (!envFound) {\n    throw new Error('cannot find a .env file!');\n}\nexports.default = {\n    mysql: {\n        host: process.env.DB_HOST,\n        user: process.env.DB_USER,\n        password: process.env.DB_PASS,\n        database: process.env.DB_SCHEMA,\n    },\n    app: {\n        port: parseInt(process.env.PORT, 10),\n        prefix: process.env.API_PREFIX\n    }\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/config/index.ts?");

/***/ }),

/***/ "./src/server/db/index.ts":
/*!********************************!*\
  !*** ./src/server/db/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Query = void 0;\nvar mysql = __webpack_require__(/*! mysql */ \"mysql\");\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/server/config/index.ts\");\n//import logger from '../utils/logger';\nvar pool = mysql.createPool(config_1.default.mysql);\nvar Query = function (query, values) {\n    var sql = mysql.format(query, values);\n    //logger.silly('executing query:');\n    //logger.debug(sql);\n    return new Promise(function (resolve, reject) {\n        pool.query(sql, function (err, results) {\n            if (err) {\n                //\tlogger.silly('query failed');\n                reject(err);\n            }\n            else {\n                //\tlogger.silly('query executed');\n                resolve(results);\n            }\n        });\n    });\n};\nexports.Query = Query;\nvar chrips_1 = __webpack_require__(/*! ./queries/chrips */ \"./src/server/db/queries/chrips.ts\");\nvar user_1 = __webpack_require__(/*! ./queries/user */ \"./src/server/db/queries/user.ts\");\nexports.default = {\n    chrips: chrips_1.default,\n    users: user_1.default\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/index.ts?");

/***/ }),

/***/ "./src/server/db/queries/chrips.ts":
/*!*****************************************!*\
  !*** ./src/server/db/queries/chrips.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar __1 = __webpack_require__(/*! ../ */ \"./src/server/db/index.ts\");\nvar all = function () {\n    return __1.Query(\"\\n    SELECT\\n        chrips.*,\\n        users.name\\n    FROM chrips\\n    JOIN users ON users.id = chrips.userid\\n   \\n\");\n};\nvar one = function (id) {\n    return __1.Query(\"\\n    SELECT\\n        chrips.*,\\n        users.name\\n    FROM chrips\\n    JOIN users ON users.id = chrips.userid\\n    WHERE chrips.id = ?\\n\", [id]);\n};\nvar insert = function (userid, content) {\n    return __1.Query(\"INSERT INTO chrips (userid, content) VALUE (?)\", [[userid, content]]);\n};\nvar update = function (id, content) { return __1.Query(\"UPDATE chirps SET content = ? WHERE id = ?\", [content, id]); };\nvar destroy = function (id) { return __1.Query(\"DELETE FROM chrips WHERE id = ?\", [id]); };\nexports.default = {\n    all: all,\n    one: one,\n    insert: insert,\n    update: update,\n    destroy: destroy\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/queries/chrips.ts?");

/***/ }),

/***/ "./src/server/db/queries/user.ts":
/*!***************************************!*\
  !*** ./src/server/db/queries/user.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar __1 = __webpack_require__(/*! ../ */ \"./src/server/db/index.ts\");\nvar all = function () {\n    return __1.Query(\"\\n    SELECT\\n        id,\\n        name,\\n        email,\\n        created_at\\n    FROM users\\n\");\n};\nvar one = function (id) {\n    return __1.Query(\"\\n    SELECT\\n        *\\n    FROM users\\n    WHERE id = ?\\n\", [id]);\n};\nexports.default = {\n    all: all,\n    one: one\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/queries/user.ts?");

/***/ }),

/***/ "./src/server/routes/chrips.ts":
/*!*************************************!*\
  !*** ./src/server/routes/chrips.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar db_1 = __webpack_require__(/*! ../db */ \"./src/server/db/index.ts\");\n// import logger from '../utils/logger';\nvar router = express.Router();\n// GET /api/chirps/1 or GET /api/chirps\nrouter.get('/:id?', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, chrip, error_1, chirps, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = Number(req.params.id);\n                if (!id) return [3 /*break*/, 5];\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.chrips.one(id)];\n            case 2:\n                chrip = (_a.sent())[0];\n                res.json(chrip);\n                return [3 /*break*/, 4];\n            case 3:\n                error_1 = _a.sent();\n                //\tlogger.warn('get one chirp failed');\n                next(error_1);\n                return [3 /*break*/, 4];\n            case 4: return [3 /*break*/, 8];\n            case 5:\n                _a.trys.push([5, 7, , 8]);\n                return [4 /*yield*/, db_1.default.chrips.all()];\n            case 6:\n                chirps = _a.sent();\n                res.json(chirps);\n                return [3 /*break*/, 8];\n            case 7:\n                error_2 = _a.sent();\n                //logger.warn('get all chirps failed');\n                next(error_2);\n                return [3 /*break*/, 8];\n            case 8: return [2 /*return*/];\n        }\n    });\n}); });\n// POST /api/chirps/\nrouter.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var chirp, result, error_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                chirp = req.body;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.chrips.insert(chirp.userid, chirp.content)];\n            case 2:\n                result = _a.sent();\n                // sends { id: 1 } if it inserted chirp id 1\n                res.json({ id: result.insertId });\n                return [3 /*break*/, 4];\n            case 3:\n                error_3 = _a.sent();\n                //\tlogger.warn('post a chirp failed');\n                next(error_3);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT /api/chirps/1\nrouter.put('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, chirp, error_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = Number(req.params.id);\n                chirp = req.body;\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                //\tlogger.silly(`editing chirp id ${id}`);\n                return [4 /*yield*/, db_1.default.chrips.update(id, chirp.content)];\n            case 2:\n                //\tlogger.silly(`editing chirp id ${id}`);\n                _a.sent();\n                res.json({ msg: 'edited', id: id });\n                return [3 /*break*/, 4];\n            case 3:\n                error_4 = _a.sent();\n                //\tlogger.warn('edit a chirp failed');\n                next(error_4);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE /api/chirps/1\nrouter.delete('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, error_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = Number(req.params.id);\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                //\tlogger.silly(`deleting chirp id ${id}`);\n                return [4 /*yield*/, db_1.default.chrips.destroy(id)];\n            case 2:\n                //\tlogger.silly(`deleting chirp id ${id}`);\n                _a.sent();\n                res.json({ msg: 'destroyed' });\n                return [3 /*break*/, 4];\n            case 3:\n                error_5 = _a.sent();\n                //\tlogger.warn('delete a chirp failed');\n                next(error_5);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes/chrips.ts?");

/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar chrips_1 = __webpack_require__(/*! ./chrips */ \"./src/server/routes/chrips.ts\");\nvar user_1 = __webpack_require__(/*! ./user */ \"./src/server/routes/user.ts\");\nvar router = express.Router();\nrouter.use('/chrips', chrips_1.default);\nrouter.use('/users', user_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes/index.ts?");

/***/ }),

/***/ "./src/server/routes/user.ts":
/*!***********************************!*\
  !*** ./src/server/routes/user.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar db_1 = __webpack_require__(/*! ../db */ \"./src/server/db/index.ts\");\n// import logger from '../utils/logger';\nvar router = express.Router();\n// GET /api/users/1 or GET /api/users\nrouter.get('/:id?', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, user, error_1, users, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = Number(req.params.id);\n                if (!id) return [3 /*break*/, 5];\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, db_1.default.users.one(id)];\n            case 2:\n                user = (_a.sent())[0];\n                //DO NOT SEND A PASSWORD IN YOUR RESPONSE\n                delete user.password;\n                res.json(user);\n                return [3 /*break*/, 4];\n            case 3:\n                error_1 = _a.sent();\n                //logger.warn('get one user failed');\n                next(error_1);\n                return [3 /*break*/, 4];\n            case 4: return [3 /*break*/, 8];\n            case 5:\n                _a.trys.push([5, 7, , 8]);\n                return [4 /*yield*/, db_1.default.users.all()];\n            case 6:\n                users = _a.sent();\n                res.json(users);\n                return [3 /*break*/, 8];\n            case 7:\n                error_2 = _a.sent();\n                //\tlogger.warn('get all users failed');\n                next(error_2);\n                return [3 /*break*/, 8];\n            case 8: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes/user.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar cors = __webpack_require__(/*! cors */ \"cors\");\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\nvar compression = __webpack_require__(/*! compression */ \"compression\");\n//import logger, { stream } from './utils/logger';\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes/index.ts\");\nvar app = express();\n//server health checkpoints\napp.get('/status', function (req, res) { return res.status(200).end(); });\napp.head('/status', function (req, res) { return res.status(200).end(); });\n//shows real origin IP in heroku logs\napp.enable('trust proxy');\n//sauce for protection against common hacks\napp.use(helmet());\n//sauce for compressing req/res objects to be smaller in size\napp.use(compression());\napp.use(cors());\napp.use(express.static('public'));\n//take morgan logs and output them with winston\n//app.use(morgan('dev', { stream }));\napp.use(express.json());\napp.use(\"/api\", routes_1.default);\n//global error handler for the app\n//app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {\n//   logger.error(error);\n// res.status(error.status || 500);\n// res.json({ error: error.message });\n//});\n//sauce for front-end routes being caught by server\napp.get('*', function (req, res) { return res.sendFile(path.join(__dirname, '../public/index.html')); });\n//app.listen(parseInt(config.port), (err) => {\n//crash the node script if an error occurs\n//\tif (err) {\n//\t\tlogger.error(err);\n//\t\tprocess.exit(1);\n//\t}\n//\tlogger.info(`✌️ server listening on port: ${config.port} ✌️`);\n//});\napp.listen(3000, (function () { return console.log('server listening on port 3000'); }));\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/server.ts?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");;

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.ts");
/******/ 	
/******/ })()
;