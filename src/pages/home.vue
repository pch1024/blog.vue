<template>
  <div class="doc">
    <div class="doc-box" v-for="(item, index) in list.data" :key="index" @click="lookDoc(item.id)">
      <h5 class="title">{{item.title}}</h5>
      <p class="dec">{{item.dec}}</p>
      <p class="info">
        <span class="date">{{dateFmt(item.createTime)}}</span>
        <span class="read">访问量：{{item.visit}}</span>
      </p>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="list.currentPage"
      :page-size="list.pageSize"
      layout="prev, pager, next"
      :total="list.total"
    ></el-pagination>
  </div>
</template>

<script>
import { docList } from "@/assets/js/api";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      list: {
        data: null,
        pageSize: 30,
        pagerCount: 5,
        total: null,
        currentPage: 1
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDocList();
    });
  },
  methods: {
    lookDoc(id) {
      this.$router.push({ name: "doc", params: { id } });
    },
    dateFmt(t) {
      return `${new Date(t).getFullYear()}年
      ${new Date(t).getMonth() + 1}月
      ${new Date(t).getDate()}日
      `;
    },
    async getDocList() {
      let ld = Loading.service({ target: ".doc" });
      try {
        let data = await docList({
          pageSize: this.list.pageSize,
          currentPage: this.list.currentPage
        });
        this.list.data = data.body.rows;
        this.list.total = data.body.total;
      } catch (error) {
        console.log(error);
      }
      ld.close();
    },
    handleCurrentChange(i) {
      this.getDocList();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.doc {
  .el-pagination {
    text-align: center;
    padding: 30px 0;
  }
  .doc-box {
    padding-top: 15px;
    margin: 30px;
    border-bottom: solid 2px #efefef;

    &:hover {
      cursor: pointer;
      border-color: gray;
    }
    .title {
      color: #787878;
      font-weight: bold;
      font-size: 18px;
      padding-bottom: 18px;
    }
    .dec {
      color: gray;
      text-align: justify;
      letter-spacing: 1px;
    }
    .info {
      span {
        color: darkgray;
      }
      i {
        padding: 0 4px;
        border-radius: 4px;
        background-color: $gray2;
        color: gray;
        margin-right: 5px;
      }
      padding: 5px 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
  }
  @include phoneStyle {
    .home {
      flex-flow: column nowrap;
    }
  }
}
</style>

