<template>
  <section class="loginContainer">
    <div class="loginInner">

      <div class="login_content">
        <form>
          <div>
            <div class="aui-well-comm-hd">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3548528208,4052681942&fm=26&gp=0.jpg" alt="">

            </div>
            <span style="position: absolute;left: 110px;top: 70px">上传头像</span>
            <span style="position: absolute;left: 180px;top: 70px" @click="add1">修改密码</span>
            <section class="login_message">
              <picker @change="bindPickerChange" style="border: 1px solid #ddd;line-height: 38px" :value="index" :range="array">
                <view class="picker">
                  当前选择：{{array[index]}}
                </view>
              </picker>
            </section>
            <section class="login_message">
              <input placeholder="昵称" v-model="name">
            </section>

            <section class="login_message">
              <input   placeholder="个性签名" v-model="phone">
            </section>

          </div>

          <button class="login_submit" @click="add" >修改</button>
        </form>
      </div>
    </div>
      <alert :alertText="alertText" v-if="alertShow" @closeTip="closeTip"></alert>
    <div v-if="alertShow1" @closeTip="closeTip1" style="position: fixed;top: 10%;left: 0;padding:20px;right: 0;margin: 0 auto;width: 60%;height: 150px;border:1px solid #ddd; background: rgb(255,255,255);z-index: 99">
      <input placeholder='输入密码' v-model='pwd' style="border: 1px solid #ddd;height: 40px;margin: 10px 0;">
      <input placeholder='再次输入密码' v-model='pwd' style="border: 1px solid #ddd;height: 40px;">
      <button class="login_submit" @click="closeTip1" >确认修改</button>
    </div>
  </section>
</template>

<script>
    import card from "@/components/card";
    import alert from "@/components/alert";

    export default {
        data() {
            return {
                name: "", //用户
                pwd: "",
                alertText:"<input placeholder='密码' v-model='pwd'>",
                alertShow:false,
                alertShow1:false,
                array: ['保密','男', '女'],
                index:0
            };
        },

        components: {
            card,
            alert
        },

        methods: {
            add() {
                this.alertShow = true
            },
            closeTip() {
                this.alertShow = false

            },
            add1() {

                this.alertShow1 = true
            },
            closeTip1(){
                this.alertShow1 = false
            },
            created() {
                // let app = getApp()
            },
            bindPickerChange(e) {
                console.log(e)
                // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
                this.index = e.mp.detail.value
            }
        }
    }
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
    background: transparent;
  }
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
  .login_header div {
    display: flex;
    width: 100%;
    height: 70px;
    padding-top: 35px;
  }
  .login_header li {
    margin: auto;
  }
  .login_header img {
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
  .login_message:nth-child(5) {
    position: relative;
    margin-top: 16px;

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
</style>
