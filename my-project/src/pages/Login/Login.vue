<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">识汪君</h2>
        <div>
          <li>  <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3548528208,4052681942&fm=26&gp=0.jpg" alt=""></li>
        </div>
      </div>
      <div class="login_content">
          <form>
            <div >
              <section class="login_message">
                <input  placeholder="手机号" v-model="user_id" maxlength="11"> 
              </section>
              <section class="login_verification">
                <input placeholder="密码" v-model="user_code" type="password" maxlength="10">
              </section>
              <section class="login_hint">
                无账号？去<span style="margin-left:15px;font-size:10px;color:red" @click="toregister">注册</span>
              </section>
            </div>

            <button class="login_submit" @click="login()">登录</button>
          </form>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user_id: "",
      user_code: ""
    }
  },
  methods: {
    login(){
        //表单验证，登录提示
        let that = this
        if(that.user_id==""||that.user_code==""){
            setTimeout(function(){
                wx.showToast({
                    title:'账号或密码为空！',
                    icon:'none',
                    duration: 1000
                  })
              },500)
        }
        else{
          that.$fly.get(that.url+"/users/login", {
            
                user_id: that.user_id,
                user_code: that.user_code
              
            })
          .then(res => {
            if(res.data.status==1){
              setTimeout(function(){
                  wx.showToast({
                      title:'用户名或密码错误！',
                      icon:'none',
                      duration: 1000
                  })
              },500)
            }
            else if(res.data.status==2){
            setTimeout (() => {
              wx.switchTab({url:'../index/main' });
              wx.showToast({
                    title:'登录成功！',
                    icon:'success',
                    duration: 100
                })
              }, 500)
              // that.$store.state.myInfo = res.data.data[0];
              let myInfo = res.data.data[0]
              that.$store.dispatch('getMyInfo', myInfo);//更新userInfo
              console.log(that.$store.state.myInfo);
              that.user_id=""
              that.user_code=""
            }
            else{
              setTimeout(function(){
                  wx.showToast({
                      title:'登录失败！',
                      icon:'none',
                      duration: 1000
                  })
              },500)
            }
            }).catch(err => {
            console.log(err)
            setTimeout(function(){
                  wx.showToast({
                      title:'系统异常！',
                      icon:'none',
                      duration: 1000
                  })
              },500)
            })
          }
	  },
    toregister(){
      wx.navigateTo({
        url:'../register/main'
      })
    },
  },
  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
}
.loginInner {
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


input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;

  font: 400 14px Arial;
}

.login_message {
  position: relative;
  margin-top: 16px;
  height: 48px;
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
.pickerCon{
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
