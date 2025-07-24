import { Box, Stack, ThemeProvider } from "@mui/material"
import { StatusSelector } from "./issueFunctionalChildComponents/statusSelector"
import { ChangeContragentComponent } from "./issueFunctionalChildComponents/changeContragentComponent"
import { ChangeThemeComponent } from "./issueFunctionalChildComponents/changeThemeComponent"
import { useSelector } from "react-redux"

interface issueHeaderProps {
    issueID:string,
    theme:string,
}

export const IssueHeader = ({issueID}:issueHeaderProps)=>{
    const issueDataFromDB = useSelector((state:any) => state.issue.issue)
    const {issueData, productionStatuses, workStatus} = issueDataFromDB
    const production:number = issueData[0].production
    const issueKeyID:string = issueData[0].id
    const issueStatus:number = issueData[0].state
    const contragent = issueData[0].contragent

    return (
        <div style={{padding:"2rem 2rem 1rem 2rem", backgroundColor:"#e3e2e1"}}>
                <Stack 
            direction='row'
            spacing={2}
            justifyContent='left'
            alignContent='center'
            >
            <div>
             <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'primary.main'
        }}
      />
    </ThemeProvider>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>

        <ChangeThemeComponent
          issueID={issueID}
        />

            <StatusSelector
              selectorName={'Производство'}
              issueID={issueID}
              issueKeyID={issueKeyID}
              status={production}
              statusTextArr={productionStatuses}
              link={"productionStatus"}
            /> 
            <StatusSelector
              selectorName={'Статус'}
              issueID={issueID}
              issueKeyID={issueKeyID}
              status={issueStatus}
              statusTextArr={workStatus}
              link={"workStatus"}
            /> 
           
            <div> 
                <ChangeContragentComponent
                  issueID={issueID}
                  contragent={contragent}
                />
              </div>
        </div>
        </Stack>
    </div>
    )    
} 
