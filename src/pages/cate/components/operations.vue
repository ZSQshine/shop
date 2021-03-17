<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option label="一级分类" :value="0"></el-option>
            <!-- 遍历菜单 -->
            <el-option v-for="itm in list" :key="itm.id" :label="itm.catename" :value="itm.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="edit" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCate,oneCate,editCate } from '../../../utils/request';
import { successAlert, warningAlert } from "../../../utils/alter";
import { mapActions,mapGetters } from 'vuex';

export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    cancel() {
      this.info.isShow = false;
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl= "";
    },
    // 请求修改
    edit() {

        editCate(this.form).then(res=>{
            successAlert(res.data.msg);
            this.cancel();
            this.requestCate();
        })
    },
    // 确定添加
    confirm() {
        // 发送请求
        addCate(this.form).then(res=>{
            successAlert(res.data.msg);
        })
        this.requestCate();
        this.cancel();
        
    },
    // 发起请求
    getOne(id){
        oneCate({id}).then(res=>{
            this.form = res.data.list;
            // this.form.img = $imgHead + res.data.list.img;
            this.imageUrl = this.$imgHead + res.data.list.img;
            this.form.id = id;
        })
    },
    //
    changeImg(e) {
      console.log(e);
      // 限制文件大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2M");
        return;
      }

      // 图片格式
      let form = [".png", ".jpg", ".jpeg"];
      // 截取后缀
      let extName = e.name.slice(e.name.lastIndexOf("."));
      if (!form.some((item) => item == extName)) {
        warningAlert("上传格式不正确");
        // console.log(extName);
        return;
      }

      // 上传正确的文件
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将文件存放到form.img中
      this.form.img = e.raw;
    },
    ...mapActions({
        'requestCate':'cate/cateListActions'
    })
  },
  mounted(){
      this.requestCate();
  },
  computed:{
      ...mapGetters({
          'list':'cate/cateList'
      })
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>