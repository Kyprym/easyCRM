import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { API_URL } from '../../DB/DBconfig';
import { useState } from 'react';


export const AuthorizationFormComponent = ()=>{
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
    
    const [inputsState, setInputsState] = useState<{login:string,pass:string }>({login:"",pass:""})
    const changeLogin = (e:any)=>{
        setInputsState({login:e.target.value, pass:inputsState.pass})       
    }

    const changePass = (e:any)=>{
        setInputsState({login:inputsState.login, pass:e.target.value})
    }

    return <Box component='form' method='post' action={API_URL} sx={formStyles}>
        <h2>Авторизация</h2>
        <TextField value={inputsState.login} onChange={changeLogin} type="text" label="Логин" name='login' variant="outlined" sx={inputStyles}/>
        <TextField value={inputsState.pass} onChange={changePass} type="password" label="Пароль" name="pass" variant="outlined" sx={inputStyles}/>

        <Button variant="contained" type='submit' sx={buttonSyles}>Войти</Button>
    </Box>
}

