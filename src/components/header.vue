<template>
  <div class="header-content">
    <div class="avatar" @click="$router.push({name:'login'})">
      <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="'#icon-' + animal"></use>
      </svg>
    </div>
    <div class="motto" @click="clearToken">
      <p>不管在什么阶段，在什么年龄，全心全意地做事，不虚度时光，人生才有价值。</p>
    </div>
    <div class="nav">
      <router-link tag="a" to="/">首&nbsp;&nbsp;&nbsp;&nbsp;页</router-link>
      <!-- <router-link tag="p" to="/doc">文&nbsp;&nbsp;&nbsp;&nbsp;档</router-link> -->
      <!-- <router-link tag="a" to="/resume">简&nbsp;&nbsp;&nbsp;&nbsp;历</router-link> -->
      <a href="/resume.html" target="_blank" rel="noopener noreferrer">简&nbsp;&nbsp;&nbsp;&nbsp;历</a>
      
      <a
        href="http://interview.peichenhu.cn"
        target="_blank"
        rel="noopener noreferrer"
      >面&nbsp;&nbsp;&nbsp;&nbsp;试</a>
      
      <a href="https://github.com/pch1024" target="_blank" rel="noopener noreferrer">Github</a>
    </div>
    <div class="email">
      <p>Email: pch1024@outlook.com</p>
    </div>
    <!-- footer -->
    <div class="footer2">
      <c-footer/>
    </div>
  </div>
</template>

<script>
import cFooter from "@/components/footer.vue";
export default {
  data() {
    return {
      animals: [
        "banma",
        "niu",
        "laohu",
        "zhu",
        "xiongmao",
        "shizi",
        "xiaoji",
        "pangxie",
        "kaola",
        "nainiu",
        "huhou",
        "jingyu",
        "ciwei",
        "huli",
        "hema",
        "lu",
        "daxiang",
        "maotouying",
        "gongji",
        "lang"
      ]
    };
  },
  computed: {
    animal() {
      return this.animals[Math.floor(Math.random() * this.animals.length)];
    }
  },
  components: { cFooter },
  methods: {
    clearToken() {
      localStorage.clear();
      this.$parent
        .changeAuthAsync("消息：退出权限")
        .then(data => console.log(data));
    }
  }
};
</script>

<style <style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
$avatarSize: 100px;
.header-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-end;
  padding: 30px;
  // height: 100%;
  width: 100%;
  > div {
    margin: 15px 0;
  }

  .avatar {
    width: $avatarSize;
    height: $avatarSize;
    border-radius: 50%;
    background: white;
    text-align: center;
    line-height: $avatarSize;
    font-size: $avatarSize * 0.6;
  }
  .motto {
    width: 100%;
  }
  .motto p {
    text-align: right;
  }
  .nav a {
    display: block;
    font-size: 18px;
    margin: 5px 0;
    border-bottom: dotted 1px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #33cccc;
      border-bottom: 1px dotted transparent;
    }
  }
  .nav .router-link-exact-active {
    color: #33cccc;
    border-bottom: 1px dotted #33cccc;
  }
  .footer2 p {
    text-align: right;
    color: gray;
  }

  @include phoneStyle {
    align-items: center;
    padding: 15px;
    .footer2 {
      display: none;
    }
    .nav {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      a {
        margin: 15px;
      }
    }
    .motto p {
      text-align: center;
    }
  }
}
</style>
