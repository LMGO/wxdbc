import {MYINFO} from './mutation-type'

export default {
  [MYINFO](state, data){
    state.myInfo = data;
    console.log("我的自定义信息获取成功");
  }
  // setmyInfo(state, v) {
	// 	localStorage.setItem('myInfo', JSON.stringify(v));//将传递的数据先保存到localStorage中
	// 	state.myInfo = v;// 之后才是修改state中的状态
	// },

}
