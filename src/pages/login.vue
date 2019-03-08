<template>
  <div class="login">
    <div class="box">
      <div class="content">
        <input ref="username" v-required type="text" v-focus placeholder="请输入账号" v-model="username">
        <input
          v-required
          ref="password"
          type="password"
          placeholder="请输入密码"
          v-model="password"
          v-on:keyup.enter="login"
        >
        <div class="submit" @click="login">登 录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "@/assets/js/api";
export default {
  beforeRouteEnter(to, from, next) {
    if (!!localStorage.getItem("token")) next({ name: "home" });
    else next();
  },
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    checkForm() {
      if (!!this.username == false) {
        this.$refs.username.style.border = "1px solid red";
        return false;
      } else if (!!this.password == false) {
        status = false;
        this.$refs.password.style.border = "1px solid red";
        return false;
      }
      return true;
    },
    async login() {
      if (this.checkForm()) {
        try {
          let data = await Login({
            username: this.username,
            password: this.password
          });
          localStorage.setItem("token", data.body);
          this.$parent
            .changeAuthAsync("消息：添加权限")
            .then(some => console.log(some));
          this.$router.replace({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  .box {
    background-color: white;
    border-radius: 4px;
    opacity: 0.95;
    width: 400px;
    margin: 30px auto;
    .header {
      // height: 100px;
      font-size: 15px;
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      &::before {
        content: "";
        width: 100%;
        position: absolute;
        height: 1px;
        background-color: $gray3;
        top: 80px;
        left: 0;
      }
      .avatar {
        position: relative;
        width: 80px;
        height: 80px;
        margin: 40px auto;
        border-radius: 50%;
        background-color: $main;
        text-align: center;
        line-height: 80px;
        font-size: 50px;
        box-shadow: 0 0 0 15px white;
      }
    }
    .content {
      display: flex;
      flex-flow: column nowrap;
      padding: 20px 20px 40px;
      input {
        border: 1px solid $gray3;
        height: 50px;
        padding: 0 15px;
        border-radius: 4px;
        background-color: transparent;
        margin: 15px 0;
        outline: none;
        &:focus {
          border-color: $main;
        }
      }
      .submit {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        border-radius: 4px;
        background: $gray3;
        text-align: center;
        margin: 15px 0;
        font-size: 24px;
        color: white;
        cursor: pointer;
        &:hover {
          background: $main;
        }
      }
    }
  }
}
</style>
