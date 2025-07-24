export interface historyData{
    user_creater_id:number;
    create_time:string;
    action_type:string;
    icon:JSX.Element
}

const hostoryChildComonentStyle:React.CSSProperties = {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    padding:"2rem, 0.5rem, 0.5rem, 2rem",
    fontSize:"2rem",
    margin:'0.5rem'
}


const dateTimeStyle = {
    fontSize:"1rem",
    marginLeft:'0.8rem'
}






export const IssueHistoryChildComponent = ({user_creater_id, create_time, action_type, icon}:historyData):JSX.Element => {



    return(<>
        <div style={hostoryChildComonentStyle}>
            <div style={{display:"flex", flexDirection:"row"}}>
                {icon}
                <div>
                    <span style={dateTimeStyle}>{create_time}</span>
                    <div >
                        <span style={{paddingLeft:"0.5rem"}}> Пользователь {user_creater_id}</span>
                        <span style={{paddingLeft:"0.5rem"}}>{action_type}</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}