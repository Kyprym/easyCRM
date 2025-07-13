import { User } from "../getDataFromDB"

export const correctDate = (value:string | number)=>{
    let date:string = String(value)
    if(date.length <2){
        return `0${date}`
    }else{
        return date
    }
  }
export const getMSKDate = (datetime:number) => {
    return '01'
}

export const tockenVerification= async (logPassList:User[], authToken:string) => {
  for(let i = 0; i<logPassList.length; i++){
    let DBtoken:string = Buffer.from(`${logPassList[i].user_email}:${logPassList[i].user_pass}`).toString('base64')
    if(DBtoken === authToken){
        return Number(logPassList[i].user_id)
      }
  }
  return 0
}
