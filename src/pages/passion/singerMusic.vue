<template>
  <div style="margin-top: 30px;height:auto;">
      <div class="img">
          <img :src="data.singer_pic" alt="">
              <p>{{ data.singer_name }}</p>
              <em>{{ data.singer_msg }}</em>
      </div>
             <div style="margin:30px 55px">
                 <p style="margin:10px;font-size:18px">{{ singer }}的歌曲</p>
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
                       <el-button style="border-radius:14px"  @click="deleteSingListMusic(index,o)"  circle><i class="fa fa-times" ref="likeIcon"></i></el-button>
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
            img_src:"",
            data:{},
            gridData:[],
            singer:''
        }
    },
    created(){},
    mounted(){
        this.querySinger(this.$route.query.id)
        this.queryMusic(this.$route.query.singer)
        this.singer = this.$route.query.singer
    },
    methods:{
        jumpMusic(o) {
      this.$router.push({
        path: "/musicPage/musicPlayer",
        query: { id: o.id },
      });
    },
        querySinger(id){
             this.$http.get('/api/singer/getSinger/?id=' + id).then((response)=>{
            this.data = response.data.data[0]
          }).catch((response)=>{
            console.log(response);
          })
        },
        //获取歌手的音乐
        queryMusic(singer){
             this.$http.get('/api/music/getSingerMusic/?singerName=' + singer).then((response)=>{
            this.gridData = response.data.data
            console.log(response.data.data);
          }).catch((response)=>{
            console.log(response);
          })
        },
    }
}
</script>

<style scoped>
.img{
    width: 100%;
    height: 280px;
    position: relative;
}
.img img{
    width: 100%;
    height: 100%;
}
.img p{
    position: absolute;
    color: aliceblue;
    top: 160px;
    left: 120px;
    bottom: 0;
    font-size: 20px;
}
.img em{
    display: block;
    position: absolute;
    color: deepskyblue;
    font-size: 10px;
    top: 190px;
    left: 120px;
    bottom: 0;
}
</style>