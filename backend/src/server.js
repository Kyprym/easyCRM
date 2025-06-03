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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConfig_1 = require("./dbConfig");
const getDataFromDB_1 = require("./getDataFromDB");
const putDataInDB_1 = require("./putDataInDB");
const app = (0, express_1.default)();
const port = 4000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Разрешить конкретный источник для разработки
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, getDataFromDB_1.getUsersLogPassArrFromDB)(dbConfig_1.dbConfig);
    res.send(result);
}));
app.post('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, getDataFromDB_1.getUsersLogPassArrFromDB)(dbConfig_1.dbConfig);
    res.send(result);
}));
app.get('/api/issues', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const issues = yield (0, getDataFromDB_1.getIssues)(dbConfig_1.dbConfig);
    res.json(issues);
}));
app.get('/api/issues/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const issueID = req.params.id;
    const issueTable = yield (0, getDataFromDB_1.getIssueTable)(dbConfig_1.dbConfig, issueID);
    const issueCalendarEventsTable = yield (0, getDataFromDB_1.getIssueCalendarEventsTable)(dbConfig_1.dbConfig, issueID);
    const issueCommentsTable = yield (0, getDataFromDB_1.getIssueCommentsTable)(dbConfig_1.dbConfig, issueID);
    const productionStatusesTable = yield (0, getDataFromDB_1.getProductionStatusTable)(dbConfig_1.dbConfig);
    const issueWorkStatus = yield (0, getDataFromDB_1.getIssueWorksStatus)(dbConfig_1.dbConfig);
    const firms = yield (0, getDataFromDB_1.getFirmsTable)(dbConfig_1.dbConfig);
    const payStatuses = yield (0, getDataFromDB_1.getPayStatusesTable)(dbConfig_1.dbConfig);
    const issueTableStr = JSON.stringify(issueTable);
    const issueTableJSON = yield JSON.parse(issueTableStr);
    const defaultContrAgent = issueTableJSON[0].contragent;
    const contragent = yield (0, getDataFromDB_1.getContragentID)(dbConfig_1.dbConfig, defaultContrAgent);
    issueTableJSON[0].contragent = contragent;
    const reqObject = yield {
        issueData: issueTableJSON,
        issueEvents: issueCalendarEventsTable,
        issueComments: issueCommentsTable,
        productionStatuses: productionStatusesTable,
        workStatus: issueWorkStatus,
        firmsList: firms,
        payStatusesList: payStatuses
    };
    res.json(reqObject);
}));
app.put('/api/issues/:id/productionStatus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const issueID = yield req.params.id;
    const newProductionStatus = yield req.body.status;
    const issueKeyID = yield req.body.issueKeyID;
    (0, putDataInDB_1.putIssueProductionStatus)(dbConfig_1.dbConfig, issueID, newProductionStatus, issueKeyID);
}));
app.put('/api/issues/:id/workStatus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const issueID = yield req.params.id;
    const newSWorkStatus = yield req.body.status;
    const issueKeyID = yield req.body.issueKeyID;
    (0, putDataInDB_1.putWorkStatus)(dbConfig_1.dbConfig, issueID, newSWorkStatus, issueKeyID);
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
