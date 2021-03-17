<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="checkedKeys"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#66CD00"
            inactive-color="#8F8F8F"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="edit">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {addRole,getOneRole,editRole} from '../../../utils/request';
import {successAlert} from '../../../utils/alter'
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
      //   data: [],
      checkedKeys: [],
    };
  },
  methods: {
    ...mapActions({
      "requestMenuList": "menu/menuListActions",
      "requestRoleList":'role/roleListActions'

    }),
    cancel() {
      this.info.isShow = false;
      this.checkedKeys = this.$refs.tree.setCheckedKeys([]);
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
    },
    // 点击添加发起添加角色请求
    add(){
        // console.log(this.$refs.tree.getCheckedKeys());
        // 获取被选中节点的id
        this.form.menus =JSON.stringify( this.$refs.tree.getCheckedKeys());
        // console.log(this.form);
        addRole(this.form).then(res=>{
            successAlert(res.data.msg)
        })
        this.cancel();
        this.requestRoleList();
    },
    // 获取一条角色数据
    getOne(id){
        getOneRole(id).then(res=>{
            this.form = res.data.list;
            this.checkedKeys = JSON.parse(res.data.list.menus);
            this.form.id = id.id;
        })
    },
    // 编辑角色
    edit(){
        this.form.menus =JSON.stringify( this.$refs.tree.getCheckedKeys());
        // 发送修改请求
        editRole(this.form).then(res=>{
            successAlert(res.data.msg);
            this.requestRoleList();
            this.cancel();
        })
    }
  },
  computed: {
    ...mapGetters({
      data: "menu/menuList",
    }),
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>

<style>
</style>