<template>
<<<<<<< HEAD
  
</template>

<script>
export default {

}
</script>

<style>

=======
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
       <el-table-column prop="price" label="商品价格"> </el-table-column>
        <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column  label="图片"> 
           <template v-slot="prop">
          <img :src="$imgHead+prop.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template v-slot="prop">
          <el-button type="success" v-if="prop.row.isnew == 1">是</el-button>
          <el-button type="info" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template v-slot="prop">
          <el-button type="success" v-if="prop.row.ishot == 1">是</el-button>
          <el-button type="info" v-else>禁止</el-button>
        </template>
      </el-table-column>
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
import {mapGetters,mapActions} from 'vuex'
import {delCate, delGoods} from '../../../utils/request'
import {successAlert} from '../../../utils/alter'
export default {
    mounted(){
        // 
        this.requestGoodsList();
        this.requestCount();
    },
    methods:{
        changePage(page){
            this.requestPage(page);
            this.requestGoodsList();
        },
        ...mapActions({
            'requestGoodsList':'goods/goodsListActions',
            requestCount:'goods/totalActions',
            requestPage:'goods/pageActions',
        }),
        edit(id){
          // console.log(id);
          this.$emit('edit',id);
        },
        del(id){
          // this.$emit('del',id);
          this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除菜单请求
          delGoods({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg);
              this.requestGoodsList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        }
    },
    computed:{
        ...mapGetters({
            "tableData":"goods/goodsList",
            'total':'goods/total'
        })
    }
};
</script>

<style>
img{
    width:100px
}
>>>>>>> 330bee7... 第二次提交
</style>