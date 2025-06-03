import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export const RegistrationPage = () => {
    const formStyles: any = {
        display: "flex",
        flexDirection: "Column",
        alignItems: "center",
        border: "2px solid rgb(36, 122, 209)",
        borderRadius: "25px 25px",
        padding: "0.5rem",
        width: '30rem'
    };

    const inputStyles: any = {
        marginTop: '0.5rem',
        width: '28rem'
    };

    const buttonSyles: any = {
        marginTop: '0.5rem',
        width: "15rem"
    };

    const [inputsState, setInputsState] = useState<{ login: string, pass: string, doublePass: string, eMail: string }>({
        login: "",
        pass: "",
        doublePass: "",
        eMail: ""
    });

    const [formValidState, setFormValidState] = useState<boolean>(true);

    const updateInputState = (field: string, value: string) => {
        setInputsState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const getFormValid = () => {
        const validEmail = inputsState.eMail.indexOf('@')
        if (
            inputsState.login.length < 5 ||
            inputsState.pass.length <= 5 ||
            inputsState.pass !== inputsState.doublePass ||
            validEmail <= 1
        ) {
            setFormValidState(true); 
        } else {
            setFormValidState(false);
        }
    };

    useEffect(() => {
        getFormValid();
    }, [inputsState]); 

    return (
        <Box>
            <Box component='form' method='post' sx={formStyles}>
                <h2>Регистрация</h2>
                <TextField 
                    value={inputsState.login} 
                    onChange={(e) => updateInputState('login', e.target.value)}
                    type="text" 
                    label="Придумайте логин" 
                    name='login'
                    variant="outlined" 
                    sx={inputStyles} 
                />
                <TextField 
                    value={inputsState.eMail} 
                    onChange={(e) => updateInputState('eMail', e.target.value)}
                    type="email" 
                    label="Введите электронную почту" 
                    name="eMail"
                    variant="outlined" 
                    sx={inputStyles} 
                />
                <TextField 
                    value={inputsState.pass} 
                    onChange={(e) => updateInputState('pass', e.target.value)}
                    type="password" 
                    label="Придумайте пароль" 
                    name="pass"
                    variant="outlined" 
                    sx={inputStyles} 
                />
                <TextField 
                    value={inputsState.doublePass} 
                    onChange={(e) => updateInputState('doublePass', e.target.value)}
                    type="password" 
                    label="Повторите пароль" 
                    name="doublePass"
                    variant="outlined" 
                    sx={inputStyles} 
                />
                <Button 
                    variant="contained" 
                    type='submit'
                    disabled={formValidState} 
                    sx={buttonSyles}
                >
                    Зарегестрироваться
                </Button>
            </Box>
        </Box>
    );
};