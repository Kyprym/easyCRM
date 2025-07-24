import express from 'express';
import bodyParser from 'body-parser'
import { dbConfig } from './dbConfig';
import { getASNrelayStatusesTable, getASNStatusesTable, getCardMakingStateTable, getChunckContragent, getContragentID, getEventActionTypes, getEventsStatuses, getFirmsTable, getIssueCalendarEventsTable, getIssueCommentsTable, getIssueHistoryStatuses, getIssueHistoryTable, getIssues, getIssueTable, getIssueWorksStatus, getPayStatusesTable, getProcurementStatusesTable, getProductionStatusTable, getSKIZItatusesTable, getUsers, getUsersLogPassArrFromDB, User } from './getDataFromDB';
import { putContrAgentInIssue, addIssueEvent, putIssueFirm, putIssuePaymentStatus, putIssueProductionStatus, putIssueTheme, putWorkStatus, changeIssueEvent, addNewComment, putIssueASNStatus, putIssueASNSrlaytatus, putIssueSKZIstatus, putIssuechangeProcurementStatus, putIssuechangeCardMakingStatus, putIssuechangeCity, putIssuechangeAddress, putIssuechangeMilage, putIssuechangeDaysToWork, putIssueInstallersCount, putIssueDescription, addIssueHistoryEvent } from './putDataInDB';
import { correctDate, DBtokensList, getSessionToken, sessionTockenVerification, tockenVerification } from './modules/supportFuncs';


const app = express();
const port:number = 4000;
const frontServer:string = 'http://localhost:5173'

const today = new Date()
const mounth:number = today.getMonth() + 1
const dateTimeCreate = `${today.getFullYear()}-${correctDate(mounth)}-${correctDate(today.getDate())} ${today.getHours()}:${today.getMinutes()}:00`

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
  const sessionToken:string = await getSessionToken(userID, DBtokensList)
  const response:object = {
    id:userID,
    accessToken:authToken,
    sessionToken:sessionToken,
  }

  res.json(response)
});

app.get('/api/issues',async (req,res)=>{
  const issues = await getIssues(dbConfig)
  res.json(issues)
})


app.get('/api/issues/:id', async (req,res)=>{
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
  const histoRyStatuses = await getIssueHistoryStatuses(dbConfig)
  const issueTableStr = JSON.stringify(issueTable)
  const issueTableJSON = await JSON.parse(issueTableStr)
  const defaultContrAgent = issueTableJSON[0].contragent
  const contragent = await getContragentID(dbConfig, defaultContrAgent)
  const issueHistory = await getIssueHistoryTable(dbConfig, issueID)

  issueTableJSON[0].contragent = contragent
  const reqObject = await {
    issueData:issueTableJSON,
    issueEvents:issueCalendarEventsTable,
    issueComments:issueCommentsTable,
    issueHistory:issueHistory,
    productionStatuses:productionStatusesTable,
    workStatus: issueWorkStatus,
    firmsList: firms,
    payStatusesList: payStatuses,
    users: users,
    ASNStatuses:ASNstatuses,
    ASNrelayStatuses:ASNrelayStatuses,
    SKZIstatuses:SKZIstatuses,
    procurementStatuses:procurementStatuses,
    cardMakingStatuses:cardMakingStatuses,
    histoRyStatuses:histoRyStatuses,
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
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)

  const newProductionStatus = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  putIssueProductionStatus(dbConfig, issueID, newProductionStatus, issueKeyID)
  addIssueHistoryEvent(dbConfig, issueID, 5, dateTimeCreate, userID)
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
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)

  putContrAgentInIssue(dbConfig, issueID, contragentID)
  addIssueHistoryEvent(dbConfig, issueID, 19, dateTimeCreate, userID )
})

app.put('/api/issues/:id/changeASNStatus',async (req,res)=>{
  const issueID  = await req.params.id
  const newASNStatus = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 9, dateTimeCreate, userID )
  putIssueASNStatus(dbConfig, issueID, newASNStatus, issueKeyID)
})

app.put('/api/issues/:id/changeASNrelayStatus',async (req,res)=>{
  const issueID  = await req.params.id
  const ASNrelay = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 10, dateTimeCreate, userID )
  putIssueASNSrlaytatus(dbConfig, issueID, ASNrelay, issueKeyID)
})

app.put('/api/issues/:id/changeSKZIstatus',async (req,res)=>{
  const issueID  = await req.params.id
  const skziState = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 11, dateTimeCreate, userID )
  putIssueSKZIstatus(dbConfig, issueID, skziState, issueKeyID)
})

