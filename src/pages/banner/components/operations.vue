<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { warningAlert, successAlert } from "../../../utils/alter";
import { addBanner, oneBanner, editBanner } from "../../../utils/request";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      imageUrl: "",
      form: {
        title: "",
        img: "",
        status: 1,
      },
    };
  },
  methods: {
    // 图片上传的处理
    changeImg(e) {
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2M");
        return;
      }
      let arr = [".jpg", ".png", ".jpeg", ".gif"];
      let form = e.name.slice(e.name.lastIndexOf("."));
      if (!arr.some((ele) => ele == form)) {
        warningAlert("图片格式不正确");
        return;
      }
      // 上传正确的文件
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将文件存放到form.img中
      this.form.img = e.raw;
    },
    cancel() {
      this.info.isShow = false;
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
    },
    edit() {
      // 发送修改请求
      editBanner(this.form).then((res) => {
        successAlert(res.data.msg);
      });
      this.requestBannerList();
      this.cancel();
    },
    confirm() {
      // 发起添加请求
      addBanner(this.form).then((res) => {
        successAlert(res.data.msg);
      });
      this.requestBannerList();
      this.cancel();
    },
    getOne(id) {
      //
      oneBanner({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgHead + this.form.img;
      });
    },
    ...mapActions({
      'requestBannerList': "banner/bannerListActions",
    }),
  },
  mounted() {
     
  },
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