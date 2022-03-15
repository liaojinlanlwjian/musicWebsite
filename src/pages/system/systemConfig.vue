<template>
<div>
 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
        <div style="width:60%">
        <el-form ref="form" :model="baseMessageForm" label-width="80px">
            <el-form-item label="系统名称">
                <el-input :disabled="!disable" v-model="baseMessageForm.name"></el-input>
            </el-form-item>
            <el-form-item label="图片路径">
               <el-input
                      v-model="baseMessageForm.pieceNumber"
                       :disabled="!disable"
                    >
                      <template slot="append">
                        <el-button >浏览</el-button>
                      </template>
                </el-input>
            </el-form-item>
            <el-form-item label="车牌对比">
                <el-select v-model="baseMessageForm.chepai" :disabled="!disable">
                <el-option label="对比一次" value="vxccv"></el-option>
                <el-option label="对比两次" value="beijvxving"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="默认车牌首字">
                <el-select v-model="baseMessageForm.first"  :disabled="!disable" >
                <el-option label="京" value="fsdf"></el-option>
                <el-option label="桂" value="weq"></el-option>
                <el-option label="云" value="qqq"></el-option>
                 <template slot="append">
                        <el-button >浏览</el-button>
                 </template>
                </el-select>
            </el-form-item>
            <el-form-item label="收费标准">
                <el-select v-model="baseMessageForm.region" :disabled="!disable" >
                <el-option label="一个小时五元" value="www"></el-option>
                <el-option label="一个小时八元" value="shangwwwhai"></el-option>
                <el-option label="一个小时十元" value="eee"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" :disabled="!disable" v-model="baseMessageForm.desc"></el-input>
            </el-form-item>
            <el-form-item v-if="disable">
                <el-button type="primary" @click="baseMessageSubmit">保存</el-button>
                <el-button @click="disable = false">取消</el-button>
            </el-form-item>
            <el-form-item v-if="!disable">
                <el-button type="warning" @click="disable = true">修改</el-button>
            </el-form-item>
        </el-form>
        </div>
       
    </el-tab-pane>
    <el-tab-pane label="高级配置" name="second">
        <div style="margin:0px auto;width:820px">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities"  @change="handleCheckedCitiesChange">
                <el-checkbox style="padding:25px" v-for="city in cities" :disabled="configDisabled" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div v-if="seniorConfig" style="text-align:center;margin:30px 0 30px 0">
            <el-button type="primary" @click="configSubmit">保存</el-button>
            <el-button @click="seniorConfig = false">取消</el-button>
        </div>
        <div v-if="!seniorConfig"  style="text-align:center;margin:30px 0 30px 0">
            <el-button type="warning" @click="seniorConfig = true,configDisabled = false">修改</el-button>
        </div>
    </el-tab-pane>
    <el-tab-pane label="显示屏" name="third">
        <div style="width:40%;margin:0 auto">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>网口屏尺寸</span>
            </div>
            <div class="text item" style="text-align:center">
                <el-radio v-model="radio1" :disabled="!viewingdisplay" label="1">标准屏</el-radio>
                <el-radio v-model="radio1"  :disabled="!viewingdisplay" label="2">大屏</el-radio>
            </div>
            </el-card>
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>标准屏显示字体</span>
            </div>
            <div class="text item" style="text-align:center">
                <el-radio v-model="radio2"  :disabled="!viewingdisplay" label="1">正常字体</el-radio>
                <el-radio v-model="radio2"  :disabled="!viewingdisplay" label="2">大字体</el-radio>
            </div>
            </el-card>
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>标准屏显示样式</span>
            </div>
            <div class="text item" style="text-align:center">
                <el-radio v-model="radio3" :disabled="!viewingdisplay" label="1">整版显示</el-radio>
                <el-radio v-model="radio3" :disabled="!viewingdisplay" label="2">滚动显示</el-radio>
            </div>
            </el-card>
        </div>
        <div v-if="viewingdisplay" style="text-align:center;margin:30px 0 30px 0">
            <el-button type="primary" @click="viewingSubmit">保存</el-button>
            <el-button @click="viewingdisplay = false">取消</el-button>
        </div>
        <div v-if="!viewingdisplay"  style="text-align:center;margin:30px 0 30px 0">
            <el-button type="warning" @click="viewingdisplay = true">修改</el-button>
        </div>
    </el-tab-pane>
    <el-tab-pane label="语音LED一体模块配置" name="fourth">
         <div style="width:40%;margin:0 auto">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>语音LED一体模块配置</span>
            </div>
            <div class="text item" style="text-align:center">
                <el-form ref="form" :model="LEDForm" label-width="80px">
                    <el-form-item label="一体板ip">
                        <el-input :disabled="!LEDView" v-model="LEDForm.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="LED极性">
                        <el-select :disabled="!LEDView"  v-model="LEDForm.polarity">
                        <el-option label="反极性" value="shanghai"></el-option>
                        <el-option label="正极性" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item   label="屏幕尺寸">
                        <el-radio-group v-model="LEDForm.size">
                        <el-radio  :disabled="!LEDView" label="小屏（两行）"></el-radio>
                        <el-radio  :disabled="!LEDView" label="大屏（四行）"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item  :disabled="!LEDView" label="活动时间">
                        <el-button type="warning" :disabled="!LEDView"  @click="seniorConfig = true">初始化</el-button>
                        <el-button type="warning" :disabled="!LEDView"  @click="seniorConfig = true">测试LED</el-button>
                        <el-button type="warning" :disabled="!LEDView"  @click="seniorConfig = true">测试语音</el-button>
                    </el-form-item>
                    <el-form-item>
                         <!-- <el-image :src="src"></el-image> -->
                    </el-form-item>
                    <el-form-item>
                         <!-- <el-image :src="src"></el-image> -->
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input :disabled="!LEDView"  v-model="LEDForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="IP地址">
                        <el-input :disabled="!LEDView"  v-model="LEDForm.address">
                            <template slot="append">
                                <el-button  :disabled="!LEDView" >搜索设备</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="子网掩码">
                        <el-input :disabled="!LEDView"  v-model="LEDForm.subnet">
                            <template slot="append">
                                <el-button  :disabled="!LEDView" >修改参数</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="网关">
                        <el-input :disabled="!LEDView"  v-model="LEDForm.gateway">
                            <template slot="append">
                                <el-button  :disabled="!LEDView" >修改参数</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="MAC地址">
                        <el-input :disabled="!LEDView"  v-model="LEDForm.mac">
                            <template slot="append">
                                <el-button :disabled="!LEDView"  >取消修改</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>

            
            </el-card>
         </div>
         <div style="width:40%;margin:0 auto">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>语音播报配置</span>
            </div>
            <div class="text item" style="text-align:center">
                <el-checkbox :disabled="!LEDView"  v-model="LEDForm.chepai">语音播报车牌</el-checkbox>
                <el-checkbox :disabled="!LEDView"  v-model="LEDForm.time">语音播报停车时长</el-checkbox>
                        <el-input :disabled="!LEDView"  v-model="LEDForm.yl">
                            <template slot="append">
                               <el-button type="warning" @click="seniorConfig = true">调节音量</el-button>
                            </template>
                        </el-input>
            </div>
            </el-card>
         </div>
         <div v-if="LEDView" style="text-align:center;margin:30px 0 30px 0">
            <el-button type="primary" @click="LEDSave">保存</el-button>
            <el-button @click="LEDView = false">取消</el-button>
        </div>
        <div v-if="!LEDView"  style="text-align:center;margin:30px 0 30px 0">
            <el-button type="warning" @click="LEDView = true">修改</el-button>
        </div>
    </el-tab-pane>
    <el-tab-pane label="磁盘空间监控" name="five">
        <div style="width:40%;margin:0px auto">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>报警配置</span>
            </div>
            <div class="text item" style="text-align:center">
               <el-form ref="form" :model="aotuForm" label-width="80px">
                <el-form-item label="报警类型">
                    <el-select :disabled="!diskConfig" v-model="aotuForm.policeType">
                    <el-option label="数值" value="shanghai"></el-option>
                    <el-option label="大小" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报警配置">
                   <el-input-number :disabled="!diskConfig" v-model="aotuForm.policeHandle" controls-position="right"  :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="即时配送">
                   <span style="color:red">检查频率  每小时检查一次（注意：本地磁盘路径才有效）</span>
                </el-form-item>
            </el-form>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>自动配置</span>
            </div>
            <div class="text item" style="text-align:center">
               <el-form ref="form" :model="aotuForm" label-width="80px">
                <el-form-item label="安装地点">
                    <el-select :disabled="!diskConfig" v-model="aotuForm.place">
                    <el-option label="岗亭上" value="shanghai"></el-option>
                    <el-option label="岗亭下" value="beijing"></el-option>
                    <el-option label="岗亭外" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自动类型">
                    <el-select :disabled="!diskConfig" v-model="aotuForm.autoType">
                    <el-option label="迁移" value="shanghai"></el-option>
                    <el-option label="转移" value="beijing"></el-option>
                    <el-option label="关闭" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自动处理">
                   <el-input-number :disabled="!diskConfig" v-model="aotuForm.autoHandle" controls-position="right"  :min="1" :max="10"></el-input-number> <span>天以外的数据</span>
                </el-form-item>
                <el-form-item label="处理路径">
                   <el-input :disabled="!diskConfig" v-model="aotuForm.path">
                       <template slot="append">
                        <el-button :disabled="!diskConfig" >浏览</el-button>
                       </template>
                   </el-input>
                </el-form-item>
            </el-form>
            </div>
        </el-card>
         </div>
         <div v-if="diskConfig" style="text-align:center;margin:30px 0 30px 0">
            <el-button type="primary" @click="autoSubmit">保存</el-button>
            <el-button @click="diskConfig = false">取消</el-button>
        </div>
        <div v-if="!diskConfig"  style="text-align:center;margin:30px 0 30px 0">
            <el-button type="warning" @click="diskConfig = true">修改</el-button>
        </div>
    </el-tab-pane>
    <el-tab-pane label="车位引导应用服务器配置" name="six">车位引导应用服务器配置</el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import {default as api} from '../../store/saveData'
