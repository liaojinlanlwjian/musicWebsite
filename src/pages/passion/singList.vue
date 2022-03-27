<template>
  <div style="margin-top: 38px">
    <div style="margin-top: 20px" class="filter-container">
      <div style="display: flex">
        <el-button class="filter-item" type="primary" @click="addSingList"
          >增加歌单</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" style="width: 95%" v-loading="loading">
             <el-table-column label="查看" width="160">
        <template slot-scope="scope">
          <el-popover
            style="margin-right: 8px"
            placement="left"
            width="650"
            trigger="click"
          >
            <el-table :data="gridData" v-loading="loadingSing">
              <el-table-column
                width="100"
                align="center" label="音乐封面"
              >
              <template slot-scope="{ row }">
                <img
                    style="width:60px;height:60px"
                    :src="row.musicCover">
              </template>
              </el-table-column>
              <el-table-column
                width="150"
                property="musicName"
                label="音乐名称"
              ></el-table-column>
              <el-table-column
                width="100"
                property="musicType"
                label="音乐类型"
              ></el-table-column>
              <el-table-column
                width="100"
                property="musicMsg"
                label="音乐信息"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template width="120" align="center" slot-scope="scope">
                  <el-button
                    size="mini"
                    type="info"
                    @click="handleConfirm(scope.$index, scope.row)"
                    >播放</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteSingListMusic(scope.$index, scope.row)"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-button
              style="border-radius: 14px"
              @click="qureySingListMusic(scope.$index, scope.row)"
              slot="reference"
              ><i class="fa fa-spinner"></i>
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="歌单名称" width="180">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="歌单类型" width="180">
        <template slot-scope="scope">
          <el-select
            v-model="tableData[scope.$index].value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleConfirm(scope.$index, scope.row)"
            ><i class="fa fa-check" ref="likeIcon"></i
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            ><i class="fa fa-close" ref="likeIcon"></i
          ></el-button>
        </template>
      </el-table-column>
 
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridData: [],
      loadingSing: false,
      index: 0,
      loading: false,
      userName: "",
      tableData: [],
      options: [
        {
          value: "古风",
          label: "古风",
        },
        {
          value: "情歌",
          label: "情歌",
        },
        {
          value: "电音",
          label: "电音",
        },
        {
          value: "外国",
          label: "外国",
        },
        {
          value: "摇滚",
          label: "摇滚",
        },
      ],
    };
  },
  mounted() {
    this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;
    this.querySingList();
  },
  methods: {
    async deleteSingListMusic(index,row){
        try {
        let res = await this.$http.delete(
          `/api/singlistmusic/deleteSingListMusic?id=` + row.id
        );
        this.$message.success("已从该歌单中移除");
        this.qureySingListMusic()
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    async qureySingListMusic(index,row) {
      try {
        let res = await this.$http.get(
          `/api/singlistmusic/getSingListMusic`,{
                params:{
                    user:this.userName,
                    singListId:row.id
                }
              }
        );
        this.loadingSing = false;
        this.gridData = res.data.data;
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    addSingList() {
      var list = {
        name: "",
        value: "",
        user: this.userName,
      };
      this.tableData.push(list);
      this.index = 1;
    },
    async handleConfirm(index, row) {
      if (row.name == "" || row.value == "") {
        this.$message.error("数据不全");
        return;
      }
      if (this.index == 1) {
        try {
          let data = this.$qs.stringify(row);
          await this.$http.post(`/api/singlist/addSingList`, data);
          this.$message.success("增加成功");
          this.querySingList();
          this.index = 0;
        } catch (error) {
          this.$message.error("失败啦");
        }
      } else {
        try {
          let data = this.$qs.stringify(row);
          await this.$http.post(`/api/singlist/editSingList`, data);
          this.$message.success("编辑成功");
          this.querySingList();
          this.index = 0;
        } catch (error) {
          this.$message.error("失败啦");
        }
      }
    },
    async querySingList() {
      this.loading = true;
      try {
        let res = await this.$http.get(
          `/api/singlist/getAllSingList?user=` + this.userName
        );
        this.loading = false;
        this.tableData = res.data.data;
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    async handleDelete(index, row) {
      try {
        await this.$http.delete(`/api/singlist/deleteSingList/?id=` + row.id);
        this.querySingList();
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
  },
};
</script>

<style>
</style>