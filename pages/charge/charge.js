//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
      inputValue:0
    },
    onLoad(){
      wx.setNavigationBarTitle({
          title: '充值'
      })
    },
    bindInput(e){
      this.setData({
        inputValue:e.detail.value
      })
    },
    charge(){
      if (parseInt(this.data.inputValue)<=0||isNaN(this.data.inputValue)) {
        wx.showModal({
          title: "警告",
          content: "咱是不是还得给你钱？！！",
          showCancel: false,
          confirmText: "不不不不"
        })
      }else{
        wx.redirectTo({
          url: '../wallet/wallet',
          success: function(res){
            wx.showToast({
              title: "充值成功",
              icon: "success",
              duration: 2000
            })
          }
        })
      }
    },
    onUnload(){
      let _this = this;
      wx.getStorage({
        key:'overage',
        success:(res)=>{
          wx.setStorage({
            key: 'overage',
            data: {
              overage: parseInt(_this.data.inputValue) + parseInt(res.data.overage)
            }
          })
        },fail:(res)=>{
          wx.setStorage({
            key: 'overage',
            data: {
              overage: parseInt(this.data.inputValue)
            },
          })
        }
      })
    }
})
