<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <!-- <span class="demonstration">起始日期时刻为 12:00:00</span> -->
            <el-date-picker
              v-model="date"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '12:00:00']"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <el-option label="请选择分类" value="" disabled></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="itm in cateList"
              :key="itm.id"
              :label="itm.catename"
              :value="itm.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changeSecond(false)"
          >
            <el-option label="请选择分类" value="" disabled></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="itm in second"
              :key="itm.id"
              :label="itm.catename"
              :value="itm.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option label="请选择" value="" disabled></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="itm in goods"
              :key="itm.id"
              :label="itm.goodsname"
              :value="itm.id"
            ></el-option>
          </el-select>
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
import { mapGetters, mapActions } from "vuex";
import { addSecond, editSecond, oneSecond } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alter";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      date: [], //存放活动日期
      second: [], //存放二级分类
      goods: [], //存放商品列表
    };
  },
  methods: {
    confirm() {
      //    把日期转化成时间戳，存入form
      this.form.begintime = new Date(this.date[0]).getTime();
      this.form.endtime = new Date(this.date[1]).getTime();
      //   console.log(this.form);

      addSecond(this.form).then((res) => {
        //    console.log(this.form);

        successAlert(res.data.msg);
        this.requestSecond();

        this.cancel();
      });
    },
    cancel() {
      this.info.isShow = false;
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.date = [];
    },
    edit(id) {
      this.form.begintime = new Date(this.date[0]).getTime();
      this.form.endtime = new Date(this.date[1]).getTime();
      editSecond(this.form).then((res) => {
        successAlert(res.data.msg);
        this.requestSecond();
        this.cancel();
      });
    },
    // 当一级分类改变时，获取对应的二级分类
    changeCate(x) {
      if (!x) {
        this.second = [];
      }
      let idx = this.cateList.findIndex(
        (ele) => ele.id == this.form.first_cateid
      );
      this.second = this.cateList[idx].children;
    },
    // 当二级分类改变时，获取对应的商品
    changeSecond(x) {
      if (!x) {
        this.goods = [];
      }
      this.goodsList.forEach((ele) => {
        if (ele.second_cateid == this.form.second_cateid) {
          this.goods.push(ele);
        }
      });
      // console.log(this.goods);
    },
    getOne(id) {
      oneSecond({ id }).then((res) => {
        // 将时间戳转化为中国标准时间
        this.date[0] = new Date(parseInt(res.data.list.begintime));
        this.date[1] = new Date(parseInt(res.data.list.endtime));
        // console.log(this.date);
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    ...mapActions({
      requestCate: "cate/cateListActions",
      requestGoods: "goods/allActions",
      requestSecond: "second/secondListActions",
    }),
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      goodsList: "goods/goodsList",
    }),
  },
  mounted() {
    this.requestCate();
    this.requestGoods();
  },
};
</script>

<style>
</style>