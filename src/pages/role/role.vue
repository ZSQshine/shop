<template>
  <div>
      <el-button type='primary' @click="add">添加</el-button>
      <!-- 操作的组件 -->
      <v-op :info='info' ref='add'></v-op>
      <!-- 列表 -->
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vOp from './components/operation'
import vList from './components/list'
import {mapGetters,mapActions} from 'vuex'
 export default {
     components:{
         vOp,
         vList
     },
     data(){
         return{
             info:{
                 isShow:false,
                 isAdd:false,
                 title:'添加角色'
             }
         }
     },
     methods:{
         add(){
             this.info.isShow = true;
             this.info.isAdd = true;
             this.info.title = '添加角色';
         },
        //  
        edit(id){
             this.info.isShow = true;
             this.info.isAdd = false;
             this.info.title = '编辑角色';
             this.$refs.add.getOne({id});
        }
        
     },
    

}
</script>

<style>
.el-button{
    margin: 10px 0;
}
</style>