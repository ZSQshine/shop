<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="itm in cate"
              :key="itm.id"
              :label="itm.catename"
              :value="itm.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历菜单 -->
            <el-option
              v-for="itm in second"
              :key="itm.id"
              :label="itm.catename"
              :value="itm.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeSpec(false)"
          >
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="itm in spec"
              :key="itm.id"
              :label="itm.specsname"
              :value="itm.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历菜单 -->
            <el-option
              v-for="itm in attrs"
              :key="itm"
              :label="itm"
              :value="itm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
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
        <el-form-item label="描述" :label-width="formLabelWidth">
          <div id="desc"></div>
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
import E from "wangeditor";
import { addGoods, onegoods, editGoods } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alter";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imageUrl: "", //存放图片地址
      second: "", //存放二级分类
      attrs: [], //存放规格属性
      desc: "", //富文本内容
    };
  },
  methods: {
    //   一级分类改变时，获取对应的二级分类
    changeCate(x) {
      if (!x) {
        this.form.second_cateid = "";
      }
      let index = this.cate.findIndex(
        (ele) => ele.id == this.form.first_cateid
      );
      this.second = this.cate[index].children;
      // console.log(this.second);
    },
    // 规格属性
    changeSpec(x) {
      if (!x) {
        this.specsattr = [];
      }
      let index = this.spec.findIndex((ele) => ele.id == this.form.specsid);
      this.attrs = this.spec[index].attrs;
    },
    //   对话框打开后执行
    opened() {
      this.desc = new E("#desc");
      this.desc.create();
      // console.log(this.desc);
      this.desc.txt.html(this.form.description);
    },
    // 图片上传时的处理
    changeImg(e) {
      //   console.log(e);
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2M");
        return;
      }
      let arr = [".png", ".jpg", ".jpeg"];
      let form = e.name.slice(e.name.lastIndexOf("."));
      if (!arr.some((ele) => ele == form)) {
        warningAlert("上传格式不正确");
        return;
      }
      // 将图片信息生成图片地址并显示
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将图片信息存入this.form.img中
      this.form.img = e.raw;
    },
    confirm() {
      this.form.description = this.desc.txt.html();
      // 发起添加请求
      addGoods(this.form).then((res) => {
        successAlert(res.data.msg);
      });
      // console.log(this.form);
      this.requestGoodsList();
      this.cancel();
    },
    // 编辑
    edit() {
        this.form.description = this.desc.txt.html()
      editGoods(this.form).then(res=>{
        successAlert(res.data.msg)
       
        this.requestGoodsList()
         this.cancel()
      })
    },
    //

    cancel() {
      this.info.isShow = false;
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
    },

    ...mapActions({
      requestCate: "cate/cateListActions",
      requestSpec: "spec/allSpecActions",
      requestGoodsList: "goods/goodsListActions",
    }),
    getOne(id) {
        
      // 发起请求
      onegoods({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // 获取二级分类详情
        this.changeCate(true);
        this.imageUrl = this.$imgHead + this.form.img;
        // 获取规格属性
        this.changeSpec(true);
        this.form.specsattr = this.form.specsattr.split(",");
        // 获取描述
        // this.desc.txt.html(this.form.description)
      });
    },
  },
  mounted() {
    this.requestCate();
    this.requestSpec();
    this.requestGoodsList();
  },
  computed: {
    ...mapGetters({
      cate: "cate/cateList",
      spec: "spec/specList",
    }),
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