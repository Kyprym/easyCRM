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
exports.getContragentID = exports.getPayStatusesTable = exports.getFirmsTable = exports.getIssueWorksStatus = exports.getProductionStatusTable = exports.getIssueCommentsTable = exports.getIssueCalendarEventsTable = exports.getIssueTable = exports.getIssues = exports.getUsersLogPassArrFromDB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const getUsersLogPassArrFromDB = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute('SELECT * FROM users');
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
exports.getUsersLogPassArrFromDB = getUsersLogPassArrFromDB;
const getIssues = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute('SELECT * FROM issues');
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
exports.getIssues = getIssues;
const getIssueTable = (config, issueID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute(`SELECT * FROM issue_${issueID}`);
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
exports.getIssueTable = getIssueTable;
const getIssueCalendarEventsTable = (config, issueID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute(`SELECT * FROM issueevents_${issueID} ORDER BY id DESC`);
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
exports.getIssueCalendarEventsTable = getIssueCalendarEventsTable;
const getIssueCommentsTable = (config, issueID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute(`SELECT * FROM issuecomments_${issueID} ORDER BY id DESC`);
        yield connection.end();
        if (rows.length >= 0) {
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
exports.getIssueCommentsTable = getIssueCommentsTable;
const getProductionStatusTable = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute("SELECT * from productionstatus");
        yield connection.end();
        if (rows.length >= 0) {
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
exports.getProductionStatusTable = getProductionStatusTable;
const getIssueWorksStatus = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute("SELECT * from issueworksstatus");
        yield connection.end();
        if (rows.length >= 0) {
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
exports.getIssueWorksStatus = getIssueWorksStatus;
const getFirmsTable = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute("SELECT * from firms");
        yield connection.end();
        if (rows.length >= 0) {
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
exports.getFirmsTable = getFirmsTable;
const getPayStatusesTable = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute("SELECT * from payStatuses");
        yield connection.end();
        if (rows.length >= 0) {
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
exports.getPayStatusesTable = getPayStatusesTable;
const getContragentID = (config, contragentID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(config);
        const [rows] = yield connection.execute(`select name from contragents where id = ${contragentID}`);
        yield connection.end();
        if (rows.length >= 0) {
            return rows[0].name;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.getContragentID = getContragentID;
