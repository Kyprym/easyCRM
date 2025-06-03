const date = new Date

export const getLowText = (text:string, resultTextLength:number):string=>{
    if(text.length > resultTextLength){
        const resultText:string = `${text.slice(0,resultTextLength)}...`
        return resultText
    }else{
        return text
    }
    
}

export const getLowName = (userName:string):string =>{
    let lowName:string = `${userName[0]}`

        for(let i = 0; i<userName.length; i++){
            if(userName[i] === " "){
                lowName += userName[i+1]
            }
        }
        lowName = lowName.toUpperCase()
    return lowName
}

export const getLowList = (companentsList:object[], length:number)=>{
    if(companentsList.length > length){
        const LowCompanentsList:object[] = []
        for(let i=0; i<length; i++){
            LowCompanentsList.push(companentsList[i])
        } 
        return LowCompanentsList
    }else{
        return companentsList
    }
    
}

export const getMoscowTime = (utcTime: string): string => {
    const time: string = utcTime.slice(-5);
    const [hours, minutes] = time.split(":").map(Number);
    const newHour = (hours + 3) % 24;
    const date: string = `${utcTime.slice(0, 10)} ${String(newHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return date;
};


export const getOnlyYY_MM_DD = (date:string):string=>{
    const resultDate = date.slice(0,10)
    return resultDate
}


export const correctDate = (value:string | number)=>{
    let date:string = String(value)
    if(date.length <2){
        return `0${date}`
    }else{
        return date
    }
  }


export const today:{date:string, time:string} = 
    {
        date:`${date.getFullYear()}-${correctDate(date.getMonth()+1)}-${correctDate(date.getDate())}`,
        time:`${correctDate(date.getHours())}:${correctDate(date.getMinutes())}`
    }