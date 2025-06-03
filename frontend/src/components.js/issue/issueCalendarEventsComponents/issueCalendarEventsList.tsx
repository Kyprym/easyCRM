import { IssueCalendarEvent } from "./issueCalendarEvent";
import { useEffect, useState } from "react";
import { getLowList } from "../modules/issueFunctionalFuncs";
import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CreateEventCompanent } from "./createEventCompanent";
import { nanoid } from "nanoid";
import { MissingNoteComponet } from "./missingNoteComponent";

interface eventsListProps {
  events: object[];
  issueID:number
}


export const IssueCalendarEventsList = ({ events, issueID }: eventsListProps) => {
  const calendarEventsList: object[] = getLowList(events, 2);
  const [calendarEventsListState, setCalendarEventsListState] = useState(calendarEventsList);

  const showMoreCalendarEvents = () => {
    if (calendarEventsListState.length <= 2) {
      setCalendarEventsListState(events);
    } else {
      setCalendarEventsListState(calendarEventsList);
    }
  };


  useEffect(()=>{
    setCalendarEventsListState(calendarEventsList)
  },[events.length])
  
  return (
    <div>
      <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"1rem"}}>
        <div style={{fontSize: "1.5rem", marginLeft:"1rem" }}>События</div>
        <div style={{marginRight:"1rem"}}>
       
      <span style={{display:"flex", flexDirection:"row"}}>

          {
            events.length <=2?
              <></>
            :
            <Button
            variant="outlined"
            sx={{backgroundColor:"#4169E1", color:"white"}}
            disableElevation
            onClick={showMoreCalendarEvents}>
            {calendarEventsListState.length <= 2 ? "Показать больше" : "Скрыть"}
          </Button>
          }

          
    
          <span  style={{marginLeft:"1rem"}}>
              <CreateEventCompanent
              issueID={issueID}/>
          </span>
      </span>
        </div>
        
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.5 }}
        style={{ overflow: "hidden" }}
      >
        <AnimatePresence>
          {
          calendarEventsListState.length >=1?
          calendarEventsListState.map((event) => (
            <motion.div
              key={event.id || nanoid()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <IssueCalendarEvent
                issueID={issueID}
                eventID={event.id || nanoid()}
                user={event.user}
                eventText={event.eventText}

                eventdateStart={event.datetime_start}
                
                eventdateFinish={event.datetime_finish}
              />
            </motion.div>
          )):<MissingNoteComponet
              noteText="События отсутствуют"
            />
        }

        </AnimatePresence>
      </motion.div>

     { events.length <=2?
              <></>
            :
            <Button
            variant="outlined"
            sx={{backgroundColor:"#4169E1", color:"white"}}
            disableElevation
            onClick={showMoreCalendarEvents}>
            {calendarEventsListState.length <= 2 ? "Показать больше" : "Скрыть"}
          </Button>
          }
    </div>
  );
};

