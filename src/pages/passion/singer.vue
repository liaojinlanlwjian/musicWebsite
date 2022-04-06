<template>
  <div class="content">
      <div class="singer" @click="jumpSinger(o)" v-for="o in singerData" :key="o.id">
          <div style="width:100%;height:70%">
              <img :src="o.singer_pic" alt="">
          </div>
          <p>{{ o.singer_name }}</p>
          <em>{{ o.singer_msg }}</em>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            singerData:[]
        }
    },
    created(){
        this.queryAllSinger()
    },
    methods:{
        jumpSinger(o){
            this.$router.push({
        path: "/passion/singerMusic",
        query: { id: o.id,singer:o.singer_name },
      });
        },
        queryAllSinger(){
             this.$http.get('/api/singer/queryAllSinger').then((response)=>{
            this.singerData = response.data.data
          }).catch((response)=>{
            console.log(response);
          })
        },
    }
}
</script>

<style scoped>
.content{
    width: 90%;
    height: auto;
    margin: 50px auto;
    display: flex;
    flex-flow:wrap;
}
.singer{
    width: 20%;
    height: 180px;
    margin: 10px 20px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10%;
    /* text-align: center; */
}
.singer img{
    text-align: center;
    width: 100%;
    height: 120px;
}
.singer p{
    color: black;
    margin: 0px 10px;
}
.singer em{
    display: block;
    margin: 2px 0px 10px 2px;
    font-size: 8px;
}
</style>