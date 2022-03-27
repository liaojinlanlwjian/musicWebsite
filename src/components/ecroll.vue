<template>
  <div>
       <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="注册"
    >
      <el-form
        :model="user"
        :rules="rules"
        ref="user"
        label-width="100px"
        label-position="left"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
     
         <div style="width:100%;text-align:center;margin-bottom:15px">
           <div style="width:100px;height:100px;border-radius:100px;background:#fafafa;margin:auto;box-shadow:2px 2px 10px #909090;">
            <img :src="touxiangSrc" style="width:100%;height:100%;border-radius:100px" >
          </div>
        <el-button round size="mini" style="margin-top:10px" @click="selectPic">更换默认头像</el-button>
         </div>
          
        <el-form-item label="账号" prop="acc">
          <el-input
            v-model="user.acc"
            style="width: 100%"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input
            v-model="user.psd"
            style="width: 100%"
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="user.sex" placeholder="请选择" >
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
 
        </el-form-item>
         <el-form-item label="姓名" prop="name">
          <el-input
            v-model="user.name"
            style="width: 100%"
            placeholder=" 用户名称"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            v-model="user.tel"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-input
            v-model="user.adress"
            style="width: 100%"
          />
        </el-form-item>
     
        </el-form>
      <div style="text-align: center" >
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm('user')">确认</el-button>
      </div>
      </el-dialog>
       <el-dialog
      :visible.sync="uploadDialog"
      title="上传图片"
      >
      <el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-change="changeFile"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
</el-upload>
      </el-dialog>
  </div>
</template>

<script>
export default {
props:{
dialogVisible:{
    type: Boolean,
    require:false
}
},
data(){
    return{
      loading:false,
      chooseFile:{},
          fileList:[],
          uploadDialog:false,
        user:{},
        touxiangSrc:'http://localhost:3001/img/1648272182282.jpeg',
        rules:{
                 name: [
                { required: true, message: "请输入姓名", trigger: "blur" },
                ],
                psd: [
                { required: true, message: "请输入密码", trigger: "blur" },
                ],
                sex: [
                { required: true, message: "请选择性别", trigger: "blur" },
                ],
                acc:[
                { required: true, message: "请输入账号", trigger: "blur" },
                ],
            },
        sexOptions:[{
                value: '男',
                label: '男'
                }, {
                value: '女',
                label: '女'
            }], 
    }
},
methods:{
    confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.user['src'] = this.touxiangSrc
            let data = this.$qs.stringify(this.user)
            this.loading = true
              this.$http.post(`/api/musicUser/addSingMusicUser`,data).then((response)=>{
                this.$message.success('注册成功，请登录')
                this.$emit('close-dialog') 
              }).catch((response)=>{
                console.log(response);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    handleClose() { //向父组件传递我要关闭啦 让父组件改变弹窗打开与否的值
      this.$emit('close-dialog') // 关闭弹框 --> 传出自定义事件
    },
    selectPic(){
          this.uploadDialog = true
        },
      changeFile(file){
          this.chooseFile = file
          console.log(file);
        },
      upload(){    
          if (Object.keys(this.chooseFile).length == 0) {
            this.$message.error('请先选择图片')
            return
          }       
          var formData = new FormData()
          //创建formdata对象
          formData.append("file",this.chooseFile.raw)  
          // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值  
          this.$http.post('/api/music/upload',formData,{
            Headers:{
              "Content-Type":"multipart/form-data"
            }
          }).then(res=>{
            this.uploadDialog = false
            this.$message.success('上传成功')
            this.touxiangSrc ='http://localhost:3001' + res.data.data
          }).catch((err)=>{
            this.$message.error('上传失败，请重试')
          })
          return
          },
}
}
</script>

<style>

</style>