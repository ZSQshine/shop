<template>
  <div>
      <!-- <el-button type='primary' @click="add">添  加</el-button> -->
      <!--  -->
      <v-op :info='info' ref='add'></v-op>
      <!--  -->
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vOp from './components/operations'
import vList from './components/list'
export default {
    data(){
        return{
            info:{
                isShow:false,
                title:'会员修改'
            }
        }
    },
    methods:{
        add(){
            this.info.isShow = true;
        },
        edit(id){
            this.info.isShow = true;
            this.$refs.add.getOne(id);
        }
    },
    components:{
        vOp,
        vList,
    }
}
</script>

<style>
.el-button{
    margin: 10px 0;
}
</style>