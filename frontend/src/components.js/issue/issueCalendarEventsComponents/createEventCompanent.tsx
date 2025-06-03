import { Box, Button, FormControl, IconButton, Modal, NativeSelect, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { createIssueEvent, getEventAvtionTypes, getEventStatusesListFromDB, getUsersListFromDB } from "../../../DB/issueHTTPmethods";
import { API_URL } from "../../../DB/DBconfig";
import { today } from "../modules/issueFunctionalFuncs";

export interface defultEventState{
  issueID:number,
  eventID?:number,
  eventText:string,
  startDate:string,
  finishDate:string,
  startTime:string,
  finishTime:string,
  responsibleUser:number,
  state:number,
  actionType:number
}


export const eventModalWindowStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
    borderRadius:"25px"
  };
    





export const CreateEventCompanent = ({issueID}:{issueID:number}) =>{
 
 

  const defultEventState:defultEventState = {
    issueID:issueID,
    eventText:"",
    startDate:today.date,
    finishDate:today.date,
    startTime:today.time,
    finishTime:today.time,
    responsibleUser:1,
    state:1,
    actionType:1
  }

    const [open, setOpen] = useState<boolean>(false)
    const showWindow = () => setOpen(true)
    const close = () => {
      setOpen(false) 
      window.location.reload()
    }
    
    const [usersList, setUserList] = useState<object[]>([])
    const [eventStatuses, setEventStatuses] = useState<object[]>([])
    const [eventActionTypesList, setActionTypesList] = useState<object[]>([])
    const [eventStorage, setEventStorage] = useState<object>(defultEventState)

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
    
    const compareDate = (dateStatrt:string, dateFinish:string) => {
        const fullDateStart = new Date(dateStatrt)
        const fullDateFinish = new Date(dateFinish)
        if(fullDateStart < fullDateFinish){
          return true
        }else{
          return false
        }
        
    }


      let startEventDatetime:string = `${eventStorage.startDate} ${eventStorage.startTime}`
      let finishEventDateTime:string = `${eventStorage.finishDate} ${eventStorage.finishTime}`
      

      useEffect(()=>{
        getUsers()
        getEventStatuses()
        getEventActionTypesList()
      },[])



    return (
        <div>
      <Button variant="contained" onClick={showWindow}>Создать событие</Button>

      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={eventModalWindowStyle}>
            <div style={{
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
                value={eventStorage.eventText}
                onChange={(e) => {
                  setEventStorage({
                    ...eventStorage,
                    eventText: e.target.value
                  });
                }}
                style={{width:"100%", height:'2rem', fontSize:"1.5rem"}}
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
                    value={eventStorage.startDate}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
                    onChange={(e)=>{
                      setEventStorage({
                        ...eventStorage,
                        startDate:e.target.value
                        
                      })
                    }}
                    />
                <span>Время начала</span>
                <input
                    type="time"
                    value={eventStorage.startTime}
                    onChange={e=>{
                      setEventStorage({
                        ...eventStorage,
                        startTime:e.target.value
                      })
                    }}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
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
                    value={eventStorage.finishDate}
                    onChange={e=>{
                      setEventStorage({
                        ...eventStorage,
                        finishDate:e.target.value
                      })
                    }}
                    style={{height: "2rem", fontSize: "1.5rem", cursor:"pointer"}}
                />
                <span>Время окончания</span>
                <input
                    type="time"
                    value={eventStorage.finishTime}
                    onChange={e=>{
                      setEventStorage({
                        ...eventStorage,
                        finishTime:e.target.value
                      })
                    }}
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
                    defaultValue={0}
                    onChange={e=>{
                      setEventStorage({
                        ...eventStorage,
                        responsibleUser: Number(e.target.value)
                      })
                    }}  
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
                    defaultValue={1}
                    onChange={e=>{
                      setEventStorage({
                        ...eventStorage,
                        state: Number(e.target.value)
                      })
                    }} 
                                       
                  >
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
                    defaultValue={0}
                    onChange={e=>{
                      setEventStorage({
                        ...eventStorage,
                        actionType: Number(e.target.value)
                      })
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
              }}></div>
            
            <div
             style={{
                        marginTop:"2rem",
                        display:"flex",
                        justifyContent:"center"
                        }} >
                {(eventStorage.eventText.length > 2) && compareDate(startEventDatetime, finishEventDateTime)?
                  <Button 
                  variant="contained"
                  onClick={()=>{
                    createIssueEvent(API_URL, eventStorage)
                    close()
                  }}
                  >Сохранить</Button>:
                  <></>
                }
                <Button 
                  variant="outlined"
                  sx={{left:10}}
                  onClick={()=>setOpen(false)}
                  >
                    Отменить
                </Button>
            </div>
        </Box>
      </Modal>
    </div>
    )
}