import { IssueCalendarEventsList } from "./issueCalendarEventsComponents/issueCalendarEventsList"
import { IssueCommentsList } from "./issueCommentsComponents/issueCommentsList"
import { useSelector } from "react-redux"
import { ChangeFirmSelector } from "./issueFunctionalChildComponents/changeFirmSelector"
import { StatusSelector } from "./issueFunctionalChildComponents/statusSelector"
import { Box, Button, Modal } from "@mui/material"
import { createNewComment } from "../../DB/issueHTTPmethods"
import { API_URL } from "../../DB/DBconfig"
import { useState } from "react"
import { eventModalWindowStyle } from "./issueCalendarEventsComponents/createEventComponent"
import { today } from "./modules/issueFunctionalFuncs"
import { issueProps } from "./issuePage"
import { globalBackgroundTheme } from "../../App"

const keyFieldsStyle:object = {marginLeft:"1rem",marginTop:'1rem'}


export const IssueInformationComponent = ({ issueID }: issueProps)=>{
    const informationComponentsStyles:{backgroundColor:string} = {
    backgroundColor:globalBackgroundTheme
}
    const issueDataFromStore = useSelector((state:any) => state.issue.issue)
    const { issueData, issueEvents, issueComments, firmsList, payStatusesList } = issueDataFromStore;
    
    const issueKeyID:string = issueData[0].id
    const firm:number = issueData[0].firm
    const paymentStatus:number = issueData[0].paymentStatus
    const calendarEvents:object[] = issueEvents
    const comments:object[] = issueComments
    const [newCommentWindowState, setNewCommentWindowState] = useState<boolean>(false)
    const [newCommentText, setNewCommentText] = useState<string>('')
    const [saveCommentButtonState, setSaveCommentButtonState] = useState<boolean>(false)
    const now:string = `${today.date} ${today.time}`


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
                backgroundColor:informationComponentsStyles.backgroundColor}}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                fontSize:'1.2rem'
            }}>
                <div style={{margin:"1rem", fontSize:"1.5rem"}}>Ключевые поля</div>
                <div style={keyFieldsStyle}> <span style={{fontWeight:"bold"}}>Счет №</span> M{issueID}</div>

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
                <div style={informationComponentsStyles}>
                    <IssueCalendarEventsList
                        events={calendarEvents}
                        issueID={Number(issueID)}
                    />
                </div>

                <div style={informationComponentsStyles}>

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
                                        createNewComment(API_URL, {issueID:issueID, commentText:newCommentText, today:now})
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