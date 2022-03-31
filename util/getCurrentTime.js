export function getTime(){
  var now = new Date();
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  var hour=now.getHours();
  var minute=now.getMinutes();
  var second=now.getSeconds();
  if(month<10){
    month = '0'+month
  }if(date<10){
    date = '0'+date
  }if(hour<10){
    hour = '0'+hour
  }if(minute<10){
    minute = '0'+minute
  }if(second<10){
    second = '0'+second
  }
  let obj=year+'-'+month+'-'+date+' '+hour+':'+minute
  return obj
}
