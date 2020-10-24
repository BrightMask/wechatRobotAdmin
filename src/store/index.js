/*
 * @Date: 2020-06-05 10:02:30
 * @LastEditors: Austin.Xu
 * @LastEditTime: 2020-06-05 10:23:51
 * @FilePath: /project/src/store/index.js
 */ 
import { CombineReducers, combineReducers} from 'redux'

import {Common} from './redux/reducer/common'

export default combineReducers({
    Common
})