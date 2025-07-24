import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";
import { putIssueFirm } from "../../../DB/issueHTTPmethods";
import { API_URL } from "../../../DB/DBconfig";
import { useDispatch } from "react-redux";

interface changeFirmProps{
    issueID:string;
    issueKeyID:string;
    firm:number;
    firmsList:object[];

}

    const firmMouseMoveColor:string = "gray"
    const firmMouseOutColor:string = "black"

    export const ChangeFirmSelector = ({issueID, issueKeyID, firm, firmsList}:changeFirmProps)=>{
        const [mouseMoveState, setMouseMoveState] = useState<string>(firmMouseOutColor)
        const [changeFirmPanelState, setChangeFirmPanelState] = useState<boolean>(false)
        const [formValue, setFormValue] = useState<number>(firm);
        const dispatch = useDispatch()

        const handleChange = (event: SelectChangeEvent) => {
                const firmID:number = Number(event.target.value)
                setFormValue(firmID)
                dispatch({type:"ASYNC_CHANGE_FIRM_STATE", payload:event.target.value })
                putIssueFirm(issueID, issueKeyID, firmID, API_URL)
              }
    
    return(<>
        
        {
        changeFirmPanelState? 
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Фирма</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={String(formValue)}
          onChange={handleChange}
          autoWidth
          label="Фирма"
        >
         {
           firmsList.map(item=>{
               return <MenuItem 
                        key={nanoid()}
                        value={item.id - 1}
                        onClick={()=>setChangeFirmPanelState(false)}>
                        {item.firmName}
                     </MenuItem>
           })
         }
        </Select>
      </FormControl>
    
        
        :<span
            style={{
                cursor:"pointer",
                transition:"0.2s",
                marginLeft:'0.5rem',
                color:mouseMoveState
            }}
            onMouseMove={()=>setMouseMoveState(firmMouseMoveColor)}
            onMouseOut={()=>setMouseMoveState(firmMouseOutColor)}
            onClick={()=>setChangeFirmPanelState(true)}
         >
            {firmsList[formValue].firmName}
        </span>
        }
    </>)
}