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