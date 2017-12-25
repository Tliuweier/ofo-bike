//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
      hours:0,
      minuters:0,
      seconds:0,
      billing:"正在计算"
    },
    onLoad(e){
      console.log(e.number);
      this.setData({
        number:e.number,
        timer:this.timer
      })
      let s = 0;
      let m = 0;
      let h = 0;
      this.timer=setInterval(()=>{
        this.setData({
          seconds:s++
        })
        if(s==60){
          s=0;
          m++;
          setTimeout(()=>{
            this.setData({
                minuters:m
            })
          },1000);
          if(m==60){
            m = 0;
            h++
            setTimeout(()=>{
                this.setData({
                  hours:h
                });
            },1000)
          }
        }
      },1000)
    },
    endRide(){
      clearInterval(this.timer);
      this.timer=="";
      this.setData({
        billing:"本次骑行耗时",
        disabled:true
      })
    },
    moveToIndex(){
      if (this.timer == "") {
         wx.redirectTo({
          url: '../index1/index1'
        })
      }else{
        wx.navigateTo({
          url: '../index1/index1?timer=' + this.timer
        })
      }
    }
})
