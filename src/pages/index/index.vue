<!--home-->
<template>
  <div>
    <el-carousel
      trigger="click"
      height="220px"
      :interval="3000"
      arrow="always"
      style="width: 100%"
    >
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img
          :src="item.src"
          style="height: 100%; width: 100%"
          alt="图片丢失了"
          :title="item.title"
        />
      </el-carousel-item>
    </el-carousel>
    <div>
      <div
        style="
          display: flex;
          width: 90%;
          margin: 0px auto;
          height: 80px;
          line-height: 80px;
        "
      >
        <div style="width: 70%">
          <span
            class="el-dropdown-link"
            style="color: #222222; font-size: 26px"
          >
            即时热门<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <div style="width: 15%; text-align: center">
          <el-button style="color: #222222; border-radius: 10px"
            >更多排行榜</el-button
          >
        </div>
        <div>
          <el-button
            type="danger"
            style="border-radius: 10px"
            icon="fa fa-play-circle"
            >全部播放</el-button
          >
        </div>
      </div>
      <div style="width: 90%; height: auto; margin: 0px auto">
        <div
          v-for="(o, i) in recommend"
          :key="i"
          class="text item"
          style="padding-bottom: 10px"
        >
          <div
            style="
              padding: 10px;
              background: #fff;
              box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
              border-radius: 10px;
            "
          >
            <div style="display: flex">
              <div
                style="
                  width: 5%;
                  height: 100%;
                  text-align: center;
                  line-height: 50px;
                "
              >
                <span style="font-size: 18px">{{ i + 1 }}</span>
              </div>
              <div style="width: 10%; position: relative" @click="jumpMusic(o)">
                <img
                  style="width: 100%; height: 50px; border-radius: 50%"
                  :src="o.musicCover"
                />
                <!-- <div class="player"></div> -->
              </div>
              <div
                style="width: 50%; padding: 5px 10px 0px 10px"
                @click="jumpMusic(o)"
              >
                <div>
                  <div>
                    <span>{{ o.musicName }}</span
                    ><em style="margin-left: 5px; font-size: 6px"
                      >({{ o.musicMsg }})</em
                    >
                  </div>
                  <div style="margin-top: 5px; font-size: 12px">
                    <span>{{ o.musicAuthor }}</span>
                  </div>
                </div>
              </div>
              <div
                style="
                  width: 80%;
                  height: 100%;
                  text-align: right;
                  margin-top: 10px;
                "
              >
                <el-popover
                  style="margin-right: 8px"
                  placement="left"
                  width="350"
                  trigger="click"
                >
                  <el-table :data="gridData" v-loading="loadingSing">
                    <el-table-column
                      width="100"
                      property="created_by"
                      label="创建人"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="name"
                      label="姓名"
                    ></el-table-column>
                    <el-table-column label="操作">
                      <template width="120" slot-scope="scope">
                        <el-button
                          size="mini"
                          type="info"
                          @click="handleConfirm(scope.$index, scope.row)"
                          >添加进入此歌单</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    style="border-radius: 14px"
                    @click="qureySingList(o)"
                    slot="reference"
                    ><i class="fa fa-plus"></i>
                  </el-button>
                </el-popover>
                <el-button
                  style="border-radius: 14px"
                  @click="likeClick(i, o)"
                  ref="rrrr"
                  ><i class="fa fa-heart" ref="likeIcon"></i
                ></el-button>
                <el-button
                  @click="jumpMusic(o)"
                  style="border-radius: 14px"
                  circle
                  ><i class="fa fa-play" ref="likeIcon"></i
                ></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; width: 90%; margin: 0px auto">
      <div style="width: 50%">
        <div
          style="
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: left;
            color: #222222;
            font-size: 24px;
          "
        >
          派歌
        </div>
        <div
          style="
            width: 100%;
            height: auto;
            background: #555b5e;
            text-align: center;
          "
        >
          <img
            style="max-width: 100%; max-height: 80%"
            :src="require('../../assets/paige.jpg')"
          />
          <div>
            <h1 style="color: #ffffff">
              【独“字”玩乐】谁说这里“无独有偶”？才不！
            </h1>
            <span style="color: #bdc3c5">
              今年有一个形式特殊的日子—2022年2月22日，在这一天不仅包含了近些年来日期的最大“含2量”，同时也歪打正着到农历的正月二十二以及星期二。如果你下次再要打卡这么一个外显特殊的时间，大概需要再等个两</span
            >
          </div>
        </div>
      </div>
      <div style="width: 50%; margin-left: 10%">
        <div
          style="
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: left;
            color: #222222;
            font-size: 24px;
          "
        >
          大事
        </div>
        <div
          style="width: 100%; display: flex; height: 230px; background: #4a303e"
        >
          <div
            style="
              width: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              style="max-width: 100%; max-height: 100%"
              :src="require('../../assets/dashi1.jpg')"
            />
          </div>
          <div>
            <div style="padding: 24% 5%">
              <h1 style="color: #ffffff">
                Favours!偏袒乐队：巡演在外，帽子也能当眼罩用
              </h1>
              <span style="color: #bdc3c5">一场电子摇滚演出的背后</span>
            </div>
          </div>
        </div>
        <div
          style="
            width: 100%;
            display: flex;
            height: 230px;
            background: #10100f;
            margin-top: 40px;
          "
        >
          <div
            style="
              width: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              style="max-width: 100%; max-height: 100%"
              :src="require('../../assets/dashi2.jpg')"
            />
          </div>
          <div>
            <div style="padding: 24% 5%">
              <h1 style="color: #ffffff">
                女性音乐人特辑：希望不要继续忽略弱者的痛楚
              </h1>
              <span style="color: #bdc3c5"
                >借歌曲去表达自己当下最真实的情绪状态。</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 90%; margin: 0px auto">
      <div style="display: flex; width: 100%; height: 80px; line-height: 80px">
        <div style="width: 80%">
          <h1>推荐歌曲</h1>
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
      <div style="display: flex; width: 100%">
        <div v-for="o in 4" :key="o" class="text item" style="margin: 20px">
          <div style="width: 100%">
            <img
              style="max-width: 100%; max-height: 100%"
              :src="require('../../assets/recommended1.jpg')"
            />
          </div>
          <div><h2>孤独星球</h2></div>
          <div><p>山塘乐队</p></div>
          <div><el-button circle>like</el-button></div>
        </div>
      </div>
    </div>
    <div style="width: 90%; margin: 0px auto">
      <div style="display: flex; width: 100%; height: 80px; line-height: 80px">
        <div style="width: 80%">
          <h1>推荐歌单</h1>
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
      <div style="width:90%;display: flex;flex-wrap: wrap;margin: 0px auto;">
        <div v-for="o in playListData" @click="jumpPlayListDetail(o)" :key="o.id" style="width:160px;margin:30px">
            <div style="width: 140px; height: 140px">
              <img
                style="width: 100%; height: 100%"
                :src="o.cover"
              />
            </div>
            <div><h3>{{ o.name }}推荐</h3></div>
            <div><p>推荐歌单</p></div>
            <div style="width: 90%; margin: 10px 0px 10px 0px"><hr /></div>
            <div><p>{{ o.msg }}</p></div>
            <div><p>发表更新于{{ o.created_time }}</p></div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
