import { useSelector } from "react-redux"
import { IssueCommentsList } from "./issueCommentsComponents/issueCommentsList"
import { issueProps } from "./issuePage"
import { useState } from "react"
import { today } from "./modules/issueFunctionalFuncs"
import { Box, Button, Modal } from "@mui/material"
import { eventModalWindowStyle } from "./issueCalendarEventsComponents/createEventComponent"
import { createNewComment } from "../../DB/issueHTTPmethods"
import { API_URL } from "../../DB/DBconfig"
import { globalBackgroundTheme } from "../../App"

export const IssueCommentsTabComponent = ({issueID}:issueProps) => {
    const commentsList:[] = useSelector(state=>state.issue.issue.issueComments)
    const [newCommentWindowState, setNewCommentWindowState] = useState<boolean>(false)
    const [newCommentText, setNewCommentText] = useState<string>('')
    const [saveCommentButtonState, setSaveCommentButtonState] = useState<boolean>(false)
    const now:string = `${today.date} ${today.time}`

    const closeCreateCommentWindow = ():void=>{
        setNewCommentWindowState(false)
         window.location.reload()
    }
    
    return(<div style={{backgroundColor:globalBackgroundTheme}}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{marginTop:"1rem", marginRight:"1rem"}}>
                            <Button
                                variant="contained" 
                                color="success"
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
        <div style={{marginTop:"1rem", marginRight:"1rem"}}>
            <IssueCommentsList comments={commentsList}/>
        </div>
    </div>)
}