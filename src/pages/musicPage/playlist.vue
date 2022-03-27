<template>
  <div>
    <div style="width: 90%; height: auto; margin: 0px auto">
      <div style="display: flex; width: 100%; height: 80px; line-height: 80px">
        <div style="width: 80%">
          <h1>最近播放</h1>
        </div>
        <div style="width: 10%; text-align: center"></div>
        <div>
          <el-button
            type="danger"
            style="border-radius: 10px"
            icon="fa fa-play-circle"
            >更多歌曲</el-button
          >
        </div>
      </div>
    </div>
    <template>
  <div v-for="(o,i) in recent" :key="i" class="text item" style="padding-bottom:10px">
                <el-card shadow="hover" >
               <div style="display:flex">
                   <div style="width:5%;height:100%;text-align:center; line-height: 50px;">
                       <span style="font-size:18px;">{{i+1}}</span>
                   </div>
                   <div style="width:12%;text-align:center;position: relative;"  @click="jumpMusic(o)" >
                      <img
                        style="width:100%; height: 50px"
                        :src="o.cover">
                    <!-- <div class="player"></div> -->
                   </div>
                   <div style="width:12%;text-align:center" @click="jumpMusic(o)" >
                       <div style="">
                           <div>
                          <span>{{ o.name }}</span>
                            </div>
                            <div style="margin-top: 10px">
                                <span>{{ o.singer }}</span>
                            </div>
                       </div>
                      
                   </div>
                   <div style="width:80%;height:100%;text-align:right;margin-top: 10px;">
                       <el-button style="border-radius:14px" @click="likeClick(o)" ref="rrrr" ><i class="fa fa-heart" ref="likeIcon"></i></el-button>
                       <el-button style="border-radius:14px"  @click="jumpMusic(o)"  circle><i class="fa fa-play" ref="likeIcon"></i></el-button>
                   </div>
               </div>
            </el-card>
            </div>
</template>
  </div>
</template>

<script>
export default {
   data() {
      return {
        recent:[],
        userName:''
      }
    },
  mounted(){
      this.userName = JSON.parse(sessionStorage.getItem("insuranceCode")).name
      this.queryAllRecent()
      
  },
  methods: {
    queryAllRecent(){
        this.$http.get('/api/recent/queryAllUserRecent/?user=' + this.userName).then((response)=>{
            this.recent = response.data.data
          }).catch((response)=>{
            console.log(response);
          })
    },
    jumpMusic(o) {
        this.$router.push({path:'/musicPage/musicdetail',query: {id:o.id}})
    },
    likeClick(o) {
      if (this.$refs.fff[o - 1].$el.style.color == "rgb(249, 89, 95)") {
        this.$refs.fff[o - 1].$el.style.color = "";
        this.$refs.fff[o - 1].$el.style.border = "";
        return;
      }
      this.$refs.fff[o - 1].$el.style.color = "#f9595f";
      this.$refs.fff[o - 1].$el.style.border = "1px solid #f9595f";
    },
  },
};
</script>

<style scoped>
.player {
  opacity: 0.1;
  width: 73px;
  height: 74px;
  position: absolute;
  top: -0.1px;
  left: 1px;
  display: block;
}
.player:hover {
  opacity: 0.9;
  background: #282c34;
  background-image: url("../../assets/musicplay.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>