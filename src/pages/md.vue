<template>
  <div class="md">
    <div class="title">
      <input type="text" maxlength="50" v-model="doc.title" placeholder="请输入文档标题（最多50，必填）">
    </div>
    <div class="dec">
      <input type="text" maxlength="200" v-model="doc.dec" placeholder="请输入文档简介（最多240，必填）">
    </div>
    <div :class="isFullScreen?'editor full-screen':'editor'">
      <div class="options">
        <span>传图</span>
        <span @click="isFullScreen=!isFullScreen">全屏</span>
        <span @click="isPreview=!isPreview">预览</span>
        <span @click="submit">保存</span>
        <select>
          <option value="0">请选择代码块</option>
          <option v-for="(item, index) in code" :key="index" :value="index+1">{{item}}</option>
        </select>
      </div>
      <div class="content">
        <textarea name id cols="30" v-model="doc.content" placeholder="请输入文档内容（必填）"></textarea>
        <div class="preview markdown-body" v-show="isPreview" v-mdtohtml="doc.content">123</div>
      </div>
    </div>
  </div>
</template>

<script>
import { EditDoc } from "@/assets/js/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      code: [
        "角标",
        "粗体",
        "隔线",
        "划线",
        "多选",
        "列表",
        "表格",
        "图片",
        "链接",
        "代码",
        "表情"
      ],
      isPreview: false,
      isFullScreen: false,
      doc: {
        id: null,
        title: "",
        dec: "",
        content: ""
      }
    };
  },
  methods: {
    async submit() {
      if (!!this.doc.title && !!this.doc.dec && !!this.doc.content) {
        try {
          let data = await EditDoc({
            id: this.doc.id,
            title: this.doc.title,
            dec: this.doc.dec,
            content: this.doc.content
          });
          if (data) {
            Message(data.msg);
            this.$router.replace({ name: "home" });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        Message.error("请完善文档信息");
      }
    }
  },
  created() {
    if (this.$route.params.doc) {
      this.doc.id = +this.$route.params.doc.id;
      this.doc.title = this.$route.params.doc.title;
      this.doc.dec = this.$route.params.doc.dec;
      this.doc.content = this.$route.params.doc.content;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$parent.changeAsideShow(false);
    });
  },
  destroyed() {
    this.$parent.changeAsideShow(true);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.md {
  min-height: 320px;
  > div {
    margin: 30px;
    @include phoneStyle {
      margin: 15px;
    }
  }
  .title,
  .dec,
  .editor {
    border: 1px solid $gray3;
  }
  .editor.full-screen {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: white;
    margin: 0;
    > .content {
      height: calc(100% - 60px);
    }
    textarea {
      height: 100%;
    }
  }
  input,
  textarea {
    width: 100%;
    outline: none;
    padding: 15px;
    resize: none;
  }
  .options {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid $gray3;
    overflow: hidden;
    span {
      display: inline-block;
      flex-grow: 1;
      width: 50px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      border-right: 1px solid $gray3;
      text-align: center;
      &:hover {
        color: $main;
      }
    }
    select {
      flex-shrink: 0;
      width: 50%;
      outline: none;
      text-align: center;

      @include phoneStyle {
        width: auto;
      }
    }
  }
  .content {
    display: flex;
    flex-flow: row nowrap;
    height: 300px;
    textarea {
      height: 100%;
      overflow-y: scroll;
      border-right: 1px solid $gray3;
    }
    textarea {
      flex-grow: 1;
    }
    .preview {
      width: 50%;
      flex-shrink: 0;
      padding: 15px;
      overflow-y: auto;
    }
    @include phoneStyle {
      height: auto;
      flex-flow: column nowrap;
      .preview {
        width: 100%;
        border-top: 1px solid $gray3;
      }
      textarea {
        border: none;
        height: 320px;
      }
    }
  }
}
</style>
