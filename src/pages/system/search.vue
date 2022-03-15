<template>
  <div>
      <div style="width:20%;height:240px;margin:0px auto;display:flex">
        <div>
           <el-select v-model="value" @change="selectChange" style="width:110px" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          <template>
                <template slot="append">
                </template>
            </template>
        </el-select>
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            :disabled="inputDisabled"
            v-model="input2">
            <template>
                <template slot="append">
                    <el-button :disabled="btnDisabled" style="background:#93aff0;color:#2650af" @click="searchClick">搜索</el-button>
                </template>
            </template>
          </el-input>
          </div>
       
          
          
      </div>
      <div v-show="searchShow">
            <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="margin:20px auto"
            border
            ref="serveTable"
            v-loading="listLoading"
          >
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
            </div>
  </div>
</template>

<script>
import {default as api} from '../../store/saveData'
export default {
    data(){
        return{
            searchShow:false,
            editingAndResearchManagementQuery:{},
            total:0,
            input:'',
            input2:'',
            tableList:[],
            listLoading:false,
            inputDisabled:true,
            btnDisabled:true,
            value:'',
            options: [{
                value: 'carNum',
                label: '车牌号'
              }, {
                value: 'carType',
                label: '车辆类型'
              }, {
                value: 'identity',
                label: '身份'
              }, {
                value: 'place',
                label: '所属地区'
              }],
        }
    },
    watch:{
      input2:{
        handler(val){
          if (val != null || val != '') {
            this.btnDisabled = false
          }
        }
      }
    },
    methods:{
        selectChange(){
          this.inputDisabled = false
        },
        searchClick(){
          this.tableList = []
            let data = api.showFile('carMessageTable')
            if (data == null || data == undefined) {
            this.$message.info('无此数据！')
            return
          }
          data.forEach(e => {
            if (e[this.value] == this.input2) {
              this.tableList.push(e)
            }else{
              this.$message.info('无此数据！')
            }
          });
          if (this.tableList.length == 0) {
            this.$message.info('无此数据！')
            return
          }
          this.total = this.tableList.length
          this.searchShow = true
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

<style>

</style>