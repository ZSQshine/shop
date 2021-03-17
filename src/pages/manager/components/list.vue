<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="success" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- current-change	currentPage 改变时会触发 -->
    <el-pagination 
    background 
    layout="prev, pager, next" 
    :total="total"
    :page-size=3
    @current-change='changePage'
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../utils/alter';
import {delManager} from '../../../utils/request'
export default {
  methods: {
    //   编辑条目
    edit(uid) {
        this.$emit('edit',{uid:uid});
       console.log(uid);
    },
    // 删除条目
    del(uid) {
        delManager({uid}).then(res=>{
            successAlert(res.data.msg);
            this.requestManagerList();
            this.requestTotal();
        })
    },
    // 当前页改变,获取页码,发起请求
    changePage(page){
        // console.log(page);
        this.requestPage(page);
        this.requestManagerList();
    },
    // 
    ...mapActions({
        "requestManagerList":'manager/managerListActions',
        "requestTotal":'manager/totalActions',
        "requestPage":'manager/pageActions'
    })
  },
  computed: {
      ...mapGetters({
          'tableData':'manager/managerList',
          'total':'manager/total'
      })
  },
  mounted() {
    this.requestManagerList();
    this.requestTotal();
  },
};
</script>

<style>
</style>