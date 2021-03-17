<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历菜单 -->
            <el-option v-for="itm in roleList" :key="itm.id" :label="itm.rolename" :value="itm.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用 户 名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密  码" :label-width="formLabelWidth" >
          <el-input type='password' v-model="form.password" autocomplete="off" placeholder="密码留空则不修改"></el-input>
        </el-form-item>
       
        <el-form-item label="状  态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="edit"  v-else>编  辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addManager,oneManager,editManager} from '../../../utils/request'
import {successAlert} from '../../../utils/alter'
import {mapActions,mapGetters} from 'vuex'
export default {
  props: ["info"],
  mounted(){
    this.requestRoleList()
  },
  data() {
    return {
      // dialogFormVisible: true,
      //   radio:'1',
      form: {
       roleid:'',
       username:'',
       password:'',
        status: 1, //状态 1正常 2 禁用
      },
      
      formLabelWidth: "120px",
    };
  },
  methods:{
    ...mapActions({
      'requestRoleList':'role/roleListActions',
      'requestManagerList':'manager/managerListActions',
      'requestTotal':'manager/totalActions'
    }),
      confirm(){
          addManager(this.form).then(res=>{
              successAlert(res.data.msg);
              this.cancel();
              this.requestManagerList();
              this.requestTotal();
          })
      },
      // 取消
    cancel(){
      this.info.isShow = false;
      // 清空表单内容
      this.form = {
          roleid:'',
       username:'',
       password:'',
        status: 1, //状态 1正常 2 禁用
      }
    },
    // 获取单个用户
    getOne(uid){
      // 
      oneManager(uid).then(res=>{
        this.form = res.data.list;
        this.form.password = '';
        // console.log(res.data.list);
        this.form.uid = uid.uid
      })
    },
    // 发起修改请求
    edit(){
      editManager(this.form).then(res=>{
        successAlert(res.data.msg);
        this.requestManagerList();
        this.cancel();
      })
    }
   
  },
  computed:{
    ...mapGetters({
      'roleList':'role/roleList'
    })
  }
};
</script>

<style>
</style>