import { useSelector } from "react-redux"
import { ViewInformationBox } from "./issueViewChildComponents/viewInformationBox"
import { IssueViewDescription } from "./issueViewChildComponents/issueViewDescription"
import { StatusSelector } from "./issueFunctionalChildCompanents/statusSelector"
import { ChangeFirmSelector } from "./issueFunctionalChildCompanents/changeFirmSelector"
import { nanoid } from "nanoid"





export const IssueView = ({issueID}:{issueID:string})=>{
    const issue:object = useSelector(state=>state.issue.issue)
    const issueKeyID:string = issue.issueData[0].id
    const firmList:object[] = issue.firmsList
    const issueNumber:string = issue.issueData[0].number
    const craeteDate:string = issue.issueData[0].craeteDate
    const manager:string = issue.issueData[0].manager
    const firm:number = Number(issue.issueData[0].firm)
    const payStatusesList:[] = issue.payStatusesList
    
    const paymentStatus:number = issue.issueData[0].paymentStatus
    const city:string = issue.issueData[0].city
    const address:string = issue.issueData[0].address
    const milage:number = issue.issueData[0].milage
    const daysToWork:number = issue.issueData[0].days_to_work
    const installersCount:number = issue.issueData[0].installers_Count


    const asnState:number = issue.issueData[0].asn_state
    const ASNStatusesList:[] = issue.ASNStatuses 
    const asnRlayState:number = issue.issueData[0].asn_retranslition
    const asnRelayStatusesList:[] = issue.ASNrelayStatuses
    const SKZIstate:number = issue.issueData[0].skzi_state
    const SKIZIstatusesList:[] = issue.SKZIstatuses
    const procurementState:number = issue.issueData[0].procurement_state
    const procurementStatusesList:[] = issue.procurementStatuses
    const cardMakingState:number = issue.issueData[0].card_making_state
    const cardMakingStatusesList:[] = issue.cardMakingStatuses

    const issueDescription:string = issue.issueData[0].description

    const paymentStatusSelector:JSX.Element = <StatusSelector
                        key={nanoid()}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={paymentStatus}
                        statusTextArr={payStatusesList}
                        link={'changeIssuePayStatus'}
                        actionType={'ASYNC_CHANGE_PAY_STATUS'}
                     />

    const firmStatusSelector:JSX.Element = <ChangeFirmSelector
        key={nanoid()}
        issueID={issueID}
        issueKeyID={issueKeyID}
        firm={firm}
        firmsList={firmList}
    />

    const ASNStatusSelector:JSX.Element = <StatusSelector
                        key={nanoid()}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={asnState}
                        statusTextArr={ASNStatusesList}
                        link={'changeASNStatus'}
                        actionType="ASYNC_CHANGE_ASN_STATUS"
                     />

    const ASNrelayStatusSelector:JSX.Element = <StatusSelector
                        key={nanoid()}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={asnRlayState}
                        statusTextArr={asnRelayStatusesList}
                        link={'changeASNrelayStatus'}
                        actionType={"ASYNC_CHANGE_ASN_RELAY_STATUS"}
                     />
    const SKZIstatusesSlector:JSX.Element = <StatusSelector
                        key={nanoid()}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={SKZIstate}
                        statusTextArr={SKIZIstatusesList}
                        link={'changeSKZIstatus'}
                        actionType={"ASYNC_CHANGE_SKZI_STATUS"}
                     />

    const procurementStatusesSlector:JSX.Element = <StatusSelector
                        key={nanoid()}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={procurementState}
                        statusTextArr={procurementStatusesList}
                        link={'changeProcurementState'}
                        actionType={'ASYNC_CHANGE_PROCUREMENT_STATE'}
                     />
    const cardMkingStatusesSelector:JSX.Element = <StatusSelector
                        key={nanoid()}
                        issueID={issueID}
                        issueKeyID={issueKeyID}
                        status={cardMakingState}
                        statusTextArr={cardMakingStatusesList}
                        link={'changeCardMakingStatus'}
                        actionType={'ASYNC_CHANGE_CARD_MAKING_STATE'}
                     />


    const issueInformationArr = [
        {title:'Счёт №', information:`M${String(issueNumber)}`},
        {title:'Дата  создания', information:craeteDate},
        {title:'Ответственный', information:issue.users[manager].user_login},
        {
            title:'Фирма',
            information:firmList[firm].firmName,
            selectorState:true,
            selector:firmStatusSelector
        },
        {
            title:"Статус Оплаты",
            selectorState:true,
            selector:paymentStatusSelector 
        }
        ]

    const installLocation = [
        {title:'Город', information:city},
        {title:'Адрес', information:address},
        {title:'Км. до клиента', information:milage},
        {title:'Суток без ночёвок', information:daysToWork},
        {title:'Колличество монтажников', information:installersCount},
       ]
    
    const preporationData = [
        {
            title:'АСН',
            selectorState:true,
            selector:ASNStatusSelector
        },
        {
            title:"ЭРА-ГЛОНАСС ретрансляция", 
            selectorState:true,
            selector:ASNrelayStatusSelector
        },
        {
            title:"Активация СКЗИ",
            selectorState:true,
            selector:SKZIstatusesSlector
        },
        {
            title:"Отдел закупки",
            selectorState:true,
            selector:procurementStatusesSlector
        },
        {
            title:"Изготовление карт",
            selectorState:true,
            selector:cardMkingStatusesSelector
        },  
    ] 



    return (<div
            style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, auto)',
                    gap: '10px'
                }}
    >
        <ViewInformationBox
            boxName={'Информация о счёте'}
            dataArray={issueInformationArr}
        />
        <ViewInformationBox
            boxName="Место монтажа"
            dataArray={installLocation}
        />
        <ViewInformationBox
            boxName={'Подготовка'}
            dataArray={preporationData}
        />
        <IssueViewDescription
            descriptionText={issueDescription}
        /> 
    </div>)
}