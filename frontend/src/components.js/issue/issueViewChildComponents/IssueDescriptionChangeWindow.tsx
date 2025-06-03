import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react"
import { eventModalWindowStyle } from "../issueCalendarEventsComponents/createEventCompanent"


export const IssueDescriptionChangeWindow = ({descriptionText}:{descriptionText:string}) =>{
    const [changeDescriptionButtonState, setChangeDewscriptionButtonState] = useState<boolean>(false)
    const showChangeDescriptionWindow = ():void=>{
        setChangeDewscriptionButtonState(true)
    }
    const closeChangeDescriptionWindow = ():void=>{
        setChangeDewscriptionButtonState(false)
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
                value={descriptionText}
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
                    onClick={closeChangeDescriptionWindow}>Сохранить</Button>
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