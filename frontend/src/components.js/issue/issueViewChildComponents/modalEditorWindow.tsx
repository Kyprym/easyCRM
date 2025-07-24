import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { eventModalWindowStyle } from "../issueCalendarEventsComponents/createEventComponent";
import { putIssueInDB } from "../../../DB/issueHTTPmethods";
import { API_URL } from "../../../DB/DBconfig";
import { useDispatch } from "react-redux";

interface modalEditorWindowProps {
  issueID:string;
  issueKeyID:string;
  description?:string;
  text:string | number;
  maxLength?:number;
  typeNumber?:boolean;
  link:string;
  actionType?:string;
}

const modalEditorWindowStyle = {
    fontColor:"gray"
}

export const ModalEditorWindow = ({issueID, issueKeyID, description, text, maxLength, typeNumber, link, actionType}:modalEditorWindowProps) =>{
    const dispatch = useDispatch()
    const [modalWindowState, setModalWindowState] = useState<boolean>(false)
    const [textState, setTextState] = useState<string | number>(text)
    const [fontStyleActive, setFontStyleActive] = useState<boolean>(false)

    const textStyleActive = ():void =>{
        setFontStyleActive(true)
    }

    const textStyleDeactive = ():void =>{
        setFontStyleActive(false)
    }

    const showModalWindow = ():void=> setModalWindowState(true)

    const closeModalWindow = ():void=>{
        setTextState(text)
        setModalWindowState(false)
    }

    const changeText = (e:React.ChangeEvent<HTMLTextAreaElement>):void=>{
        const newText:string | number = e.target.value 
        if(maxLength){
            if( typeof newText == 'string' && newText.length < maxLength){
            setTextState(newText)
        }
        }
    }
    
    const changeTextInDB = () =>{
        if(actionType){
            dispatch({type:actionType, payload:textState})
        }
        putIssueInDB(`${API_URL}/issues/${issueID}/${link}`, textState, issueKeyID)
    }

    const defaultTextState:JSX.Element = <span 
            onClick={()=>{
                showModalWindow()
                textStyleDeactive()
            }}
            style={{color:fontStyleActive?modalEditorWindowStyle.fontColor:'black'}}
            onMouseMove={textStyleActive}
            onMouseOut={textStyleDeactive}
            
        >{textState}</span>

    const numberInput:JSX.Element = <input
            style={{
                width:"100%",
                fontSize: '2rem'
            }}
            type="number"
            value={textState}
            onChange={(e)=>{
                setTextState(e.target.value)
            }}
    />
    const textareaInput = <textarea 
                onChange={changeText}
                value={textState}
                style={{
                        maxWidth:eventModalWindowStyle.width,
                        width:eventModalWindowStyle.width,
                        height:"10rem",
                        marginTop:"0.5rem",
                        fontSize:"1.2rem"  
                    }}
            >
            </textarea>

    const modalWindowComponent:JSX.Element = <Modal
        open={modalWindowState}
        onClose={closeModalWindow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={eventModalWindowStyle}>
          <Typography variant="h6" component="h2">
            {description}
          </Typography>
          <Typography  sx={{ mt: 2 }}>
            {
                typeNumber?
                numberInput:
                textareaInput
            }
            
          </Typography>
           <div style={{
                        marginTop:"1rem",
                        textAlign:"center"
                        }}>
                <Button
                    variant="contained"
                    onClick={()=>{
                        closeModalWindow()
                        changeTextInDB()
                    }}>Сохранить</Button>
                <Button
                    style={{marginLeft:"0.5rem"}}
                    variant="outlined"
                    onClick={closeModalWindow}>Отменить</Button>
           </div>
        </Box>
      </Modal>

    return (<>
        <span style={{
            cursor:"pointer"
            }}> 
            {!modalWindowState? defaultTextState: modalWindowComponent}
            
        </span>
    </>)
}