app.put('/api/issues/:id/changeProcurementState',async (req,res)=>{
  const issueID  = await req.params.id
  const ProcurementState = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 12, dateTimeCreate, userID )
  putIssuechangeProcurementStatus(dbConfig, issueID, ProcurementState, issueKeyID)
})

app.put('/api/issues/:id/putIssueTheme',async (req,res)=>{
  const issueID  = await req.params.id
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)

  const issueKeyID = await req.body.issueKeyID
  const newThemeText = await req.body.newThemeText
  putIssueTheme(dbConfig,issueKeyID,issueID, newThemeText)
  addIssueHistoryEvent(dbConfig, issueID, 20, dateTimeCreate, userID)
})

app.put('/api/issues/:id/putIssueFirm', async (req, res)=>{
  const issueID  = await req.params.id
  const issueKeyID = await req.body.issueKeyID
  const newFirmID = await req.body.newFirmID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 7, dateTimeCreate, userID )
  putIssueFirm(dbConfig, issueKeyID, issueID, newFirmID)
})

app.put('/api/issues/:id/changeIssuePayStatus', async (req, res)=>{
  const issueID  = await req.params.id
  const status = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  putIssuePaymentStatus(dbConfig, issueID, status, issueKeyID)
  addIssueHistoryEvent(dbConfig, issueID, 8, dateTimeCreate, userID )
})

app.put('/api/issues/:id/changeCardMakingStatus', async (req, res)=>{
  const issueID  = await req.params.id
  const status = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 21, dateTimeCreate, userID )
  putIssuechangeCardMakingStatus(dbConfig, issueID, status, issueKeyID)
})

app.put('/api/issues/:id/changeCityInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const city = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 13, dateTimeCreate, userID )
  putIssuechangeCity(dbConfig, issueID, city, issueKeyID)
})

app.put('/api/issues/:id/changeAddressInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const address = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 14, dateTimeCreate, userID )
  putIssuechangeAddress(dbConfig, issueID, address, issueKeyID)
})

app.put('/api/issues/:id/changeMilageInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const milage = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 15, dateTimeCreate, userID )
  putIssuechangeMilage(dbConfig, issueID, milage, issueKeyID)
})

app.put('/api/issues/:id/changedaysToWorkInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const days = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 16, dateTimeCreate, userID )
  putIssuechangeDaysToWork(dbConfig, issueID, days, issueKeyID)
})

app.put('/api/issues/:id/changeInstallersCountInIssue', async (req, res)=>{
  const issueID  = await req.params.id
  const installerCount = await req.body.status
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 17, dateTimeCreate, userID )
  putIssueInstallersCount(dbConfig, issueID, installerCount, issueKeyID)
})

app.put('/api/issues/:id/changeDescription', async (req, res)=>{
  const issueID  = await req.params.id
  const description = await req.body.newDescription
  const issueKeyID = await req.body.issueKeyID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  addIssueHistoryEvent(dbConfig, issueID, 18, dateTimeCreate, userID )
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
  
  const request = await req.body
  const issueID = request.issueID
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)

  const eventData = {
    userResponsible:request.responsibleUser,
    eventDataTime: `${today.getFullYear()}-${correctDate(mounth)}-${correctDate(today.getDate())} ${today.getHours()}:${today.getMinutes()}:00`,
    userCreator:Number(userID),
    dateTimeCreate:dateTimeCreate,
    eventText:request.eventText,
    state: request.state,
    dateTimeStart:`${request.startDate} ${request.startTime}:00`,
    dateTimeFinish:`${request.finishDate} ${request.finishTime}:00`,
    actionType: request.actionType
  }
  addIssueEvent(dbConfig, issueID, eventData)
  addIssueHistoryEvent(dbConfig, issueID, 2, dateTimeCreate, userID )
})

app.put("/api/updateIssueEvent", async (req, res)=>{
  const body = await req.body
  const issueID = body.issueID
 
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)

  const eventData = await {
    userCreator:userID,
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
  addIssueHistoryEvent(dbConfig, issueID, 3, dateTimeCreate, userID )
})
app.put('/api/createCommentInIssue', async(req, res)=>{
  const body = await req.body
  const sessionToken:string = await String(req.headers['authorization'])
  const UsersTokenList= await DBtokensList
  const userCreaterID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  const userID =  await sessionTockenVerification(UsersTokenList, sessionToken)
  
  const commentData = {
    issueID:body.issueID,
    commentText:body.commentText,
    userID: userCreaterID,
    today: body.today,
  }
  const issueID = commentData.issueID
  addNewComment(dbConfig, issueID, commentData)
  
  addIssueHistoryEvent(dbConfig, issueID, 4, dateTimeCreate, userID )
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



