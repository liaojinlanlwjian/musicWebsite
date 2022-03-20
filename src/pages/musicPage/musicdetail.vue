<template>
  <div>
      <div style="width:100%;height:400px;background:#4c3821;margin-top:-20px">
        <div style="width:30%;height:400px;text-align:center;padding:20px;background:#fff;position:absolute;top:160px;left:100px">
          <img
            style="width:90%;height:100%"
            :src="msg.musicCover">
          <div class="player"></div>
        </div>
        <div style="width:30%;height:auto;line-height:45px;padding:20px;position:absolute;top:160px;left:40%">
          <div>
            <h1 style="color:#ffffff;font-size:34px">{{ msg.musicName }}</h1>
            <p style="color:#c7c0bd;font-size:24px">{{ msg.musicType }}<p/>
            <div style="display:flex;">
              <div>
                <p style="color:#c7c0bd;font-size:24px">播放次数</p>
                <h1 style="color:#c7c0bd;font-size:30px">{{ msg.musicTraffic }}</h1>
              </div>
              <div  style="margin-left:20px">
                <p style="color:#c7c0bd;font-size:24px">下载</p>
                <h1 style="color:#c7c0bd;font-size:30px">{{ msg.musicDownloads }}</h1>
              </div>
            </div>
          </div>
          <div style="margin-top:40px">
            <h1>介绍</h1>
            <h2>作者:{{ msg.musicAuthor }}</h2>
            <h2>作曲:{{ msg.musicMsg }}</h2>
          </div>
        </div>
        <div style="width:30%;height:50px;text-align:center;position:absolute;top:35%;left:66%">
          <el-button style="border-radius:14px" @click="likeClick" ref="aaa" >like</el-button>
          <el-button style="border-radius:14px" icon="fa fa-play-circle" @click="musicPlayer" circle>Listen</el-button>
        </div>
      </div>
      <div class="middile">
        <h1>歌词</h1>
        <p>
      

        </p>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:{},
    }
  },
created(){
  this.querySingMsg(this.$route.query.id)
},
methods:{
  querySingMsg(id){
    this.$http.get(`/api/music/querySingleMusic/?id=` + id).then((response)=>{
          this.msg = response.data.data[0]
          }).catch((response)=>{
            console.log(response);
          })
  },
  musicPlayer(){
    console.log(this.msg.musicApi);
   this.$router.push({path:'/musicPage/musicPlayer',query: {musicId:this.msg.musicApi,
   musicPic:this.msg.musicCover,
   musicName:this.msg.musicName,
   musicAuthor:this.msg.musicAuthor,
   
   }})
    // this.$router.push('/musicPage/musicPlayer')

  },
  likeClick(){
         if (this.$refs.aaa.$el.style.color == 'rgb(249, 89, 95)') {
             this.$refs.aaa.$el.style.color = ''
             this.$refs.aaa.$el.style.border = ''
             return
         }
         this.$refs.aaa.$el.style.color = '#f9595f'
         this.$refs.aaa.$el.style.border = '1px solid #f9595f'

      },
}
}
</script>

<style scoped>
.middile{
  width: 90%;
  height: 300px;
  margin: 0px auto;
  border: 1px solid red;
  margin-top: 180px;
}
.player{
    opacity:0.1; 
    /* background: #282c34; */
    width:100%;
    height:400px;
    position: absolute;
    top: -0.1px;
    left: 1px;
    display: block;
}
.player:hover{
    opacity:0.5; 
    background:#282c34; 
    background-image: url('../../assets/musicplay.png');
    background-size: 100% 100%;
            background-repeat: no-repeat;
}
</style>>
