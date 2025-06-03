"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putWorkStatus = exports.putIssueProductionStatus = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const putIssueProductionStatus = (config, issueID, status, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute(`UPDATE crmstorage.issue_${issueID} SET production = '${status}' WHERE (id = '${id}');
`);
        yield connection.end();
        if (rows.length > 0) {
            return rows;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.putIssueProductionStatus = putIssueProductionStatus;
const putWorkStatus = (config, issueID, status, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute(`UPDATE crmstorage.issue_${issueID} SET state = '${status}' WHERE (id = '${id}');
`);
        yield connection.end();
        if (rows.length > 0) {
            return rows;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.putWorkStatus = putWorkStatus;
