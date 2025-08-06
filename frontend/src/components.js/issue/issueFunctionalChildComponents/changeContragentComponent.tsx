import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { getFoundContragentsFromDB, putContragentInIssue } from '../../../DB/issueHTTPmethods';
import { API_URL } from '../../../DB/DBconfig';
import { nanoid } from 'nanoid';

interface changeContragentProps{
    issueID:number,
    contragent:string
}



export const ChangeContragentComponent = ({issueID, contragent}:changeContragentProps)=>{
    const [contragentNameState, setContragentNameState ] = useState<string>(contragent)
    const [searchCompState, setSearchCompState] = useState<boolean>(false)
    const [inputTextState, setInputTextState] = useState<string>('') 
    const [contragentsListState, setContragentsListState] =useState([])
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => {
        setOpen(false)
        setSearchCompState(false)
    }

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const getContragentsFromDB = async ()=>{
        const contragents = await getFoundContragentsFromDB(inputTextState, API_URL)
       await setContragentsListState(contragents)
    }


    const changeInput = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        setInputTextState(e.target.value)
    }

    const searchWindowComponent:JSX.Element = <span>
        <input 
            value={inputTextState}
            onChange={changeInput}
            type='text'
            style={{
                border:"3px solid #007FFF",
                borderRadius:"8px 8px",
                backgroundColor:"transparent",
                marginLeft:"0.5rem",
                height:"1.9rem"
            }}
            />
            <Button 
                onClick={()=>{
                    getContragentsFromDB()
                    openModal()
                }
                }
                sx={{marginLeft:"0.3rem"}}
                variant="contained">
                Найти
                </Button>                
    </span>
    

    return (<div
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                height:'2rem',
                marginTop:"0.3rem"
                }}>
              <span>{contragentNameState}</span>
              <span 
                onClick={()=>setSearchCompState(true)}
                >
                    {
                       searchCompState?
                       searchWindowComponent:
                       <EditIcon sx={{cursor:"pointer"}}/>
                    }
              </span>


              <div>
      <Modal
        keepMounted
        open={open}
        onClose={closeModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
                   {contragentsListState.length <1 ?<h2>Контрагент не найден</h2>:<h2>Выберите контрагента</h2>} 
          
          <div style={{
            display:"flex",
            flexDirection:"column"
          }}>
                {
                    contragentsListState.map((contragent)=>{
                        const id:number = contragent.id
                        const name:string = contragent.name
                        return <Button 
                            onClick={()=>{
                                putContragentInIssue(issueID, id, API_URL)
                                closeModal()
                                setContragentNameState(name)
                            }}
                            variant='outlined' 
                            key={nanoid()}>
                            {contragent.name}
                            </Button>
                    })
                }
              </div>

         
        </Box>
      </Modal>
    </div>
                {searchCompState?
                    <CloseIcon
                        onClick={()=>setSearchCompState(false)}
                        sx={{marginLeft:"0.5rem",fontSize:"2rem", cursor:"pointer"}}
                />:<></>
                }

    </div>)
}