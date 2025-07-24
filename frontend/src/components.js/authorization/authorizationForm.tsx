import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { sendAuthDatInDB } from '../../DB/issueHTTPmethods';
import { API_URL } from '../../DB/DBconfig';
import { useNavigate } from 'react-router-dom';

const formStyles:any={ 
     display:"flex",
     flexDirection:"Column",
     alignItems:"center",
     border:"2px solid rgb(36, 122, 209)",
     borderRadius:"25px 25px",
     padding: "0.5rem",
     width:'30rem'
    }
const inputStyles: any = {
        marginTop:'0.5rem',
        width: '28rem'
    }
const buttonSyles:any = {
        marginTop:'0.5rem',
        width: "10rem"
    }

const URL = `${API_URL}/auth`
export const AuthorizationFormComponent = ()=>{
    const navigate = useNavigate()
    const [inputsState, setInputsState] = useState<{login:string,pass:string }>({login:"",pass:""})
    
    const changeLogin = (e:any)=>{
        const value:string = e.target.value.replace(/[^a-zA-Z0-9, @,_,.]/g, '')
        setInputsState({login: value, pass:inputsState.pass})       
    }

    const changePass = (e:any)=>{
        setInputsState({login:inputsState.login, pass:e.target.value})
    }

    const sendAuthData = async ()=> {
        const base64:string = btoa(`${inputsState.login}:${inputsState.pass}`)
        const serverResponse = await sendAuthDatInDB(URL, base64 )
        const userID:number = serverResponse.id
        const sessionToken:string = serverResponse.sessionToken
        
        if(userID > 0 && sessionToken.length > 10){
            localStorage.setItem('id',serverResponse.id)
            localStorage.setItem('accessToken',serverResponse.accessToken)
            localStorage.setItem('sessionToken', sessionToken)
            navigate('/issues/')
        }else{
            localStorage.setItem('id','0')
            localStorage.setItem('accessToken','')
            localStorage.setItem('sessionToken','')
            window.location.reload()
        }
    }

    const onKeyEnter = (e:any):void =>{
                if(e.key == 'Enter'){
                    sendAuthData()
                }
    }



    return (
        <Box 
            sx={formStyles}
            > 
                
        <h2>Авторизация</h2>
        <TextField
            value={inputsState.login}
            onChange={changeLogin} 
            onKeyDown={onKeyEnter}
            type="text" 
            label="Логин" 
            name='login' 
            variant="outlined" 
            sx={inputStyles}/>

        <TextField 
            value={inputsState.pass} 
            onChange={changePass} 
            onKeyDown={onKeyEnter}
            type="password" label="Пароль" 
            name="pass" variant="outlined" 
            sx={inputStyles}/>

        <Button 
            sx={buttonSyles}
            variant="contained" 
            type='submit' 
            onClick={sendAuthData}
            >Войти</Button>
    </Box>
    )
}

