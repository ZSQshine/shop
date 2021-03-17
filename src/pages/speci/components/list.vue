<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性"> 
          <template v-slot="prop">
          <el-tag v-for="(item,index) in prop.row.attrs" :key="index" type='success'>{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="success" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
        @current-change="changePage"
      >
      </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alter";
import { editSpec, delSpec } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  methods: {
    edit(id) {
        this.$emit('edit',id);
    },
    del(id) {
         this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除请求
          delSpec({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg);
              this.requestSpecList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    ...mapActions({
      'requestSpecCount': "spec/totalActions",
      'requestSpecList': "spec/specListActions",
      'requestPage':'spec/pageActions'
    }),
    changePage(page){
        this.requestPage(page);
        this.requestSpecList();
    }
  },
  computed: {
    ...mapGetters({
      total: "spec/total",
      tableData: "spec/specList",
    }),
  },
  mounted() {
    this.requestSpecCount();
    this.requestSpecList();
  },
};
</script>

<style>
</style>