const cityOptions = ['允许临时车辆出入小车场', '固定车过期、余额不足可入场', '启用出口图像对比', '储值车余额不足转临时车收费','小车场多进多出海', '月租车、免费车过期出场转临时车收费',
 '车位满之后固定车允许入场', '临时车快速出场','打印收费小票', '打印换班信息', '启用优惠', '卡口模式','收费窗允许取消',
  '收费弹框数量限制（每次只弹一个窗）', '车主限位已满转临时车', '提示框时间限制', '车牌智能纠错', '无车票纸票功能'];
  export default {
    data() {
      return {
          configDisabled:true,
          baseMessageForm:{},
          aotuForm:{},
          policeForm:{},
          checked:true,
          LEDForm:{
              ip:'192.168.1.2'
          },
          radio1:'1',
          radio2:'1',
          radio3:'1',
          checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        diskConfig:false,
        display:false,
        seniorConfig:false,
        disable:false,
        form:{},
        viewingdisplay:false,
        LEDView:false,
        activeName: 'five',
      };
    },
    created(){
        let data = api.showFile('baseMessageForm')
        if (data == null || data == undefined) {
          this.baseMessageForm = {}
          return
        }
        this.baseMessageForm = data
    },
    methods: {
        autoSubmit(){
            console.log(this.aotuForm);
            api.saveFile(this.aotuForm,'aotuForm')
            this.$message.success('保存成功')
            this.diskConfig = false
        },
        LEDSave(){
            api.saveFile(this.LEDForm,'LEDForm')
            this.$message.success('保存成功')
            this.LEDView = false
        },
        viewingSubmit(){
            let arr = []
            arr.push(this.radio1)
            arr.push(this.radio2)
            arr.push(this.radio3)
            api.saveFile(arr,'viewing')
            this.$message.success('保存成功')
            this.viewingdisplay = false
        },
        configSubmit(){
            api.saveFile(this.checkedCities,'checkedConfig')
            this.$message.success('保存成功')
            this.configDisabled = true
            this.seniorConfig = false
        },
         handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      baseMessageSubmit(){
          api.saveFile(this.baseMessageForm,'baseMessageForm')
          this.$message.success('保存成功')
          this.disable = false
      },
      handleClick(tab, event) {
        console.log(this.activeName);
        if(this.activeName == 'second'){
            let data = api.showFile('checkedConfig')
            if (data == null || data == undefined) {
            this.checkedCities = []
            }
            this.checkedCities = data
        }
        else if(this.activeName == 'third'){
            let data = api.showFile('viewing')
            if (data == null || data == undefined) {
            this.radio1 = ''
            this.radio2 = ''
            this.radio3 = ''
            return
            }
            this.radio1 = data[0]
            this.radio2 = data[1]
            this.radio3 = data[2]
        }
        else if(this.activeName == 'fourth'){
            let data = api.showFile('LEDForm')
            if (data == null || data == undefined) {
                this.LEDForm = {}
            return
            }
            this.LEDForm = data
        }
        else if(this.activeName == 'five'){
            let data = api.showFile('aotuForm')
            if (data == null || data == undefined) {
                this.aotuForm = {}
            return
            }
            this.aotuForm = data
        }
      }
    }
  };
</script>
<style scoped>
.box-card{
    width: 620px;
    margin-bottom: 20px;
}
</style>