<template>
  <div>
      <div style="width:100%;height:200px;background:#4c3821;margin-top:-20px;position:relative">
        <div style="width:30%;height:;text-align:center;position:absolute;top:100px;left:100px">
          <img
            style="width:100%;height:200px"
            :src="msg.cover">
        </div>
        <div style="width:35%;height:auto;line-height:50px;padding: 0px 30px;position:absolute;top:100px;left:40%">
          <div>
            <h1 style="color:#ffffff;font-size:18px">{{ msg.name }}</h1>
            <p style="color:#c7c0bd;font-size:24px">by-{{ msg.created_by }}<p/>
            <p style="color:#c7c0bd;font-size:24px">{{ msg.created_time }}<p/>
          </div>
        </div>
      </div>
      <div class="middile">
        <div style="margin:30px 55px">
            <div v-for="(o,i) in gridData" :key="i" class="text item" style="padding-bottom:10px">
                <div style="padding:10px;background:#fff;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;border-radius:10px" >
               <div style="display:flex">
                   <div style="width:5%;height:100%;text-align:center; line-height: 50px;">
                       <span style="font-size:18px;">{{i+1}}</span>
                   </div>
                   <div style="width:10%;text-align:center;position: relative;"  @click="jumpMusic(o)" >
                      <img
                        style="width:100%; height: 50px;border-radius:50%"
                        :src="o.musicCover">
                   </div>
                   <div style="width:50%;padding: 5px 10px 0px 10px;" @click="jumpMusic(o)" >
                       <div style="">
                           <div>
                          <span>{{ o.musicName }}</span><em style="margin-left:5px;font-size:6px">({{ o.musicMsg }})</em>
                            </div>
                            <div style="margin-top: 5px;font-size:12px">
                                <span>{{ o.musicSinger }}</span>
                            </div>
                       </div>
                      
                   </div>
                   <div style="width:80%;height:100%;text-align:right;margin-top: 10px;">
                       <el-button style="border-radius:14px"  @click="jumpMusic(o)"  circle><i class="fa fa-play" ref="likeIcon"></i></el-button>
                   </div>
               </div>
            </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  
  data(){
    return{
      msg:{},
      loadingSing:false,
      userName:'',
      gridData:[]
    }
  },
  mounted(){
  this.querySingList(this.$route.query.id)
  this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;
  this.qureySingListMusic(this.$route.query.id)
},
  methods:{
     jumpMusic(o) {
       console.log(o);
      this.$router.push({
        path: "/musicPage/musicPlayer",
        query: { id: o.musicId },
      });
    },
    async querySingList(id){
      try {
        let res = await this.$http.get(`/api/playlist/getSingplaylistcommend/?id=` + id);
        this.msg = res.data.data[0]
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    async qureySingListMusic(id) {
      this.loadingSing = true
      try {
        let res = await this.$http.get(`/api/playlistmusic/queryByPageplaylistmusic`, {
          params: {
            playListId: id,
          },
        });
        this.loadingSing = false;
        this.gridData = res.data.data;
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
}}
</script>

<style scoped>
.middile{
  width: 90%;
  height: auto;
  margin: 120px auto 50px auto;
  position: relative;
}
.player{
    opacity:0.1; 
    /* background: #282c34; */
    width:95%;
    height:180px;
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
