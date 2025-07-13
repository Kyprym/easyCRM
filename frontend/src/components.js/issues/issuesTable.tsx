import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { API_URL } from "../../DB/DBconfig"
import { useEffect, useState } from "react"
import { getIssueFromDB } from "../../DB/issueHTTPmethods"


export const IssuesTable = ()=>{

  const [issuesState, setIssuesState] = useState([])

  const issueURL:string = `${API_URL}/issues`

 
  
  const getIssues = async ()=>{
    const data = await getIssueFromDB(issueURL)
    if(data){
      setIssuesState(data)
    }
  }
  
  useEffect(()=>{
    getIssues()
  },[])
   
    return (
        <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Контрагент</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Дата</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Тема</TableCell>
           <TableCell align="center" sx={{fontWeight:"bolder"}}>Описание</TableCell>
           <TableCell align="center" sx={{fontWeight:"bolder"}}>Счёт №</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Клиент</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Статус</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Ответсвенный</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Общяя сумма</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Фирма</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Порядок оплаты</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Город</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Статус оборудования</TableCell>
            <TableCell align="center" sx={{fontWeight:"bolder"}}>Производство</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {issuesState.map((issue) => (
            <TableRow
              key={issue.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell align="center" sx={{fontWeight:"bolder"}}>{issue.contragent}</TableCell>
            <TableCell align="center">{issue.date}</TableCell>
            <TableCell align="center">{issue.theme}</TableCell>
           <TableCell align="center">{issue.description}</TableCell>
           <TableCell align="center">{issue.number}</TableCell>
            <TableCell align="center">{issue.client}</TableCell>
            <TableCell align="center">{issue.status}</TableCell>
            <TableCell align="center">{issue.manager}</TableCell>
            <TableCell align="center">{issue.cash} руб</TableCell>
            <TableCell align="center">{issue.firm}</TableCell>
            <TableCell align="center">{issue.paymentStatus}</TableCell>
            <TableCell align="center">{issue.city}</TableCell>
            <TableCell align="center">{issue.equipStatus}</TableCell>
            <TableCell align="center">{issue.production}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}