<template>
  <div id="app">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer"></div>
  </div>
</template>

<script>
import APlayer from "APlayer"; // 引入音乐插件
import "APlayer/dist/APlayer.min.css"; // 引入音乐插件的样式
export default {
    props:{
        playData:{
            type:Array,
            default:[]
        }
    },
  name: "App",
  data() {
    return {
      audio: [ // 歌曲列表
        {
          name: "Windy Hill", // 歌曲名字
          artist: "钢琴-羽肿", // 歌曲演唱者
          url: // 歌曲地址（这里用外链地址）
            "http://m7.music.126.net/20220410170213/74faa07333fdb6eeafe5203fe3685e59/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/13856840046/9ac9/badf/19ec/da3fbcb35861d1f537ff58b4329226cc.mp3",
          cover: "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
      ],
      info: {
        fixed: false, // 不开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: true, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "one", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      },
    };
  },
  mounted() {
    // 初始化播放器
    this.initAudio();
  },
  methods: {
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.playData, // 音乐信息
       
        ...this.info, // 其他配置信息
      });
    },
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  padding: 50px;
  position: relative;
}
 #aplayer {
    width: 820.6px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>