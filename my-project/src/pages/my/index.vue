<template>
  <div>
<section class="aui-flexView">

    <section class="aui-scrollView">
        <div class="aui-well-comm">
            <div class="aui-well-comm-hd">
                <img :src="user_head">
                <span class="aui-well-comm-vip">
                    <img src="../../../static/tabs/icon-vip.png" alt="">
                </span>
            </div>
            <div class="aui-well-comm-bd">
                <h4>
                    <span>{{user_name}}</span>

                </h4>
                <p>大家好！我是孙璐璐，多多关照</p>
            </div>
            <span class="aui-comm-sign">已签到</span>
        </div>
        <div class="aui-grids">
            <a href="collection.html" class="aui-grids-item">
                <span>1220</span>
                <span class="aui-grids-item-text">收藏</span>
            </a>
            <a href="friends.html" class="aui-grids-item">
                <span>9236</span>
                <span class="aui-grids-item-text">关注</span>
            </a>
            <a href="friends.html" class="aui-grids-item">
                <span>190</span>
                <span class="aui-grids-item-text">粉丝</span>
            </a>
        </div>
        <div class="divHeight"></div>






        <div class="divHeight"></div>
        <div class="aui-head-access b-line" v-for="(item,index) in list" :key="index" @click="add(index)">
            <div class="aui-head-access-hd" @click="userCenter" >{{item.name}}</div>
            <span class="aui-head-access-fr"><img src="../../../static/tabs/yjt.png" alt=""></span>
        </div>


    </section>


</section>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
        user_head:this.url+this.$store.state.myInfo.user_head,
        user_name:this.$store.state.myInfo.user_name,
     list:[
       {name:"个人资料",link:"userCenter"},
       // {name:"我收到的赞"},
       // {name:"我收到的评论"},
       // {name:"我发布的帖子"},
       // {name:"我的识别记录"},
       // {name:"我点过赞的帖子"},
       {name:"安全退出",link:"exit"},
     ]
    }
  },

  components: {
    card
  },

  methods: {
    add(index){
     if (index==0) {
         wx.navigateTo({
             url:'../update/main'
         })
         console.log("index")
     } else if(index==1) {
         wx.redirectTo({
             url:'../Login/main'
         })
     }
        console.log(index)


    },
    userCenter(){

    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.aui-head-access-fr img{
  width: 20px;
  height: 20px;
}
.aui-head-access-fr {
    text-align: right;
    color: #666666;
    position: relative;
    font-size: 16px;
}
.aui-head-access-hd {
    flex: 1;
    font-size: 15px;
    color: #333333;
}
.aui-head-access {
    padding: 12px 15px;
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px #e4e2e2 solid;

}
a {
    color: #666;
}
.aui-grids-item .aui-grids-item-text {
    color: #999999;
    font-size: 16px;
    padding-top: 4px;
}
.aui-grids-item span {
    text-align: center;
    width: 100%;
    display: block;
    color: #323232;
}
.aui-grids-item {
    width: 33.333%;
    float: left;
    position: relative;
    z-index: 0;
    padding: 0.4rem 0;
    font-size:16px;
    text-align: center;
    color: #fff;
}
.aui-grids {
    position: relative;
    overflow: hidden;
    text-align: center;
}
.aui-comm-sign {
    display: block;
    border: none;
    color: #fff;
    border-radius: 20px;
    font-size: 16px;
    padding: 5px 10px;

    background-color: #fe5a69;
}

.aui-well-comm-bd h4 {
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
    color: #333;
    padding-bottom: 10px;
}

.aui-well-comm-bd p {
    color: #808080;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;

}
.aui-well-comm-bd h4 em {
    font-style: normal;
    color: #fff;
    background: #fdb829;
    border-radius: 2px;
    /* height: 29px; */
    padding: 1px 5px;
    font-size:16px;
}
.icon {
    width: 20px;
    height: 20px;
    display: block;
    border: none;
    float: left;
    background-size: 20px;
    background-repeat: no-repeat;
}

.aui-well-comm-bd h4 span {
    float: left;
}
.aui-well-comm-bd h4 {
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
    color: #333;
    padding-bottom: 10px;
}
.aui-well-comm-bd {

    flex: 1;
    min-width: 0;
}
.aui-well-comm-vip img {
    border-radius: 100%;
}
.aui-well-comm-vip {
    position: absolute;
    bottom: -7px;
    right: -7px;
    width: 20px;
    height: 20px;
    border: 1px solid #fff;
    border-radius: 100px;
}
.aui-well-comm-hd img {
    width: 100%;
    max-height: 100%;
    vertical-align: top;
    border-radius: 100%;
}
.aui-well-comm-hd {
    margin-right: .8em;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: relative;
}
.aui-well-comm {
    padding: 15px;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.aui-scrollView {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    margin-top: 0;
    padding-bottom: 10px;
}
.divHeight {
    width: 100%;
    height: 10px;
    background: #f7f7f7;
    position: relative;
    overflow: hidden;
}

.aui-head-access-hd {
    flex: 1;
    font-size: 15px;
    color: #333333;
}






</style>
