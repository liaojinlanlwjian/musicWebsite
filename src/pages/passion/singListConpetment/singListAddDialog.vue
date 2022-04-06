<template>
  <div>
    <el-dialog
      title="增加歌单"
      :visible.sync="dialogVisible"
      width="10%"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div style="width: 50%; height: 240px; margin: 20px auto">
        <img :src="cover" style="width: 100%; height: 100%" />
      </div>

      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="歌单名称" prop="pass">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTime } from "../../../../util/getCurrentTime";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cover: "http://localhost:3001/img/1648864832508.jpeg",
      ruleForm: {
        name: "默认歌单",
      },
    };
  },
  mounted() {
    this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;
  },
  methods: {
    async confirm() {
      let obj = {};
      obj["time"] = getTime();
      obj["by"] = this.userName;
      obj["cover"] = this.cover;
      obj["user"] = this.userName;
      obj["name"] = this.ruleForm.name;
      try {
        let data = this.$qs.stringify(obj);
        await this.$http.post(`/api/singlist/addSingList`, data);
        this.$message.success("增加成功");
        this.$emit('closeDialog')
        this.$emit('querySingList')
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    handleClose() {
        this.$emit('closeDialog')
    },
  },
};
</script>

<style>
</style>