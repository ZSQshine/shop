<template>
<div>
    <el-button type='primary' @click="add">添加</el-button>
    <!-- 操作菜单 -->
    <v-op :info='info' ref="add"></v-op>
    <!-- 列表展示 -->
    <v-list @edit="edit"></v-list>
</div>
</template>

<script>
import vOp from './components/opration'
import vList from './components/list'
export default {
    data(){
        return{
            info:{
                isShow:false,
                title:'',
                isAdd:false
            }
        }
    },
    methods:{
        add(){
            this.info.isShow = true;
            this.info.title = '添加菜单';
            this.info.isAdd = true;
        },
        edit(id){
            // console.log(id);
            this.info.isShow = true;
            this.info.title = '编辑菜单';
            this.info.isAdd = false;
            // console.log(this.$refs.add);
            this.$refs.add.getOne({id:id});
        }
    },
    components:{
        vOp,
        vList
    }

}
</script>

<style>
.el-button{
    margin: 10px 0;
}
</style>