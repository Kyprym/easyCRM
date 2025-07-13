import express from 'express';
import bodyParser from 'body-parser'
import { dbConfig } from './dbConfig';
import { getASNrelayStatusesTable, getASNStatusesTable, getCardMakingStateTable, getChunckContragent, getContragentID, getEventActionTypes, getEventsStatuses, getFirmsTable, getIssueCalendarEventsTable, getIssueCommentsTable, getIssues, getIssueTable, getIssueWorksStatus, getPayStatusesTable, getProcurementStatusesTable, getProductionStatusTable, getSKIZItatusesTable, getUsers, getUsersLogPassArrFromDB, User } from './getDataFromDB';
import { putContrAgentInIssue, addIssueEvent, putIssueFirm, putIssuePaymentStatus, putIssueProductionStatus, putIssueTheme, putWorkStatus, changeIssueEvent, addNewComment, putIssueASNStatus, putIssueASNSrlaytatus, putIssueSKZIstatus, putIssuechangeProcurementStatus, putIssuechangeCardMakingStatus, putIssuechangeCity, putIssuechangeAddress, putIssuechangeMilage, putIssuechangeDaysToWork, putIssueInstallersCount, putIssueDescription } from './putDataInDB';
import { correctDate, tockenVerification } from './modules/supportFuncs';


const app = express();
const port:number = 4000;
const frontServer:string = 'http://localhost:5173'


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', frontServer); // Разрешить конкретный источник для разработки
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api', async (req, res) => {
  const result = await getUsersLogPassArrFromDB(dbConfig)
  res.send(result)
});


app.post('/api/auth', async (req, res) => {
  const authToken:string = await String(req.headers['authorization'])
  const logPassList = await getUsersLogPassArrFromDB(dbConfig)
  const userID = await tockenVerification(logPassList, authToken)
  const response:object = {
    id:userID,
    accessToken:authToken
  }

  res.json(response)
});

/*
app.post('/api', async (req, res) => {
  const result = await getUsersLogPassArrFromDB(dbConfig)
  res.send(result)
});
*/
app.get('/api/issues',async (req,res)=>{
  const issues = await getIssues(dbConfig)
  res.json(issues)
})


app.get('/api/issues/:id', async (req,res)=>{
  const authToken:string = await String(req.headers['authorization'])
  const logPassList = await getUsersLogPassArrFromDB(dbConfig)
  const userID = await tockenVerification(logPassList, authToken)

  const issueID:string = req.params.id
  const issueTable = await getIssueTable(dbConfig,issueID)
  const issueCalendarEventsTable = await getIssueCalendarEventsTable(dbConfig, issueID)
  const issueCommentsTable = await getIssueCommentsTable(dbConfig, issueID)
  const productionStatusesTable = await getProductionStatusTable(dbConfig)
  const issueWorkStatus = await getIssueWorksStatus(dbConfig)
  const firms = await getFirmsTable(dbConfig)
  const payStatuses = await getPayStatusesTable(dbConfig)
  const users = await getUsers(dbConfig) 
  const ASNstatuses = await getASNStatusesTable(dbConfig)
  const ASNrelayStatuses = await getASNrelayStatusesTable(dbConfig)
  const SKZIstatuses = await getSKIZItatusesTable(dbConfig)
  const procurementStatuses = await getProcurementStatusesTable(dbConfig)
  const cardMakingStatuses = await getCardMakingStateTable(dbConfig)

  const issueTableStr = JSON.stringify(issueTable)
  const issueTableJSON = await JSON.parse(issueTableStr)
  const defaultContrAgent = issueTableJSON[0].contragent
  const contragent = await getContragentID(dbConfig, defaultContrAgent)
  

  issueTableJSON[0].contragent = contragent
  const reqObject = await {
    issueData:issueTableJSON,
    issueEvents:issueCalendarEventsTable,
    issueComments:issueCommentsTable,
    productionStatuses:productionStatusesTable,
    workStatus: issueWorkStatus,
    firmsList: firms,
    payStatusesList: payStatuses,
    users: users,
    ASNStatuses:ASNstatuses,
    ASNrelayStatuses:ASNrelayStatuses,
    SKZIstatuses:SKZIstatuses,
    procurementStatuses:procurementStatuses,
    cardMakingStatuses:cardMakingStatuses
  }
  res.json(reqObject)
})


app.put("/api/seachContragents", async (req, res)=>{
    const chunckContragentName = await req.body.chunkContragentName
    const contragent = await getChunckContragent(dbConfig, chunckContragentName)
    const contragentStr = JSON.stringify(contragent)
    const contragentJSON = JSON.parse(contragentStr)
    const reqObject = {
      contragentsArr:contragentJSON
    }
    res.json(reqObject)
})

app.put('/api/issues/:id/productionStatus',async (req,res)=>{
  const issueID  = await req.params.id
  const newProductionStatus = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssueProductionStatus(dbConfig, issueID, newProductionStatus, issueKeyID)
})

app.put('/api/issues/:id/workStatus',async (req,res)=>{
  const issueID  = await req.params.id
  const newSWorkStatus = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putWorkStatus(dbConfig, issueID, newSWorkStatus, issueKeyID)
})

app.put('/api/issues/:id/putContragentInIssue',async (req,res)=>{
  const issueID  = await req.params.id
  const contragentID = await req.body.contragentID
  putContrAgentInIssue(dbConfig, issueID, contragentID)
})

