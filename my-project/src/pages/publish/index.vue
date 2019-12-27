<template>
  <div class="loginContainer">
    <div class="pub">
      <picker @change="bindPickerChange"  style="border: 1px solid #ddd;line-height: 30px"  :value="index" :range="couponList" :range-key="'name'">
        <view class="picker" >
          帖子类型：
          <span style="color:blue;font-size:12px">{{couponList[index].name}}</span>
        </view>
      </picker>
      <!-- 发表内容填写框 -->
    <div class="content">
      <textarea v-model="pubposting_content" type="text" placeholder="分享你的生活吧" rows="5" maxlength="200"></textarea>
    </div>
     <!-- 本地图片添加区 -->
    <div class="j-pic-upload">
      <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src" :style="{'width':width || '150rpx','height':height || '150rpx'}" class="img" >
      <div class="j-upload-btn" @click="selectImage()" :style="{'width':width || '150rpx','height':height || '150rpx'}">
        <span class="j-upload-add">+</span>
      </div>
    </div>
    <!-- 发表按钮 -->
    <button @click="publish">发表</button>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
export default {
  data() {
    return {
      myinfo: this.$store.state.myInfo,
      index:0,
      urls:[],
      pubposting_content:'',
      couponList:[
          {
						name: '其它'
					},
				{
						name: '金毛犬（黄金猎犬，金毛寻回犬）'
					},
					{
						name: '泰迪（贵宾犬，贵妇犬，卷毛狗）'
					},
					{
						name: '猴犬（阿芬平斯澈犬，猴面梗，艾芬品）'
					},
					{
						name: '阿富汗猎犬（喀布尔犬）'
					},
					{
						name: '万能梗（梗王，河畔犬，宾格利犬，艾里梗）'
					},
					{
						name: '秋田犬（日本秋田犬/日系秋田犬）'
					},
					{
						name: '阿拉斯加雪橇犬（阿拉斯加犬、阿拉斯加马拉缪特、阿拉斯加马拉穆）'
					},
					{
						name: '美国爱斯基摩犬'
					},
					{
						name: '美国猎狐犬'
					},
					{
						name: '美国斯塔福郡梗'
					},
					{
						name: '美国水猎犬'
					},
					{
						name: '安纳托利亚牧羊犬'
					},
					{
						name: '澳大利亚牧牛犬（澳大利亚牧牛犬、昆士兰脚跟犬）'
					}
				],

    };
  },

  // components: {
  //   card,
  //   alert
  // },
  mounted(){
        this.urls = this.srcs || [];
    },
  methods: {
     //获取选中的帖子类型
	   bindPickerChange(e) {
        console.log(this.couponList[this.index])
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.index = e.mp.detail.value
        console.log(this.couponList[this.index].name)
    },
       selectImage(){
          let that = this;
          wx.chooseImage({
            count: that.max || 9,
            sizeType: ['original','compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              that.urls = res.tempFilePaths;
            }
          })
        },
        previewImg(index){
          let that = this;
          wx.showActionSheet({
            itemList:["预览","删除"],
            success: function(res) {
              if(res.tapIndex === 0){
                wx.previewImage({
                  current:that.urls[index],
                  urls:that.urls
                });
              } else {
                that.urls.splice(index,1);
                that.$emit("delete",that.urls);
              }
            },
          });
        },
         // 发表帖子
        publish(){
          let that = this;
          let posting_id = that.$store.state.getPid()
          let petName= that.couponList[that.index].name
          console.log(petName)
          console.log(posting_id)
          console.log(that.$store.state.myInfo.user_id)
          wx.showToast({
              icon: "loading",
              title: "正在上传"
            });
          that.$fly.get(that.url1+"/backend/comment/chinesetoenglish", that.$qs.stringify({
                 petName: petName
          }))
          .then(res=>{
					console.log(res.data)
					console.log("你好呀")
          let pet_chinesename = res.data.petId
          that.$fly.post(this.url+"/post/newpost",that.$qs.stringify({
            posting_id: posting_id,
						user_id: that.$store.state.myInfo.user_id,
						pet_id : pet_chinesename,
						posting_content : that.pubposting_content,
						posting_time: that.$store.state.getTime()
            })
          )
          .then(function (response) {
            console.log(response);
          if(response.data.status==2){
            for(let i = 0; i < that.urls.length; i ++){
              wx.uploadFile({
                url: that.url+"/post/postingpic",
                filePath: that.urls[i], 
                name: 'file',
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                  posting_id:posting_id
                },
                success: function (res) {
                     that.pubposting_content=''
                  console.log(res);
                  if (res.statusCode != 200) { 
                    wx.showModal({
                      title: '提示',
                      content: '上传失败',
                      showCancel: false
                    })
                    return;
                  }
                  var data = res.data;
                },
                fail: function (e) {
                  console.log(e);
                  wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                  })
                },
                complete: function () {
                   //隐藏Toast
                }
              })
            }
            //发帖加分
                    that.$fly.post(that.url1+'/backend/pet/postingScore',that.$qs.stringify({
                      userId: that.$store.state.myInfo.user_id,
                      petId : pet_chinesename,
                      }))
                    .then(res=>{
                      console.log(res)
                      if(res.data.success){
                        console.log("发帖加分！")
                      }
                    })
                    .catch(err=>{
                      console.log(err)
                    })
            // 返回
            wx.hideToast();
            wx.navigateBack({
              delta: 1
            });
            wx.showToast({
              title:'发表成功！',
              icon:'success',
              duration: 1000
            });
          }
            that.posting_content = ""
          })
          .catch(function (error) {
            console.log(error);
            wx.showToast({
              title:'发表失败！',
              icon:'success',
              duration: 1000
            });
          });

          })
          .catch(err=>{
            console.log(err)
          })	

          
        }  

  }
}
</script>

<style scoped>
.content{
    margin-top: 10px;
    min-height: 100px;
    border:1px solid gray;
    border-bottom: none;
  }
  .content input{
    width: 95%;
    height: 40px;
    margin: 2px 2.5%;
    font-size: 17px;
    line-height: 40px;
    border-bottom: 1px solid #E4E4E4;
  }
  .content textarea{
    width: 95%;
    height: 90px;
    margin: 12px 2.5%;
    font-size: 16px;
  }
.pub {
  margin: 10px auto ;
  width: 80%;
  
}
.j-pic-upload{
    padding-left: 49rpx;
    padding-bottom: 25rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #E2E2E2;
  }
  .j-upload-btn{
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
  }
  .j-upload-add{
    font-size: 80rpx;
    font-weight: 500;
    color:#C9C9C9;
  }
  .img{
    margin:10rpx 20rpx 10rpx 0;
  }
  .img:last-child{
    margin:10rpx 0 10rpx 0;
  }
  button{
    position: relative;
    top: 20px;
    width: 90%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    background-color: #dcf8de;;
    margin: 0 auto;
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    text-align:center;
  }
  button:active{
    background-color: rgb(255, 248, 248);
  }
input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;

  font: 400 14px Arial;
}
.login_message:nth-child(2) {
  position: relative;
  margin-top: 16px;
  height: 150px;
  font-size: 14px;
  background: #fff;
}
.login_message {
  position: relative;
  margin-top: 16px;
  height: 40px;
  font-size: 14px;
  background: #fff;
}

.login_verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}

.login_hint {
  margin-top: 12px;
  color: #999;
  font-size: 14px;
  line-height: 20px;
}

.login_submit {
  display: block;
  width: 80%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #404040;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}

.about_us {
  display: block;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
  color: #999;
}
</style>
