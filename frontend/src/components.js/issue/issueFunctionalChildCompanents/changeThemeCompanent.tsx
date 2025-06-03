import { Box, Button, Modal, TextField } from "@mui/material"
import { useState } from "react"
import { putIssueTheme } from "../../../DB/issueHTTPmethods";
import { API_URL } from "../../../DB/DBconfig";
import { useSelector } from "react-redux";



const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width:"25rem",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const childWindowStyle = {
    display:"flex",
    justifyContent:"center",
    marginTop:"0.5rem"
    }


export const ChangeThemeCompanent = ({issueID}:{issueID:string | string}) => {

    const issueData = useSelector((state:object[]) => state.issue.issue.issueData[0])
    const issueKeyID = issueData.id
    const textTheme = issueData.theme



   const [changeThemeState, setChangeThemeState] = useState<boolean>(false)
   const [themeTextFontColorState, setFontTextColorState] = useState<string>('black')
   const [themeChangeTextState, setThemeChangeTextState] = useState<string>(textTheme)
   const [issueTextState, setIssueState] = useState<string>(textTheme)


    const showModal = () => setChangeThemeState(true)
    const closeModal = () => setChangeThemeState(false)

    const changeThemeInDB = async ()=>{
        closeModal()
        setIssueState(themeChangeTextState)
        await putIssueTheme(issueID, issueKeyID, themeChangeTextState, API_URL)
    }

   const textFieldCompanent:JSX.Element = (
   <Modal
        open={changeThemeState}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
  <Box sx={style}>
    <h2 style={childWindowStyle}>Введите новую тему</h2>
    <TextField 
        fullWidth
        value={themeChangeTextState}
        onChange={(e)=>{
            setThemeChangeTextState(e.target.value)
        }}
        ></TextField>
    <div style={childWindowStyle}>
        <Button 
            variant="contained" 
            onClick={()=>changeThemeInDB()}>
                Сохранить
        </Button>
    </div>
  </Box>
</Modal>)

   return (<>
            <div style={{
                    fontSize:"2.5rem",
                    cursor:"pointer",
                    transition:"0.3s",
                    color:themeTextFontColorState
                     }}
                     onClick={showModal}
                     onMouseOver={()=>setFontTextColorState("gray")}
                     onMouseOut={()=>setFontTextColorState('black')}
                     >
                
                     {issueTextState}
            </div>
            {textFieldCompanent}
            </>)
}