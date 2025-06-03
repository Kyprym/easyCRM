import { Box,  Stack } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getLowText } from "../modules/issueFunctionalFuncs";
import { useState } from "react";
import { ChangeEventCalendarCompanent } from "./changeCalendarEventCompanent";
interface issueCalendarEventProps{
          issueID:number,
          eventID:number,
          eventdateStart: string,
          eventdateFinish:string,
          eventText: string
}
export const IssueCalendarEvent = ({ issueID, eventID, eventdateStart, eventdateFinish, eventText}:issueCalendarEventProps)=>{
    const [backgroundState, setBackgroundState] =useState("white")
    const [changeEventWindowState, setChangeEventWindowState] = useState(false) 
    return (
    <div 
        onMouseMove={()=>setBackgroundState('#40E0D0')}
        onMouseOut={()=>setBackgroundState('white')}
        onClick={()=>setChangeEventWindowState(true)}
        style={{
        display:"flex",
        flexDirection:'row',
        padding:'1rem',
        margin:"1rem",
        backgroundColor:backgroundState,
        cursor:'pointer',
        transition:'0.3s'
    }}
        >   
            <CalendarMonthIcon style={{fontSize:'3rem', color:"#007FFF"}}/>

            <Stack direction={'column'} marginLeft={'1rem'}>
                <Box sx={{fontSize:"1.5rem"}}>{getLowText(eventText, 30)}</Box>
                <Box sx={{marginTop:"1rem"}}><span style={{paddingRight:"0.1rem"}}>начало:</span> {eventdateStart}</Box>   
                <Box sx={{marginTop:"1rem"}}><span style={{paddingRight:"0.1rem"}}>конец:</span> {eventdateFinish}</Box>                
            </Stack>
            
                {
                    changeEventWindowState?
                     <ChangeEventCalendarCompanent
                     issueID={issueID}
                     eventID={eventID}
                     />:
                        <></>
                }
        </div>
        )
}