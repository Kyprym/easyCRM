import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import { changeAddressTextAction, changeASNrelayStateAction, changeASNstatusAction, changeCardMakingStatusAction, changeCityStateAction, changeDayToWorkValueAction, changeDescriptionTextAction, changeFirmStateAction, changeInstallerCountValueAction, changeMilageTextValueAction, changePayStatusAction, changeProcuremetStatusAction, changeSKZIStatusAction, writeDataToStorage } from '../../store/actions.ts/issueActions';
import { getIssueFromDB } from '../issueHTTPmethods';
import { API_URL } from '../DBconfig';


export interface ActionInterface{
  type:string;
  payload:string | number
}



export function* issueWorker(action:ActionInterface){
 const id:number = yield action.payload
 const data = yield call(getIssueFromDB, `${API_URL}/issues/${id}`)
 yield put(writeDataToStorage(data))
}

export function* watchGetIssue(){
  yield takeEvery("ASYNC_GET_ISSUE", issueWorker)
}

export function* changePayStatusWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changePayStatusAction(payload))
}

export function* changePayStatusWatcher(){
  yield takeEvery('ASYNC_CHANGE_PAY_STATUS', changePayStatusWorker)
}

export function* changeFirmStatusWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeFirmStateAction(payload))
}

export function* changeFirmStatusWatcher(){
  yield takeEvery('ASYNC_CHANGE_FIRM_STATE', changeFirmStatusWorker)
}

export function* changeASNstatusWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeASNstatusAction(payload))
}

export function* changeASNstatusWatcher(){
  yield takeEvery('ASYNC_CHANGE_ASN_STATUS', changeASNstatusWorker)
}

export function* changeASNrelayStatusWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeASNrelayStateAction(payload))
}

export function* changeASNrelayStatusWatcher(){
  yield takeEvery('ASYNC_CHANGE_ASN_RELAY_STATUS', changeASNrelayStatusWorker)
}

export function* changeSKZIstatusWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeSKZIStatusAction(payload))
}

export function* changeSKIZIstatusWatcher(){
  yield takeEvery('ASYNC_CHANGE_SKZI_STATUS', changeSKZIstatusWorker)
}

export function* changeProcurementStatusWorker(action:ActionInterface){
  const payload:number = yield action.payload 
  yield put(changeProcuremetStatusAction(payload))
}

export function* changeProcurementStatusWatcher(){
  yield takeEvery('ASYNC_CHANGE_PROCUREMENT_STATE', changeProcurementStatusWorker)
}

export function* changeCardeMakingStateWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeCardMakingStatusAction(payload))
}

export function* changeCardMakingStateWatcher(){
  yield takeEvery('ASYNC_CHANGE_CARD_MAKING_STATE', changeCardeMakingStateWorker)
}

export function* changeCityStateWorker(action:ActionInterface){
  const payload:string = yield action.payload
  yield put(changeCityStateAction(payload))
}

export function* changeCityStateWotcher(){
  yield takeEvery('ASYNC_CHANGE_CITY_STATE', changeCityStateWorker)
}

export function* changeAddressTextWorker(action:ActionInterface){
  const payload:string = yield action.payload
  yield put(changeAddressTextAction(payload))
}

export function* changeAddressTextWatcher(){
 yield takeEvery('ASYNC_CHANGE_ADDRESS_STATE', changeAddressTextWorker)
}

export function* changeMilageValueWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeMilageTextValueAction(payload))
}

export function* changeMilageValueWatcher(){
  yield takeEvery('ASYNC_CHANGE_MILAGE_STATE', changeMilageValueWorker)
}

export function* changeDaysToWorkWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeDayToWorkValueAction(payload))
}

export function* changeDaysToWorkWatcher(){
  yield takeEvery('ASYNC_CHANGE_DAYS_TO_WORK_STATE', changeDaysToWorkWorker)
}

export function* changeInstallersCountWorker(action:ActionInterface){
  const payload:number = yield action.payload
  yield put(changeInstallerCountValueAction(payload))
}

export function* changeInstallerWatcher(){
  yield takeEvery('ASYNC_CHANGE_INSTALLERS_COUNT_STATE', changeInstallersCountWorker)
}


export function* changeDescriptionWorker(action:ActionInterface){
  const payload:string = yield action.payload
  yield put(changeDescriptionTextAction(payload))
}

export function* changeDescriptionWatcher(){
  yield takeEvery('ASYNC_CHANGE_ISSUE_DESCRIPTION', changeDescriptionWorker)
}
export function* rootWatcher(){
  yield all([
    fork(watchGetIssue),
    fork(changePayStatusWatcher),
    fork(changeFirmStatusWatcher),
    fork(changeASNstatusWatcher),
    fork(changeASNrelayStatusWatcher),
    fork(changeSKIZIstatusWatcher),
    fork(changeProcurementStatusWatcher),
    fork(changeCardMakingStateWatcher),
    fork(changeCityStateWotcher),
    fork(changeAddressTextWatcher),
    fork(changeMilageValueWatcher),
    fork(changeDaysToWorkWatcher),
    fork(changeInstallerWatcher),
    fork(changeDescriptionWatcher),
  ])
}



