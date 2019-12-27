<template>
  <div>
    <!-- <div class="warp">
      <div @click="add">
        <img src="../../../static/tabs/fatie.png" alt>
        <br>
        <li>发帖</li>
      </div>
      <div @click="app">
        <img src="../../../static/tabs/sousuo.png" alt>
        <br>
        <li>搜索</li>
      </div>
    </div> -->
    <div class="wrapper" v-for="(pub,index) in posting" :key="index">
      <div class="header">
        <li class="head">
          <img :src="pub.userHead">
        </li>
        <span class="left">{{pub.userName}}</span>
        <span class="center">{{pub.petName}}</span>
        <span class="right">{{pub.postingTime}}</span>
      </div>
      <div>
        <p style="font-size: 12px;">{{pub.postingContent}}</p>
      </div>
      <div class="imag">
          <img v-for="(image,index1) in pub.postingpic" :key="index1" class="imge"   :src="image.postingPic"/>
      </div>
      <div class="foot">
          <!-- <img :src="pub.islike" @click="tolike(index)">
          <span style="margin-left: 10px;font-size:10px;color:rgb(131, 131, 132)">{{pub.likeSum}}</span>
          <img src="../../../static/tabs/xxx.png" height="20px" style="margin-left: 10px" @click="totalk(index)">
          <span style="margin-left: 10px;font-size:10px;color:rgb(131, 131, 132)">{{pub.commentCount}}</span>-->
        <li @click="todetail(index)">
          查看详情<img style="margin-left: 10px" src="../../../static/tabs/zhankai.png">
        </li> 
      </div>
      
      <!-- <div style="margin-left: 10px;font-size: 14px" v-show="item.isShow">
        <div class="header">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885501626,4038102105&fm=26&gp=0.jpg" /> {{item.name}} 回复
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg" />王健林
        </div>

        <div class="box2">
          <p>现在很多APP现在很多APP现在很多</p>
        </div>
        <div>
          <span style="margin-right: 20px">2019-011-26</span>回复
        </div>
      </div> -->
    </div>
     <!-- 发表按钮 -->
      <pub></pub>  
  </div>
</template>

<script>
import pub from "@/components/pub"
import { formatTime } from "@/utils/index";
import card from "@/components/card";

