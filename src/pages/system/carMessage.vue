<template>
    <div>
        <div class="filter-container">
            <div style="height:50px;width:580px;line-height:50px;font-size:24px;color:#1ea176">
              <span>今日已有：{{ carIn }} 辆车辆进入,     </span>
              <span>今日已有：{{ carOut }} 辆车辆驶出</span>
            </div>
            <div style="display: flex">
              <el-button class="filter-item" type="primary"  @click="showOperator"
                >查看</el-button>
            </div>
          </div>
          <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="width: 90%;margin-top:20px"
            border
            ref="serveTable"
            v-loading="listLoading"
            @row-click="rowClick"
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
                    :disabled="inputDisabled"
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
            <el-table-column align="center" label="驶入时间" width="180">
              <template slot-scope="{ row }">
                {{ row.nowTime }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="驶出时间" width="180">
              <template slot-scope="{ row }">
                {{ row.outTime }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="缴费" width="200">
              <template slot-scope="{ row }">
                {{ row.spend }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否缴费">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.value"
                  active-color="red"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
          <!-- 主表的分页 -->
          <el-pagination
            :current-page="editingAndResearchManagementQuery.current"
            :page-sizes="[10, 20, 50, 100, 1000]"
            :page-size="editingAndResearchManagementQuery.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @pagination="handleQueryByPage"
          />
          <!-- 增加弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
    >
      <el-form
        :model="user"
        :rules="rules"
        ref="user"
        label-width="100px"
        label-position="left"
      >
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
        <el-form-item label="车牌号">
          <el-input
            v-model="user.carNum"
            style="width: 100%"
            :disabled="inputDisabled"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item label="所属区域">
          <el-select v-model="user.place" placeholder="请选择" :disabled="inputDisabled">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份">
          <el-input
            v-model="user.identity"
            style="width: 100%"
            :disabled="inputDisabled"
          />
        </el-form-item>
         <el-form-item label="车辆类型">
          <el-select v-model="user.carType" placeholder="请选择" :disabled="inputDisabled">
            <el-option
              v-for="item in carTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         
        </div>
        </el-col  >
        <el-col :span="11" style="margin-left: 55px">
          <div class="grid-content bg-purple">
          <el-form-item label="驶入时间">
          <el-input
            v-model="user.inTime"
            style="width: 100%"
            :disabled="inputDisabled"
          />
        </el-form-item>
        <el-form-item label="驶出时间" prop="address">
          <el-input
            v-model="user.outTime"
            style="width: 100%"
            :disabled="inputDisabled"
          />
        </el-form-item>
           <el-form-item label="缴费金额">
          <el-input
            v-model="user.spend"
            style="width: 100%"
            :disabled="inputDisabled"
            placeholder=" 用户昵称"
          />
        </el-form-item>
        <el-form-item label="是否缴费">
         <el-switch
          v-model="user.value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </el-form-item>
        </div>
        </el-col>
      </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
import {default as api} from '../../store/saveData'
export default {
    data(){
        return{
            carIn:'',
            carOut:0,
            dialogTitle:'查看',
            multipleSelection:[],
            inputDisabled:true,
            user:{},
            dialogVisible:false,
            listLoading:false,
            total:0,
            editingAndResearchManagementQuery:{},
            tableList:[
                {
                    carNum: '0992',
                    place: '京A',
                    carType: '轿车',
                    inTime: '8.08',
                    outTime: '',
                    spend: '',
                    identity: '过客',
                    value: true
                },
                {
                    carNum: '07716',
                    place: '京B',
                    carType: '坦克',
                    inTime: '3.45',
                    outTime: '',
                    spend: '',
                    identity: '户主',
                    value: false
                },
            ],
            sexOptions:[{
                value: '京',
                label: '京'
                }, 
                {
                value: '粤',
                label: '粤'
                },{
                value: '桂',
                label: '桂'
            }], 
            carTypeOptions:[{
                value: '轿车',
                label: '轿车'
                }, 
                {
                value: 'SUV',
                label: 'SUV'
                },{
                value: '坦克',
                label: '坦克'
            }], 
            rules:{
                 name: [
                { required: true, message: "请选择用户的角色", trigger: "blur" },
                ],
                password: [
                { required: true, message: "请输入地址", trigger: "blur" },
                ],
                account: [
                { required: true, message: "请选择用户的部门", trigger: "blur" },
                ],
            },
            options: [],
        }
    },
    created(){
      let data = api.showFile('carMessageTable')
      if (data == null || data == undefined) {
        this.total = this.tableList.length
        return
      }
      this.tableList = data
      this.total = this.tableList.length
      this.carIn = this.tableList.length
      this.carOut = this.tableList.length
      this.carOut = 0
      data.forEach(element => {
        console.log(element.outTime);
        if(element.outTime != undefined ){
          this.carOut = this.carOut + 1
          console.log(this.carOut);
        }
      });
      
    },
    methods:{
      //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
        showOperator(){
            if (this.multipleSelection == 0) {
                this.$message.error('请选择一条数据')
                return
            }
            this.user = this.multipleSelection[0]
            this.dialogTitle = '查看'
            this.dialogVisible = true
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
        handleSizeChange(){},
        handleCurrentChange(){},
        handleQueryByPage(){},
    }
}
</script>