<template>
  <div>
              <div style="width:90%;height:auto;margin:0px auto">
                <div style="display:flex;width:100%;height:80px;line-height:80px">
        <div style="width:80%">
           <h1>最近播放</h1>
        </div>
        <div style="width:10%;text-align:center">
        </div>
        <div >
            <el-button type="danger" style="border-radius:10px"  icon="fa fa-play-circle">更多歌曲</el-button>
        </div>
        </div>
             <div v-for="o in 4" :key="o" class="text item" style="padding-bottom:10px">
                <el-card shadow="hover" >
               <div style="display:flex;">
                   <div style="width:5%;text-align:center;line-height:72px">
                       <span style="font-size:18px;">1</span>
                   </div>
                   <div style="width:5%;text-align:center;position: relative;"  @click="jumpMusic" >
                      <img
                        style="width:100%;"
                        :src="require('../../assets/liebiao1.jpg')">
                      <div class="player"></div>
                   </div>
                   <div style="width:10%;text-align:center;line-height:40px" @click="jumpMusic" >
                      <div>
                          <span>电线杆上的鸟</span>
                      </div>
                      <div>
                          <span>LOCY</span>
                      </div>
                   </div>
                   <div style="width:80%;text-align:right;line-height:72px">
                       <el-button style="border-radius:14px" @click="likeClick(o)" ref="fff" >like</el-button>
                       <el-button style="border-radius:14px" icon="fa fa-play-circle" circle>Listen</el-button>
                   </div>
               </div>
            </el-card>
            </div>
            
        </div>
  </div>
</template>

<script>
export default {
methods: {
      jumpMusic(){
          this.$router.push('/musicPage/musicdetail')
      },
      likeClick(o){
         if (this.$refs.fff[o-1].$el.style.color == 'rgb(249, 89, 95)') {
             this.$refs.fff[o-1].$el.style.color = ''
             this.$refs.fff[o-1].$el.style.border = ''
             return
         }
         this.$refs.fff[o-1].$el.style.color = '#f9595f'
         this.$refs.fff[o-1].$el.style.border = '1px solid #f9595f'

      },
  }
}
</script>

<style scoped>
.player{
    opacity:0.1; 
    width:73px;
    height:74px;
    position: absolute;
    top: -0.1px;
    left: 1px;
    display: block;
}
.player:hover{
    opacity:0.9; 
    background:#282c34; 
    background-image: url('../../assets/musicplay.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>