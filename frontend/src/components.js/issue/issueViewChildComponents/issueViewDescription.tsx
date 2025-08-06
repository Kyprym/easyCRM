import { IssueDescriptionChangeWindow } from "./IssueDescriptionChangeWindow"

export const IssueViewDescription = ({descriptionText, issueID}:{descriptionText:string, issueID:number}) =>{
    
    return (<>
        <div style={{
                    display:'flex',
                    flexDirection:"column",
                    fontSize:"1.5rem",
                    padding:'1rem',
                    marginLeft:"1rem",
                    marginRight:"1rem",
                    borderRadius:"15px",
                    marginBottom:"0.5rem",
                    boxShadow:"10px 5px 20px black",

                }}>
                    <span>Описание</span>
                    <hr/>
                    <div style={{
                        height:"80%",
                        maxWidth:"30rem"
                    }}>{descriptionText}</div>
                   
                    
                <IssueDescriptionChangeWindow
                    issueID={issueID}
                    descriptionText={descriptionText}
                />
               
               
                </div>
                </>
                )
}