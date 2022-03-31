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
        <div style="display:flex;margin-left:12%;flex-flow:wrap">
            <div v-for="o in mylike" :key="o.id" class="text item" style="padding-right:30px;padding-top:10px">
            <el-card class="box-card" style="position: relative;width:180px">
                 <img
                style="width:100%;height:80px"
               :src="o.musicCover">
                <div class="player"></div>
                <div><h3>{{o.musicName}}</h3></div>
                <div><p>{{o.musicAuthor}}</p></div>
                <div style="margin:5px"><el-button size="small" circle @click="deleteMylike(o)" ref="bbb" >移除</el-button></div>
            </el-card>
            </div>
        </div>
        
        
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            mylike:[]
        }
    },
mounted(){
    this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;
    this.queryAllLike()
},
methods:{
    async queryAllLike(){
        try {
            let res = await this.$http.get("/api/like/querylike/?user=" + this.userName)
            this.mylike = res.data.data
        
        } catch (error) {
            this.$message.error('失败啦')
        }
        
    },
    async deleteMylike(data){
        try {
            let res = await this.$http.delete("/api/like/deleteLike/?id=" + data.id)
            this.$message.info('已从我的喜欢中移除')
            this.queryAllLike()
        } catch (error) {
            this.$message.error('失败啦')
        }
    },
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