export default {
  components: {
    card,
    pub
  },

  data() {
    return {
      test:[],
      posting:[
			// {
			// 	userHead:this.url+'//images/default1.jpg',
			// 	// user_head:require("../assets/dog1.jpg"),
			// 	userName: '爱宠之家',
			// 	postingTime:'2019-12-8.19.58.43',
			// 	petName:'泰迪（贵宾犬，贵妇犬，卷毛狗）fffff ffffff ffff fffffff fffffff',
			// 	postingContent:'天气真好，适合带狗狗出去散步',
			// 	postingpic:[
			// 		{
      //       // postingPic:require("../assets/dog1.jpg")
      //       postingPic:this.url+'//images/default1.jpg'
			// 		},
			// 		{
			// 			postingPic:this.url+'//images/default1.jpg',
			// 		},
			// 		{
			// 			postingPic:this.url+'//images/default1.jpg',
      //     },
      //     {
			// 			postingPic:this.url+'//images/default1.jpg',
			// 		},
			// 		{
			// 			postingPic:this.url+'//images/default1.jpg',
			// 		}
			// 	],
			// 	commentCount:50,
			// 	islike:"../../static/icon/like.png",//根据true或false赋值
			// 	likeSum:15,
			// 	comment:[
			// 		{
			// 			userHead:"../../static/icon/like.png",
			// 			userName:'么么哒',
			// 			commentContent:'哈哈哈哈哈',
			// 			commentDate:'2019-12-31'
			// 		},
			// 		{
			// 			userHead:"../../static/icon/like.png",
			// 			userName:'么么哒',
			// 			commentContent:'哈哈哈哈哈',
			// 			commentDate:'2019-12-31'
			// 		}
			// 	]
			// }
		],
    };
  },
  methods: {
    todetail(i){
      let test =  JSON.stringify(this.posting[i])
      let user_id =this.$store.state.myInfo.user_id
      let petId = this.posting[i].petId
      
      console.log(petId)
    // console.log(test)
    let that = this
    that.$fly.post(that.url1+'/backend/pet/viewScore',that.$qs.stringify({
						userId: that.$store.state.myInfo.user_id,
						petId : petId,
            }))
          .then(res=>{
            console.log(res)
            if(res.data.success){
              console.log("浏览加分！")
            }
          })
          .catch(err=>{
            console.log(err)
          })
     wx.navigateTo({
        url:'../detailed/main?test='+test+'&user_id='+user_id,
      })
    },
//获取用户帖子
	  getpost(){
		let that = this;
		console.log(that.$store.state.myInfo.user_id)
		that.$fly.get(that.url1+'/backend/comment/listall', {
						userId: that.$store.state.myInfo.user_id
				}
		)
		.then(res => {
			console.log(res)
			console.log(res.data.postingList)
			that.posting = res.data.postingList.reverse()
			//处理用户头像和帖子图片
			for(let index in that.posting){
				for(let index1 in that.posting[index].postingpic){
					console.log(that.posting[index].postingpic[index1].postingPic)
					that.posting[index].postingpic[index1].postingPic = that.url+that.posting[index].postingpic[index1].postingPic
				}
				that.posting[index].userHead =  that.url+that.posting[index].userHead
			}
			//处理评论里头像
			// for(let index in that.posting){
			// 	for(let index2 in that.posting[index].comment){
			// 		console.log(that.posting[index].comment[index2].userHead)
			// 		that.posting[index].comment[index2].userHead = that.url+that.posting[index].comment[index2].userHead
			// 	}
			// }
			//处理点赞显示
			for(let index in that.posting){
				console.log(that.posting[index].islike)
				if(that.posting[index].islike == true){
					that.posting[index].islike = "../../static/icon/like-active.png"
					console.log(that.posting[index].islike)
				}
				else{
					that.posting[index].islike = "../../static/icon/like.png"
					console.log(that.posting[index].islike)
				}
			}
		})
		.catch(err => {
			console.log(err)
			setTimeout(function(){
                  wx.showToast({
                      title:'获取帖子失败！',
                      icon:'none',
                      duration: 1000
                  })
              },500)
		})

    },
    tolike(i){
		let that = this
		if(that.posting[i].islike == "../../static/icon/like.png"){
			 that.$fly.get(that.url1+'/backend/comment/insertlike',{
					userId: that.$store.state.myInfo.user_id,
					postingId: that.posting[i].postingId
			})
      .then(res => {
			console.log(res)
			console.log(res.data)
			console.log(res.data.like)
			if(res.data.like){
				console.log("点赞成功！");
			that.posting[i].islike =  "../../static/icon/like-active.png" 
			that.posting[i].likeSum += 1
			// that.getpost()
			}else{
				console.log("点赞失败！");
			}
			// that.posting[i].islike = require('../static/like-active.png') ;
         	// that.posting[i].likeSum += 1;
          })
          .catch(err =>{
			        console.log(err);
          });
		}
		else{
          // 取消点赞
        console.log(that.posting[i].islike);
          that.$fly.get(that.url1+'/backend/comment/deletelike',that.$qs.stringify({
					userId: that.$store.state.myInfo.user_id,
					postingId: that.posting[i].postingId
		  }))
          .then(res => {
			console.log(res.data.cancelLike)
			if(res.data.cancelLike){
				console.log("取消点赞！");
				that.posting[i].islike = "../../static/icon/like.png"
				that.posting[i].likeSum -= 1
				// that.getpost()
			}else{
				console.log("取消点赞失败！");
			}
          })
          .catch(err => {
            console.log(err);
          });
        //   that.posting[i].islike = require('../static/like.png') ;
        //   that.posting[i].likeSum -= 1;
        }

	  },
    
  },
  onShow(){
     let _this=this;
      _this.getpost();
    },

};
</script>

<style scoped>

/* .foot li:nth-child(1){
  flex-grow: 1
}.foot li:nth-child(2){
  flex-grow: 6
}
.foot li:nth-child(3){
  flex-grow: 1
} */

.box2{
  height: 40px;
}
.foot img{
  width: 20px;
  height: 20px;
}
.foot{
margin-left: 65%;
display: flex;
}


.wrapper {
  margin: 10px;
  padding: 5px;
  border:rgb(216, 213, 213) 1px solid;
  border-radius: 15px;
  
}
.header{
  display: flex;
  align-items:center;
  height: 45px ;
}
.header img {
  border-radius: 50%;
  
}
.head img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.head{
  width: 50px;
  text-align: center;
}
.right{
  margin-left: 50px;
  width:200px;
  font-size: 8px;
  color: rgb(131, 131, 132);
  flex-grow: 1;
}
.left{
  margin-left: 5px;
  width:200px;
  flex-grow:1;
  font-size: 15px;
}
.center{
  width: 300px;
  font-size:12px;
  color: cornflowerblue;
  flex-grow: 1;
  height: 15px;
  overflow: hidden;
}
.imag{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    vertical-align: middle;
  }
  .imag .imge{
    width: 31.333%;
    height: 20vw;
    margin: 1% ;
    overflow: hidden;
    float: left;
    border-radius: 5px;
  }



.warp div {
  width: 50%;
  text-align: center;
  padding: 20px;
}
.warp {
  display: flex;
   border-bottom: 1px  rgb(159, 158, 158) solid;
}
img {
  width: 30px;
  height: 30px;
}
</style>
