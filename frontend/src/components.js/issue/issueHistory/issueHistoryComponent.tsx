import { useSelector } from "react-redux"
import { historyData, IssueHistoryChildComponent } from "./issueHistoryChildComponent"
import { nanoid } from "nanoid"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SavingsIcon from '@mui/icons-material/Savings';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CommentIcon from '@mui/icons-material/Comment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HailIcon from '@mui/icons-material/Hail';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const iconStyle = {
    paddingTop:"1rem",
    fontSize:'3rem',
    color:"#007FFF",
}

const creatIssue = <SavingsIcon style={iconStyle}/>
const calendarIcon = <CalendarMonthIcon style={iconStyle}/>
const editEventCalendarIcon = <EditCalendarIcon style={iconStyle}/>
const createCommentIcon = <CommentIcon style={iconStyle}/>
const changeProductionStateIcon = <PrecisionManufacturingIcon style={iconStyle}/>
const changePlanStateIcon = <ChecklistIcon style={iconStyle}/>
const changeFirmStateIcon = <ApartmentIcon style={iconStyle}/>
const changePaymentStateIcon = <CurrencyRubleIcon style={iconStyle}/>
const changeASNstateIcon = <SatelliteAltIcon style={iconStyle}/>
const ASNretranslationStateIcon = <CompareArrowsIcon style={iconStyle}/>
const changeSkziStateIcon = <SelectAllIcon style={iconStyle}/>
const changeDepShopStateIcon =<ShoppingCartIcon style={iconStyle}/>
const changeCityIcon = <LocationCityIcon style={iconStyle}/>
const changeAddresIcon = <HomeIcon style={iconStyle}/>
const changeMilage = <EditRoadIcon style={iconStyle}/>
const changeDayIcon =<LightModeIcon style={iconStyle}/>
const changeCountWorker = <PersonAddAltIcon style={iconStyle}/>
const changeDescriptionIcon = <BorderColorIcon style={iconStyle}/>
const changeContragentIcon = <HailIcon style={iconStyle}/>
const changeThemeIcon = <EditNoteIcon style={iconStyle}/>
const changeCartStateIcon = <CreditCardIcon style={iconStyle}/>
const historyIconArr = [
    creatIssue,
    calendarIcon,
    editEventCalendarIcon,
    createCommentIcon,
    changeProductionStateIcon,
    changePlanStateIcon,
    changeFirmStateIcon,
    changePaymentStateIcon,
    changeASNstateIcon,
    ASNretranslationStateIcon,
    changeSkziStateIcon,
    changeDepShopStateIcon,
    changeCityIcon,
    changeAddresIcon ,
    changeMilage,
    changeDayIcon,
    changeCountWorker,
    changeDescriptionIcon ,
    changeContragentIcon,
    changeThemeIcon,
    changeCartStateIcon
]

export const IssueHistoryComponent = ():JSX.Element =>{
    
    const state = useSelector((state:any)=>state.issue.issue )
    const historyStatusesTable:[] = state.histoRyStatuses
    const historyList:[] = state.issueHistory
    const userList:[] = state.users

    return (<>
            <div>
                {historyList.map((history:historyData) =>{
                    const actionType:number = Number(history.action_type)
                    const user:number = Number(history.user_creater_id)
                    return <span key={nanoid()}>
                        <IssueHistoryChildComponent
                            create_time={history.create_time}
                            action_type={historyStatusesTable[actionType - 1].actyon_type_text}
                            user_creater_id={userList[user - 1].user_login}
                            icon={historyIconArr[actionType - 1]}
                    />
                    </span>
                })}
            </div>
    </>)
}