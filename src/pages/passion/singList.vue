<template>
  <div style="margin-top: 38px">
    <div style="margin-top: 20px" class="filter-container">
      <el-button size="mini" type="info"  @click="addSingList">创建歌单</el-button>
<el-button size="mini" type="success"  @click="deleteSingList">删除歌单</el-button>
      <!-- <div style="display: flex">
        <el-button class="filter-item" type="primary" @click="addSingList"
          >增加歌单</el-button
        >
      </div> -->
    </div>
    <div class="content">
      <div class="content_singList" v-for="o in singlistData" :key="o.id">
        <img :src="o.cover" alt=""  @click="jumpDetail(o)"/>
        <p  @click="jumpDetail(o)">{{ o.name }}</p>
        <span>{{ o.created_time }}</span>
      <em>by - {{ o.created_by }}</em>
      <el-button style="position:absolute" size="mini" type="danger" v-if="btnShow" @click="handleDelete(index,o)">删除</el-button>
      </div>
    </div>
    <singlist-dialog
    :dialog-visible="dialogVisible"
    @closeDialog="dialogVisible = false"
    @querySingList="querySingList()"
    >
    </singlist-dialog>
  </div>
</template>

<script>
import singlistDialog from './singListConpetment/singListAddDialog.vue'
export default {
  components:{
    singlistDialog
  },
  data() {
    return {
      btnShow:false,
      dialogVisible:false,
      gridData: [],
      loadingSing: false,
      index: 0,
      loading: false,
      userName: "",
      singlistData: [],
    };
  },
  mounted() {
    this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;
    this.querySingList();
  },
  methods: {

    addSingList() {
      this.dialogVisible = true
    },
    async querySingList() {
      this.loading = true;
      try {
        let res = await this.$http.get(
          `/api/singlist/getAllSingList?user=` + this.userName
        );
        this.loading = false;
        this.singlistData = res.data.data;
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    //删除歌单
    deleteSingList(){
      console.log("oooo");
      this.btnShow = true
    },
    async handleDelete(index, row) {
      try {
        await this.$http.delete(`/api/singlist/deleteSingList/?id=` + row.id);
        this.querySingList();
        this.$message.success("已删除该歌单");
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    jumpDetail(o){
      this.$router.push({
        path: "/musicPage/musicdetail",
        query: { id: o.id },
      });
    }
  },
};
</script>

<style scoped>
.content {
  width: 90%;
  height: auto;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.content_singList {
  width: 23%;
  height: auto;
  margin: 20px;
  position: relative;
}
.content_singList img {
  width: 100%;
  height: 150px;
}
.content_singList span {
  display: block;
  font-size: 8px;
}
.content_singList em {
  font-size: 10px;
  position: absolute;
  bottom: 42px;
  color: royalblue;
}
</style>