
export const writeDataToStorage = (data:number) =>{
    return {type:"WRITE_DATA_TO_STORAGE", payload:data}
}

export const changePayStatusAction  = (state:number) => {
    return {type:"CHANGE_PAY_STATUS", payload:state}
}

export const changeFirmStateAction = (state:number) =>{
    return {type:'CHANGE_FIRM_STATUS', payload:state}
}

export const changeASNstatusAction = (state:number)=>{
    return {type:'CHANGE_ASN_STATUS', payload:state}
}

export const changeASNrelayStateAction = (state:number) =>{
    return {type:'CHANGE_ASN_RELAY_STATUS', payload:state}
}

export const changeSKZIStatusAction = (state:number) =>{
    return{type:"CHANGE_SKZI_STATUS", payload:state}
}

export const changeProcuremetStatusAction = (state:number) =>{
    return {type: "CHANGE_PROCUREMENT_STATE", payload:state}
}

export const changeCardMakingStatusAction = (state:number) =>{
    return {type:'CHANGE_CARD_MAKING_STATE', payload:state}
}