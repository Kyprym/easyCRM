import { IssueCalendarEventsList } from "./issueCalendarEventsComponents/issueCalendarEventsList"
import { IssueCommentsList } from "./issueCommentsComponents/issueCommentsList"
import { useSelector } from "react-redux"
import { ChangeFirmSelector } from "./issueFunctionalChildCompanents/changeFirmSelector"
import { StatusSelector } from "./issueFunctionalChildCompanents/statusSelector"
import { Box, Button, Modal } from "@mui/material"
import { createNewComment } from "../../DB/issueHTTPmethods"
import { API_URL } from "../../DB/DBconfig"
import { useState } from "react"
import { eventModalWindowStyle } from "./issueCalendarEventsComponents/createEventCompanent"
import { today } from "./modules/issueFunctionalFuncs"

const keyFieldsStyle:object = {marginLeft:"1rem",marginTop:'1rem'}
const informationCompanentsStyles:{backgroundColor:string} = {
    backgroundColor:'#e3e2e1'
}

export const IssueInformationCompanent = ({issueID}:{issueID:string})=>{
    const issueDataFromStore = useSelector((state:any) => state.issue.issue)
    const { issueData, issueEvents, issueComments, firmsList, payStatusesList } = issueDataFromStore;
    const number: number = issueData[0].number
    const issueKeyID:string = issueData[0].id
    const firm:number = issueData[0].firm
    const paymentStatus:number = issueData[0].paymentStatus
    const calendarEvents:object[] = issueEvents
    const comments:object[] = issueComments
    const [newCommentWindowState, setNewCommentWindowState] = useState<boolean>(false)
    const [newCommentText, setNewCommentText] = useState<string>('')
    const [saveCommentButtonState, setSaveCommentButtonState] = useState<boolean>(false)
    const now = `${today.date} ${today.time}`


    const closeCreateCommentWindow = ():void=>{
        setNewCommentWindowState(false)
         window.location.reload()
    }



    return (
        <div>
            <div 
                style={{
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr",
                    columnGap:"1rem"
                }}
            >

            <div style={{
                backgroundColor:informationCompanentsStyles.backgroundColor}}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                fontSize:'1.2rem'
            }}>
                <div style={{margin:"1rem", fontSize:"1.5rem"}}>Ключевые поля</div>
                <div style={keyFieldsStyle}> <span style={{fontWeight:"bold"}}>Счет №</span> {number}</div>

                <div style={keyFieldsStyle}>
                    <span style={{fontWeight:"bold"}}>Фирма</span> 
                    <ChangeFirmSelector
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        firm={firm}
                        firmsList={firmsList}
                    />
                </div> 
                
                <div style={keyFieldsStyle}>
                     <StatusSelector
                        selectorName={"Статус оплаты"}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={paymentStatus}
                        statusTextArr={payStatusesList}
                        link={'changeIssuePayStatus'}
                        actionType={'ASYNC_CHANGE_PAY_STATUS'}
                     />
                    </div>
            </div>
            </div>

            <div 
                style={{
                    display:"flex",
                    flexDirection:"column",
                }}
            >
                <div style={informationCompanentsStyles}>
                    <IssueCalendarEventsList
                        events={calendarEvents}
                        issueID={Number(issueID)}
                    />
                </div>

                <div style={informationCompanentsStyles}>

            <hr></hr>

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div style={{margin:"1rem", fontSize:"1.5rem"}}>Комментарии</div>
                <div style={{marginTop:"1rem", marginRight:"1rem"}}>
                    <Button 
                        variant="contained"
                        onClick={()=>setNewCommentWindowState(true)}
                    >Добавить комментарий</Button>
                </div>

                <Modal
                    open={newCommentWindowState}
                    onClose={closeCreateCommentWindow}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={eventModalWindowStyle}>
                    <span style={{fontSize:"1.5em"}}> Добавить комментарий</span>
                    <textarea 
                        value={newCommentText}
                        style={{
                            maxWidth:eventModalWindowStyle.width,
                            width:eventModalWindowStyle.width,
                            height:"10rem",
                            marginTop:"0.5rem",
                            fontSize:"1.2rem"    
                        }}
                        onChange={(e)=>{
                            setNewCommentText(e.target.value)
                            if(newCommentText.length > 1){
                                setSaveCommentButtonState(true)
                            }else{
                                setSaveCommentButtonState(false)
                            }
                        }}
                        ></textarea>

                    <span>
                        {   
                            saveCommentButtonState?
                                <Button 
                                    sx={{marginLeft:"0.5rem", marginTop:"0.5rem"}} 
                                    variant="contained"
                                    onClick={()=>{
                                        closeCreateCommentWindow()
                                        createNewComment(API_URL, {issueID:issueID, commentText:newCommentText, today:now, userID:1}) // после выполнения авторизации, необходимо будет изменить userID
                                    }}
                                    >Сохранить
                                </Button>:
                            <></>
                        }
                        <Button
                            sx={{marginLeft:"0.5rem", marginTop:"0.5rem"}}
                            variant="outlined"
                            onClick={closeCreateCommentWindow}
                            >Отмена
                        </Button>
                    </span>


                    </Box>
                </Modal>

            </div>

                <IssueCommentsList
                    comments={comments}
                />
                </div>
            </div>
            </div>
        </div>
    )
}