<!--home-->
<template>
  <div>
    <el-carousel trigger="click" height="220px" :interval="3000" arrow="always" style="width:100%">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" />
      </el-carousel-item>
    </el-carousel>
    <div>
        <div style="display:flex;width:100%;height:80px;line-height:80px">
        <div style="width:80%">
            <el-dropdown>
            <span class="el-dropdown-link" style="color:#222222;font-size:26px">
                即时热门<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div style="width:10%;text-align:center">
            <el-button style="color:#222222;border-radius:10px" >更多排行榜</el-button>
        </div>
        <div >
            <el-button type="danger" style="border-radius:10px"  icon="fa fa-play-circle">全部播放</el-button>
        </div>
        </div>
        <div style="width:90%;height:auto;margin:0px auto">
             <div v-for="(o,i) in recommend" :key="i" class="text item" style="padding-bottom:10px">
                <el-card shadow="hover" >
               <div style="display:flex">
                   <div style="width:5%;height:100%;text-align:center;line-height:100px">
                       <span style="font-size:18px;">{{i+1}}</span>
                   </div>
                   <div style="width:12%;text-align:center;position: relative;"  @click="jumpMusic(o)" >
                      <img
                        style="width:100%;"
                        :src="o.musicCover">
                    <div class="player"></div>
                   </div>
                   <div style="width:20%;text-align:center;padding:10px" @click="jumpMusic(o)" >
                       <div style="margin:20px auto">
                           <div>
                          <span>{{ o.musicName }}</span>
                            </div>
                            <div>
                                <span>{{ o.musicAuthor }}</span>
                            </div>
                       </div>
                      
                   </div>
                   <div style="width:80%;height:100%;text-align:right;line-height:100px">
                       <el-button style="border-radius:14px" @click="likeClick(o)" ref="rrrr" ><i class="fa fa-heart" ref="likeIcon"></i></el-button>
                       <el-button style="border-radius:14px" circle><i class="fa fa-play" ref="likeIcon"></i></el-button>
                   </div>
               </div>
            </el-card>
            </div>
            
        </div>
    </div>
    <div style="display:flex;width:90%;margin:0px auto">
        <div style="width:50%">
            <div style="width:100%;height:80px;line-height:80px;text-align:left;color:#222222;font-size:24px">派歌</div>
            <div style="width:100%;height:auto;background:#555b5e;text-align:center;">
                <img
                    style="max-width: 100%;max-height: 80%;"
                    :src="require('../../assets/paige.jpg')">
                <div>
                    <h1 style="color:#ffffff">【独“字”玩乐】谁说这里“无独有偶”？才不！</h1>
                    <span style="color:#bdc3c5"> 
