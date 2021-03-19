<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column label="图片">
        <template v-slot="prop">
          <img :src="$imgHead + prop.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="success" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作" width="200px">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alter";
import { editBanner, delBanner } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发起删除菜单请求
          delBanner({ id }).then((res) => {
            // 已经删除成功
            successAlert(res.data.msg);
            this.requestBannerList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    ...mapActions({
      requestBannerList: "banner/bannerListActions",
    }),
  },
  computed: {
    ...mapGetters({
      tableData: "banner/bannerList",
    }),
  },
  mounted() {
    this.requestBannerList();
  },
};
</script>

<style>
img {
  width: 100px;
}
</style>