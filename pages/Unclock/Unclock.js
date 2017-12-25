//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
  	time:9
  },
  onLoad(e){
  	this.setData({
  		password:e.password
  	})
  	let time = 9;
  	this.timer = setInterval(()=>{
  		this.setData({
  			time:--time
  		});
  		if(time==0){
  			clearInterval(this.timer)
  			wx.redirectTo({
  				url:'../billing/billing?number=' +e.number
  			})
  		}
  	},1000)
  },
  moveToWarn: function(){
    // 清除定时器
    clearInterval(this.timer)
    wx.redirectTo({
      url: '../index/index'
    })
  }
})
