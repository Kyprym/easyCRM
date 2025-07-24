import { User } from "../getDataFromDB"

interface sessionTokenList {
  userID:number;
  userSessionToken:string;
}


export const DBtokensList:sessionTokenList[] = [
  {
  userID: 1,
  userSessionToken:'1ijusdfbijsadfbjkbdfjks',
},
  {
  userID: 2,
  userSessionToken:'2ijusdfbijsadfbjkbdfjks',
},
  {
  userID: 3,
  userSessionToken:'3ijusdfbijsadfbjkbdfjks',
},
  {
  userID: 4,
  userSessionToken:'4ijusdfbijsadfbjkbdfjks',
},
{
  userID: 5,
  userSessionToken:'5ijusdfbijsadfbjkbdfjks',
}
]


export const getSessionToken = async (userID:number, tokenList:sessionTokenList[]):Promise<string> =>{
    
    if(userID){
      const sessionToken:string = tokenList[userID - 1].userSessionToken
      return sessionToken
    }
      return ''
}

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

export const tockenVerification = async (logPassList:User[], authToken:string):Promise<number> => {
  for(let i = 0; i<logPassList.length; i++){
    let DBtoken:string = Buffer.from(`${logPassList[i].user_email}:${logPassList[i].user_pass}`).toString('base64')
    if(DBtoken === authToken){
        return Number(logPassList[i].user_id)
      }
  }
  return 0
}

export const sessionTockenVerification = async (tockensList:sessionTokenList[], sessionToken:string):Promise<number> => {
  
  for(let i = 0; i < tockensList.length; i++){

    let DBsessionToken:string = await `"${tockensList[i].userSessionToken}"`
    let DBUserID:number = tockensList[i].userID
    if(DBsessionToken === sessionToken){

      return DBUserID
    }
  }
  return 0
} 
