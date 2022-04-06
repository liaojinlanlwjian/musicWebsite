<template>
  <div>
     <div class="box">
              <div class="searchBox">
                <input type="text" v-model="keyword" placeholder="请输入关键词进行搜索" class="searchInput" style="padding-left: 10px;">
                <input type="button"  @click="searchMusic" value="搜索" class="searchButton">
              </div>
            </div>
             <div style="width: 90%; height: auto; margin: 0px auto">
      <div style="display: flex; width: 100%; height: 80px; line-height: 80px">
        <div style="width: 80%">
          <h1>搜索结果</h1>
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
      <div v-for="(o,i) in data" :key="i" class="text item" style="margin:20px 40px">
                <div style="padding:10px;background:#fff;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;border-radius:10px" >
               <div style="display:flex">
                   <div style="width:5%;height:100%;text-align:center; line-height: 50px;">
                       <span style="font-size:18px;">{{i+1}}</span>
                   </div>
                   <div style="width:10%;position: relative;"  @click="jumpMusic(o)" >
                      <img
                        style="width:100%; height: 55px;border-radius:50%"
                        :src="o.musicCover">
                    <!-- <div class="player"></div> -->
                   </div>
                   <div style="width:50%;padding: 5px 10px 0px 10px;" @click="jumpMusic(o)" >
                           <div>
                          <span>{{ o.musicName }}</span>
                            </div>
                            <div style="margin-top: 5px;font-size:12px">
                                <span>{{ o.musicSinger }}</span>
                            </div>
                      
                   </div>
                   <div style="width:80%;height:100%;text-align:right;margin-top: 10px;">
                       <el-button style="border-radius:14px" @click="likeClick(i,o)" ref="rrrr" ><i class="fa fa-heart" ref="likeIcon"></i></el-button>
                       <el-button style="border-radius:14px"  @click="jumpMusic(o)"  circle><i class="fa fa-play" ref="likeIcon"></i></el-button>
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
      value:'',
      keyword:'',
      data:[],
      userName:''
    }
  },
  mounted() {
    this.value = this.$route.query.value
    this.keyword = this.value
    this.queryMusic( this.$route.query.value);
  this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;

  },
  watch:{
    value:{
      handler(val){
        console.log(val);
      }
    }
  },
  methods: {
    async searchMusic() {
      try {
        let res = await this.$http.get(`/api/music/getSearchMusic`, {
          params: {
            value: this.keyword,
          },
        });
        console.log(res);
        this.data = res.data.data
        this.queryAllLike();
      } catch (error) {
        this.$message.error("用户名或者密码错误");
      }
    },
    async queryMusic(value) {
      try {
        let res = await this.$http.get(`/api/music/getSearchMusic`, {
          params: {
            value: value,
          },
        });
        console.log(res);
        this.data = res.data.data
        this.queryAllLike();
      } catch (error) {
        this.$message.error("用户名或者密码错误");
      }
    },
       jumpMusic(o) {
        this.$router.push({path:'/musicPage/musicPlayer',query: {id:o.musicId}})
    },
    async queryAllLike() {
      try {
        let res = await this.$http.get(
          "/api/like/querylike/?user=" + this.userName
        );
        this.likeDoing(this.data, res.data.data);
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    likeDoing(red, data) {
      red.forEach((e, index) => {
        data.forEach((u) => {
          if (e.musicName == u.musicName) {
            this.$refs.rrrr[index].$el.style.color = "#f9595f";
            this.$refs.rrrr[index].$el.style.border = "1px solid #f9595f";
          }
        });
      });
    },
    async likeClick(i, o) {
      if (this.$refs.rrrr[i].$el.style.color == "rgb(249, 89, 95)") {
        this.$refs.rrrr[i].$el.style.color = "";
        this.$refs.rrrr[i].$el.style.border = "";
        try {
          await this.$http.delete("/api/like/deleteLike/?musicId=" + o.musicId);
          this.$message.error("已从我的喜欢列表移除");
        } catch (error) {
          this.$message.error("失败了");
        }
        return;
      }
      this.$refs.rrrr[i].$el.style.color = "#f9595f";
      this.$refs.rrrr[i].$el.style.border = "1px solid #f9595f";
      let data = {};
      data['musicApi'] = o.api
      data['musicCover'] = o.cover
      data['musicId'] = o.musicId
      data['musicName'] = o.name
      data['musicSinger'] = o.singer
      data["user"] = this.userName;
      console.log(data);
      try {
        await this.$http.post("/api/like/addLike", this.$qs.stringify(data));
        this.$message.success("已添加进我的喜欢列表");
      } catch (error) {
        this.$message.error("失败了");
      }
    },
  },
};
</script>

<style scoped>
.box{
    margin: 0 auto;
    padding-top: 80px;
    height: 50px;
    width: 100%;
  }
  .searchBox{
    margin: 0 auto;
    width: 60%;
    position: relative;
  }
  .searchInput{
    display: inline-block;
    width: 85%;
    height: 38px;
    border: 1px solid #cccccc;
    float: left;
    box-sizing: border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .searchButton{
    display: inline-block;
    width: 15%;
    height: 38px;
    line-height: 40px;
    float: left;
    background-color: #00a0e9;
    font-size: 16px;
    cursor: pointer;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border: none;
    color: #fff;
  }
</style>