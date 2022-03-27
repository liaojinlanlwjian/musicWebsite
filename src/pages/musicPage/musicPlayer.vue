<template>
  <div>
     
    <el-row :gutter="20" >
        <el-col  :span="12">
        <div style="margin:30px auto;width:100%;height:100%;text-align:center">
        <img style="width:300px;height:300px" :src="msg.musicCover" :title="msg.musicName">
        </div>
         <div style="width:100%;height:auto;display:flex;margin-left:20px">
            <div style="width:10%">{{currentMusicTime}}</div>
            <div style="width:80%;text-align:center"><el-progress style="margin-top:3px" :percentage="currentTime" status="success" ></el-progress></div>
            <div style="width:10%">{{totalTime}}</div>
        </div>
         <div style="width:100%;height:auto;display:flex">
            <div style="width:20%"></div>
            <div style="width:20%;text-align:center">
                <img style="width:80px;height:80px" @click="upxt()" :src="require('../../assets/upxt.png')" alt="">
            </div>
            <div style="width:20%;text-align:center">
                <img style="width:80px;height:80px" v-if="tingzhi"  @click="listening" :src="require('../../assets/bofang.png')" alt="">
                <img style="width:80px;height:80px" v-if="!tingzhi"   @click="listening" :src="require('../../assets/praus.png')" alt="">
            </div>
            <div style="width:20%;text-align:center">
                <img style="width:80px;height:80px" @click="next()" :src="require('../../assets/next.png')" alt="">
            </div>
            <div style="width:20%"></div>
        </div>
        </el-col>
        <el-col :span="12">
        
        <div class="lrcCon">
            <div class="lyric" ref="lrc" >
                <p class="lrc-p" :class="{'active': currentTime > allkey[index] && currentTime < allkey[index+1]}"   v-for="(item, key,index) in lrcData" :key="index">
                <span>{{item}}{{ scrollLrc(index) }}</span>
                </p>
            </div>
            
        </div>
        <audio v-show="false" ref="player" style="margin-left:60px" :src="audioUrl" width=300 height=45 type=audio/mpeg  controls   volume="0"></audio>
       
        
       
        </el-col>
    </el-row>
    <div>
       
    </div>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
    components: {
        Aplayer
    },
    data () {
           return {
               oAudio:'',
               audioUrl: '', // 声音源
               singId:'',
               currentMUsicLyric:[],
               isShowMusicList:true,
               lyricIndex:0,
               singPic:'',
               lrcData:"",
               currentTime:0,
               allkey:[],
               token:0,
               tingzhi:false,
               totalTime:'',
               currentMusicTime:'',
               tempMusicId:'',
               msg:{
                   
               },
               userName:''
           
        }
      },
     mounted: function () {
          this.queryMusic(this.$route.query.id)
      this.userName = JSON.parse(sessionStorage.getItem("user-info")).name
      },
      beforeDestroy(){
          this.removeEventHandle()
      },
