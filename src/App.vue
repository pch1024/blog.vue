<template>
  <div id="app" ref="app">
    <div class="header">
      <c-header/>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <c-footer/>
    </div>
    <div class="aside" v-if="getAuth&&asideShow" @click="$router.push({name:'md'})">+</div>
  </div>
</template>
<script>
import cHeader from "@/components/header.vue";
import cFooter from "@/components/footer.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  components: { cHeader, cFooter },
  computed: {
    ...mapGetters(["getAuth", "asideShow"])
  },
  methods: {
    ...mapActions(["changeAsideShow", "changeAuthAsync"])
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
$asideBtnW: 50px;
#app {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  .header {
    width: 280px;
    height: 100%;
    flex-shrink: 0;
    overflow-y: auto;
    background: #f6f7f8;
  }
  .main {
    flex-grow: 1;
    height: 100%;
    background: white;
    overflow-y: auto;
  }
  .footer {
    display: none;
    background: #f6f7f8;
    padding: 30px 0;
    p {
      text-align: center;
      color: gray;
    }
  }
  .aside {
    position: fixed;
    bottom: $asideBtnW;
    right: $asideBtnW;
    width: $asideBtnW;
    height: $asideBtnW;
    background-color: $main;
    font-size: 36px;
    text-align: center;
    line-height: $asideBtnW;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: all 500ms;
    &:hover {
      transform: rotateZ(90deg);
    }
  }
  @include phoneStyle {
    flex-flow: column nowrap;
    overflow-y: auto;

    .header {
      width: 100%;
      height: unset;
      overflow: unset;
    }
    .main {
      width: 100%;
      height: unset;
      overflow: unset;
    }
    .footer {
      display: block;
    }

    .aside {
      right: 0.5rem;
      bottom: 0.5rem;
    }
  }
}
</style>


