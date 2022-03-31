<template>
  <div>
    <div style="display:flex;width:88%;margin:50px auto;white-space:nowrap; ">
      <div class="playbox">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
    ></video-player>
    </div>
    <div class="msg">
      <div class="one">
        <i class="fa fa-free-code-camp" aria-hidden="true" style="color:red"></i><h1>{{ data.mvName }}</h1>
      </div>
      <div class="two">
        <i class="fa fa-user-o" aria-hidden="true" style="color:red"></i><p>{{ data.mvAuthor }}</p>
      </div>
      <div class="three">
        <i class="fa fa-gg" aria-hidden="true" style="color:red"></i><h1>{{ data.mvMsg }}</h1>
      </div>
      <div class="four">
        <i class="fa fa-commenting-o" aria-hidden="true" style="color:red"></i><span>{{ data.mvType }}</span>
      </div>
    </div>
    </div>
     <div style="width:70%;margin:50px auto" v-loading="commentLoading">
        <span style="font-size:16px">全部评论:({{ CommentsTotal }})</span>
      </div>
    <div style="width:70%;margin:50px auto;display:flex" v-for="(o) in content" :key="o.id">
        <div style="height:50px;width:auto;margin:5px">
        <img style="height:50px;max-width:100px;border-radius:50%" :src="o.user.avatarUrl">
      </div>
       <div style="height:auto;width:100%;margin:auto 10px">
         <h5 style="display:inline;font-size:14px;color:#ec4141">{{ o.user.nickname }}</h5>:
        <p style="display:inline;">{{ o.content }}</p>
        <div style="height:auto;width:100%;margin:5px 0px">
         <span style="font-size:13px;color:#48576a">{{ o.timeStr }}</span>
        <span style="float:right"><i class="fa fa-heart-o" aria-hidden="true"></i>{{ o.likedCount }}</span>
      </div>
      </div>
      
    </div>
    <div style="position:fixed;top:700px;right:320px" @click="comment">
      <el-tag
    effect="plain">
    我要评论
  </el-tag>
    </div>
      <el-dialog
        title="评论"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        >
        <el-input
        width="10%"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commentFirm">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {getTime} from '../../../util/getCurrentTime'
export default {
data(){
    return{
      commentLoading:false,
      showType:true,
      textarea:'',
      dialogVisible:false,
      data:{},
      user:[],
        CommentsTotal:0,
        content:[],//评论
        playerOptions :	{
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          src: "" //url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }


    }
},
mounted(){
  this.commentLoading = true
  this.data = this.$route.query.data
  this.$http.get('/proxy/mv/url/?id=' + this.data.mvApi).then(({data}) =>{
     this.playerOptions.sources[0].src = data.data.url
     this.pageStart()
    })
  this.$http.get('/proxy/comment/mv?id=' + this.data.mvApi).then(({data}) =>{
    this.CommentsTotal = data.total
    this.content = data.hotComments
    })
},
methods:{
  //页面开始时做什么
  async pageStart(){
    let userInfo = JSON.parse(sessionStorage.getItem("user-info"))
    let res = await this.$http.get(`/api/commmentList/queryComment`,{
      params:{
          user:userInfo.name,
          mvApi:this.$route.query.data.mvApi
      }
    })
    let data =  res.data.data
    data.forEach(e => {
      let obj = {}
      obj['user'] = {}
      obj.user['avatarUrl'] = e.userSrc
      obj.user['nickname'] = e.user
      obj['content'] = e.content
      obj['timeStr'] = e.createTime
      obj['likedCount'] = e.likedCount
      this.content.unshift(obj)
    });
    this.commentLoading = false
  },
  comment(){
    this.dialogVisible = true
  },
  async commentFirm(){
    try {
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"))
      let data = {}
      data['user'] = userInfo.name
      data['userSrc'] = userInfo.src
      data['content'] = this.textarea
      data['createTime'] = getTime()
      data['likedCount'] = '0'
      data['mvApi'] = this.$route.query.data.mvApi
      let dataPlus = this.$qs.stringify(data);
      await this.$http.post(`/api/commmentList/addComment`, dataPlus)
      let obj = {}
      obj['user'] = {}
      obj.user['avatarUrl'] = userInfo.src
      obj.user['nickname'] = userInfo.name
      obj['content'] = this.textarea
      obj['timeStr'] = getTime()
      obj['likedCount'] = '0'
      this.content.unshift(obj)
      this.dialogVisible = false
      this.textarea = ''
      this.$message.success("评论成功");
    } catch (error) {
      this.$message.error("失败啦");
    }
    
  },
}
}
</script>

<style scoped>
.playbox{
  width: 70%;
  height: 400px;
}
.msg{
      width: 30%;
    margin: 0px 0px 0px 50px;
}
.one{
      height: 80px;
    line-height: 80px;
}
.one h1{
     display: inline;
     margin-left: 10px;
}
.two{
      height: 80px;
    line-height: 80px;
}
.two p{
     display: inline;
     margin-left: 10px;
}
.three{
      height: 80px;
    line-height: 80px;
}
.three h1{
     display: inline;
     margin-left: 10px;
     font-size: 20px;
}
.four{
      height: 80px;
    line-height: 80px;
}
.four span{
     display: inline;
     margin-left: 10px;
}
</style>