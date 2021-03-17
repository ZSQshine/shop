<template>
  <div>
      <el-button type='primary' @click="add">添 加</el-button>
      <!--  -->
      <v-op :info='info' ref='add'></v-op>
      <!--  -->
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vOp from './components/oprations'
import vList from './components/list'
export default {
    data(){
        return{
            info:{
                isShow:false,
                isAdd:false,
                title:'添加用户'
            }
        }
    },
    methods:{
        // 
        add(){
            this.info.title = '添加用户';
            this.info.isShow = true;
            this.info.isAdd = true;
        },
        // edit
        edit(uid){
            // console.log(id);
             this.info.title = '编辑用户';
            this.info.isShow = true;
            this.info.isAdd = false;
            // 通过ref调用 vOp 组件的方法
            this.$refs.add.getOne(uid);
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