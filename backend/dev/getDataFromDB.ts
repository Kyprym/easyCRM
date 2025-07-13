import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

export interface User{
    user_id:number ;
    user_login: string;
    user_pass: string;
    user_email: string;
}


export const getUsersLogPassArrFromDB = async (config: mysql.ConnectionOptions): Promise<User[]> => {
  try {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM crmstorage.users');
    await connection.end();

    if (Array.isArray(rows) && rows.length > 0) {
      return rows as User[];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getIssues = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute('SELECT * FROM issues')
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

export const getIssueTable = async (config:mysql.ConnectionOptions, issueID:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`SELECT * FROM issue_${issueID}`)
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

export const getIssueCalendarEventsTable = async (config:mysql.ConnectionOptions, issueID:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`SELECT * FROM issueevents_${issueID} ORDER BY id DESC`)
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

export const getIssueCommentsTable = async (config:mysql.ConnectionOptions, issueID:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`SELECT * FROM issuecomments_${issueID} ORDER BY id DESC`)
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}


export const getProductionStatusTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * from productionstatus")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const  getIssueWorksStatus = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * from issueworksstatus")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}
export const  getFirmsTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * from firms")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}


export const  getPayStatusesTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * from payStatuses")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const  getContragentID= async (config:mysql.ConnectionOptions, contragentID:number): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`select name from contragents where id = ${contragentID}`)
        await connection.end()
        if(rows.length >=0){
            return rows[0].name;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}


export const  getChunckContragent= async (config:mysql.ConnectionOptions, chunck:string): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute(`SELECT * FROM contragents WHERE name LIKE '%${chunck}%'`)
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const  getUsers= async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute('SELECT * FROM crmstorage.users')
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const getEventsStatuses = async (config: mysql.ConnectionOptions): Promise<RowDataPacket[] | false> =>{
    try {
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute('SELECT * FROM crmstorage.event_statuses')
        await connection.end()
        if(rows.length >= 0){
            return rows
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

export const getEventActionTypes = async (config: mysql.ConnectionOptions):Promise<RowDataPacket[] | false> => {
    try {
        const connection: Connection = await mysql.createConnection(config)
        const [rows]: [RowDataPacket[], object] = await connection.execute('SELECT * from crmstorage.evet_action_types')
        await connection.end()
        if(rows.length >=0){
            return rows
        }else{
            return false
        }
    } catch (error) {  
        return false
    }
}

export const getASNStatusesTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * FROM crmstorage.asn_statuses")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const getASNrelayStatusesTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * FROM crmstorage.asn_relay_statuses")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const getSKIZItatusesTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * FROM crmstorage.skzi_statuses")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const getProcurementStatusesTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * FROM crmstorage.procurement_statuses")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

export const getCardMakingStateTable = async (config:mysql.ConnectionOptions): Promise<RowDataPacket[] | false > =>{
    try{
        const connection: Connection = await mysql.createConnection(config)
        const [rows]:[RowDataPacket[], object] = await connection.execute("SELECT * FROM crmstorage.card_making_state")
        
        await connection.end()
        if(rows.length >=0){
            return rows;
        }else{
            return false
        }
    }catch(error){
        return false
    }
}







