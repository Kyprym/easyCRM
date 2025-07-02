interface Action{
    type:string,
    payload:any
}
const defaultState:any = {
    issue:[]
}


export const issueReducer = (state = defaultState, action:Action)=>{    

    switch (action.type) {
        case 'WRITE_DATA_TO_STORAGE':
            return { ...state, issue: action.payload };
        case "CHANGE_PAY_STATUS":          
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], paymentStatus:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }
        case 'CHANGE_FIRM_STATUS':
                try {
                    return {
                        ...state, 
                            issue:{
                                issueData:[{
                                        ...state.issue.issueData[0], firm:action.payload
                                  }],
                                  issueEvents:state.issue.issueEvents,
                                  issueComments:state.issue.issueComments,
                                  productionStatuses:state.issue.productionStatuses,
                                  workStatus:state.issue.workStatus,
                                  firmsList:state.issue.firmsList,
                                  payStatusesList:state.issue.payStatusesList,
                                  users:state.issue.users,
                                  ASNStatuses:state.issue.ASNStatuses,
                                  ASNrelayStatuses:state.issue.ASNrelayStatuses,
                                  SKZIstatuses:state.issue.SKZIstatuses,
                                  procurementStatuses:state.issue.procurementStatuses,
                                  cardMakingStatuses:state.issue.cardMakingStatuses,
                        }
                    }
                } catch (error) {
                    return state
                };
        case "CHANGE_ASN_STATUS":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], asn_state:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            };
        case "CHANGE_ASN_RELAY_STATUS":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], asn_retranslition:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            };
        case "CHANGE_SKZI_STATUS":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], skzi_state:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            };
        case "CHANGE_PROCUREMENT_STATE":
            try {
                return {
                     ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], procurement_state:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }
        case "CHANGE_CARD_MAKING_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], card_making_state:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }
        case "CHANGE_CITY_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], city:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }     
        case "CHANGE_CARD_MAKING_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], card_making_state:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }
        case "CHANGE_ADDRESS_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], address:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }
        case "CHANGE_MILAGE_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], milage:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }  
        case "CHANGE_DAYS_TO_WORK_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], days_to_work:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            }
        case "CHANGE_INSTALLERS_COUNT_STATE":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], installers_Count:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            } 
         case "CHANGE_ISSUE_DESCRIPTION":
            try {
                return {
                    ...state,
                    issue:{
                        issueData:[{
                            ...state.issue.issueData[0], description:action.payload
                        }],
                        issueEvents:state.issue.issueEvents,
                        issueComments:state.issue.issueComments,
                        productionStatuses:state.issue.productionStatuses,
                        workStatus:state.issue.workStatus,
                        firmsList:state.issue.firmsList,
                        payStatusesList:state.issue.payStatusesList,
                        users:state.issue.users,
                        ASNStatuses:state.issue.ASNStatuses,
                        ASNrelayStatuses:state.issue.ASNrelayStatuses,
                        SKZIstatuses:state.issue.SKZIstatuses,
                        procurementStatuses:state.issue.procurementStatuses,
                        cardMakingStatuses:state.issue.cardMakingStatuses,
                    }
                }
            } catch (error) {
             return state
            } 
        default:
            return state;
    }
}