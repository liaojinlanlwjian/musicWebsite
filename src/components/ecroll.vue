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
      >
     
         <div style="width:100%;text-align:center;margin-bottom:15px">
           <div style="width:100px;height:100px;border-radius:100px;background:#fafafa;margin:auto;box-shadow:2px 2px 10px #909090;">
            <img :src="touxiangSrc" >
          </div>
        <el-button round size="mini" @click="selectPic">上传头像</el-button>
         </div>
          
        <el-form-item label="账号" prop="bianhao">
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
        <el-form-item label="性别">
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
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="user.tel"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="地址" prop="phone">
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
      chooseFile:{},
          fileList:[],
          uploadDialog:false,
        user:{},
        touxiangSrc:'',
        rules:{
                 name: [
                { required: true, message: "请输入姓名", trigger: "blur" },
                ],
                psd: [
                { required: true, message: "请输入地址", trigger: "blur" },
                ],
                account: [
                { required: true, message: "请选择用户的部门", trigger: "blur" },
                ],
                bianhao:[
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
    confirm(){},
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
          // console.log(formData);
          // return
          // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值  
          this.$http.post('/api/music/upload',{
            formData,
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