<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 遍历用户权限 -->
        <!--  -->
        <template v-for='itm in menus' >
          <el-submenu :index="itm.title" v-if="itm.children" :key="itm.id">
            <template slot="title">
              <i :class="itm.icon"></i>
              <span>{{itm.title}}</span>
            </template>
            <el-menu-item v-for="it in itm.children" :key="it.id" :index="'/'+it.url">{{it.title}}</el-menu-item>
          </el-submenu>
          <!--  -->
          <el-menu-item v-else :key="itm.id" :index="'/'+itm.url">
          {{itm.title}}
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        {{ username }}
        <!-- {{menus}} -->
        <el-button type="danger" @click="exit">exit</el-button>
      </el-header>
      <el-main>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      menus: JSON.parse(localStorage.getItem("user")).menus,
    };
  },
  methods: {
    exit() {
      this.$router.push("/login");
      console.log(this.menus);
    },
  },
  mounted() {
    this.username = JSON.parse(localStorage.getItem("user")).username;
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-aside {
  height: 100vh;
  background-color: #404040;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #fff;
  color: #333;
}
</style>