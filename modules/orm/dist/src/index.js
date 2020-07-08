"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.superCreateConnection = exports.a = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var ormConfig = require("../ormconfig");
var User_1 = require("./entity/User");
__exportStar(require("typeorm"), exports);
__exportStar(require("./entity/User"), exports);
exports.a = 3;
function superCreateConnection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (connection)
                        return [2 /*return*/, connection];
                    return [4 /*yield*/, getOptions()];
                case 1:
                    connOpts = _a.sent();
                    return [4 /*yield*/, typeorm_1.createConnection(connOpts)];
                case 2:
                    connection = _a.sent();
                    return [2 /*return*/, connection];
            }
        });
    });
}
exports.superCreateConnection = superCreateConnection;
// Doesn't work
// const connectionOptionsReader = new ConnectionOptionsReader({
//   root: path.join(path.dirname(require.resolve('orm')), '..')
// })
var connOpts;
var connection;
function getOptions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (connOpts)
                return [2 /*return*/, connOpts];
            connOpts = __assign(__assign({}, ormConfig), { entities: [User_1.User] });
            return [2 /*return*/, connOpts];
        });
    });
}
// export async function superConnection() {
//   try {
//     const conn = await getConnection()
//     if (conn) return conn
//   } catch (error) {
//     const newConn = await superCreateConnection()
//     return newConn
//   }
// }
// export async function ensureConnection(name: string = 'default'): Promise<Connection> {
//   const connectionManager = getConnectionManager()
//   const connOpts = await getOptions()
//   if (connectionManager.has(name)) {
//     const connection = connectionManager.get(name)
//     if (process.env.NODE_ENV !== 'production') {
//       await updateConnectionEntities(connection, connOpts.entities)
//     }
//     return connection
//   }
//   return await connectionManager.create({ name, ...connOpts }).connect()
// }
// function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
//   if (prevEntities.length !== newEntities.length) return true
//   for (let i = 0; i < prevEntities.length; i++) {
//     if (prevEntities[i] !== newEntities[i]) return true
//   }
//   return false
// }
// async function updateConnectionEntities(connection: Connection, entities: any[]) {
//   if (!entitiesChanged(connection.options.entities, entities)) return
//   // @ts-ignore
//   connection.options.entities = entities
//   // @ts-ignore
//   connection.buildMetadatas()
//   if (connection.options.synchronize) {
//     await connection.synchronize()
//   }
// }
//# sourceMappingURL=index.js.map