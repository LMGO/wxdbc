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
          <img :src="pub.islike" @click="tolike(index)">
          <span style="margin-left: 10px;font-size:10px;color:rgb(131, 131, 132)">{{pub.likeSum}}</span>
          <img src="../../../static/tabs/xxx.png" height="20px" style="margin-left: 10px" @click="totalk(index)">
          <span style="margin-left: 10px;font-size:10px;color:rgb(131, 131, 132)">{{pub.commentCount}}</span>
      </div>
      
      <div  v-for="(comment,index2) in pub.comment" :key="index2" style="margin-left: 10px;font-size: 14px;border-top:1px solid gray;margin-top:5px;">
        <div class="header">
          <img :src="comment.userHead" /> 
          <span style="margin-left:10px;font-size:10px;">{{comment.userName}}</span>
          <span style="margin-left:45%;font-size:8px;">{{comment.commentDate}}</span>
        </div>
        <div class="box2">
          <p>{{comment.commentContent}}</p>
        </div>
      </div>
      <!-- 评论框 -->
            <div class="coment" v-show="talk">
              <textarea autofocus="autofocus" rows="6" v-model="comment_content" maxlength="200"></textarea>
              <button @click="toPubtalk()">发表</button>
              <button @click="quxiaotalk()">取消</button>
            </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";

export default {
  components: {
    card
  },

  data() {
    return {
      index:0,
      talk:false,
      comment_content: '',
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
    post:[]
    };
  },
  onLoad: function(options){
    let arr =JSON.parse(options.test)
    let user_id= options.user_id
    // console.log(arr);
     this.post = arr
    console.log(this.post.postingId)
    console.log(user_id)

  },
  methods: {
//获取该条帖子
	  getpost(){
		let that = this;
		console.log(that.$store.state.myInfo.user_id)
		that.$fly.get(that.url1+'/backend/comment/postingDetail', {
            userId: that.$store.state.myInfo.user_id,
            postingId:that.post.postingId
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
			for(let index in that.posting){
				for(let index2 in that.posting[index].comment){
					console.log(that.posting[index].comment[index2].userHead)
					that.posting[index].comment[index2].userHead = that.url+that.posting[index].comment[index2].userHead
				}
			}
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
           //点赞加分
           that.$fly.post(that.url1+'/backend/pet/upScore',that.$qs.stringify({
						userId: that.$store.state.myInfo.user_id,
						petId : that.posting[i].petId,
            }))
          .then(res=>{
            console.log(res)
            if(res.data.success){
              console.log("点赞加分！")
            }
          })
          .catch(err=>{
            console.log(err)
          })
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
         //取消点赞减分
           that.$fly.post(that.url1+'/backend/pet/downScore',that.$qs.stringify({
						userId: that.$store.state.myInfo.user_id,
						petId : that.posting[i].petId,
            }))
          .then(res=>{
            console.log(res)
            if(res.data.success){
              console.log("取消点赞减分！")
            }
          })
          .catch(err=>{
            console.log(err)
          })


      })
          .catch(err => {
            console.log(err);
          });
        //   that.posting[i].islike = require('../static/like.png') ;
        //   that.posting[i].likeSum -= 1;
        }
	  },
    totalk(i){
      this.index = i;
      this.talk = !this.talk;
    },
    quxiaotalk(){
      this.comment_content="";
      this.talk = !this.talk;
    },
     //发表评论
	  toPubtalk(){
		  let that = this;
			that.$fly.post(that.url1+'/backend/comment/addcomment',that.$qs.stringify({
				userId: that.$store.state.myInfo.user_id,
				postingId: that.posting[that.index].postingId,
				// time: that.$store.state.getTime(),
				commentContent: that.comment_content
			})
			)
			.then(res =>{
			console.log(res);
			if(res.data.Success){
				console.log("评论成功！");
			setTimeout(function(){
				wx.showToast({
            title:'发表成功！',
            icon:'success',
            duration: 500
        })
			},500)
			// that.posting[i].microComm += 1;
			that.comment_content = "";
			that.getpost();
			}
			else{
				setTimeout(function(){
				wx.showToast({
            title:'发表失败！',
            icon:'none',
            duration: 500
        })
			},500)
      }
        //评论加分
           that.$fly.post(that.url1+'/backend/pet/commentScore',that.$qs.stringify({
						userId: that.$store.state.myInfo.user_id,
						petId : that.posting[that.index].petId,
            }))
          .then(res=>{
            console.log(res)
            if(res.data.success){
              console.log("评论加分！")
            }
          })
          .catch(err=>{
            console.log(err)
          })



			
			})
			.catch(function (error) {
			console.log(error);
			});
      that.talk = !that.talk;
      that.comment_content=""
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
  height: 20px;
  font-size: 15px;
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
img {
  width: 30px;
  height: 30px;
}
.coment {
    position: fixed;
    top: 20vh;
    left: 50%;
    margin-left: -40vw;
    width: 80%;
    height: 210px;
    border: 1px solid #B2B2B2;
    border-radius: 10px;
    background-color: #fff;
    z-index: 9999999;
  }
  .coment textarea {
    position: relative;
    width: 68vw;
    height: 110px;
    margin: 15px 4vw 0;
    padding: 5px 2vw;
    border: 1px solid #E4E4E4;
    font-size: 15px;
    z-index: 99999999;
  }
  .coment button {
    width: 72vw;
    height: 28px;
    margin-top: 7px;
    font-size: 14px;
    line-height: 28px;
    background-color:  rgb(166, 248, 179);
  }
  .coment button:active {
    background-color: rgb(22, 241, 14);
  }
</style>
