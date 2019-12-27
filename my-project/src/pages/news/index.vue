<template>
  <div style="border-top:1px solid black" >
  <div style="margin-top:50rpx;border-bottom:1px solid gray;padding:10px">
    <div class="j-pic-upload">
      <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src" :style="{'width':width || '150rpx','height':height || '150rpx'}" class="img" >
      <div class="j-upload-btn" @click="selectImage()" :style="{'width':width || '150rpx','height':height || '150rpx'}">
        <span class="j-upload-add">+</span>
      </div>
    </div>
       <button class="login_submit" @click="add" >上传识别</button>
</div>
    <div class="" >
        <img class="head" :src="pet[0].petPhoto">
        <span style="margin:20px 0 5px 40%">{{pet[0].petName}}</span>
        <p style="font-size: 12px;margin-left:15px">{{pet[0].petDescription}}</p>
    </div>



  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";

export default {
  data() {
    return {
      urls:[],
      pet:[{
			// petName:"哈士奇",
			// petPhoto:this.url+'//images/default1.jpg',
			// petDescription:"哈哈哈哈哈哈啊哈哈哈或哈"
		}],
    }
  },
  components: {
    card
  },
  computed: {},
  methods: {
    add(){
      let that = this
      wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    duration: 5000
                  })
      for(let i = 0; i < that.urls.length; i ++){
      wx.uploadFile({
                url: that.url2+'/photo',
                filePath: that.urls[i], 
                name: 'file',
                header: { "Content-Type": "multipart/form-data" },
                // formData: {
                //   posting_id:posting_id
                // },
                success: function (res) {
                  let dogname = res.data
                  console.log(dogname+'名字')
                  //识别加分：
                    that.$fly.post(that.url1+'/backend/pet/classifyScore',that.$qs.stringify({
                      userId: that.$store.state.myInfo.user_id,
                      petId : dogname,
                      }))
                    .then(res=>{
                      console.log(res)
                      if(res.data.success){
                        console.log("识别加分！")
                      }
                    })
                    .catch(err=>{
                      console.log(err)
                    })

                  that.togetdog(dogname)//传给后端获取信息
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
    },
    //把返回的狗品种名传给后端获取狗的信息
		togetdog(i){
			console.log(i)
			let that = this
			let pet_type = i
			that.$fly.get(that.url1+'/backend/pet/querypet',{
						petId: pet_type
			})
			.then(res=>{
				console.log(res)
				console.log(res.data.information)
				this.petnull=true
				that.pet = res.data.information
				//赋值显示，并获取相关的帖子。
				console.log("获取相关的贴子")
				// this.getlinkedpost(pet_type)
			})
			.catch(err => {
				console.log(err)
			})
		},
    selectImage(){
          let that = this;
          wx.chooseImage({
            count: 1,
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
    takePictures () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        that.setData({
          attendSuccessImg: tempFilePaths[0]
        });

        // 上传图片
        //判断机型
        var model = "";
        wx.getSystemInfo({
          success: function (res) {
            var that = this;
            model = res.model;
          }
        })
        if (model.indexOf("iPhone") <= 0) {
          // that.uploadFileOpt(that.data.attendSuccessImg);
          console.log(111111)
        } else {
          drawCanvas();

        }

        // 缩放图片
        function drawCanvas() {
          const ctx = wx.createCanvasContext('attendCanvasId');
          ctx.drawImage(tempFilePaths[0], 0, 0, 94, 96);
          ctx.draw();
          that.prodImageOpt();
        }
      }
    });
  },
//生成图片
  prodImageOpt () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        that.setData({
          canvasImgUrl: res.tempFilePath
        });
        // 上传图片
        that.uploadFileOpt(that.data.canvasImgUrl);
      },
      complete: function complete(e) {
      }
    });
  },

  }
};
</script>

<style scoped>

.login_submit {
  display: block;
  width: 60%;
  height: 42px;
  margin-top: 30px;
  border-radius: 25px;
  background: rgb(250, 79, 79);
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}

.head {
  display: flex;
  margin-top:20px;
  padding: 0 0px;
  margin-left:28%;
  height: 150px;
  width: 150px;
}

.j-pic-upload{
    padding-left: 40%;
    padding-bottom: 25rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    /* border-bottom: 1px solid #E2E2E2; */
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



</style>
