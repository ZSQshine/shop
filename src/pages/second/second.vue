<template>
  <div>
      <el-button type='primary' @click="add">添  加</el-button>
      <!--  -->
      <v-op :info='info' ref='add'></v-op>
      <!--  -->
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vOp from './components/operations'
import vList from './components/list'
import {getSecond} from '../../utils/request'
export default {
    data(){
        return{
            info:{
                isShow:false,
                isAdd:true,
                title:'添加活动'
            }
        }
    },
    methods:{
        add(){
            this.info.isShow = true;
            this.info.isAdd = true;
        },
        edit(id){
            this.info.isShow = true;
            this.info.isAdd = false;
            this.info.title = '编辑活动'
            this.$refs.add.getOne(id);
        }
    },
    components:{
        vOp,
        vList
    },
    mounted(){
     
    }
}
</script>

<style>
.el-button{
    margin: 10px 0;
}
</style>