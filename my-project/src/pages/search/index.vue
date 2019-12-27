<template>
  <div class="counter-warp">
    <div class="headd">
      <div class="ss">
        <img src="../../../static/tabs/ss.png" alt>
      </div>
      <section class="login_message">
        <input placeholder="       爱宠搜索" v-model="name">
      </section>
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
        <li>
          <img src="../../../static/tabs/xihuan.png" alt>
        </li>
        <li>
          <img src="../../../static/tabs/xxx.png" alt>
        </li>
        
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
        <li class="left">{{item.name}}</li>
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
          <img src="../../../static/tabs/xxx.png" alt>
        </li>
        
      </div>
    </div>  
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";


export default {
  data() {
    return {
       item:[{
        head:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885501626,4038102105&fm=26&gp=0.jpg",
            src:"http://img3.imgtn.bdimg.com/it/u=3521956068,1126221871&fm=26&gp=0.jpg",
          detailed: "王健林",
          name: "现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动现在很多APP在用户截图时会自动...",
          give: "刚刚",
        
      }],
     
      list: [
        
        {
          head:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg",
          name: "李嘉诚",
          introduce: "现在很多APP在用户截图时会自动...",
          give: "刚刚"
        },
        {
          head:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2745141664,3289119620&fm=26&gp=0.jpg",
          name: "刘强东",
          introduce: "现在很多APP在用户截图时会自动...",
          give: "刚刚"
        },
        {
          head:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3641923561,2449866930&fm=26&gp=0.jpg",
          name: "马云",
          introduce: "现在很多APP在用户截图时会自动...",
          give: "刚刚"
        },
        {
          head:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1885501626,4038102105&fm=26&gp=0.jpg",
          name: "马化腾",
          introduce: "现在很多APP在用户截图时会自动...",
          give: "刚刚"
        }
      ]
    }
  },
  components: {
    
  },
  computed: {},
  methods: {
    

  }
};
</script>

<style scoped>
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
img {
  width: 30px;
  height: 30px;
}
.header img{
  width: 20px;
  height: 20px;
  padding-left: 5px;

}
.header .font{
    padding-left: 10px;

}
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
.header{
  height: 30px;
  width: 100%;
  font-size: 16px;
  /* border-bottom: 1px  rgb(159, 158, 158) solid; */
  display: flex;
  justify-content: center;
}
.warp_card{
  padding: 10px;
}
.warp{
  width: 100%;
  display:flex;
  border-bottom: 1px rgb(159, 158, 158) solid;
  
  
}
.warp_card p:nth-child(3){
  color: rgb(95, 95, 95)
}
.warp_card p{
  font-size: 12px;
}
.warp_card img{
 width: 106px;
 height: 80px;
}
.card{
  padding: 20px;
  font-size: 16px;
  float: left;

}
 .headd {
  display: flex;
  padding: 0 30px;
}
.ss{
  width: 30px;
  text-align: center;
  
}
.ss img{
  width: 30px;
  height: 30px;
  flex-grow: 1;position: relative;
  top: 5px;
  
            

}
input {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  

  font: 400 14px Arial;
}
.login_message {
  position: relative;
  height: 48px;
  font-size: 14px;
  background: #fff;
  flex-grow: 3;
  
}

</style>
