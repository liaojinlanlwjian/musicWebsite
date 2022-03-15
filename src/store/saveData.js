export default {
    saveFile(data,name){
            var str = JSON.stringify(data);
            sessionStorage.setItem(name,str); // 存入一个值
    },
    showFile(name){
       let data = JSON.parse(sessionStorage.getItem(name))
       return data
    },
    getTime(){
        var _this = this;
        　　let yy = new Date().getFullYear();
        　　let mm = new Date().getMonth()+1;
        　　let dd = new Date().getDate();
        　　let hh = new Date().getHours();
        　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        　　_this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
        return _this.gettime
     },
    getTimeClose(beginTime, endTime){
            var dateBegin = new Date(beginTime);
            var dateEnd = new Date(endTime);
            var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
            var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            var leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));//计算出小时数
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000);   //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
            //计算相差秒数
            var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000);
            return dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
        },
}