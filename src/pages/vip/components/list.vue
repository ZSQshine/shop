<template>
  <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="success" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作" width='200px'>
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
data(){
    return{
        tableData:[
            {
                id:1,
                nickname:'',
                phone:'',
                status:1
            }
        ]
    }
},
methods:{
    edit(id){
        this.$emit('edit',id);
    },
    del(id){
         this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除请求
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
}
}
</script>

<style>

</style>