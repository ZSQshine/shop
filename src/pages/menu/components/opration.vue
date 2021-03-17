<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历菜单 -->
            <el-option v-for="itm in menuList" :key="itm.id" :label="itm.title" :value="itm.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
          </template>
        </el-form-item>
        <!-- 菜单类型为目录只显示图标 -->
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type == 1">
          <el-select v-model="form.icon">
            <el-option
              v-for="item in icon"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型为菜单只显示地址 -->
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <el-option
              v-for="item in url"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#66CD00"
            inactive-color="#8F8F8F"
            :active-value='1'
            :inactive-value='2'
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd">添  加</el-button>
        <el-button type="primary" @click="edit" v-else>编  辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addMenu,getOneMenu,editMenu} from '../../../utils/request'
import {successAlert} from '../../../utils/alter'
import {mapActions,mapGetters} from 'vuex'
export default {
  props: ["info"],
  mounted(){
    this.requestMenuList()
  },
  data() {
    return {
      // dialogFormVisible: true,
      //   radio:'1',
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1, //类型 1目录 2菜单
        url: "",
        status: 1, //状态 1正常 2 禁用
      },
      // 图标
      icon: [
        "el-icon-platform-eleme",
        "el-icon-s-goods",
        "el-icon-picture-outline",
        "el-icon-s-grid",
      ],
      // 地址
      url: [
        "home",
        "menu",
        "role",
        "manager",
        "cate",
        "spec",
        "goods",
        "vip",
        "banner",
        "seckill",
      ],
      formLabelWidth: "120px",
    };
  },
  methods:{
    ...mapActions({
      'requestMenuList':'menu/menuListActions'
    }),
      confirm(){
          addMenu(this.form).then(res=>{
              successAlert(res.data.msg);
              this.cancel();
              this.requestMenuList();
          })
      },
      // 取消
    cancel(){
      this.info.isShow = false;
      // 清空表单内容
      this.form = {
          pid: 0,
          title: '',
          icon: '',
          type: 1,
          url: '',
          status: 1,
      }
    },
    // 获取一条菜单
    getOne(id){
      getOneMenu(id).then(res=>{
        // console.log(res);
        // console.log(id);
        this.form = res.data.list;
        this.form.id = id.id;

      })
    },
    edit(){
      editMenu(this.form).then(res=>{
        successAlert(res.data.msg);
        this.cancel();
        this.requestMenuList();
      })
    }
  },
  computed:{
    ...mapGetters({
      'menuList':'menu/menuList'
    })
  }
};
</script>

<style>
</style>