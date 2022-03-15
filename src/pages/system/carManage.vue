<template>
    <div>
        <div style="width:100%;margin:0px auto">
          <span class="demonstration" style="font-size:24px;color:#85ea2d">车辆图片</span>
            <div class="block" style="text-align:center">
                <img
                    style="width:50%;"
                    :src="require('../../assets/car.jpg')">
            </div>
        </div>
        
        <div style="text-align:center;margin:0px 0 30px 0">
            <span style="font-size:24px;color:#d3b5e1">车辆信息</span>
            <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="width: 59%;margin:20px auto"
            border
            ref="serveTable"
            v-loading="listLoading"
            @row-click="rowClick"
          >
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="80"
            >
            </el-table-column>
            <el-table-column align="center" label="车牌号" width="117">
              <el-table-column align="center" label="车牌号" width="117">
                 <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.carNum"
                    style="width: 100%"
                    placeholder="账号"
                  />
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="所属区域" width="120">
              <template slot-scope="{ row }">
                {{ row.place }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="车辆类型" width="200">
              <template slot-scope="{ row }">
                {{ row.carType }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="身份" width="200">
              <template slot-scope="{ row }">
                {{ row.identity }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="当前时间" width="200">
              <template slot-scope="{ row }">
                {{ row.nowTime }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="text-align:center;margin:30px 0 30px 0">
            <el-button type="primary" @click="checkPlate">校验 车牌</el-button>
            <el-button type="primary" :disabled="(btnFalse == 1) ? true : false" @click="greenLight">放  行</el-button>
        </div>
        <!-- 添加节点弹框 -->
    <el-dialog
      title="校验车牌"
      :visible.sync="plateDialog"
      width="30%">
      <el-row>
        <el-col :span="16">
            <el-form ref="form" v-model="plateForm">
                <el-form-item label="通道名称">
                <el-input value="入口一"  style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item  label="车辆类型">
                <el-input v-model="plateForm.carType"  style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="车辆号码">
                <el-input  v-model="plateForm.carNum" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item label="车辆属地">
                <el-input  v-model="plateForm.place" style="width: 320px"></el-input>
                </el-form-item>
                <el-form-item>
                <div class="block" style="text-align:left">
                    <img
                        style="width:20%;"
                        :src="require('../../assets/car.jpg')">
                </div>
                </el-form-item>
                <el-form-item>
                <div class="block" style="text-align:left">
                    <img
                        style="width:40%;"
                        :src="require('../../assets/carOut.jpg')">
                </div>
                </el-form-item>
                
                </el-form>
        </el-col>
        <el-col :span="8">
          <span>相似车牌</span>
          <div style="width:50%;height:360px;"></div>
        </el-col>
          <el-button type="primary"  @click="checkChepai">确认</el-button>
          <el-button @click="plateDialog = false">稍后校验</el-button>
          <el-button @click="plateDialog = false">取消</el-button>
          
      </el-row>
     
    </el-dialog>
    </div>
</template>
<script>
import {default as api} from '../../store/saveData'
  export default {
    data() {
      return {
        select:'京',
        input3:'',
        plateForm:{},
        plateDialog:false,
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        listLoading:false,
        multipleSelection:[],
        total:0,
        editingAndResearchManagementQuery:{},
        btnFalse:1,
        tableList:[
            {
                carNum: '52014',
                place: '桂k',
                carType: '卡丁车',
                identity: '董事长',
                nowTime: '10.19',
            },
            ],
      }
    },
    created(){
      this.tableList[0].nowTime = api.getTime()
      let data = api.showFile('carMessageTable')
      data.forEach(element => {
        if (element.carNum == this.tableList[0].carNum ) {
          this.chargeForm = element
          this.plateForm = element
        }
      });
    },
    methods:{
      checkChepai(){
        setTimeout(() => {
          this.$message({
                type: 'success',
                message: '人为校验成功，请进行收费操作'
              }); 
          this.plateDialog = false
          this.btnFalse = 0
          }, 500);
      },
      greenLight(){
        this.$confirm('确认放行么?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let data = api.showFile('carMessageTable')
              if (data == null || data == undefined) {
              api.saveFile(this.tableList,'carMessageTable')
              return
              }
              data.push(this.tableList[0])
              api.saveFile(data,'carMessageTable')
              this.btnFalse = 1
              this.$message({
                type: 'success',
                message: '成功'
              });   
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消放行'
              });          
        });
        
      },
      checkPlate(){
        this.plateDialog = true
        this.plateForm = this.tableList[0]
      },
        //table的选择
        tableChange(val) {
        if (val.length > 1) {
        this.$refs.serveTable.clearSelection();
        this.$refs.serveTable.toggleRowSelection(val.pop());
        } else {
            this.multipleSelection = val;
        }
        },
      //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
    }
  }
</script>