app.put('/api/issues/:id/changeASNStatus',async (req,res)=>{
  const issueID  = await req.params.id
  const newASNStatus = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssueASNStatus(dbConfig, issueID, newASNStatus, issueKeyID)
})

app.put('/api/issues/:id/changeASNrelayStatus',async (req,res)=>{
  const issueID  = await req.params.id
  const ASNrelay = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssueASNSrlaytatus(dbConfig, issueID, ASNrelay, issueKeyID)
})

app.put('/api/issues/:id/changeSKZIstatus',async (req,res)=>{
  const issueID  = await req.params.id
  const skziState = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssueSKZIstatus(dbConfig, issueID, skziState, issueKeyID)
})

app.put('/api/issues/:id/changeProcurementState',async (req,res)=>{
  const issueID  = await req.params.id
  const ProcurementState = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuechangeProcurementStatus(dbConfig, issueID, ProcurementState, issueKeyID)
})

app.put('/api/issues/:id/putIssueTheme',async (req,res)=>{
  const issueID  = await req.params.id
  const issueKeyID = await req.body.issueKeyID
  const newThemeText = await req.body.newThemeText
  putIssueTheme(dbConfig,issueKeyID,issueID, newThemeText)
})

app.put('/api/issues/:id/putIssueFirm', async (req, res)=>{
  const issueID  = await req.params.id
  const issueKeyID = await req.body.issueKeyID
  const newFirmID = await req.body.newFirmID
  putIssueFirm(dbConfig, issueKeyID, issueID, newFirmID)
})

app.put('/api/issues/:id/changeIssuePayStatus', async (req, res)=>{
  const issueID  = await req.params.id
  const status = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuePaymentStatus(dbConfig, issueID, status, issueKeyID)
})

app.put('/api/issues/:id/changeCardMakingStatus', async (req, res)=>{
  const issueID  = await req.params.id
  const status = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuechangeCardMakingStatus(dbConfig, issueID, status, issueKeyID)
})

app.put('/api/issues/:id/changeCityInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const city = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuechangeCity(dbConfig, issueID, city, issueKeyID)
})

app.put('/api/issues/:id/changeAddressInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const address = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuechangeAddress(dbConfig, issueID, address, issueKeyID)
})

app.put('/api/issues/:id/changeMilageInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const milage = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuechangeMilage(dbConfig, issueID, milage, issueKeyID)
})

app.put('/api/issues/:id/changedaysToWorkInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const days = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssuechangeDaysToWork(dbConfig, issueID, days, issueKeyID)
})

app.put('/api/issues/:id/changeInstallersCountInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const installerCount = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssueInstallersCount(dbConfig, issueID, installerCount, issueKeyID)
})

app.put('/api/issues/:id/changeDescription', async (req, res)=>{
  const issueID  = await req.params.id
  const description = await req.body.newDescription
  const issueKeyID = await req.body.issueKeyID
  putIssueDescription(dbConfig, issueID, description, issueKeyID)
})



app.get('/api/users',async (req,res)=>{
  const users = await getUsers(dbConfig)
  res.json(users)
})

app.get('/api/eventStatuses', async(req, res)=>{
  const eventStatuses = await getEventsStatuses(dbConfig)
  res.json(eventStatuses)
})

app.get('/api/eventActionTypes', async (req, res)=>{
  const eventActionTypes = await getEventActionTypes(dbConfig)
  res.json(eventActionTypes)
})

app.put('/api/createIssueEvent', async (req, res)=>{
  const today = new Date()
  const mounth:number = today.getMonth() + 1
  const request = await req.body
  const issueID = request.issueID
  const authToken:string =  String(req.headers['authorization'])
  const logPassList = await getUsersLogPassArrFromDB(dbConfig)
  const userID = await tockenVerification(logPassList, authToken)
console.log(userID)// ----------------------------------------------------------------------- передаётся 0 вместо id пользователя
  const eventData = {
    userResponsible:request.responsibleUser,
    eventDataTime: `${today.getFullYear()}-${correctDate(mounth)}-${correctDate(today.getDate())} ${today.getHours()}:${today.getMinutes()}:00`,
    userCreator:Number(userID), // сюда потом передам автора события, после релиза авторизации
    dateTimeCreate:`${today.getFullYear()}-${correctDate(mounth)}-${correctDate(today.getDate())} ${today.getHours()}:${today.getMinutes()}:00`,
    eventText:request.eventText,
    state: request.state,
    dateTimeStart:`${request.startDate} ${request.startTime}:00`,
    dateTimeFinish:`${request.finishDate} ${request.finishTime}:00`,
    actionType: request.actionType
  }
  addIssueEvent(dbConfig, issueID, eventData)
})

app.put("/api/updateIssueEvent", async (req, res)=>{
  const body = await req.body
  const issueID = body.issueID
 
  const eventData = await {
   eventID:body.eventID,
   eventText:body.eventText,
   actionType:body.actionType,
   dateStart:body.date_start,
   startTime:body.startTime,
   dateFinish:body.date_finish,
   finishTime:body.finishTime,
   responsibleUser:body.responsibleUser,
   status:body.status
  }
  changeIssueEvent(dbConfig, issueID, eventData)
})
app.put('/api/createCommentInIssue', async(req, res)=>{
  const body = await req.body
  const commentData = {
    issueID:body.issueID,
    commentText:body.commentText,
    userID: body.userID,
    today: body.today
  }
  addNewComment(dbConfig, commentData)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



