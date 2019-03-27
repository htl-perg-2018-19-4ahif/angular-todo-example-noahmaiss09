"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var cors = require("@koa/cors");
var http_status_codes_1 = require("http-status-codes");
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var Router = require("koa-router");
var people = [{ name: 'Adam' }, { name: 'Eve' }];
var todos = [];
var lastId = 0;
var router = new Router();
router.get('/api/people', function (context) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Return people
        context.body = people;
        return [2 /*return*/];
    });
}); });
router.get('/api/todos', function (context) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Return todo items
        context.body = todos;
        return [2 /*return*/];
    });
}); });
router.get('/api/todos/:id', function (context) { return __awaiter(_this, void 0, void 0, function () {
    var todoItem;
    return __generator(this, function (_a) {
        todoItem = todos.find(function (i) { return i.id == context.params.id; });
        if (!todoItem) {
            context.status = http_status_codes_1.NOT_FOUND;
        }
        else {
            context.body = todoItem;
        }
        return [2 /*return*/];
    });
}); });
router.post('/api/todos', function (context) { return __awaiter(_this, void 0, void 0, function () {
    var body, newItem;
    return __generator(this, function (_a) {
        body = context.request.body;
        if (!body.description) {
            // description field is mandatory
            context.status = http_status_codes_1.BAD_REQUEST;
            context.body = { description: 'Missing description' };
            return [2 /*return*/];
        }
        newItem = { id: lastId++, description: body.description };
        // Check if assigned-to person exists
        if (body.assignedTo) {
            if (people.find(function (p) { return p.name === body.assignedTo; })) {
                newItem.assignedTo = body.assignedTo;
            }
            else {
                context.status = http_status_codes_1.NOT_FOUND;
                context.body = { description: 'Unknown person' };
                return [2 /*return*/];
            }
        }
        todos.push(newItem);
        context.set('location', "/api/todos/" + newItem.id);
        context.status = http_status_codes_1.CREATED;
        context.body = newItem;
        return [2 /*return*/];
    });
}); });
router.patch('/api/todos/:id', function (context) { return __awaiter(_this, void 0, void 0, function () {
    var todoItem, body;
    return __generator(this, function (_a) {
        todoItem = todos.find(function (i) { return i.id == context.params.id; });
        if (!todoItem) {
            context.status = http_status_codes_1.NOT_FOUND;
            return [2 /*return*/];
        }
        body = context.request.body;
        // Update description if specified
        if (body.description) {
            todoItem.description = body.description;
        }
        // Update done if specified
        if (body.done === true || body.done === false) {
            todoItem.done = body.done;
        }
        // Update assigned-to if specified
        if (body.assignedTo) {
            // Check if assigned-to person exists
            if (people.find(function (p) { return p.name === body.assignedTo; })) {
                todoItem.assignedTo = body.assignedTo;
            }
            else {
                context.status = http_status_codes_1.NOT_FOUND;
                context.body = { description: 'Unknown person' };
                return [2 /*return*/];
            }
        }
        context.body = todoItem;
        return [2 /*return*/];
    });
}); });
router["delete"]('/api/todos/:id', function (context) { return __awaiter(_this, void 0, void 0, function () {
    var todoItemIndex;
    return __generator(this, function (_a) {
        todoItemIndex = todos.findIndex(function (i) { return i.id == context.params.id; });
        if (todoItemIndex === (-1)) {
            context.status = http_status_codes_1.NOT_FOUND;
            return [2 /*return*/];
        }
        todos.splice(todoItemIndex, 1);
        context.status = http_status_codes_1.NO_CONTENT;
        return [2 /*return*/];
    });
}); });
var app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.listen(8080);
