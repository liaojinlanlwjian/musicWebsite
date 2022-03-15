<template>
  <div>
      <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>工作站属性</span>
            </div>
        <div style="display: flex">
              <el-button class="filter-item" type="primary" @click="addWorkstation"
                >增加</el-button
              >
              <el-button class="filter-item" type="danger"  @click="deleteWorkstation"
                >删除</el-button
              >
        </div>
       <el-table
            :data="tableListWorkstation"
            @selection-change="tableChangeWorkstation"
            style="width: 90%;margin-top:20px"
            border
            ref="serveTableWorkstation"
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
            <el-table-column align="center" label="工作站名称" width="117">
              <template slot-scope="{ row }">
                {{ row.workstationName }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="工作站IP" width="280">
              <template slot-scope="{ row }">
                {{ row.workstationIp }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="监控画面" width="200">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.floorRange" >
                    <el-option v-for="item in displayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="图片对比时间" width="150">
              <template slot-scope="{ row }">
                {{ row.time }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="相同车牌过滤（/s）" width="200">
              <template slot-scope="{ row }">
                {{ row.times }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="多检车启用" width="200">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.carUse">
                    <el-option v-for="item in carOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
             </template>
            </el-table-column>
            <el-table-column align="center" label="多检车停用">
              <template slot-scope="{ row }">
                {{ row.carNoUse }}
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
        </el-card>
      </div>
      <div style="margin-top:30px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通道信息</span>
            </div>
        <div style="display: flex">
              <el-button class="filter-item" type="primary" @click="addChannel"
                >添加</el-button
              >
              <el-button class="filter-item" type="danger"  @click="deleteChannel"
                >删除</el-button
              >
        </div>
       <el-table
            :data="tableList"
            @selection-change="tableChange"
            style="width: 90%;margin-top:20px"
            border
            ref="serveTable"
            v-loading="listLoadingChannel"
            @row-click="rowClickChannel"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="80"
            >
            </el-table-column>
            <el-table-column align="center" label="通道名称" width="117">
              <template slot-scope="{ row }">
                {{ row.channelName }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="识别器IP" width="280">
              <template slot-scope="{ row }">
                {{ row.recognizerIp }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="视频启用" width="200">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.videoUse" >
                    <el-option v-for="item in videoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </el-table-column>
            <el-table-column align="center" label="识别器" width="150">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.recognizer" >
                    <el-option v-for="item in recognizerOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </el-table-column>
            <el-table-column align="center" label="视频" width="200">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.videos">
                    <el-option v-for="item in videosOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </el-table-column>
            <el-table-column align="center" label="相似IP" width="200">
              <template slot-scope="{ row }">
                {{ row.videosIp }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="识别任务">
              <template slot-scope="{ row }">
                {{ row.task }}
              </template>
            </el-table-column>
       </el-table>
       <!-- 主表的分页 -->
          <el-pagination
            :current-page="editingAndResearchManagementQuery.current"
            :page-sizes="[10, 20, 50, 100, 1000]"
            :page-size="editingAndResearchManagementQuery.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalChanel"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @pagination="handleQueryByPage"
          />
       </el-card>
      </div>
      <!-- 增加弹窗 -->
    <el-dialog
      :visible.sync="workstationDialogVisible"
      title="增加工作站"
    >
      <el-form
        :model="workstationForm"
        :rules="rules"
        ref="workstationForm"
        label-width="160px"
        label-position="left"
        v-loading="formLoading"
      >
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
        <el-form-item label="工作站名称" prop="workstationName">
          <el-input
            v-model="workstationForm.workstationName"
            style="width: 100%"
          />
        </el-form-item>
         <el-form-item label="工作站IP" prop="workstationIp">
          <el-input
            v-model="workstationForm.workstationIp"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="监控画面" prop="floorRange">
          <el-select v-model="workstationForm.floorRange" placeholder="请选择" >
            <el-option
              v-for="item in displayOptions"
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
          <el-form-item label="图片对比时间" prop="time">
          <el-input
            v-model="workstationForm.time"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="相同车票过滤（/s）">
          <el-input
            v-model="workstationForm.times"
            style="width: 100%"
          />
        </el-form-item>
            <el-form-item label="多检车启用">
          <el-select v-model="workstationForm.carUse" placeholder="请选择">
            <el-option
              v-for="item in carOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
 
        </el-form-item>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label=" 多检车停用" prop="carNoUse">
          <el-input
            style="width: 100%"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="workstationForm.carNoUse"
          >
          </el-input>
        </el-form-item>
      </el-row>
      </el-form>
      <div style="text-align: center">
        <el-button type="danger" @click="workstationDialog = false">取消</el-button>
        <el-button type="primary" @click="confirm('workstationForm')">确认</el-button>
      </div>
    </el-dialog>
    <!-- 增加通道弹窗 -->
    <el-dialog
      :visible.sync="channelDialogVisible"
      title="添加通道"
    >
      <el-form
        :model="channelForm"
        :rules="rulesChannel"
        ref="channelForm"
        label-width="160px"
        label-position="left"
        v-loading="channelLoading"
      >
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
        <el-form-item label="通道名称" prop="channelName">
          <el-input
            v-model="channelForm.channelName"
            style="width: 100%"
          />
        </el-form-item>
         <el-form-item label="识别器IP" prop="Ip">
          <el-input
            v-model="channelForm.recognizerIp"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="视频启用" prop="videoUse">
          <el-select v-model="channelForm.videoUse" placeholder="请选择" >
            <el-option
              v-for="item in videoOptions"
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
         <el-form-item label="识别器" prop="recognizer">
          <el-select v-model="channelForm.recognizer" placeholder="请选择" >
            <el-option
              v-for="item in recognizerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
 
        </el-form-item>
        <el-form-item label="视频" prop="videos"> 
          <el-select v-model="channelForm.videos" placeholder="请选择" >
            <el-option
              v-for="item in videosOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
            <el-form-item label="相似Ip">
            <el-input
                v-model="channelForm.videosIp"
                style="width: 100%"
            />
            </el-form-item>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label=" 识别任务">
          <el-input
            style="width: 100%"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="channelForm.task"
          >
          </el-input>
        </el-form-item>
      </el-row>
      </el-form>
      <div style="text-align: center">
        <el-button type="danger" @click="channelDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmChannel('channelForm')">确认</el-button>
      </div>
    </el-dialog>
    <div v-if="disable" style="text-align:center;margin:30px 0 30px 0">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button type="danger" @click="disable = false">取 消</el-button>
    </div>
    <div v-if="!disable" style="text-align:center;margin:30px 0 30px 0">
            <el-button @click="disable = true">修 改</el-button>
    </div>
  </div>
</template>

<script>
import {default as api} from '../../store/saveData'
export default {
    data(){
        return{
            editingAndResearchManagementQuery:{},
            disable:false,
            displayOptions:[
                {
                value: '二画面',
                label: '二画面'
                }, {
                value: '一画面',
                label: '一画面'
                },
            ],
            carOptions:[
                {
                value: '禁用',
                label: '禁用'
                }, {
                value: '启用',
                label: '启用'
                },
            ],
            recognizerOptions:[
                {
                value: '高清一体机设备',
                label: '高清一体机设备'
                }, {
                value: '清晰一体机设备',
                label: '清晰一体机设备'
                },
            ],
            videosOptions:[
                {
                value: '标准协议视频',
                label: '标准协议视频'
                }, {
                value: '高级协议视频',
                label: '高级协议视频'
                },
            ],
            videoOptions:[
                {
                value: '禁用',
                label: '禁用'
                }, {
                value: '启用',
                label: '启用'
                },
            ],
            multipleSelection:[],
            multipleSelectionWorkstation:[],
            total:0,
            totalChanel:0,
            editingAndResearchManagementQuery:{},
            tableListWorkstation:[
                {
                    workstationName: '默认工作站',
                    workstationIp: '145.168.15.2',
                    floorRange: '二画面',
                    time: '10',
                    times: '30',
                    carUse: '禁用',
                    carNoUse: '500'
                },
            ],
            tableList:[
                {
                    channelName: '入口一',
                    recognizerIp: '193.168.15.36',
                    videoUse: '启用',
                    recognizer: '高清一体机设备',
                    videos: '标准协议视频',
                    videosIp: '193.58.123.45',
                    task: '默认第一'
                },
                {
                    channelName: '出口二',
                    recognizerIp: '193.168.15.38',
                    videoUse: '启用',
                    recognizer: '高清一体机设备',
                    videos: '标准协议视频',
                    videosIp: '193.58.123.44',
                    task: '默认第二'
                },
            ],
            workstationDialogVisible:false,
            workstationForm:{},
            formLoading:false,
            rules:{
                workstationName: [
                        { required: true, message: "请输入工作站名称", trigger: "blur" },
                    ],
                floorRange: [
                        { required: true, message: "请选择监控画面", trigger: "blur" },
                    ],
                workstationIp: [
                        { required: true, message: "请输入工作站IP", trigger: "blur" },
                    ],
                time: [
                        { required: true, message: "请输入图片对比时间", trigger: "blur" },
                    ],
            },
            listLoading:false,
            listLoadingChannel:false,
            channelDialogVisible:false,
            channelForm:{},
            channelLoading:false,
            rulesChannel:{
                channelName: [
                        { required: true, message: "请输入通道名称", trigger: "blur" },
                    ],
                recognizerIp: [
                        { required: true, message: "请输入识别器Ip", trigger: "blur" },
                    ],
                videoUse: [
                        { required: true, message: "请选择视频启用方式", trigger: "blur" },
                    ],
                recognizer: [
                        { required: true, message: "请选择识别器", trigger: "blur" },
                    ],
                videos: [
                        { required: true, message: "请选择视频类型", trigger: "blur" },
                    ],
                videosIp: [
                        { required: true, message: "请输入相似ip", trigger: "blur" },
                    ],
            }
        }
    },
    created(){
        let data = api.showFile('workstationTable')
        let dataChanel = api.showFile('channelTable')
        if (dataChanel == null || dataChanel == undefined) {
          this.totalChanel = this.tableList.length
        }else{
          this.tableList = dataChanel
          this.totalChanel = this.tableList.length
        }
        
        if (data == null || data == undefined) {
          this.total = this.tableListWorkstation.length
        }else{
          this.tableListWorkstation = data
        this.total = this.tableListWorkstation.length
        }
        
    },
    methods:{
        save(){
            this.$confirm('是否保存该工作站信息和通道信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.listLoadingChannel = true
              this.listLoading = true
              setTimeout(() => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.listLoading = false
              this.listLoadingChannel = false
              }, 500);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消保存'
              });          
        });
        },
        addChannel(){
            this.channelDialogVisible = true
        },
        deleteChannel(){
            if(this.multipleSelection.length == 0){
                this.$message.error('请选择一条数据')
                return
            }
             this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.listLoadingChannel = true
              setTimeout(() => {
              this.tableList.splice(this.multipleSelection[0],1)
              api.saveFile(this.tableList,'channelTable')
              this.totalChanel = this.tableList.length
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.listLoadingChannel = false
              this.$refs.serveTable.clearSelection()
              }, 500);
             
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
        },
        //工作站
        confirm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.workstationDialogVisible = false
                    this.listLoading = true
                setTimeout(() => {
                    this.$message.success('增加成功')
                    this.tableListWorkstation.push(this.workstationForm)
                    let data = api.showFile('workstationTable')
                    if (data == null || data == undefined) {
                    api.saveFile(this.tableListWorkstation,'workstationTable')
                    this.listLoading = false
                    this.total = this.tableListWorkstation.length
                    return
                    }
                    data.push(this.tableListWorkstation[0])
                    api.saveFile(data,'workstationTable')
                    this.listLoading = false
                    this.total = this.tableListWorkstation.length
                }, 500);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        confirmChannel(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.channelDialogVisible = false
                    this.listLoadingChannel = true
                setTimeout(() => {
                    this.$message.success('增加成功')
                    this.tableList.push(this.channelForm)
                    let data = api.showFile('channelTable')
                    if (data == null || data == undefined) {
                    api.saveFile(this.tableList,'channelTable')
                      this.listLoadingChannel = false
                      this.totalChanel = this.tableList.length
                    return
                    }
                    data.push(this.tableList[0])
                    api.saveFile(data,'channelTable')
                    this.listLoadingChannel = false
                    this.totalChanel = this.tableList.length
                }, 500);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addWorkstation(){
            this.workstationDialogVisible = true
        },
        deleteWorkstation(){
            if(this.multipleSelectionWorkstation.length == 0){
                this.$message.error('请选择一条数据')
                return
            }
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.listLoading = true
              setTimeout(() => {
              this.tableListWorkstation.splice(this.multipleSelectionWorkstation[0],1)
              api.saveFile(this.tableListWorkstation,'workstationTable')
              this.total = this.tableListWorkstation.length
              this.$refs.serveTableWorkstation.clearSelection()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.listLoading = false
              }, 500);
             
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
        });
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
        tableChangeWorkstation(val) {
        if (val.length > 1) {
        this.$refs.serveTableWorkstation.clearSelection();
        this.$refs.serveTableWorkstation.toggleRowSelection(val.pop());
        } else {
            this.multipleSelectionWorkstation = val;
        }
        },
        //监听row-click事件，实现选中
        rowClick(row, column, event) {
          this.$refs.serveTableWorkstation.toggleRowSelection(row)
        },
        //监听row-click事件，实现选中
        rowClickChannel(row, column, event) {
          this.$refs.serveTable.toggleRowSelection(row)
        },
        handleSizeChange(){},
        handleCurrentChange(){},
        handleQueryByPage(){},
    }
}
</script>

<style>

</style>