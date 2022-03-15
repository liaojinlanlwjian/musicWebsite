<template>
  <div>
        <div style="width:90%;margin:0px auto">
        <div style="display:flex;width:100%;height:80px;line-height:80px">
        <div style="width:80%">
           <h1>我喜欢</h1>
        </div>
        <div style="width:10%;text-align:center">
        </div>
        <div >
            <el-button type="danger" style="border-radius:10px"  icon="fa fa-play-circle">更多歌曲</el-button>
        </div>
        </div>
        <div style="display:flex;margin-left:8%;flex-flow:wrap">
            <div v-for="o in 15" :key="o" class="text item" style="padding-right:50px;padding-top:10px">
            <el-card class="box-card" style="position: relative;">
                 <img
                style="width:100%;"
                :src="require('../../assets/liebiao1.jpg')">
                <div class="player"></div>
                <div><h3>摇滚推荐</h3></div>
                <div><p>我喜欢</p></div>
                <div style="margin:5px"><el-button size="small" circle @click="likeClick(o)" ref="bbb" >like</el-button></div>
            </el-card>
            </div>
        </div>
        
        
    </div>
  </div>
</template>

<script>
export default {
methods:{
    likeClick(o){
         if (this.$refs.bbb[o-1].$el.style.color == 'rgb(249, 89, 95)') {
             this.$refs.bbb[o-1].$el.style.color = ''
             this.$refs.bbb[o-1].$el.style.border = ''
             return
         }
         this.$refs.bbb[o-1].$el.style.color = '#f9595f'
         this.$refs.bbb[o-1].$el.style.border = '1px solid #f9595f'

      },
}
}
</script>

<style scoped>
.player{
    /* background: #282c34; */
    opacity:0.1; 
    width:100%;
    height:68%;
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