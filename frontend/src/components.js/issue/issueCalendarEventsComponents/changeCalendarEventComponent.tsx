import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Box, Button, FormControl, IconButton, Modal, NativeSelect, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { eventModalWindowStyle } from "./createEventComponent"
import { getOnlyYY_MM_DD } from "../modules/issueFunctionalFuncs";
import { getEventAvtionTypes, getEventStatusesListFromDB, getUsersListFromDB, updateIssueEvent } from "../../../DB/issueHTTPmethods";
import { API_URL } from "../../../DB/DBconfig";

export const ChangeEventCalendarComponent = ({issueID, eventID}:{issueID:number, eventID:number}) =>{
    const eventList = useSelector(state =>state.issue.issue.issueEvents)
   
    const [event, setEvent] = useState<any>({})

    const [usersList, setUserList] = useState<object[]>([])
    const [eventStatuses, setEventStatuses] = useState<object[]>([])
    const [eventActionTypesList, setActionTypesList] = useState<object[]>([])

    const [open, setOpen] = useState<boolean>(false)
    const showWindow = () => setOpen(true)
    const close = () => {
      setOpen(false)
      window.location.reload()
    }
    
    const getUsers = async ():Promise<void> =>{
           const users = await getUsersListFromDB(API_URL)
            setUserList(users)
            return users
          } 

    const getEventStatuses = async ():Promise<void> =>{
            const eventStatusesList = await getEventStatusesListFromDB(API_URL)
            setEventStatuses(eventStatusesList)
          }

    const getEventActionTypesList = async ():Promise<void>=>{
            const actionTypeList:object[] = await getEventAvtionTypes(API_URL)
            setActionTypesList(actionTypeList)
          }
        
   const getEventList = () =>{
    for(let i = 0; i < eventList.length; i++){
        if(Number(eventList[i].id) == Number(eventID)){
            const startDate:string = getOnlyYY_MM_DD(eventList[i].datetime_start)
            const startMinutes:string = eventList[i].datetime_start.slice(11, 16)
            const finishDate:string = getOnlyYY_MM_DD(eventList[i].datetime_finish)
            const finishTime:string = eventList[i].datetime_finish.slice(11, 16)
             setEvent( {
                issueID:issueID,
                eventID:eventID,
                eventText:eventList[i].eventText,
                action_type:eventList[i].action_type,
                date_start:startDate,
                startTime:startMinutes,
                date_finish:finishDate,
                finishTime:finishTime,
                responsibleUser:eventList[i].responsibleUser,
                status:eventList[i].status,
                actionType:eventList[i].action_type
            })
        }
    }
   }


   let startEventDatetime:string = `${event.date_start} ${event.startTime}`
   let finishEventDateTime:string = `${event.date_finish} ${event.finishTime}`

   const compareDate = (dateStatrt:string, dateFinish:string) => {
    const fullDateStart = new Date(dateStatrt)
    const fullDateFinish = new Date(dateFinish)
    if(fullDateStart < fullDateFinish){
      return true
    }else{
      return false
    }
    
}
   

   useEffect(()=>{
    getUsers()
    getEventStatuses()
    getEventActionTypesList()
    getEventList()
    showWindow()
   }, [issueID])

    return <div>
        <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={eventModalWindowStyle}>
                     <div 
                     style={{
                             display:"flex",
                             width:"100%",
                             justifyContent:"space-between",
                             padding:"0.5rem",
                             fontSize:"1.5rem",
                           }}> 
                             <span>Быстрое создание события</span>
                                <IconButton
                                    sx={{
                                          position: 'absolute', 
                                          top: 18, 
                                          right: 18,
                                          padding: 0, 
                                        }}
                                    onClick={close}
                                >
                                    <CloseIcon/>
                                </IconButton>
                         </div> 

                                <Typography id="modal-modal-description" >
           <input 
                     type="text"
                 placeholder="Введите текст события"
                 value={event.eventText}
                 style={{width:"100%", height:'2rem', fontSize:"1.5rem"}}
                 onChange={(e)=>{
                     setEvent({
                         ...event,
                         eventText:e.target.value
                     })
                 }}
                 />
        <span
            style={{
                width:"100%",
                display:"flex",
                flexDirection:"row",
                justifyContent:'space-between'
            }}
          >

<span 
                style={{
                    marginTop:"0.5rem",
                    width:"45%",
                    display:"flex",
                    flexDirection:"column",
                }}
           >
                <span>Дата начала</span>
                <input
                    type="date"
                    value={event.date_start}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
                    onChange={e=>{
                        setEvent({
                            ...event,
                            date_start:e.target.value
                        })
                    }}
                    />
                     <span>Время начала</span>
                <input
                    type="time"
                    value={event.startTime}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
                    onChange={(e)=> setEvent({
                        ...event,
                        startTime:e.target.value
                    })}
                />
          </span>
        <span 
                style={{
                    marginTop:"0.5rem",
                    width:"45%",
                    display:"flex",
                    flexDirection:"column",
                }}
           >
                <span>Дата окончания</span>
                <input
                    type="date"
                    value={event.date_finish}
                    onChange={(e)=>setEvent({
                        ...event,
                        date_finish:e.target.value
                    })}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
                />
                <span>Время окончания</span>
                <input
                    type="time"
                    value={event.finishTime}
                    onChange={e=>setEvent({
                        ...event,
                        finishTime:e.target.value
                    })}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
                />
        </span>
   </span>             
            </Typography>
                <span
                style={{
                    marginTop:"1rem",
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                  }}>
                <div style={{marginRight:"2rem", fontWeight:"bold"}}>Ответственный</div>
                <FormControl sx={{width:"15rem"}}>
                  <NativeSelect
                    value={event.responsibleUser}
                    onChange={e=>{
                      setEvent({
                        ...event,
                        responsibleUser: Number(e.target.value)
                      })}}  
                  >
                    {usersList.map((user)=>{
                      return  <option 
                          key={user.user_id} 
                          value={user.user_id}
                          >
                            {user.user_login}
                              </option>
                    })}
                   
                  </NativeSelect>
               </FormControl>
                </span>

            <span 
                style={{
                         marginTop:"1rem",
                         display:"flex",
                         justifyContent:"space-between",
                         alignItems:"center"
                       }}>
                            
                        <div style={{marginRight:"2rem", fontWeight:"bold"}}>Статус</div>
                       <FormControl 
                        sx={{width:"15rem"}}>
                          
                          <NativeSelect
                            value={event.status}
                            onChange={e=>{
                              setEvent({
                                ...event,
                                status: Number(e.target.value)
                              })
                            }}>
                            {eventStatuses.map((eventStatus)=>{
                              return  <option 
                                  style={{backgroundColor:eventStatus.status_color}}
                                  key={eventStatus.status_id} 
                                  value={eventStatus.status_id}
                                  >
                                    {eventStatus.status_name}
                                      </option>
                            })}
                          </NativeSelect>
                       </FormControl>
                       </span>

            <span
                style={{
                 marginTop:"1rem",
                 display:"flex",
                 justifyContent:"space-between",
                 alignItems:"center"
               }}>
                    
                <div style={{marginRight:"2rem", fontWeight:"bold"}}>Тип Действия</div>
               <FormControl sx={{width:"15rem"}}>
                  
                  <NativeSelect
                    value={event.actionType}
                    onChange={e=>{
                      setEvent({
                        ...event,
                        actionType: Number(e.target.value)
                      })
                      console.log(e.target.value)
                    }}
                  >
                    {eventActionTypesList.map((actionType)=>{
                      return  <option 
                          key={actionType.action_id} 
                          value={actionType.action_id}
                          >
                            {actionType.action_text}
                              </option>
                    })}
                   
                  </NativeSelect>
               </FormControl>
               </span>
        <div 
            style={{
              marginTop:"0.3rem",
              width:"100%", height:"2px",
              backgroundColor:"black"
              }}>
        </div>


        <div
             style={{
                    marginTop:"2rem",
                    display:"flex",
                    justifyContent:"center"
                    }} >
                      { compareDate(startEventDatetime, finishEventDateTime) && event.eventText.length > 2? 
                  <Button 
                  variant="contained"
                  onClick={()=>{
                    updateIssueEvent(API_URL, event)
                    close()
                  }}
                  >Сохранить</Button>:
                  <></>
                      }
                <Button
                  variant="outlined"
                  sx={{left:10}}
                  onClick={()=>{
                    close()
                    console.log(event)
                  }}>
                    Отменить
                </Button>
        </div>
            </Box>

        </Modal>

    </div>
}