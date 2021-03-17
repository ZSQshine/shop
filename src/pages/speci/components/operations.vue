<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <template v-for="(itm, idx) in attrArr">
          <el-form-item
            v-if="idx == 0"
            label="规格属性"
            :label-width="formLabelWidth"
            :key="idx"
          >
            <el-input v-model="itm.value" autocomplete="off"></el-input>
            <el-button type="primary" @click="addSpec">添加规格属性</el-button>
          </el-form-item>
          <el-form-item
            v-else
            label="规格属性"
            :label-width="formLabelWidth"
            :key="idx"
          >
            <el-input v-model="itm.value" autocomplete="off"></el-input>
            <el-button type="danger" @click="delSpec(idx)">删除</el-button>
          </el-form-item>
        </template>

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
import { addSpec, delSpec, editSpec, oneSpec } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alter";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      attrArr: [{ value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    confirm() {
      if (this.attrArr.some((item) => item.value === "")) {
        warningAlert("规格属性值不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map((item) => item.value).join(",");
      addSpec(this.form).then((res) => {
        successAlert(res.data.msg);
      });
      this.cancel();
      this.requestSpecCount();
      this.requestSpecList();
    },
    // 编辑
    edit() {
     this.form.attrs = this.attrArr.map(item=>item.value).join(',');
      editSpec(this.form).then(res=>{
        successAlert(res.data.msg);
        console.log(this.form);
      });
      this.cancel();
      this.requestSpecList();
    },
    // 
    
    cancel() {
      this.info.isShow = false;
      this.form = {
        specname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    // 添加规格属性
    addSpec() {
      this.attrArr.push({ value: "" });
    },
    // 删除规格属性
    delSpec(idx) {
      this.attrArr.splice(idx, 1);
    },
    ...mapActions({
      requestSpecCount: "spec/totalActions",
      requestSpecList: "spec/specListActions",
      requestPage: "spec/pageActions",
    }),
    getOne(id) {
      // 发起请求
      oneSpec({ id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = [];
        let arr = this.form.attrs.split(",");
        arr.forEach((ele) => {
          this.attrArr.push({ value: ele });
        });

        // console.log(this.form);
      });
    },
  },
};
</script>

<style>
</style>