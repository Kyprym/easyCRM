import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

export const putIssueProductionStatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET production = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}



export const putWorkStatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET state = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows
        }else{
            return false
        }
    }catch(error){
        return false
    }
}


export const putContrAgentInIssue = async (config:mysql.ConnectionOptions, issueID:string, id:number): Promise<RowDataPacket[] | false | true > =>{

    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET contragent = ${id}`)
        await connection.end()
        if(rows){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueTheme = async (config:mysql.ConnectionOptions,issueKeyID:string, issueID:string, themeText:string): Promise<RowDataPacket[] | false | true > =>{

    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET theme = '${themeText}' WHERE (id = '${issueKeyID}');
`)
        await connection.end()
        if(rows){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueFirm = async (config:mysql.ConnectionOptions,issueKeyID:string, issueID:string, newFirmID:number): Promise<RowDataPacket[] | false | true > =>{

    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET firm = '${newFirmID}' WHERE (id = '${issueKeyID}');
`)
        await connection.end()
        if(rows){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const addIssueEvent = async (config:mysql.ConnectionOptions, issueID:string, eventData:any) =>{
   try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`INSERT INTO crmstorage.issueevents_${issueID} (responsibleUser, eventdate, userCreater, createDate, eventText, datetime_start, datetime_finish, status, action_type) VALUES ('${eventData.userResponsible}', '${eventData.dateTimeCreate}', '${eventData.userCreator}', '${eventData.dateTimeCreate}', '${eventData.eventText}', '${eventData.dateTimeStart}', '${eventData.dateTimeFinish}', '${eventData.state}', '${eventData.actionType}');`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}


export const changeIssueEvent = async (config:mysql.ConnectionOptions, issueID:string, eventData:any) =>{
    try{
         const connection: Connection = await mysql.createConnection(config)
         const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issueevents_${issueID} SET eventText = '${eventData.eventText}', responsibleUser = '${eventData.responsibleUser}', datetime_start = '${eventData.dateStart} ${eventData.startTime}:00', datetime_finish = '${eventData.dateFinish} ${eventData.finishTime}:00', status = '${eventData.status}', action_type = '${eventData.actionType}' WHERE (id = '${eventData.eventID}');`)
         await connection.end()
         if(rows.length >0){
             return rows;
         }else{
             return false
         }
     }catch(error){
         console.log(error)
         return false
     }
 }

 export const addNewComment = async (config:mysql.ConnectionOptions, commentData:any) =>{
    try {
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`INSERT INTO crmstorage.issuecomments_1 (user, createDate, text) VALUES ('${commentData.userID}', '${commentData.today}', '${commentData.commentText}');`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
         return false
    }
 }

 export const putIssuePaymentStatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET paymentstatus = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueASNStatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET asn_state = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueASNSrlaytatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET asn_retranslition = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueSKZIstatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET skzi_state = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssuechangeProcurementStatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET procurement_state = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssuechangeCardMakingStatus = async (config:mysql.ConnectionOptions, issueID:string, status:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET card_making_state = '${status}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssuechangeCity = async (config:mysql.ConnectionOptions, issueID:string, city:string, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET city = '${city}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssuechangeAddress = async (config:mysql.ConnectionOptions, issueID:string, address:string, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET address = '${address}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssuechangeMilage = async (config:mysql.ConnectionOptions, issueID:string, milage:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET milage = '${milage}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssuechangeDaysToWork = async (config:mysql.ConnectionOptions, issueID:string, days:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET days_to_work = '${days}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueInstallersCount= async (config:mysql.ConnectionOptions, issueID:string, days:number, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET installers_Count = '${days}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const putIssueDescription= async (config:mysql.ConnectionOptions, issueID:string, description:string, id:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`UPDATE crmstorage.issue_${issueID} SET description = '${description}' WHERE (id = '${id}');
`)
        await connection.end()
        if(rows.length >0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}