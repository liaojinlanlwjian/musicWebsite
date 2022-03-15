<template>
    <div>
        <div style="width:100%;margin:0px auto;display:flex">
          <div style="width:50%">
              <span class="demonstration" style="font-size:24px;color:#85ea2d">车辆进入图片</span>
                <div class="block" style="text-align:center">
                    <img
                        style="width:80%;"
                        :src="require('../../assets/car.jpg')">
                </div>
          </div>
          <div style="width:50%">
              <span class="demonstration" style="font-size:24px;color:#85ea2d">车辆驶出图片</span>
                <div class="block" style="text-align:center">
                    <img
                        style="width:80%;"
                        :src="require('../../assets/carOut.jpg')">
                </div>
          </div>
        </div>
        
        <div style="text-align:left;margin:30px 0 30px 0">
            <span style="font-size:24px;color:#d3b5e1">车辆信息</span>
            <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="width: 59%;margin:20px auto"
            border
            ref="serveTable"
            v-loading="listLoading"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="80"
            >
            </el-table-column>
            <el-table-column align="center" label="车牌号" width="117">
               <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.carNum"
                    style="width: 100%"
                    placeholder="账号"
                  />
              </template>
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
            <el-button type="primary" :disabled="(btnFalse == 1) ? true : false" @click="chargePlate">车牌识别收费</el-button>
        </div>
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
                
            </el-row>
             <div style="text-align:center;margin-top:20px">
                <el-button type="primary" @click="checkChepai">校验成功</el-button>
                <el-button @click="plateDialog = false">稍后校验</el-button>
                <el-button @click="plateDialog = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="收费"
            :visible.sync="chargeDialog"
            width="30%">
            <el-row>
                <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>入场信息</span>
                    </div>
                    <el-form ref="form" v-model="chargeForm">
                    <el-form-item>
                    <div class="block" style="text-align:left">
                        <img
                            style="width:20%;"
                            :src="require('../../assets/car.jpg')">
                    </div>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="chargeForm.carNum" style="width: 320px" class="input-with-select">
                        <el-select v-model="chargeForm.place" slot="prepend" placeholder="请选择">
                            <el-option label="桂" value="1"></el-option>
                            <el-option label="粤" value="2"></el-option>
                            <el-option label="京" value="3"></el-option>
                            <el-option label="云" value="3"></el-option>
                        </el-select>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="车辆类型">
                        <el-select v-model="chargeForm.carType" placeholder="请选择">
                            <el-option
                            v-for="item in carOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入场时间">
                        <span>{{ chargeForm.nowTime }}</span>
                    </el-form-item>
                    <el-form-item>
                    <div class="block" style="text-align:left">
                        <img
                            style="width:40%;"
                            :src="require('../../assets/carOut.jpg')">
                    </div>
                    </el-form-item>
                    <el-form-item label="应缴金额">
                        <span>5.00</span>
                    </el-form-item>
                    <el-form-item label="优惠金额">
                        <span>0.00</span>
                    </el-form-item>
                    <el-form-item label="实收金额">
                        <span>5.00</span>
                    </el-form-item>
                    </el-form>
                </el-card>
                </el-col>
                <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>出场信息</span>
                    </div>
                    <el-form ref="form" v-model="chargeForm">
                    <el-form-item>
                    <div class="block" style="text-align:left">
                        <img
                            style="width:20%;"
                            :src="require('../../assets/car.jpg')">
                    </div>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="chargeForm.carNum" style="width: 320px" class="input-with-select">
                        <el-select v-model="chargeForm.place" slot="prepend" placeholder="请选择">
                            <el-option label="桂" value="1"></el-option>
                            <el-option label="粤" value="2"></el-option>
                            <el-option label="京" value="3"></el-option>
                            <el-option label="云" value="3"></el-option>
                        </el-select>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="通道名称">
                        <span>出口一</span>
                    </el-form-item>
                    <el-form-item label="出场时间">
                        <span>{{ time }}</span>
                    </el-form-item>
                    <el-form-item>
                    <div class="block" style="text-align:left">
                        <img
                            style="width:40%;"
                            :src="require('../../assets/carOut.jpg')">
                    </div>
                    </el-form-item>
                    <el-form-item label="停车时间">
                        <span style="font-size:24px;">{{ stopTime }}</span>
                    </el-form-item>
                    <el-form-item style="height:90px">
                        <span style="font-size:20px;color:red">车组车位已满，固定车转临时车收费</span>
                    </el-form-item>
                    </el-form>
                </el-card>
                </el-col>
            </el-row>
            <div style="text-align:center;margin-top:20px">
                <el-button type="primary" @click="confirm">确认</el-button>
                <el-button @click="chargeDialog = false">手动匹配</el-button>
                <el-button @click="chargeDialog = false">免费/异常放行</el-button>
                <el-button @click="chargeDialog = false">语音播报</el-button>
            </div>
                
        </el-dialog>
    </div>
</template>
<script>
import {default as api} from '../../store/saveData'
  export default {
    data() {
      return {
          carOptions:[
              {
          value: '临时车A',
          label: '临时车A'
        }, {
          value: '临时车B',
          label: '临时车B'
        },
          ],
          chargeForm:{},
        chargeDialog:false,
        select:'京',
        input3:'',
        plateForm:{},
        plateDialog:false,
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        listLoading:false,
        multipleSelection:[],
        total:0,
        editingAndResearchManagementQuery:{},
        tableList:[
            {
                carNum: '52014',
                place: '桂K',
                carType: '坦克',
                identity: '董事长',
                nowTime: '超级管理员',
            },
            ],
          time:'',
          stopTime:'',
          btnFalse:1
      }
    },
    created(){
      if (this.tableList.length == 0) {
        return
      }
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
      confirm(){
         this.$confirm('确认收费成功并且放行么?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              let data = api.showFile('carMessageTable')
              data.forEach(element => {
                if (element.carNum == this.tableList[0].carNum ) {
                  if(element.outTime == undefined || element.outTime == ''){
                    element['outTime'] = this.time
                  }
                  element['stopTime'] = this.stopTime
                  element['spend'] = '5元'
                  element['value'] = true
                }
              });
              api.saveFile(data,'carMessageTable')
              this.btnFalse = 1
              this.chargeDialog = false
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
        chargePlate(){
             let data = api.showFile('carMessageTable')
              data.forEach(element => {
                if (element.carNum == this.tableList[0].carNum ) {
                  this.chargeForm = element
                }
              });
              this.time = api.getTime()
              this.stopTime = api.getTimeClose(this.chargeForm.nowTime,this.time)
              this.chargeDialog = true
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
    }
  }
</script>