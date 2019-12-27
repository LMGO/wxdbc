import {MYINFO} from './mutation-type'
// import listData from '../datas/list-data'

export default {

  getMyInfo({commit}, data){
    commit(MYINFO, data)
  },
}