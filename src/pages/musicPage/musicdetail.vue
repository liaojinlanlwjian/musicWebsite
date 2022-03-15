<template>
  <div>
      <div style="width:100%;height:400px;background:#4c3821;margin-top:-20px">
        <div style="width:30%;height:400px;text-align:center;padding:20px;background:#fff;position:absolute;top:160px;left:100px">
          <img
            style="width:90%;height:100%"
            :src="require('../../assets/detail1.jpg')">
          <div class="player"></div>
        </div>
        <div style="width:30%;height:auto;line-height:45px;padding:20px;position:absolute;top:160px;left:36%">
          <div>
            <h1 style="color:#ffffff;font-size:34px">电线杆上的鸟</h1>
            <p style="color:#c7c0bd;font-size:24px">folk<p/>
            <div style="display:flex;">
              <div>
                <p style="color:#c7c0bd;font-size:24px">播放次数</p>
                <h1 style="color:#c7c0bd;font-size:30px">54445</h1>
              </div>
              <div  style="margin-left:20px">
                <p style="color:#c7c0bd;font-size:24px">喜欢</p>
                <h1 style="color:#c7c0bd;font-size:30px">4898</h1>
              </div>
            </div>
          </div>
          <div style="margin-top:40px">
            <h1>介绍</h1>
            <h2>作者：jdklasj</h2>
            <h2>作曲：ioeuwqe</h2>
          </div>
        </div>
        <div style="width:30%;height:50px;text-align:center;position:absolute;top:35%;left:66%">
          <el-button style="border-radius:14px" @click="likeClick" ref="aaa" >like</el-button>
          <el-button style="border-radius:14px" icon="fa fa-play-circle" @click="musicPlayer" circle>Listen</el-button>
        </div>
      </div>
      <div class="middile">
        <h1>歌词</h1>
        <p>
          if you wanna be my birdie
星星要怎么数？
If you wanna be my lover
天空要怎么住？

想飞去哪里
My love
why don't we just get to know each other?
喔 欢迎光临
My love
why don't we just get to hold each other??

看窗外的星空
一边摸著你的头
希望你待在我的宇宙中
开窗户 吹著风
让我成为你的星空

养了一只电线杆上的鸟 wu wu
希望他只对我一个人叫 wu wu
剩下的 待在那就好
其他内心声音 才不会太吵

If u wanna be my birdie
种 我爱的植物
If u wanna be my lover
它 需要被照顾

想飞去哪里
My love
why don't we just get to know each other?
喔 欢迎光临
My love
why don't we just get to hold each other??

看窗外的星空
一边摸著你的头
希望你待在我的宇宙中
开窗户 吹著风
让我成为你的星空

养了一只电线杆上的鸟 wu wu
希望他只对我一个人叫 wu wu wu
剩下的待在那就好
其他内心声音才不会太吵

（间奏）

我就是你的星空
我轻拍著你的头
给你看我刚涂的指甲油
开著灯 做著梦
沈睡在我的宇宙中

养了一只电线杆上的鸟 wu wu
希望他只对我一个人叫 wu wu wu
对我说些什么都好
答应我你不会在夜里逃跑


        </p>
      </div>
  </div>
</template>

<script>
export default {
methods:{
  musicPlayer(){
    this.$router.push('/musicPage/musicPlayer')

  },
  likeClick(){
         if (this.$refs.aaa.$el.style.color == 'rgb(249, 89, 95)') {
             this.$refs.aaa.$el.style.color = ''
             this.$refs.aaa.$el.style.border = ''
             return
         }
         this.$refs.aaa.$el.style.color = '#f9595f'
         this.$refs.aaa.$el.style.border = '1px solid #f9595f'

      },
}
}
</script>

<style scoped>
.middile{
  width: 90%;
  height: 300px;
  margin: 0px auto;
  border: 1px solid red;
  margin-top: 180px;
}
.player{
    opacity:0.1; 
    /* background: #282c34; */
    width:100%;
    height:400px;
    position: absolute;
    top: -0.1px;
    left: 1px;
    display: block;
}
.player:hover{
    opacity:0.5; 
    background:#282c34; 
    background-image: url('../../assets/musicplay.png');
    background-size: 100% 100%;
            background-repeat: no-repeat;
}
</style>>
