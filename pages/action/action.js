//index.js
//获取应用实例
const app = getApp()

Page({
	endRide(){
		wx.scanCode({
            success: (res) => {
              // 正在获取密码通知
              wx.showLoading({
                title: '正在获取密码',
                mask: true
              })
              // 请求服务器获取密码和车号
              wx.request({
                url: 'https://easy-mock.com/mock/59c87b18e0dc663341b81e23/example/getPassword',
                data: {},
                method: 'GET', 
                success: function(res){
                	console.log(res);
                  // 请求密码成功隐藏等待框
                  wx.hideLoading();
                  // 携带密码和车号跳转到密码页
                  wx.redirectTo({
                    url: '../Unclock/Unclock?password=' + res.data.data.password + '&number=' + res.data.data.Number,
                    success: function(res){
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })           
                }
              })
            }
          })
	},
   moveToManual(){
   	wx.navigateTo({
        url: '../Manual/Manual'
    })
   }
})
