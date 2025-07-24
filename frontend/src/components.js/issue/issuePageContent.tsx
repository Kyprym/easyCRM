import { Tab, Tabs} from "@mui/material"
import { useEffect, useState } from "react";
import { IssueInformationComponent } from "./issueInformation";
import { IssueView } from "./issueView";
import { IssueHistoryComponent } from "./issueHistory/issueHistoryComponent";


export const IssuePageContent = ({issueID}:{issueID:string})=>{
    
    const [tabsState, setTabsState] = useState(0);
    
    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabsState(newValue);
      };

      useEffect(()=>{
        
      }, [tabsState])

   

    const informationTab:JSX.Element = <IssueInformationComponent
                            issueID={issueID}
                        />
    const issueViewTab:JSX.Element = <IssueView
        issueID={issueID}
    />
    const issueHistory:JSX.Element = <IssueHistoryComponent/>

    return (
        <>
        <div style={{width:"100%", height:"3rem", backgroundColor:"#e3e2e1", margin:"1rem 0rem 1rem 0rem"}}>
            <Tabs value={tabsState} onChange={tabChange} sx={{display:"flex", justifyContent:'flex-start'}}>
                <Tab label="Информация" />
                <Tab label="Просмотр" />
                <Tab label="История" />
                <Tab label="Комментарии" />
            </Tabs>
        </div>

        <div>
        {
        tabsState === 0?informationTab:
        tabsState === 1? issueViewTab: 
        tabsState === 2? issueHistory:
        tabsState === 3? "ВКЛАДКА КОММЕНТОВ":<></>
        }
        </div>
        </>
    )
}