const API_PROXY = "https://bird.ioliu.cn/v1/?url=";
export default {
  components: {},
  data() {
    return {
      playListData:[],
      tokenSingMusic: 0,
      userName: "",
      value: false,
      imgList: [
        {
          id: "1",
          src: require("../../assets/lubo1.jpg"),
          title: "plan B",
        },
        {
          id: "2",
          src: require("../../assets/lubo2.jpg"),
          title: "电线杆上的鸟",
        },
        {
          id: "3",
          src: require("../../assets/lubo3.jpg"),
          title: "钞能力",
        },
        {
          id: "4",
          src: require("../../assets/lubo4.jpg"),
          title: "周年庆",
        },
        {
          id: "5",
          src: require("../../assets/lubo5.jpg"),
          title: "走么？",
        },
      ],
      recommend: [],
      loadingSing: false,
      gridData: [],
      musicMsg: {},
    };
  },
  created() {},
  mounted: function () {
    this.queryData();
    this.queryPlayListData();
    this.userName = JSON.parse(sessionStorage.getItem("user-info")).name;
  },
  computed: {},
  methods: {
    jumpPlayListDetail(o){
      this.$router.push({
        path: "/musicPage/playListMusic",
        query: { id: o.id },
      });
    },
    async queryPlayListData(){
      try {
        let res = await this.$http.get(
          `/api/playlist/queryAllplaylistcommend`
        );
        console.log("o");
        this.playListData = res.data.data;
        console.log(this.playListData);
      } catch (error) {
        this.$message.error("失败啦");
      } 
    },
    //获取用户歌单中的所有的音乐 并且进行判断数据是否一样
    async queryUserSingMusic(row) {
      // console.log(this.musicMsg);
      try {
        let res = await this.$http.get(
          `/api/singlistmusic/getAllListMusic/?user=` + this.userName
        );
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].musicName === this.musicMsg.musicName &&
            parseInt(data[i].singListId) === row.id
          ) {
            this.tokenSingMusic = 1;
            break;
          } else {
            this.tokenSingMusic = 0;
          }
        }
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    async handleConfirm(index, row) {
      this.queryUserSingMusic(row).then((res) => {
        if (this.tokenSingMusic == 1) {
          this.$message.error("该歌曲已存在此歌单");
        } else {
          try {
            this.musicMsg["musicId"] = this.musicMsg.id;
            this.musicMsg["singListId"] = row.id;
            this.musicMsg["user"] = this.userName;
            let data = this.$qs.stringify(this.musicMsg);
            this.$http
              .post(`/api/singlistmusic/addSingListMusic`, data)
              .then((res) => {
                this.$message.success("已加入该歌单");
              });
          } catch (error) {
            this.$message.error("失败啦");
          }
        }
      });
    },
    async qureySingList(o) {
      this.musicMsg = o;
      this.loadingSing = true;
      try {
        let res = await this.$http.get(
          `/api/singlist/getAllSingList?user=` + this.userName
        );
        this.loadingSing = false;
        this.gridData = res.data.data;
      } catch (error) {
        this.$message.error("失败啦");
      }
    },
    queryData() {
      this.$http
        .get("/api/recommend/queryAllRecommend/?start=" + 0)
        .then((response) => {
          this.recommend = response.data.data;
          this.queryAllLike();
        })
        .catch((response) => {
          console.log(response);
        });
    },
    jumpMusic(o) {
      this.$router.push({
        path: "/musicPage/musicPlayer",
        query: { id: o.id },
      });
    },
    async queryAllLike() {
      try {
        let res = await this.$http.get(
          "/api/like/querylike/?user=" + this.userName
        );
        this.likeDoing(this.recommend, res.data.data);
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
      console.log(o);
      if (this.$refs.rrrr[i].$el.style.color == "rgb(249, 89, 95)") {
        this.$refs.rrrr[i].$el.style.color = "";
        this.$refs.rrrr[i].$el.style.border = "";
        try {
          await this.$http.delete("/api/like/deleteLike/?musicId=" + o.id);
          this.$message.error("已从我的喜欢列表移除");
        } catch (error) {
          this.$message.error("失败了");
        }
        return;
      }
      this.$refs.rrrr[i].$el.style.color = "#f9595f";
      this.$refs.rrrr[i].$el.style.border = "1px solid #f9595f";
      let data = o;
      data["user"] = this.userName;
      data["musicId"] = o.id;
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
.buttonIcon {
  background-color: transparent;
  background-image: none;
  padding: 15px 15px;
  font-family: fontAwesome;
  line-height: 20px;
}
.buttonIcon::before {
  content: "\f03b";
}
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