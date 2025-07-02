import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { eventModalWindowStyle } from "../issueCalendarEventsComponents/createEventCompanent"
import { useDispatch } from "react-redux"
import { putIssueDescription } from "../../../DB/issueHTTPmethods"
import { API_URL } from "../../../DB/DBconfig"
import { useSelector } from "react-redux"




export const IssueDescriptionChangeWindow = ({descriptionText, issueID}:{descriptionText:string, issueID:string}) =>{
    const [changeDescriptionButtonState, setChangeDewscriptionButtonState] = useState<boolean>(false)
    const [descriptionTextState, setDescriptionState] = useState<string>(descriptionText)
    const dispatch = useDispatch()
    const selector = useSelector(state=>state.issue.issue)
    
    const issueKeyID:string = selector.issueData[0].id 

    const showChangeDescriptionWindow = ():void=>{
        setChangeDewscriptionButtonState(true)
    }
    const closeChangeDescriptionWindow = ():void=>{
        setChangeDewscriptionButtonState(false)
    }

    const saveChangedDescription = () =>{
        closeChangeDescriptionWindow()
        dispatch({type:"ASYNC_CHANGE_ISSUE_DESCRIPTION", payload:descriptionTextState})
        putIssueDescription(issueID,issueKeyID, descriptionTextState, API_URL)
    }
     

    return (<>

    <div>
        <Button onClick={showChangeDescriptionWindow} variant="contained">Реактировать</Button>
    </div>
            {changeDescriptionButtonState? <div>
      <Modal
        open={changeDescriptionButtonState}
        onClose={closeChangeDescriptionWindow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={eventModalWindowStyle}>
          <Typography variant="h6" component="h2">
            Редактирование описания
          </Typography>
          <Typography  sx={{ mt: 2 }}>
            <textarea 
                value={descriptionTextState}
                onChange={(e)=>{setDescriptionState(e.target.value)}}
                style={{
                        maxWidth:eventModalWindowStyle.width,
                        width:eventModalWindowStyle.width,
                        height:"10rem",
                        marginTop:"0.5rem",
                        fontSize:"1.2rem"    
                    }}
            >
            </textarea>
          </Typography>
           <div style={{
                        marginTop:"1rem",
                        textAlign:"center"
                        }}>
                <Button 
                    variant="contained"
                    onClick={saveChangedDescription}>Сохранить</Button>
                <Button
                    style={{marginLeft:"0.5rem"}}
                    variant="outlined"
                    onClick={closeChangeDescriptionWindow}>Отменить</Button>
           </div>
        </Box>
      </Modal>
    </div>: <></>}
    </>)
}