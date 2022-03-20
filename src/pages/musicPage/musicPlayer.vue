<template>
  <div>
     
    <el-row :gutter="20" >
        <el-col style="text-align:right" :span="12">
       
<!-- <div style="width:300px;height:300px"> -->
<img style="width:600px;height:600px" :src="singPic" alt="">
<!-- </div> -->



        </el-col>
        <el-col :span="12">
        
        <div class="lrcCon">
            <div class="lyric" ref="lrc" >
                <p class="lrc-p" :class="{'active': currentTime > allkey[index] && currentTime < allkey[index+1]}"   v-for="(item, key,index) in lrcData" :key="index">
                <span>{{item}}{{ scrollLrc(index) }}</span>
                </p>
            </div>
            
            <!-- <ul class="lyric"  >
                <div style="width:100%;text-align:center;">
            <h1>{{singName}}</h1>
            <h3>{{singAuthor}}</h3>
        </div>
                <li ref="lrc" :class="{'active': currentTime > allkey[index] && currentTime < allkey[index+1]}"  v-for="(item, key,index) in lrcData" :key="index">
                     <p >{{item}}{{ scrollLrc(index) }}</p>
                </li>
             </ul> -->
        </div>
        <audio v-show="false" ref="player" style="margin-left:60px" :src="audioUrl" width=300 height=45 type=audio/mpeg  controls   volume="0"></audio>
        <!-- <el-button @click="listening">播放</el-button> -->
        <div style="width:100%;height:80px;display:flex">
            <div style="width:20%"></div>
            <div style="width:20%;text-align:center">
                <img style="width:120px;height:120px" :src="require('../../assets/upxt.png')" alt="">

            </div>
            <div style="width:20%;text-align:center">
                <img style="width:120px;height:120px" v-if="tingzhi"  @click="listening" :src="require('../../assets/bofang.png')" alt="">
                <img style="width:120px;height:120px" v-if="!tingzhi"   @click="listening" :src="require('../../assets/praus.png')" alt="">
            </div>
            <div style="width:20%;text-align:center">
                <img style="width:120px;height:120px" :src="require('../../assets/next.png')" alt="">
            </div>
            <div style="width:20%"></div>
        </div>
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
               tingzhi:false
           
        }
      },
     mounted: function () {
        //   console.log(this.$route.query.musicId);
        //   console.log(this.$route.query.musicPic);
        //   console.log(this.$route.query.musicAuthor);
        //   console.log(this.$route.query.musicName);
          this.singId = this.$route.query.musicId
          this.singPic = this.$route.query.musicPic
          this.singName = this.$route.query.musicName
          this.singAuthor = this.$route.query.musicAuthor
          this.getGeCi()
          this.getGeCiUrl()
          this.addEventHandle()
          this.$refs.lrc.style.top = 0 + 'px'
      },
      beforeDestroy(){
          this.removeEventHandle()
      },
methods:{
listening(){
    if(this.token == 0){
        this.$refs.player.play()
        this.token = 1
        this.tingzhi = true
    }else{
        this.$refs.player.pause()
        this.token = 0
        this.tingzhi = false
    }
    
},
getGeCi(){
     this.$http.get('/proxy/lyric?id=' + this.singId).then(({data}) =>{
    //   console.log(data)
    //   this.parsingGeci(data)
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
     this.$http.get('/proxy/song/url?id=' + this.singId).then(({data}) =>{
        //  console.log(data.data[0].url);
      this.audioUrl = data.data[0].url
    //   this.parsingGeci(data)
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
    height: 500px;
    overflow: hidden;
    position: relative;
}
.lyric {
        width: 100%;
        /* height: 500px; */
        position: absolute;
        top: 0;
        background-color: #f5f5f5;
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