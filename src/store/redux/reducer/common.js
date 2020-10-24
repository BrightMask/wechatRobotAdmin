/*
 * @Date: 2020-06-05 10:02:55
 * @LastEditors: Austin.Xu
 * @LastEditTime: 2020-06-09 21:05:32
 * @FilePath: /project/src/store/redux/reducer/common.js
 */ 
import { ActionTypes, Status } from '../ActionTypes'

const initialState = {
    type:  ActionTypes.BASE,
    data: {},
    status: Status.INIT
}
export function Common (state=initialState, action) {

    switch(action.reduceType) {
        case ActionTypes.BASE: 
            return Object.assign({}, state, {
                type: action.type,
                data: action.data,
                status: action.status
            })
        default:
            return state
    }
}