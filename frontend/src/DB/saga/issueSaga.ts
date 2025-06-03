import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import { changeASNrelayStateAction, changeASNstatusAction, changeCardMakingStatusAction, changeFirmStateAction, changePayStatusAction, changeProcuremetStatusAction, changeSKZIStatusAction, writeDataToStorage } from '../../store/actions.ts/issueActions';
import { getIssueFromDB } from '../issueHTTPmethods';
import { API_URL } from '../DBconfig';


interface ActionInterface{
  type:string;
  payload:string | number
}



export function* issueWorker(action:ActionInterface){
 const id:number = yield action.payload
 const data =  yield call(getIssueFromDB, `${API_URL}/issues/${id}`)
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
  ])
}