今年有一个形式特殊的日子—2022年2月22日，在这一天不仅包含了近些年来日期的最大“含2量”，同时也歪打正着到农历的正月二十二以及星期二。如果你下次再要打卡这么一个外显特殊的时间，大概需要再等个两</span>
                </div>
            </div>
        </div>
        <div style="width:50%;margin-left:10%">
            <div style="width:100%;height:80px;line-height:80px;text-align:left;color:#222222;font-size:24px">大事</div>
            <div style="width:100%;display:flex;height:230px;background:#4a303e">
            <div style="width:50%;display: flex;justify-content: center;align-items: center;  ">
                    <img
                style="max-width: 100%;max-height: 100%;"
                :src="require('../../assets/dashi1.jpg')">
            </div>
            <div>
            <div style="padding:24% 5%">
                <h1 style="color:#ffffff">Favours!偏袒乐队：巡演在外，帽子也能当眼罩用</h1>
                <span style="color:#bdc3c5">一场电子摇滚演出的背后</span>
            </div>
        </div>
            </div>
            <div style="width:100%;display:flex;height:230px;background:#10100f;margin-top:40px">
                <div style="width:50%;display: flex;justify-content: center;align-items: center; ">
                     <img
                    style="max-width: 100%;max-height: 100%;"
                    :src="require('../../assets/dashi2.jpg')">
                </div>
                <div>
                <div style="padding:24% 5%">
                    <h1 style="color:#ffffff">女性音乐人特辑：希望不要继续忽略弱者的痛楚</h1>
                    <span style="color:#bdc3c5">借歌曲去表达自己当下最真实的情绪状态。</span>
                </div>
            </div>
            </div>
        </div>
    </div>
    <div style="width:90%;margin:0px auto">
        <div style="display:flex;width:100%;height:80px;line-height:80px">
        <div style="width:80%">
           <h1>推荐歌曲</h1>
        </div>
        <div style="width:10%;text-align:center">
        </div>
        <div >
            <el-button type="danger" style="border-radius:10px"  icon="fa fa-play-circle">更多歌曲</el-button>
        </div>
        </div>
        <div style="display:flex;width:100%">
            <div v-for="o in 4" :key="o" class="text item" style="margin:20px">
                <div style="width:100%">
                     <img
                    style="max-width: 100%;max-height: 100%;"
                    :src="require('../../assets/recommended1.jpg')">
                </div>
                <div><h2>孤独星球</h2></div>
                <div><p>山塘乐队</p></div>
                <div><el-button circle>like</el-button></div>
            </div>
        </div>
    </div>
    <div style="width:90%;margin:0px auto">
        <div style="display:flex;width:100%;height:80px;line-height:80px">
        <div style="width:80%">
           <h1>推荐歌单</h1>
        </div>
        <div style="width:10%;text-align:center">
        </div>
        <div >
            <el-button type="danger" style="border-radius:10px"  icon="fa fa-play-circle">更多歌曲</el-button>
        </div>
        </div>
        <div style="display:flex;margin-left:8%">
            <div v-for="o in 5" :key="o" class="text item" style="padding-right:50px">
            <el-card class="box-card">
                 <img
                style="width:100%;"
                :src="require('../../assets/liebiao1.jpg')">
                <div><h3>摇滚推荐</h3></div>
                <div><p>推荐歌单</p></div>
                <div style="margin:5px"><el-button size="small" circle>label</el-button></div>
                <div style="width:90%;margin:10px 0px 10px 0px"><hr/></div>
                <div><p>50首歌曲</p></div>
                <div><p>发表更新于2022年01-27</p></div>
            </el-card>
            </div>
        </div>
        
        
    </div>
  </div>
</template>
 
<script>
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
export default {
  components: {},
  data() {
    return {
      imgList: [
        {
          id: "1",
          src: require("../../assets/lubo1.jpg"),
          title: "plan B"
        },
        {
          id: "2",
          src: require("../../assets/lubo2.jpg"),
          title: "电线杆上的鸟"
        },
        {
          id: "3",
          src: require("../../assets/lubo3.jpg"),
          title: "钞能力"
        },
        {
          id: "4",
          src: require("../../assets/lubo4.jpg"),
          title: "周年庆"
        },
        {
          id: "5",
          src: require("../../assets/lubo5.jpg"),
          title: "走么？"
        }
      ],
      recommend:[]
    };
  },
  created() {
      this.queryData()
  },
 mounted: function () {
    //  this.$http.get('/proxy/lyric?id=33894312').then(({data}) =>{
    //   console.log(data)
    // })
  },
  computed: {},
  methods: {
      queryData(){
          this.$http.get('/api/recommend/queryAllRecommend/?start=' + 0).then((response)=>{
            this.recommend = response.data.data
            console.log(this.recommend);
          }).catch((response)=>{
            console.log(response);
          })
      },
      jumpMusic(o){
          this.$router.push({path:'/musicPage/musicdetail',query: {id:o.id}})
      },
      likeClick(o){
         if (this.$refs.rrrr[o-1].$el.style.color == 'rgb(249, 89, 95)') {
             this.$refs.rrrr[o-1].$el.style.color = ''
             this.$refs.rrrr[o-1].$el.style.border = ''
             return
         }
         this.$refs.rrrr[o-1].$el.style.color = '#f9595f'
         this.$refs.rrrr[o-1].$el.style.border = '1px solid #f9595f'

      },
  }
};
</script>
 
<style scoped>
.buttonIcon{
    background-color: transparent;
    background-image: none;
    padding: 15px 15px;
    font-family: fontAwesome;
    line-height: 20px;
}
.buttonIcon::before{
    content: "\f03b";
}
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