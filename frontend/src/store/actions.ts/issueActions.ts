import { ActionInterface } from "../../DB/saga/issueSaga"



export const writeDataToStorage = (data:number):ActionInterface =>{
    return {type:"WRITE_DATA_TO_STORAGE", payload:data}
}

export const changePayStatusAction  = (state:number):ActionInterface => {
    return {type:"CHANGE_PAY_STATUS", payload:state}
}

export const changeFirmStateAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_FIRM_STATUS', payload:state}
}

export const changeASNstatusAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_ASN_STATUS', payload:state}
}

export const changeASNrelayStateAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_ASN_RELAY_STATUS', payload:state}
}

export const changeSKZIStatusAction = (state:number):ActionInterface =>{
    return{type:"CHANGE_SKZI_STATUS", payload:state}
}

export const changeProcuremetStatusAction = (state:number):ActionInterface =>{
    return {type: "CHANGE_PROCUREMENT_STATE", payload:state}
}

export const changeCardMakingStatusAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_CARD_MAKING_STATE', payload:state}
}

export const changeCityStateAction = (state:string):ActionInterface =>{
    return {type:'CHANGE_CITY_STATE', payload:state}
}

export const changeAddressTextAction = (state:string):ActionInterface =>{
    return {type:'CHANGE_ADDRESS_STATE', payload:state}
}

export const changeMilageTextValueAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_MILAGE_STATE', payload:state}
}

export const changeDayToWorkValueAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_DAYS_TO_WORK_STATE', payload:state}
}

export const changeInstallerCountValueAction = (state:number):ActionInterface =>{
    return {type:'CHANGE_INSTALLERS_COUNT_STATE', payload:state}
}

export const changeDescriptionTextAction = (state:string):ActionInterface =>{
    return {type:'CHANGE_ISSUE_DESCRIPTION', payload:state}
}
export const changeHistoryAction = (state:[]):{type:string, payload:[]} =>{
    return {type:'CHANGE_HISTORY', payload:state}
}
