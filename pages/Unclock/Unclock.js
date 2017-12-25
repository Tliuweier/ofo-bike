//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
  	time:9
  },
  onLoad(){
  	this.setData({
  		password:2333
  	})
  	let time = 9;
  	this.timer = setInterval(()=>{
  		this.setData({
  			time:--time
  		});
  		if(time==0){
  			clearInterval(this.timer)
  			wx.redirectTo({
  				url:'../billing/billing?number=' +256986
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
