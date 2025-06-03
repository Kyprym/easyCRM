import { nanoid } from "nanoid"
import { ViewInformationString } from "./viewInformationString"

export const ViewInformationBox = ({boxName, dataArray}:{boxName:string,dataArray:any[]})=>{


    return (<div style={{backgroundColor:"rgb(227, 226, 225)"}}>
        <div style={{
            display:'flex',
            fontSize:"1.5rem",
            padding:'1rem',
            marginLeft:"1rem",
            marginRight:"1rem",
            borderRadius:"15px",
            marginBottom:"0.5rem",
            boxShadow:"10px 5px 20px black"
            }}>

                <div>
                <span>{boxName}</span>
                <hr/>
                {dataArray.map((item)=>{
                    return <span key={String(nanoid())}>
                        <ViewInformationString
                    data={item}
                />
                    </span>
                })}
                </div>
            
            </div>

            
    </div>)
} 