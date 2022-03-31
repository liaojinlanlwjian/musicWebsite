<template>
  <div>
    <div style="display:flex;margin:50px auto;flex-flow:wrap;justify-content: center;">
            <div @click="player(o)" v-for="o in mv" :key="o.id" class="text item" style="padding:10px">
            <div  style="width:240px;padding:0px;background:#ffffff;box-shadow: 5px 5px 5px #888888;">
                 <img
                style="width:100%;height:140px"
               :src="o.mvCover">
               <div style="padding:10px 20px 5px 20px">
                   <div><i class="fa fa-bookmark-o" aria-hidden="true" style="color:red"></i><h3 style="display:inline;margin-left:5px">{{o.mvName}}</h3></div>
                <div><p>{{o.mvAuthor}}</p></div>
                <!-- <div style="margin:5px 0px 5px auto"><el-button size="small" circle @click="player(o)" ref="bbb" >播放</el-button></div> -->
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
        mv:[]
    }
},
mounted(){
    this.queryAllLike()
},
methods:{
    async queryAllLike(){
        try {
            let res = await this.$http.get("/api/mvList/queryAllMv")
            this.mv = res.data.data
        
        } catch (error) {
            this.$message.error('失败啦')
        }
        
    },
    player(o){
        console.log(o);
        this.$router.push({path:'/passion/mvplay',query: {data:o
   }})
    },
}
}
</script>

<style scoped>
  
</style>