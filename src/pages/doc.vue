<template>
  <div class="doc" v-if="doc">
    <i class="options back el-icon-back" @click="$router.go(-1)"></i>
    <i
      v-if="$parent.getAuth"
      class="options edit el-icon-edit"
      @click="$router.push({name:'md',params: { doc }})"
    ></i>
    <i v-if="$parent.getAuth" class="options delete el-icon-delete" @click="isDelete"></i>
    <div class="title">{{doc.title}}</div>
    <div class="content markdown-body" v-mdtohtml="doc.content"></div>
  </div>
  <div class="doc nodoc" v-else>
    <i class="options back el-icon-back" @click="$router.go(-1)"></i>
    链接已失效
  </div>
</template>

<script>
import { doc, deleteDoc } from "@/assets/js/api";
import { Loading, Message, MessageBox } from "element-ui";
export default {
  data() {
    return {
      doc: null
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.$nextTick(this.getDoc);
  },
  methods: {
    isDelete() {
      MessageBox.confirm("此操作将永久删除该文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delele().then(msg => {
            Message.success(msg);
            this.$router.replace({ name: "home" });
          });
        })
        .catch(() => {
          Message.info("已取消删除");
        });
    },
    async delele() {
      try {
        let data = await deleteDoc({ id: this.$route.params.id });
        return Promise.resolve(data.msg);
      } catch (e) {
        console.log(e);
      }
    },
    async getDoc() {
      let ld = Loading.service({ target: ".doc" });
      try {
        let data = await doc({ id: this.$route.params.id });
        this.doc = data.body;
      } catch (error) {
        console.log(error);
      }
      ld.close();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.nodoc {
  text-align: center;
  color: #c6c7c8;
}
.doc {
  position: relative;
  padding: 60px 40px 40px;
  .options {
    position: absolute;
    height: 60px;
    line-height: 60px;
    top: 0;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: $main;
    }
  }
  .options.back {
    left: 40px;
  }
  .options.edit {
    right: 100px;
  }
  .options.delete {
    right: 40px;
  }
  .title {
    padding-bottom: 30px;
    font-size: 26px;
    text-align: center;
  }
}
</style>

