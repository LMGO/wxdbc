<template>
  <div>
<section class="aui-flexView">

    <section class="aui-scrollView">
        <div class="aui-well-comm">
            <div class="aui-well-comm-hd">
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3548528208,4052681942&fm=26&gp=0.jpg" alt="">

            </div>
            <div class="aui-well-comm-bd">
                <h4>
                    <span>孙璐璐同学</span>

                </h4>
                <p>大家好！我是孙璐璐，多多关照</p>
            </div>
        </div>
      <div class="Box" v-for="(item,index) in item" :key="index">
        <div class="heade">
          <li class="head">
            <img
              :src="item.head"
              alt
            >
          </li>
          <li class="leftt">{{item.detailed}}</li>
          <li class="rightt">{{item.give}}</li>
        </div>
        <div class="boxx">
          <p>{{item.name}}</p>
          <img :src="item.src" alt="">
        </div>
        <div class="footer">


        </div>
        <div style="margin-left: 10px;font-size: 12px" v-show="item.isShow">
          <div class="header">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885501626,4038102105&fm=26&gp=0.jpg" /> {{item.detailed}} 回复
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg" />王健林
          </div>

          <div class="box2">
            <p>现在很多APP现在很多APP现在很多</p>
          </div>
          <div>
            <span style="margin-right: 20px">2019-011-26</span>回复
          </div>
        </div>
      </div>
      <div class="wrapper" v-for="(item,index) in list" :key="index">
        <div class="header">
          <li class="head">
            <img
              :src="item.head"
              alt
            >
          </li>
          <li class="left">{{item.name}}  <span class="dogtype">{{item.type}}</span></li>
          <li class="right">{{item.give}}</li>
        </div>
        <div class="box">
          <img :src="item.src" alt="">
          <p>{{item.introduce}}</p>
        </div>
        <div class="foot">
          <li>
            <img src="../../../static/tabs/xihuan.png" alt>
          </li>
          <li>
            <img src="../../../static/tabs/xxx.png" class="pingLun" v-on:click="pingLun(index)"  alt>
          </li>

        </div>
        <div style="margin-left: 10px;font-size: 12px" v-show="item.isShow">
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
        </div>
      </div>

    </section>


</section>
  </div>
</template>

<script>
    import card from "@/components/card";

export default {
  data () {
    return {
        item:[{
            head:
                "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885501626,4038102105&fm=26&gp=0.jpg",
            src:"http://img3.imgtn.bdimg.com/it/u=3521956068,1126221871&fm=26&gp=0.jpg",
            detailed: "王健林",
            name: "现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动...",
            give: "刚刚",
            isShow:false,
        }],

        list: [

            {
                head:
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg",
                name: "李嘉诚",
                type: "金毛",
                introduce: "现在很多APP在用户截图时会自动...",
                give: "刚刚",
                src:"http://img3.imgtn.bdimg.com/it/u=3521956068,1126221871&fm=26&gp=0.jpg",
                isShow:false,
            },
            {
                head:
                    "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2745141664,3289119620&fm=26&gp=0.jpg",
                name: "刘强东",
                type: "金毛",
                introduce: "现在很多APP在用户截图时会自动...",
                give: "刚刚",
                src:"http://img3.imgtn.bdimg.com/it/u=3521956068,1126221871&fm=26&gp=0.jpg",
                isShow:false,
            },
            {
                head:
                    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3641923561,2449866930&fm=26&gp=0.jpg",
                name: "马云",
                introduce: "现在很多APP在用户截图时会自动...",
                give: "刚刚",
                type: "金毛",
                src:"http://img3.imgtn.bdimg.com/it/u=3521956068,1126221871&fm=26&gp=0.jpg",
                isShow:false,
            },
            {
                head:
                    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885501626,4038102105&fm=26&gp=0.jpg",
                name: "马化腾",
                introduce: "现在很多APP在用户截图时会自动...",
                give: "刚刚",
                type: "金毛",
                src:"http://img3.imgtn.bdimg.com/it/u=3521956068,1126221871&fm=26&gp=0.jpg",
                isShow:false,
            }
        ]
    }
  },

  components: {
    card
  },

  methods: {
      bindViewTap() {
          const url = "../logs/main";
          if (mpvuePlatform === "wx") {
              mpvue.switchTab({ url });
          } else {
              mpvue.navigateTo({ url });
          }
      },
      clickHandle(ev) {
          console.log("clickHandle:", ev);
          // throw {message: 'custom test'}
      },
      pingLun(msg){
          this.list[msg].isShow=!this.list[msg].isShow;
      },
      pingLun2(msg){
          this.item[msg].isShow=!this.item[msg].isShow;
      },
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

.Box .footer{
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(208, 208, 208);
}
.footer li{
  flex: 1;
  text-align: center;
}
.Box{
  padding: 10px;


}
.dogtype{
  display: inline-block;
  width: 60px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  border-radius: 40px;
  background: #00B0F0;
  text-align: center;
  margin-left: 30px;
}
.heade{
  display: flex;
  align-items: center;
}
.Box head{
  width: 50px;
}
.Box .box{
  text-align: center;
  width: 100%;
}
.Box .boxx img{

  width:96%;
  height: 250px;
}
.wrapper img{
  width:96%;
  height: 250px;
}
.Box .leftt{
  font-size: 16px;
  color: rgb(27, 27, 27);
  flex-grow: 3;
}
.Box .rightt{
  padding-right: 10px;
  font-size: 14px;
  color: rgb(54, 54, 54);
}
.header{
  display: flex;
  align-items:center;
}
.header img {
  border-radius: 50%;
}
.heade .head img{
  width: 50px;
  height: 50px;
}
.head img {
  width:40px;
  height: 40px;
  border-radius: 50%;

}
.head{
  width: 60px;
  text-align: center;
}
.foot li:nth-child(1){
  flex-grow: 1
}.foot li:nth-child(2){
   flex-grow: 6
 }
.Box p{
  font-size: 16px;
}
.box p{
  font-size: 12px;
}

.foot img{
  width: 20px;
  height: 20px;
}
.foot{
  padding-top: 10px;
  display: flex;
}
.right{
  font-size: 12px;
  color: rgb(131, 131, 132);
  flex-grow: 1;
}
.left{
  padding-left: 20px;
  flex-grow: 2;
  font-size: 14px;

}
.wrapper {
  padding: 10px;
  border-bottom: 1px  rgb(159, 158, 158) solid;
  border-radius: 15px;
}
.warp {
  display: flex;

}
/*img {*/
/*  width: 30px;*/
/*  height: 30px;*/
/*}*/




</style>
