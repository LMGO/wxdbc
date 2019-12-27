<template>
  <section class="loginContainer">
    <div class="registerInner">
      <div class="login_header">
        <h2 class="login_logo">识汪君</h2>
      </div>
      <div class="login_content">
        <form>
          <div >
            <section class="login_message">
              <input  placeholder="手机号" v-model="user_id" type="number" maxlength="11">
            </section>
            <section class="login_message">
              <input  placeholder="用户名" v-model="user_name" maxlength="15">
            </section>
            <section class="login_message">
              <input placeholder="密码" v-model="user_code" type="password" maxlength="10">
            </section>
            <section class="login_message">
              <input placeholder="请再输入一次密码" v-model="user_codeAgain" type="password" maxlength="10">
            </section>
            <section class="login_message">
                <picker @change="bindPickerChange" style="border: 1px solid #ddd;line-height: 38px" :value="index" :range="array">
                  <view class="picker">
                    <label style="color: #999;">点击选择性别：</label>
                    <label style="margin-left：25px;">{{array[index]}}</label>
                  </view>
                </picker>
            </section>
            <section class="login_hint">
                已有账号？去<span style="margin-left:15px;font-size:10px;color:red" @click="tologin()">登录</span>
            </section>
          </div>
          <button class="login_submit" @click="register()">注册</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import card from "@/components/card";
export default {
  data() {
    return {
      user_id: "",
      user_name:"",
      user_code: "",
      user_codeAgain: "",
      // user_sex:"",
      array: ['保密','男', '女'],
      index:0,
      // item:[
      //       { name: '男', checked: true},
      //       { name: '女', checked: false}
      //   ],
     
    };
  },

  components: {
    card
  },

  methods: {
   tologin(){
      wx.redirectTo({
        url:'../Login/main'
      })
    },
    bindPickerChange(e) {
        console.log(this.array[this.index])
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.index = e.mp.detail.value
        console.log(this.array[this.index])
    },
    register(){
        //表单验证，注册提示
        let that = this
        let user_id = that.user_id
        let user_code = that.user_code
        let user_codeAgain = that.user_codeAgain
        let user_name = that.user_name
        let user_sex = that.array[that.index]
        if(user_id==""||user_code==""||user_codeAgain==""||user_name==""){
            setTimeout(function(){
                wx.showToast({
                    title:'请填写相关信息！',
                    icon:'none',
                    duration: 1000
                  })
              },500)
        }else if(5>=user_code.length){
            setTimeout(function(){
                wx.showToast({
                    title:'密码长度过短！',
                    icon:'none',
                    duration: 1000
                  })
              },500)
        }
        else if(user_code!=user_codeAgain){
            setTimeout(function(){
                wx.showToast({
                    title:'两次输入的密码不一致！',
                    icon:'none',
                    duration: 1000
                  })
              },500)
        }
        else{
          that.$fly.get(that.url+"/users/reg", that.$qs.stringify({
				    user_id: that.user_id,
            user_code: that.user_code,
            user_name: that.user_name,
            user_sex: user_sex
			}))
          .then(res => {
          if(res.data.status==1){
              setTimeout(function(){
                wx.showToast({
                    title:'注册成功！',
                    icon:'success',
                    duration: 1000
                  })
              },500)
            that.user_id=""
            that.user_code=""
            that.user_codeAgain=""
            that.user_name=""
            that.index = 0
          }
          else if(res.data.status==2){
            setTimeout(function(){
                wx.showToast({
                    title:'该账号已注册！',
                    icon:'none',
                    duration: 1000
                  })
              },500)
          }
          else{
              setTimeout(function(){
                wx.showToast({
                    title:'注册失败！',
                    icon:'none',
                    duration: 1000
                  })
              },500)
          }
            }).catch(res => {
              console.log(res)
            })
        }
    }
    
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.rightPhone {
                color: black;
              }
.get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;}
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
}
.registerInner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}

.login_header .login_logo {
  font-size: 30px;
  font-weight: bold;
  color: #6e6f6f;
  text-align: center;
}
.login_header div{
  display: flex;
  width: 100%;
  height: 70px;
  padding-top: 35px;
  
}
.login_header li{
  margin: auto
  
}
.login_header  img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  justify-content: center;
  
}


.login_message input {
  color: black;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;

  font: 400 14px Arial;
}

.login_message {
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
  width: 100%;
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