methods:{
queryMusic(id){
this.$http.get(`/api/music/querySingleMusic/?id=` + id).then((response)=>{
          this.msg = response.data.data[0]
          this.tempMusicId = this.msg.id
          this.getGeCi()
          this.getGeCiUrl()
          this.addEventHandle()
        //   this.msg['user'] = 'admin'
          }).catch((response)=>{
            console.log(response);
          })
},
//下一首
next(){
this.$http.get(`/api/recent/queryNextSing/?id=` + this.tempMusicId).then(res=>{
            this.queryMusic(res.data.data[0].id)
            this.removeEventHandle()
            this.tingzhi = false
            this.token = 0
            this.$refs.player.currentTime = 0
            this.$refs.lrc.style.top = 0 + 'px'
            this.$message.info(res.data.msg)
          }).catch((response)=>{
            console.log(response);
          })
},
//上一首
upxt(){
    this.$http.get(`/api/recent/queryUpxtSing/?id=` + this.tempMusicId).then(res=>{
            this.queryMusic(res.data.data[0].id)
            this.removeEventHandle()
            this.tingzhi = false
            this.token = 0
            this.$refs.lrc.style.top = 0 + 'px'
            this.$refs.player.currentTime = 0
            this.$message.info(res.data.msg)
          }).catch((response)=>{
            console.log(response);
          })
},
async listening(){
    let index = 0
    if(this.token == 0){
        this.$refs.player.play()
        this.totalTime = this.dealMusicTime(parseInt(this.$refs.player.duration))
        this.token = 1
        this.tingzhi = true
        this.$refs.lrc.style.top = 0 + 'px'
        this.$refs.player.currentTime = 0
        let user = this.msg
        user['user'] = this.userName
        let res = await this.$http.get(`/api/recent/queryAllRecent`)
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
            if (data[i].name ==  this.msg.musicName && data[i].user ==  this.msg.user) {
                index = 1
                break
            }
        }
        if (index != 1) {
            this.$http.post(`/api/recent/addRecentPlay`,user)
        }
        return
        
    }else{
        this.$refs.player.pause()
        this.token = 0
        this.tingzhi = false
    }
},
//处理音乐时间
dealMusicTime(s){
        var h;
        h  =   Math.floor(s/60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        s  =   s%60;
        //将变量转换为字符串
        h    +=    '';
        s    +=    '';
        //如果只有一位数，前面增加一个0
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
},
getGeCi(){
     this.$http.get('/proxy/lyric?id=' + this.msg.musicApi).then(({data}) =>{
      this.filterLrc(data.lrc.lyric)
    })
},

addEventHandle(){
    this.$refs.player.addEventListener('timeupdate',this.currentTimeHandle)
},
removeEventHandle(){
    this.$refs.player.removeEventListener('timeupdate',this.currentTimeHandle)
},
currentTimeHandle(){
    this.currentMusicTime = this.dealMusicTime(parseInt(this.$refs.player.currentTime))
    this.currentTime = this.$refs.player.currentTime
    },
filterLrc(values){
if (!values) return;
var lrc = {}
var lyrics = values.split("\n")
// console.log(lyrics);
var reg = /\[\d*:\d*(\.|:)\d*]/g;
for(var i = 0;i<lyrics.length;i++){
var timeRegArr = lyrics[i].match(reg)
// console.log(timeRegArr);
if(!timeRegArr) continue;
//获取歌曲
var content = lyrics[i].replace(timeRegArr,"")
// console.log(content);
//获取时间
var t = timeRegArr[0]
var min = parseInt(t.match(/\[\d*/i).toString().slice(1))
var sec = parseInt(t.match(/\:\d*/i).toString().slice(1))
var time = min *60 + sec
lrc[time]=content
}
this.lrcData = lrc
this.getAllKey(lrc)
},
getAllKey(lrcArr){
for(var key in lrcArr){
    this.allkey.push(key)
}
},
scrollLrc(index){
if(this.currentTime > this.allkey[index] && this.currentTime <this.allkey[index+1]){
this.$refs.lrc.style.top = -(30 * (index-3)) + "px"
}
},
getGeCiUrl(){
     this.$http.get('/proxy/song/url?id=' + this.msg.musicApi).then(({data}) =>{
      this.audioUrl = data.data[0].url
      console.log(this.msg);
    //   let Msgdata = this.$qs.stringify(this.msg)
    //   console.log(Msgdata);
     
    })
},
parsingGeci(data){
        // 处理歌词，转化成key为时间，value为歌词的对象
    let lyricArr = data.lrc.lyric.split('[').slice(1); // 先以[进行分割
     let lrcObj = {};
     lyricArr.forEach(item => {
         let arr = item.split(']');	// 再分割右括号
         // 时间换算成秒
         let m = parseInt(arr[0].split(':')[0])
         let s = parseInt(arr[0].split(':')[1])
         arr[0] = m*60 + s;
         if (arr[1] != '\n') { // 去除歌词中的换行符
             lrcObj[arr[0]] = arr[1];
         }
     })
    //  console.log(lrcObj);
     // 存储数据
     this.currentMUsicLyric = lrcObj;
     console.log(lrcObj);
},
}
}
</script>
<style scoped>
.lrcCon{
    width: 100%;
    height: 450px;
    overflow: hidden;
    position: relative;
}
.lyric {
        width: 100%;
        /* height: 500px; */
        position: absolute;
        top: 0;
        /* background-color: #f5f5f5; */
        overflow: auto;
        color: #6f6e6e;
        font-size: 14px;
        font-weight: normal;
        padding: 15px 10px;
        text-align: center;
        border-left: none;
        }
.lrc-p {
        height: 30px;
        line-height: 30px;
        /* text-align: center; */
        }
.active {
            color: #00cef6;
            height: 30px;
            /* line-height: 20px; */
            font-size: 20px;
        }
        

</style>