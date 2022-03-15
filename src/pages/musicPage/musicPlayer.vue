<template>
  <div>
    <el-row :gutter="20" style="background:#2e2e2e;margin-top:-20px">
        <el-col :span="12">
        <div class="grid-content bg-purple" style="height:900px;">
            <div style="width:50%;height:50%;padding-top:20px;text-align:center;margin:160px auto">
                <img
                    class="tp"
                    style="width:auto;border-radius:50%"
                    :src="require('../../assets/paige.jpg')">
                 <div style="width:100%;height:40%;padding-top:50px;text-align:center;color:#fff">
                    <h1>dasdasd</h1>
                    <h3>qwewda`fd</h3>
                </div>
                <div style="width:100%;height:5%;text-align:center;color:#fff;margin-left:18px">
                   <el-progress :percentage="50"></el-progress>
                </div>
                <div style="width:100%;height:20%;text-align:center;color:#fff;display:flex;margin-left:18px;margin-top:8px">
                   <div style="width:30%"><el-button type="success" icon="el-icon-check" circle></el-button></div>
                   <div style="width:30%"><el-button type="success" icon="el-icon-check" circle></el-button></div>
                   <div style="width:30%"><el-button type="success" icon="el-icon-check" circle></el-button></div> 
                </div>
            </div>
           
        </div></el-col>
        <el-col :span="12">
        <div class="grid-content bg-purple" style="height:900px;">
            <div style="width:280px;">
                <aplayer :music="videoUpload.music"></aplayer>
            </div>
        </div></el-col>
    </el-row>

  </div>
</template>

<script>
import aplayer from 'vue-aplayer'
export default {
    components: {
      aplayer
    },
    data () {
           return {
                videoUpload: {
                //progress: false,
               // progressPercent: 0,
               // successPercent: 0,
                theme: '#ffc0cb',
                autoplay: true,
                repeat: 'repeat-one', // 轮播模式。值可以是 'repeat-one'（单曲循环）'repeat-all'（列表循环）或者 'no-repeat'（不循环）。为了好记，还可以使用对应的 'music' 'list' 'none'
                mini: true, // 迷你模式
                float: true, // 浮动模式。你可以在页面上随意拖放你的播放器
                music: { // 当前播放的音乐
                    title: '能够成家吗',
                    author: '咖啡少年',
                    url: 'https://assets.smallsunnyfox.com/music/1.mp3',                  pic:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2366432289,1795558543&fm=26&gp=0.jpg' // 封面图片
                }
           }
        }
      },
methods:{

}
}
</script>

<style>
 @-webkit-keyframes rotation {

            from {
                -webkit-transform: rotate(0deg);
            }

            to {
                -webkit-transform: rotate(360deg);
            }

        }

        .tp {

            -webkit-transform: rotate(360deg);

            animation: rotation 3s linear infinite;

            -moz-animation: rotation 3s linear infinite;

            -webkit-animation: rotation 3s linear infinite;

            -o-animation: rotation 3s linear infinite;

        }

</style>