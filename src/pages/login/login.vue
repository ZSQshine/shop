<template>
  <div class="wrap">
    <div class="box">
      <h2>登录</h2>
      <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      <el-input
        v-model="user.password"
        placeholder="请输入密码"
        type="password"
      ></el-input>

      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../../utils/request";
import {warningAlert,successAlert} from '../../utils/alter'
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // this.$router.push('/');
      //
      if ((this.user.username !== "") && (this.user.password !== "")) {
        //发起请求
        userLogin(this.user).then((res) => {
          successAlert(res.data.msg);
        //   将用户数据存入localStorage,如果已经有用户数据，先清空
        if(localStorage.getItem('user')!==null){
            localStorage.removeItem('user');
        }
        localStorage.setItem('user',JSON.stringify(res.data.list));
          this.$router.push("/");
        });
      } else {
        warningAlert("用户名密码不能为空");
      }
    },
  },
};
</script>

<style>
.wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #9900cc, #0000cc);
}
.box {
  width: 500px;
  height: 300px;
  border-radius: 20px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  text-align: center;
}
</style>